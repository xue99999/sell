<template>
    <div class="actionSheet" :class="isShow ? 'show' : 'hide'">
        <div class="weui-mask" id="iosMask" @click="hide"></div>
        <div class="weui-actionsheet weui-actionsheet_toggle">
            <div class="weui-actionsheet__menu">
                <div v-for="(item, index) in listItem" class="weui-actionsheet__cell" @click="itemtap(index)">{{item}}</div>
            </div>
            <div class="weui-actionsheet__action" @click="hide">
                <div class="weui-actionsheet__cell" >取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow: false
            }
        },
        props: ['listItem'],
        methods: {
            // 阴影层不可以滚动下面的列表页,
            // 没有阻止该事件
            show() {
                this.isShow = true;
            },
            hide() {
                this.isShow = false;
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
    .hide {
        opacity:0; display: none;
    }
    .show {
        opacity:1; display: block;
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