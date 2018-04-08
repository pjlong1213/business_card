// pages/carde/index.js
let app = getApp()
let $ = getApp().$
let _this
let tool = $.tool

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow : true,
    cardes : [],
    isunfold : true,
    isMore : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
    _this.onselect()
  },
  onselect(){
    let userInfo = wx.getStorageSync("userInfo")
    let data = {
      tenantId: userInfo.TenantId,
      userId : userInfo.UserId,
      params : {
        condition : {
        }
      }
    }
    $.request.contact().get(data).then(res=>{
      if(res.resCode == 0){
        let result = res.result
        console.log(result)
        let cardes 
        if (result.length>0){
          cardes = result
          for (let c of cardes){
            if (tool.isArray(c.Company)){
              c.isArray = true
            }else{
              
              c.isArray = false
      
            }
          }
        }
        _this.setData({
          result: result,
          cardes: [cardes[0]]
        })
        
      }
    })


  },
  selectAlbum(){
    wx.navigateTo({
      url: '/pages/carde/album/index',
    })
  },
  selectTrade() {
    wx.navigateTo({
      url: '/pages/carde/trade/trade',
    })
  },
  getPhoneNumber: function (e) {
    
  } ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  onFilterInput: function () {
    console.log("1111111111111111")
    wx.navigateTo({
      url: '/pages/carde/serch/index',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    console.log(111)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     
  },
  onMore(){
    let results  = this.data.result
    let result = [results[0]]
    console.log(this.data.isMore)
    if (this.data.isMore){

      console.log("222")
      this.setData({
        cardes: results
      })
    }
    else{
      console.log("111")
      this.setData({
        cardes: result
      })
    }
    
    this.setData({
      isMore: !this.data.isMore
    })
    
  },
  onPageScroll(e){
    // console.log(e)
    let scroll = e.scrollTop
    if (scroll>10){
      _this.setData({
        isShow: false
      })
    }else{
      _this.setData({
        isShow: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})