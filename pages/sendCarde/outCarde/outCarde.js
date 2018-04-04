
let template = {};
let disabled = false;
let backgroundimage = "/assets/image/cardes/card-0.png";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options){
    let cardedata = [{ key: "手机", vlaue: "phone" }, { key: "邮箱", vlaue: "mailbox" }, { key: "电话", vlaue: "mob" },
                     { key: "地址", vlaue: "address" }, { key: "微信", vlaue: "WeChat" }];

    let morecardedata = [{ key: "其它", vlaue: "other" }, { key: "手机", vlaue: "phone" }, { key: "邮箱", vlaue: "mailbox" },
                        { key: "电话", vlaue: "mob" }, { key: "地址", vlaue: "address" }, { key: "网址", vlaue: "urlpath" },
                        { key: "传真", vlaue: "faxes" }]


    let imageUrl = ["/assets/image/cardes/card-0.png", "/assets/image/cardes/card-1.png", 
                    "/assets/image/cardes/card-2.png", "/assets/image/cardes/card-3.png", 
                    "/assets/image/cardes/card-4.png","/assets/image/cardes/card-5.png"]

    this.setData({
      imageUrl,
      backgroundimage,
      cardedata,
      morecardedata,
      disabled
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
  /**
   * 返回
   */
  onback(){
    wx.navigateBack({
      delta: 1
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  onShooting(e){
    //状态
    let status
    //图片的临时路径
      status = "album "
      _this.onImage(5, status)
  },

  onchangeSize(e){
    let profilesize = e.detail.cursor;
    this.setData({
      profilesize
    })
  },
  onChangeimage(e){
    console.log(e);
    backgroundimage = e.currentTarget.dataset.value;
    this.setData({ backgroundimage})
  },
  addmessage(){
    disabled = !this.data.disabled;
    this.setData({ disabled })
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  },
})