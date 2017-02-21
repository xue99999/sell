<template>
    <div class="modal" :class="isShow ? 'show' : 'hide'">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
            <div class="weui-dialog__bd">{{content}}</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" v-show="isCancelShow"  @click="hide">{{cancelText}}</a>
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="confirm">{{confirmText}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '提示',
                content: '这是一个模态弹窗',
                isCancelShow: false,
                isShow: false,
                confirmText: '确定',
                cancelText: '取消'
            }
        },
        methods: {
            show(title, content, isCancelShow, confirmText, cancelText) {
                this.title = title || '提示';
                this.content = content || '这是一个模态弹窗';
                this.isCancelShow = isCancelShow === false ? false : true;
                this.confirmText = confirmText || '确定';
                this.cancelText = cancelText || '取消';
                this.isShow = true;
            },
            hide() {
                this.isShow = false;
            },
            confirm() {
                this.hide();
                this.$emit('confirm');
            }
        }
    }
</script>

<style>
    
</style>

<!-- 需要给本组件里面传输的数据
<modal ref="modal" v-on:confirm="confirm"></modal>

this.$refs.modal.show('模态框','我是薛钧',true,'前往主页','离开');

this.$refs.modal.show('模态框','我是薛钧',false,'知道了');

confirm() {
  console.log('用户点击确定按钮');
  这里写回调
}

components: {
    'modal': modal
} -->