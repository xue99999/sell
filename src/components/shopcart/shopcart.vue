<template>
    <div>
        <div class="shopcart">
            <div class="con" @click="toggleList">
                <div class="con-left">
                    <div class="logo-wrap">
                        <div class="logo" :class="{'highlight' : totalCount > 0}">
                            <i class="icon-shopping_cart" :class="{'highlight' : totalCount > 0}"></i>
                        </div>
                        <div v-show="totalCount > 0" class="num">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight' : totalCount > 0}">
                        ￥{{totalPrice}}
                    </div>
                    <div class="desc">
                        另需配送费￥{{deliveryPrice}}元
                    </div>
                </div>
                <div class="con-right">
                    <div class="pay" @click.stop="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <transition name="fold">
                <div v-show="listShow" class="shopcart-list">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-con" ref="listCon">
                        <ul>
                            <li class="food" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartControl-wrap">
                                    <cartControl @add="drop" :food="food"></cartControl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
            
            <div class="ball-container">
                <div v-for="ball in balls">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop"> 
                        <div class="ball" v-show="ball.show">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        
        <transition name="fade">
            <div class="list-mask" @click="hideListMask" v-show="listShow">
                
            </div>
        </transition>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import cartControl from 'components/cartControl/cartControl';

    export default {
        data() {
            return {
                balls: [{
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }],
                dropBalls: [],
                fold: false
            }
        },
        props: ['minPrice', 'deliveryPrice', 'selectFoods'],
        components: { cartControl },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.map(item => {
                    total += item.price * item.count
                });
                return total;
            },
            totalCount() {
                let count = 0;
                this.selectFoods.map(item => {
                    count += item.count;
                });
                return count;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `￥还差${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            payClass() {
                if (this.totalPrice < this.minPrice) {
                    return 'not-enough';
                } else {
                    return 'enough';
                }
            },
            listShow() {
                if (!this.totalCount) {
                    this.fold = false;
                    return false;
                }
                let show = this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listCon, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    })
                }
                return show;
            }
        },
        methods: {
            beforeDrop(el) {
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 32);
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            dropping(el) {
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight;
                //重绘,少了这句话 不会有动画发生
                this.$nextTick(() => {
                    el.style.transform = 'translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.transform = 'translate3d(0,0,0)';
                });
            },
            afterDrop(el) {
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            toggleList() {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty() {
                this.selectFoods.map(item => {
                    item.count = 0;
                });
            },
            hideListMask() {
                this.fold = false;
            },
            pay() {
                if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    alert(`￥还差${diff}元起送`);
                } else {
                    alert(`需支付${this.totalPrice}元`);
                }
            },
            drop(el) {
                //此方法父组件调用
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return ;
                    }
                }
            }
        }
    }
</script>

<style lang="stylus">
    @import '../../common/css/mixin.styl'
    
    .shopcart
        position: fixed
        bottom: 0
        left: 0
        height: 48px
        width: 100%
        background-color: #141d27
        z-index: 99
        .con
            display: flex
            background: #141d27
            //一定要加背景颜色,不然你就会看到不一样的动画
            font-size: 0
            .con-left
                flex: 1
                position: relative
                .logo-wrap
                    display: inline-block
                    position: relative
                    box-sizing: border-box
                    top: -10px
                    width: 56px
                    height: 56px
                    margin: 0 12px
                    padding: 6px
                    background-color: #141d27
                    border-radius: 50%
                    vertical-align: top
                    .logo
                        border-radius: 50%
                        width: 100%
                        height: 100%
                        text-align: center
                        background-color: #2b343c
                        &.highlight 
                            background-color: rgb(0,160,220)
                    .num
                        position: absolute
                        top: 0
                        right: 0
                        width: 16px
                        height: 16px
                        padding: 0 6px
                        color: #fff
                        background-color: rgb(240,20,20)
                        font-size: 12px
                        text-align: center
                        border-radius: 16px
                        line-height: 16px
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
                    .icon-shopping_cart
                        font-size: 24px
                        line-height: 44px
                        color: #80858a
                        &.highlight
                            color: #fff
                .price, .desc
                    display: inline-block
                    font-size: 16px
                    font-weight: 700
                    line-height: 24px
                    color: rgba(255,255,255,0.4)
                .price
                    margin-top: 12px
                    color: rgba(255,255,255,0.4)
                    padding-right: 12px
                    border-right: 1px solid rgba(255,255,255,.1)
                    &.highlight
                        color: #fff
                .desc
                    display: inline-block
                    margin-left: 12px
                    font-size: 14px
            .con-right
                flex: 0 0 105px
                .pay
                    font-size: 12px
                    text-align: center
                    line-height: 48px
                    background-color: #2B333B
                    &.not-enough
                        background-color: #2B333B
                    &.enough
                        background-color: #00b43c
                        color: #fff

        .shopcart-list
            position: absolute
            left: 0
            top: 0
            z-index: -1
            width: 100%
            transform: translate3d(0, -100%, 0)
            &.fold-enter-active, &.fold-leave-active
              transition: all 0.3s
            &.fold-enter, &.fold-leave-active
              transform: translate3d(0, 0, 0)
            .list-header
                height: 40px
                line-height: 40px
                border-bottom: 1px solid rgba(7,17,27,0.1)
                background-color: #f3f5f7
                padding: 0 18px
                box-sizing: border-box
                .title 
                    font-size: 14px
                    float: left
                    color: rgb(7,17,27)
                .empty
                    font-size: 12px
                    float: right
                    color: rgb(0,160,220)
            .list-con
                box-sizing: border-box
                background-color: #fff
                padding: 0 18px
                max-height: 217px
                overflow: hidden
                .food
                    position: relative
                    height: 24px
                    padding: 12px 0
                    border-1px(rgba(7, 17, 27, 0.1))
                    .name
                        color: rgb(7,17,27)
                        font-size: 14px
                        line-height: 24px
                    .price
                        position: absolute
                        font-size: 14px
                        font-weight: 700
                        color: rgb(240,20,20)
                        right: 90px
                        top: 17px
                    .cartControl-wrap
                        position: absolute
                        right: 0
                        bottom: 6px
        
        .ball-container
            .ball
                position: fixed
                left: 32px
                bottom: 32px
                z-index: 110
                transition: all .4s cubic-bezier(.39,-0.32,.83,.67)
                .inner
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background-color: rgb(0,160,220)
                    transition: all .4s linear
                    
    .list-mask
        position: fixed
        width: 100%
        left: 0
        top: 0
        height: 100%
        z-index: 80
        backdrop-filter: blur(10px)
        background-color: rgba(7,17,27,0.6)
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.5s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          background: rgb(7,17,27)
</style>
