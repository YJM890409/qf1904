<template>
  <div class="GoodsList">
    <NavHeader></NavHeader>

    <NavBread></NavBread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" class="default cur">默认</a>
          <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':order}" @click="goodsOrder">
            价格
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short" />
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">过滤规则</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>价格:</dt>
              <dd>
              <a href="javascript:void(0)" v-bind:class="{'cur':maxprice=='all'}" @click="goodsWhere('all','all')">All</a>
              </dd>
              <dd>
              <a href="javascript:void(0)" v-bind:class="{'cur':maxprice==100}" @click="goodsWhere(0,100)">0 - 100</a>
              </dd>
              <dd>
              <a href="javascript:void(0)" v-bind:class="{'cur':maxprice==500}" @click="goodsWhere(100,500)">100 - 500</a>
              </dd>
              <dd>
              <a href="javascript:void(0)" v-bind:class="{'cur':maxprice==1000}" @click="goodsWhere(500,1000)">500 - 1000</a>
              </dd>
              <dd>
              <a href="javascript:void(0)" v-bind:class="{'cur':maxprice==2000}" @click="goodsWhere(1000,2000)">1000 - 2000</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(goods,index) in goodsList" v-bind:key="index">
                  <div class="pic"> 
                    <a href="#">
                      <img :src="goods.img2" alt="" />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{goods.title}}{{goods.id}}</div>
                    <div class="price">{{goods.price}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(goods.id)">加入购物车</a>
                    </div>
                  </div>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :isMdShow="testMdShow" @close="closeModal"></Modal>
    <!-- 加入购物车1 -->
    <Modal :isMdShow="isCartErrorShowFlag" @close="isCartErrorShowFlag = false">
        <template v-slot:main> 
            请先登录，否则无法加入到购物车中！
        </template>
        <template v-slot:btnGroup> 
            <a class="btn btn--m" href="javascript:;" @click="isCartErrorShowFlag = false" >关闭</a>
        </template>
    </Modal>

    <!-- 加入购物车2 -->
    <Modal :isMdShow="isCartOkShowFlag" @close="isCartOkShowFlag = false">
        <template v-slot:main> 
            <svg class="icon-status-ok">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
            </svg>
            <span>加入购物车成!</span>
        </template>
        <template v-slot:btnGroup> 
            <a class="btn btn--m" href="javascript:;" @click="isCartOkShowFlag = false">
            继续购物
            </a>
            <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">
            查看购物车
            </router-link>
        </template>
    </Modal>
    

    <!-- 创建2个按钮 -->
    <input type="button" value="加入购物车1" @click="isCartErrorShowFlag = true">
    <input type="button" value="加入购物车2" @click="isCartOkShowFlag = true">

    <NavFooter></NavFooter> 
  </div>
</template>
<script>
// 导入CSS
import "@/assets/css/base.css"
import "@/assets/css/product.css"
// import "@/assets/css/header.css"

import NavHeader from "@/components/NavHeader"
import NavFooter from "@/components/NavFooter"
import NavBread from "@/components/NavBread"
import Modal from "@/components/Modal"

import axios from 'axios'
// 导入组件
export default {
  data(){
    return{
      isCartOkShowFlag:false,
      isCartErrorShowFlag:false,
      testMdShow:false,
      //商品接口参数
      minprice:'all',
      maxprice:'all',
      order:false,
      pagenum:1,
      pagesize:8, 
      goodsList:[]//商品数据
    }
  },
  created(){
      this.initData()
    },
  //声明普通方法    
  methods:{
      //加入购物车
      addCart(goodsId){
          axios({
          method: 'post',
          url:"http://118.31.9.103//api/cart/create",
          data:`userId=1&goodsId=${goodsId}`
          // headers: 请求数据
        })
        .then(res=> { 
          if(res.data.meta.state==201){
              this.isCartOkShowFlag=true
          } else(res.data.meta.msg)
         
        })
        .catch(error => {
          //请求失败处理
          console.log(error)
        })
      },
      //筛选
      goodsWhere(minprice,maxprice){
          this.maxprice = maxprice
          this.minprice = minprice
          this.initData()
      },
      //排序
      goodsOrder(){
          this.order = !this.order
          this.initData()
      },

      initData(){
        let order = this.order ? 'desc' : 'asc'
        axios({
          method: 'get',
          url: `http://118.31.9.103/api/goods/index?minprice=${this.minprice}&maxprice=${this.maxprice}&order=${order}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
          // data: 请求数据,
          // headers: 请求数据
        })
        .then(res=> { 
          //请求成功处理
          console.log(res.data.data)
          this.goodsList=res.data.data
        })
        .catch(error => {
          //请求失败处理
          console.log(error)
        })
      },
      closeModal(){
          this.testMdShow = false 
      }
  },

  components: {
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  }
}; 
</script>
<style scoped>
</style>