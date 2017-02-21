<template>
<transition name="fade">
    <div id="toast" :class="isShow ? 'show' : 'hide'">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon_toast" style="font-size:55px;color:#fff;" :class="toastClass"></i>
            <p class="weui-toast__content">{{title}}</p>
        </div>
    </div>
</transition>
</template>

<script>
    export default {
        data(){
            return {
                isShow: false,
                title: '已完成',
                icon: 'success'
            }
        },
        methods: {
            show(title, icon, dur) {
                this.isShow = true;
                this.title = title || '已完成';
                this.icon = icon;
                dur = dur || 2000;
                setTimeout(() => {
                    this.hide();
                }, dur);
                
            },
            hide() {
                this.isShow = false;
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
    .hide {
        opacity:0; display: none;
    }
    .show {
        opacity:1; display: block;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s ease;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
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