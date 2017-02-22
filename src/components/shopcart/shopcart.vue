<template>
    <div class="shopcart">
        <div class="con">
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
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: ['minPrice', 'deliveryPrice', 'selectFoods'],
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