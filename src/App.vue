<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" :seller="seller">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from 'components/header/header'
import toast from 'components/toast/toast'
import actionSheet from 'components/actionSheet/actionSheet'
import modal from 'components/modal/modal'

const ERR_OK = 0;

export default {
  name: 'app',
  data() {
    return {
      seller: {},
      listItem: ['下拉菜单1', '下拉菜单2', '下拉菜单3']
    }
  },
  methods:{
    showToast(){
      // this.$refs.toast.show('测试','fail');
      // this.$refs.actionSheet.show();
      // this.$refs.modal.show('模态框','我是薛钧',true,'前往主页','离开');
      this.$refs.modal.show('模态框','我是薛钧',false,'知道了');
    },
    getIndex(index) {
      console.log(index);
      /*
      * 此处写成功后的回调
      */
    },
    confirm() {
      console.log('用户点击确定按钮');
    }
  },
  created() {
    this.$http.get('/api/seller').then( res => {
      if (res.body.errno === ERR_OK) {
        this.seller = res.body.data;
        console.log(this.seller)
      }
    });
  },
  components: {
    'v-header': header,
    'toast': toast,
    'actionSheet': actionSheet,
    'modal': modal
  }
}
</script>

<style lang="stylus">
  @import 'common/css/mixin.styl'
  
  #app
    .tab
      position: relative
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      &.border-1px
        border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        a
        display: block
        font-size: 14px
        color: rgb(77,85,93)
        &:hover
          color: rgb(240,20,20)
          
</style>
