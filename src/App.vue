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
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { urlParse } from 'common/js/util.js'
import header from 'components/header/header'
import toast from 'components/toast/toast'
import actionSheet from 'components/actionSheet/actionSheet'
import modal from 'components/modal/modal'

const ERR_OK = 0;

export default {
  name: 'app',
  data() {
    return {
      seller: {
        id: (() => {
            let query = urlParse();
            return query.id;
        })()
      },
      listItem: ['下拉菜单1', '下拉菜单2', '下拉菜单3']
    }
  },
  created() {
    this.$http.get('/api/seller?id='+this.seller.id).then( res => {
      if (res.body.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.body.data);
      }
    });
  },
  components: {
    'v-header': header
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
