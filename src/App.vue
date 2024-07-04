<template>
  <div>
    <Header/>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登录和注册时隐藏 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer>    可以实现，但是不推荐 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
// 引入
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components:{Header,Footer},
}
</script>

<style>

</style>
