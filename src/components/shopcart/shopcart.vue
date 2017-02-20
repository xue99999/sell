<template>
    <div class="shopcart">
        <div class="con">
            <div class="con-left">
                <div class="logo-wrap">
                    <div class="logo">
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <div class="price">
                    ￥0
                </div>
                <div class="desc">
                    另需配送费￥4元
                </div>
            </div>
            <div class="con-right">
                ￥20元起送
            </div>
        </div>
    </div>
</template>

<script>
    export default {

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
    .con-left .icon-shopping_cart {
        font-size: 24px;
        line-height: 44px;
        color: #80858a;
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
    .con-left .desc {
        display: inline-block;
        margin-left: 12px;
    }
    .con-right {
        flex: 0 0 105px;
        font-size: 12px;
        text-align: center;
        padding-top: 12px;
        background-color: #2B333B;
    }
</style>