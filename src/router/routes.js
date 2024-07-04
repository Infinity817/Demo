// 引入一级路由组件
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

// 路由懒加载（以home为例)
// const foo = ()=>{
//   return import ('@/pages/Home')
// }

// 当打包构建应用时，JavaScript包会变得非常大，影响页面加载
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应组件，这样就更高效了
// 路由配置信息
export default [
  {
    path:'/center',
    component:Center,
    meta:{show:true},
    // 二级路由组件
    children:[
      {
        path:'myorder',
        component:myOrder
      },
      {
        path:'grouporder',
        component:groupOrder
      },
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  },
  {
    path:'/paysuccess',
    component:PaySuccess,
    meta:{show:true}
  },
  {
    path:'/pay',
    component:Pay,
    meta:{show:true},
    beforeEnter: (to, from, next) => {
      if(from.path=='/trade'){next()}else{
        next(false)
      }
    }
  },
  {
    path:'/trade',
    component:Trade,
    meta:{show:true},
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车来的
      if(from.path=='/shopcart'){next()}else{
        // 其他的路由组件过来，返回原地
        next(false)
      }
    }
  },
  {
    path:'/shopcart',
    component:ShopCart,
    meta:{show:true}
  },
  {
    name:'addcartsuccess',
    path:'/addcartsuccess',
    component:AddCartSuccess,
    meta:{show:true}
  },
  {
    path:'/detail/:skuid',
    component:Detail,
    meta:{show:true}
  },
  {
    path:'/home',
    component:()=>import ('@/pages/Home'),
    meta:{show:true}
  },
  {
    path:'/search/:keyword?',
    component:Search,
    meta:{show:true},
    name:'search',
    // props:true          布尔值写法
    // props:{a:1,b:2}     对象写法——额外的给路由传递一些props参数
    // 函数写法（常用）
    // props:($route)=>{
    //   return {
    //     keyword:$route.params.keyword,
    //     k:$route.query.k
    //   }
    // }
  },
  {
    path:'/login',
    component:Login,
    meta:{show:false}
  },
  {
    path:'/register',
    component:Register,
    meta:{show:false}
  },
  // 重定向：在项目跑起来的时候，立马让他定向到首页（打开就自动跳转到首页）
  {
    path:'*',
    redirect:'/home'
  }
]