// pages/carde/index.js
let app = getApp()
let $ = getApp().$
let _this

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow : true,
    cardes : []
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
        _this.setData({
          cardes: result
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
    console.log(e.detail)
    console.log(e.detail)
    console.log(e.detail)
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
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})