import Vue from 'vue'
import App from './App.vue'
// 三级联动组件
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from '@/components/Pagination'
import { Button,Loading,MessageBox } from 'element-ui';
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// 注册全局组件
Vue.component(Button.name,Button)
// ElementUI注册组件的时候，还有一种写法：挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from './router'
// 引入仓库
import store from './store'

Vue.config.productionTip = false
// 引入MockServe.js----mock数据
import './mock/mockServe'
// 引入Swiper样式（因为上下两个轮播图样式是一样的，所以就在这引入）样式不用对外暴露，所以不需要import a from b
import 'swiper/css/swiper.css'
import {reqGetSearchInfo} from './api/index'
console.log(reqGetSearchInfo({}));

// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'
import atm from '@/assets/1.gif'
// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:atm
})


new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线$bus的配置
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  // 注册路由信息
  router,
  // 注册仓库:组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
