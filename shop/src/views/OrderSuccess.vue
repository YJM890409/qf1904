<template>
<div class="orderSuccess">

  <div class="container">
    <div class="page-title-normal">
      <!-- <h2 class="page-title-h2"><span>检查</span></h2> -->
    </div>
    <!-- 进度条 -->
    <div class="check-step">
        <ul>
          <li><span>确认</span> 地址</li>
          <li><span>确定</span> 订单</li>
          <li class="cur"><span>查看</span> 订单</li>
        </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="../../static/ok-2.png" alt=""></div>
      <div class="order-create-main">
        <h3>祝贺你! <br>你的订单创建成功!</h3>
        <p>
          <span>订单编号：{{orderInfo.order_no}}</span>
          <span>订单总价：{{orderInfo.total_price}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <a href="javascript:;" class="btn btn--m">返回购物车</a>
          </div>
          <div class="btn-r-wrap">
            <a href="javascript:;" class="btn btn--m">订单列表</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import '@/assets/css/base.css'
import '@/assets/css/checkout.css'

import axios from 'axios'

export default {
  //页面打开后请求
  created() {
    this.initData()
  },
  //声明模型
  data() {
    return {
      orderInfo: {},
    }
  },
  //声明普通方法
  methods: {
    //初始化数据
    initData() {
      let orderId = this.$route.params.id
      axios({
        url:"http://118.31.9.103/api/order/detail",
        method:"post",
        data:`userId=1&orderId=${orderId}`
      }).then(res => {
        //将接口数据保存到模型中
        this.orderInfo = res.data.data
      }).catch(error=>{
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
</style>