<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler(newValue, oldValue) {
        // 如果执行handleer方法，则代表组件实例身上这个属性的值已经有了变化
        // 当前这个函数执行：只能保证bannerList的数据已经变化了，但是不能保证v-for遍历结束了（v-for遍历也是要时间的）
        // 只有当v-for执行完毕才会有完整的结构，但是现在在watch中无法保证
        // $this.$nextTick(()=>{}) 是在修改数据之后，循环结束（v-if)之后再执行延迟回调.可以保证页面中的结构一定是有的
        this.$nextTick(() => {
          //   当执行这个回调的时候，保证服务器的数据回来了，v-for执行完毕了【轮播图的结构一定有了】
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            //   如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小球的时候也可以切换
              clickable: true,
            },
            //   如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>