<template>
    <div id="toast" v-show="isShow">
        <div class="weui-mask_transparent"></div>
        <transition enter-class="toast-enter" enter-active-class="toast-enter-active" leave-active-class="toast-leave-active">
            <div class="weui-toast" v-show="showAnimate">
                <i class="weui-icon_toast" style="font-size:55px;color:#fff;" :class="toastClass"></i>
                <p class="weui-toast__content">{{title}}</p>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isShow: false,
                title: '已完成',
                icon: 'success',
                showAnimate:false
            }
        },
        methods: {
            show(title, icon, dur) {
                this.isShow = true;
                this.showAnimate = true;
                this.title = title || '已完成';
                this.icon = icon;
                dur = dur || 2000;

                setTimeout(() => {
                    this.hide();
                }, dur);
                
            },
            hide() {
                this.showAnimate = false;
                setTimeout(()=>{
                    this.isShow = false;
                },280)
                /*
                * 这里延迟280ms触发是因为 
                * display:none 以后,动画就不走了
                */
            }
        },
        computed: {
            toastClass() {
                if (this.icon == 'loading') {
                    return 'weui-loading';
                } else if (this.icon == 'fail') {
                    return 'weui-icon-cancel';
                } else {
                    return 'weui-icon-success-no-circle';
                }
            }
        }
    }
</script>

<style>
    .toast-enter-active, .toast-leave-active {
      transition: all .3s
    }
    .toast-enter, .toast-leave-active {
      opacity: 0;
      -webkit-transform: scale(0.2);
    }
    #toast {
        position: relative;
        z-index: 1000;
    }
</style>

<!-- 需要给该组件传输的数据

<toast ref="toast"></toast>

import toast from 'components/toast/toast'

components: {
    'toast': toast
}

showToast(){
  this.$refs.toast.show('测试','fail');
}, -->