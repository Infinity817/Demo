<template>
    <div class="type-nav">
      <div class="container">
          <!-- 事件委派|事件代理 -->
          <div @mouseleave="removeIndex" @mouseenter="enterShow">
            <h2 class="all">全部商品分类</h2>
            <!-- 三级联动 -->
            <!-- 过渡动画 -->
            <transition name="sort">
             <div class="sort" v-show="show">
            <!-- 利用事件的委派+编程式导航实现路由的跳转与传递参数 -->
              <div class="all-sort-list2" @click="goSearch">
                  <div class="item bo" v-for="(c1,index) in categoryList.slice(0,16)" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                      <h3 @mouseenter="changeIndex(index)">
                          <a :data-categoryName='c1.categoryName' :data-category1Id='c1.categoryId'>{{c1.categoryName}}</a>
                      </h3>
                      <!-- 二级、三级分类 -->
                      <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                          <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                              <dl class="fore">
                                  <dt>
                                      <a :data-categoryName='c2.categoryName' :data-category2Id='c2.categoryId'>{{c2.categoryName}}</a>
                                  </dt>
                                  <dd>
                                      <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                          <a :data-categoryName='c1.categoryName' :data-category3Id='c3.categoryId'>{{c3.categoryName}}</a>
                                      </em>
                                  </dd>
                              </dl>
                          </div>
                      </div>
                  </div>
              </div>
             </div>
            </transition>
          </div>
          <nav class="nav">
              <a href="###">服装城</a>
              <a href="###">美妆馆</a>
              <a href="###">尚品汇超市</a>
              <a href="###">全球购</a>
              <a href="###">闪购</a>
              <a href="###">团购</a>
              <a href="###">有趣</a>
              <a href="###">秒杀</a>
          </nav>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
// 引入方式：是把lodash全部功能函数引入
// 最好的引入方式:按需加载
import throttle from 'lodash/throttle'

export default {
  name:'TypeNav',
  data() {
    return {
        currentIndex:-1,
        show:true
    }
  },
//   组件挂载完毕:可以向服务器发请求
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
    // 当组件挂载完毕，让show属性变为false
    // 如果不是home路由组件，将TypeNav进行隐藏
    if(this.$route.path!='/home'){this.show=false}
  },
  computed:{
    ...mapState({
        // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
        // 注入一个参数state，其实就是大仓库的数据
        categoryList:(state)=>{
            return state.home.categoryList
        }
    })
  },
  methods: {
    // // 鼠标进入时修改响应式数据currentIndex属性
    // changeIndex(index){
    // // index：鼠标移上某一个一级分类的元素的索引值
    //   this.currentIndex=index
    // },
    changeIndex:throttle(function(index){
        this.currentIndex=index
    },50),
    // 一级分类鼠标移出的事件回调
    removeIndex(){
      this.currentIndex=-1;
      if(this.$route.path!='/home'){this.show=false}
    },
    // 进行路由跳转的方法
    goSearch(e){
        // 最好的解决方案：编程式导航+事件委派
        // this.$router.push('/search')     但是这样做有问题，只有点击a标签的时候才跳转，并且还要传参。况且第二个问题，如何区分点击的是一级二级还是三级的标签
        
        // 第一个问题：把子节点当中的a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
        let element = e.target
        // 可以获取到当前触发这个事件的节点【h3,a,dt,dl】,需要的是带有data-categoryName这样节点【一定是a标签】
        // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
        let {categoryname,category1id,category2id,category3id} = element.dataset
        // 如果标签身上有categoryname，那么一定是a标签
        if(categoryname){
            // 整理路由跳转的参数
            let location ={name:'search'}
            let query ={categoryName:categoryname}
            // 一级分类、二级分类、三级分类的a标签
            if(category1id){
              query.category1Id=category1id
            }else if(category2id){
              query.category2Id=category2id
            }else{
              query.category3Id=category3id
            }
            // 判断：如果路由跳转的时候带有params参数，也要捎带一脚给它传递过去
            if(this.$route.params){
                location.params=this.$route.params
                // 整理参数
                location.query=query
                // 路由跳转
                this.$router.push(location)
            }
        }
    },
    // 当鼠标移入的时候,让商品分类列表进行展示
    enterShow(){
        this.show=true
    }
  },
}
</script>

<style scoped lang='less'>
   .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .cur{
                        background-color: skyblue;
                    }
                }
            }
            // 过渡动画的样式
            // 过渡动画开始状态
            .sort-enter{
                height: 0px;
            }
            // 过渡动画结束状态
            .sort-enter-to{
                height: 461px;
            }
            // 定义动画时间.速率
            .sort-enter-active{
                transition:all .5s linear
            }
        }
    }
</style>