// 当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './MockAjax'

// 三级联动的接口
// /api/product/getBaseCategoryList  get请求   无参数

export const reqCategoryList=()=>{
  // 发请求:axios发请求返回结果是Promise对象
  return requests({
    url:'/product/getBaseCategoryList',
    method:'get'
  })
}

// 获取banner(首页轮播图的接口)
export const reqGetBannerList = ()=>mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')

// 获取搜索模块数据 地址：/api/list  请求方式：post   参数：需要带参数
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象，否则会获取失败】
export const reqGetSearchInfo = (params)=>requests({
  url:'/list',
  method:'post',
  data:params
})

// 获取产品详情信息的接口    URL:/api/item/{ skuId }
export const reqGoodsInfo = (skuId)=>requests({
  url:`/item/${ skuId }`,
  method:'get', 
})

// 将产品添加到购物车中（获取更新某一个产品的个数）   URL:/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:"post"
  })

// 获取购物车列表数据接口    URL:/api/cart/cartList
export const reqCartList = ()=>requests({
  url:'/cart/cartList',
  method:'get'
})

// 删除购物车产品的接口    URL:/api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId)=>requests({
  url:`/cart/deleteCart/${skuId}`,
  method:'delete'
})
  
// 修改购物车商品选中状态的接口   URL：/api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({
  url:`/cart/checkCart/${skuId}/${isChecked}`,
  method:'get'
})

// 获取验证码    URL:/api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>requests({
  url:`/user/passport/sendCode/${phone}`,
  method:'get'
})

// 用户注册    URL:/api/user/passport/register
export const reqUserRegister = (data)=>requests({
  url:'/user/passport/register',
  method:'post',
  data:data
})

// 用户登录    URL:/api/user/passport/login
export const reqUserLogin =(data)=>requests({
  url:'/user/passport/login',
  data:data,
  method:'post'
})

// 登陆成功后展示用户信息【需要带着用户的token向服务器要用户信息】    URL:/api/user/passport/auth/getUserInfo
export const reqUserInfo =()=>requests({
  url:'/user/passport/auth/getUserInfo',
  method:'get'
})

// 退出登录   URL:/api/user/passport/logout
export const reqLogout =()=>requests({
  url:'/user/passport/logout',
  method:'get'
})

// 获取用户地址信息     URL：/api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = ()=>requests({
  url:'/user/userAddress/auth/findUserAddressList',
  method:'get'
})

// 获取商品清单    URL:/api/order/auth/trade
export const reqOrderInfo = ()=>requests({
  url:'/order/auth/trade',
  method:'get'
})

// 提交订单的接口   URL：/api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>requests({
  url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data:data,
  method:'post'
})

// 获取支付信息    URL：/api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests({
  url:`/payment/weixin/createNative/${orderId}`,
  method:'get'
})

// 获取支付订单状态    URL:/api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId)=>requests({
  url:`/payment/weixin/queryPayStatus/${orderId}`,
  method:'get'
})

// 获取个人中心数据    URL:/api/order/auth/{page}/{limit}
export const reqMyOrderList =(page,limit)=>requests({
  url:`/order/auth/${page}/${limit}`,
  method:'get'
})
