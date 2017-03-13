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
            <transition name="fade">
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
                                    <cartControl :food="food"></cartControl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
            
            <div class="ball-container">
                <div class="ball" v-for="ball in balls" v-show="ball.show">
                    <transition name="drop">
                    <div class="inner"></div>
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
            }
        }
    }
</script>

<style>
    .shopcart {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 48px;
        width: 100%;
        background-color: #141d27;
        z-index: 99;
    }
    .con {
        display: flex;
        height: 100%;
        width: 100%;
        font-size: 0;
    }
    .con-left {
        flex: 1;
        position: relative;
    }
    .con-left .logo-wrap {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        top: -10px;
        width: 56px;
        height: 56px;
        margin: 0 12px;
        padding: 6px;
        background-color: #141d27;
        border-radius: 50%;
        vertical-align: top;
    }
    .con-left .logo {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #2b343c;
    }
    .con-left .logo.highlight {
        background-color: rgb(0,160,220);
    }
    .con-left .num {
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
        padding: 0 6px;
        color: #fff;
        background-color: rgb(240,20,20);
        font-size: 12px;
        text-align: center;
        border-radius: 16px;
        line-height: 16px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
    }
    .con-left .icon-shopping_cart {
        font-size: 24px;
        line-height: 44px;
        color: #80858a;
    }
    .con-left .icon-shopping_cart.highlight {
        color: #fff;
    }
    .con-left .price, .con-left .desc, .con-right {
        display: inline-block;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        color: rgba(255,255,255,0.4);
    }
    .con-left .price {
        margin-top: 12px;
        color: rgba(255,255,255,0.4);
        padding-right: 12px;
        border-right: 1px solid rgba(255,255,255,.1);
    }
    .con-left .price.highlight {
        color: #fff;
    }
    .con-left .desc {
        display: inline-block;
        margin-left: 12px;
        font-size: 14px;
    }
    .con-right {
        flex: 0 0 105px;
    }
    .con-right .pay {
        font-size: 12px;
        text-align: center;
        line-height: 48px;
        background-color: #2B333B;
    }
    .con-right .pay.not-enough {
        background-color: #2B333B;
    }
    .con-right .pay.enough {
        background-color: #00b43c;
        color: #fff;
    }
</style>
<style lang="stylus">
    

    .list-mask
        position: fixed
        width: 100%
        left: 0
        top: 0
        height: 100%
        z-index: 80
        background-color: rgba(7,17,27,0.6)
        &.fade-enter-active, &.fade-leave-active {
          opacity: 1
          transition: all 0.5s
        }
        &.fade-enter, &.fade-leave-active {
          opacity: 0
          background-color: rgb(7,17,27)
        }
    .shopcart-list
        position: absolute
        width: 100%
        left: 0
        top: 0
        z-index: -1
        transform: translate3d(0,-100%,0)
        &.fade-enter-active, &.fade-leave-active {
          transition: all 0.5s
          transform translate3d(0, -100%, 0)
        }
        &.fade-enter, &.fade-leave-active {
          transform translate3d(0, 0, 0)
        }
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
                    top: 12px
                .cartControl-wrap
                    position: absolute
                    right: 0
                    top: 6px           
</style>

<style lang="stylus">
    .ball-container
        .ball
            position: fixed
            left: 32px
            bottom: 32px
            z-index: 110
            .inner
                width: 16px
                height: 16px
                border-radius: 50%
                background-color: rgb(0,160,220)
</style>