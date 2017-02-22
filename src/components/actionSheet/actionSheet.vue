<template>
    <transition name="fade">
        <div id="actionSheet" v-show="isShow">
            <div class="weui-mask" @click="hide"></div>
            <transition enter-class="actionSheet-enter" enter-active-class="actionSheet-enter-active" leave-active-class="actionSheet-leave-active">
                <div class="weui-actionsheet weui-actionsheet_toggle" v-show="showAnimate">
                    <div class="weui-actionsheet__menu">
                        <div v-for="(item, index) in listItem" class="weui-actionsheet__cell" @click="itemtap(index)">{{item}}</div>
                    </div>
                    <div class="weui-actionsheet__action" @click="hide">
                        <div class="weui-actionsheet__cell" >取消</div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                isShow: false,
                showAnimate:false
            }
        },
        props: ['listItem'],
        methods: {
            // 阴影层不可以滚动下面的列表页,
            // 没有阻止该事件
            show() {
                this.isShow = true;
                this.showAnimate = true;
            },
            hide() {
                this.showAnimate = false;
                setTimeout(()=>{
                    this.isShow = false;
                },280);
            },
            itemtap(index){
                this.$emit('getIndex', index);
                this.hide();
                return index;
                /*
                *该方法只返回index
                */
            }
        }
    }
</script>

<style>
    #actionSheet {
        position: relative;
        z-index: 1000;
    }
    .actionSheet-enter-active, .actionSheet-leave-active {
      transition: all .3s;
    }
    .actionSheet-enter, .actionSheet-leave-active {
      -webkit-transform: translate3d(0,100%,0) !important;
    }
    .fade-enter-active, .fade-leave-active {
      transition: all .3s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
    }
</style>

<!-- 需要给本组件传输的数据

<action-sheet ref="actionSheet" :listItem="listItem" v-on:getIndex="getIndex"></action-sheet>

import actionSheet from 'components/actionSheet/actionSheet'

components: {
    'actionSheet': actionSheet
}

data() {
    return {
      listItem: ['实例', '实例', '实例']
    }
},

showToast(){
  this.$refs.actionSheet.show();
},
这个方法在

getIndex(index) {
  console.log(index); 此处写成功后的回调
} -->