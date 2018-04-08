// pages/carde/album/index.js
let _this
let setNoRefresh = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this
  },
  onShooting(e){
    let type = e.currentTarget.dataset.type
    //状态
    let status
    //图片的临时路径
    if (type == "shooting"){
      status = "camera"
      _this.onImage(1, status)
    }
    if (type == "photo"){
      status = "album "
      _this.onImage(5, status)
    }
    
   
  },
  onImage(count, status){
    setNoRefresh = true;
    wx.chooseImage({
      count: count,
      sourceType: [status],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths[0]
        _this.onUploadFile(tempFilePaths)
      },
    })
  },
  onUploadFile(tempFilePaths){
    wx.uploadFile({
      url: "https://deal.xiaovbao.cn/applet/album/upload",
      filePath: tempFilePaths,
      name: "exhibitor-linkmain-headimg-jiangchao",
      success: function (res){
        console.log(res)
        let data = JSON.parse(res.data)
        if (data.code == 0) {
          wx.showToast({
            title: '上传成功',
          })
          _this.setData({
            imageUrl: data.data.imgUrl
          })
        }
      }
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
    if (setNoRefresh) {
      setNoRefresh = false;
      return;
    }
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
  onBreak: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})