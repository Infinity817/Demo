import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
// 登录与注册的模块
const state = {
  code:'',
  token:localStorage.getItem('TOKEN'),
  userinfo:{}
}
const mutations = {
  GETCODE(state,code){
    state.code=code
  },
  USERLOGIN(state,token){
    state.token=token
  },
  GETUSERINFO(state,userinfo){
    state.userinfo = userinfo
  },
  // 清楚本地存储的token
  USERLOGOUT(state){
    state.token='';
    state.userinfo={};
    localStorage.removeItem('TOKEN')
  }
}
const actions = {
  // 获取验证码
  async getCode({commit},phone){
    // 获取验证码的这个接口，把验证码返回，但是正常情况，后台会把验证码发到用户手机上
    let result  = await reqGetCode(phone)
    // console.log(result);
    if(result.code==200){
      commit('GETCODE',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({commit},user){
    let result = await reqUserRegister(user)
    // console.log(result);
    if(result.code==200){
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户登录
  async userLogin({commit},data){
    let result = await reqUserLogin(data)
    // console.log(result);
    // 服务器下发的token，是用户的唯一标识
    // 以后会经常通过带token找服务器要用户的信息进行展示
    if(result.code==200){
      commit('USERLOGIN',result.data.token)
      // 持久化存储token
      localStorage.setItem('TOKEN',result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('登录失败'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}){
    let result = await reqUserInfo()
    // console.log(result);
    if(result.code==200){
      commit('GETUSERINFO',result.data);
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({commit}){
    // 只是向服务器发请求，通知服务器清楚后端的token（本地的要自己清）
    let result = await reqLogout();
    if(result.code==200){
      commit('USERLOGOUT')
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}
export default{
  state,
  mutations,
  actions,
  getters
}