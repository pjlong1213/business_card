
let template = {};

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
    // cardedata: { name:"姓名"; company:"公司/单位";branch:"部门/职务";phone:"手机";mailbox:"邮箱";mob:"电话";address:"地址";WeChat:"微信"};
    // morecardedata: { other: "其它"; phone: "手机"; mailbox: "邮箱"; mob: "电话"; address: "地址"; urlpath:"网址"; faxes: "传真" };

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
  onchangeSize(e){
    let profilesize = e.detail.cursor;
    this.setData({
      profilesize
    })
  },
})