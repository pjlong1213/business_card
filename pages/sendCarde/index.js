// pages/sendCarde/index.js
let pageIndex = 0;
let cardList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    cardList = [{ name: "潘九龙", company: "南京腾宣威", branch: "开发部" }, { name: "潘九龙", company: "南京腾宣威", branch: "开发部" }]
      this.setData({
        pageIndex,
        cardList
      })
  },

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
  
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },
  changpageback: function() {

    this.setData({
      pageIndex: ++this.data.pageIndex
    })
  },
  changpageforward: function() {

    this.setData({
      pageIndex: --this.data.pageIndex
    })
  },
  tuijian() {
    let date = {
      from: "button",
      target: "button"
    }
    this.onShareAppMessage(date)
  },
  onsave() {
    wx.showModal({
      title: '提示',
      content: '您可以将生成的名片图片，保存至手机相册，以便发送至微信朋友圈或微信聊天群。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  showview: function () {
    this.setData({
      display: "block"
    })
  },
  hideview: function () {
    this.setData({
      display: "none"
    })
  },
  ondelete (){
    console.log("删除")
  }
})