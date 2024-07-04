// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push和replace方法(声明式导航没有这个问题)
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数；失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call和apply的区别
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call和apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

// 配置路由
let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 返回的这个y=0代表的是滚动条在最上方
    return { y: 0 }
  }
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  //  to:可以获取到你要跳转到哪个路由信息
  // from:可以获取到从哪个路由来的信息
  // next:放行函数
  let token = store.state.loginRegister.token
  let name = store.state.loginRegister.userinfo.name
  if (token) {
    if(to.path=='/login'){
      next('/')
    }else{
      if(name){
        next()
      }else{
        try {
           // 获取用户信息在首页展示
           await store.dispatch('getUserInfo')
           next()
        } catch (error) {
          // token失效了
          // 清楚token,获取不到用户信息，重新登录
          await store.dispatch('userLogout')
          next('/login')
        }
      }
      console.log(store);
      next()
    }
  } else {
    // 未登录：不能去交易相关的，不能去支付相关的【pay|paysuccess】,不能去个人中心
    let toPath = to.path
    if(toPath=='/trade'||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
      next('/login?redirect='+toPath)
    }else{
      next()
    }
  }
})

export default router