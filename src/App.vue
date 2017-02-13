<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from 'components/header/header'
import goods from 'components/goods/goods'

export default {
  name: 'app',
  data() {
    return {
      seller: '21323'
    }
  },
  components: {
    'v-header': header,
    goods
  },
  created() {
    this.$http.get('/api/seller').then( res => {
      res = res.body;
      if (res.errno === 0) {
        this.seller = res.data;
      }
    })
  }
}
</script>

<style>
.tab{
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.tab:after {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(7,17,27,0.1);
}
.tab .tab-item {
  flex: 1;
  text-align: center;
}
.tab .tab-item a {
  display: block;
  font-size: 14px;
  color: rgb(77,85,93);
}
.tab .tab-item a:hover {
  color: rgb(240,20,20);
}
</style>
