<template>
  <div class="pagination">
    <button :disabled='pageNo==1' @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="StartNumAndEnd.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="StartNumAndEnd.start>2">···</button>
    
    <!-- 中间部分 -->
    <button v-for="(page,index) in StartNumAndEnd.end" :key="index" v-show="page>=StartNumAndEnd.start" @click="$emit('getPageNo',page)" :class="{active:page==pageNo}">{{page}}</button>
    
    
    <button v-if="StartNumAndEnd.end<totalPage-1">···</button>
    <button v-if="StartNumAndEnd.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled='pageNo==totalPage' @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    // 计算属性
    computed:{
      // 算出总共有多少页(向上取整)
      totalPage(){
        return Math.ceil(this.total/this.pageSize)
      },
      // 计算出连续页码的起始数字与结束数字
      StartNumAndEnd(){
        // 先定义两个变量，存储起始数字和结束数字
        let start = 0
        let end = 0
        // 连续页码数字5【就是至少有5页】，如果出现不正常的现象【就是不够五页】
        // 不正常现象【总页数还没有连续页码多】
        if(this.continues>this.totalPage){
             start = 1
             end = this.totalPage
        }else{
          // 正常现象【连续页码为5，而且总页数是大于5的】
            //  起始数字
             start = this.pageNo-parseInt(this.continues/2)
            //  结束数字
            end = this.pageNo+parseInt(this.continues/2)
            // 把出现不正常的现象【start数字出现0|负数纠正】
            if(start<1){
              start = 1
              end = this.continues
            }
            // 把出现不正常的现象【end数字大于总页码 纠正】
            if(end>this.totalPage){
              end = this.totalPage
              start = this.totalPage-this.continues+1
            }
        }
        return {start,end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
    background-color: skyblue;
  }
</style>
