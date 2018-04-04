const app = getApp()
const $ = getApp().$

let template = {};
let _this
let setNoRefresh = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    companyname: null,
    job: null,
    phone: null,
    email: null,
    add: null,
    tel: null,
    wechat: null,
    Introduction: null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    
    _this = this
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
  inputMessage(e){
    console.log(e)
    let type = e.currentTarget.dataset.type
    let value = e.detail.value
    if (type == "name"){
      _this.setData({
        name: value
      })
    }
    if (type == "companyname"){
      _this.setData({
        companyname: value
      })
    }
    if (type == "job") {
      _this.setData({
        job: value
      })
    }
    if (type == "phone") {
      _this.setData({
        phone: value
      })
    }
    if (type == "email") {
      _this.setData({
        email: value
      })
    }
    if (type == "add") {
      _this.setData({
        add: value
      })
    }
    if (type == "tel") {
      _this.setData({
        tel: value
      })
    }
    if (type == "wechat") {
      _this.setData({
        wechat: value
      })
    }
    if (type == "Introduction") {
      _this.setData({
        Introduction: value
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  onSubmit(){
    let name = _this.data.name
    let companyname = _this.data.companyname
    let job = _this.data.job
    let phone = _this.data.phone
    let email = _this.data.email
    let add = _this.data.add
    let tel = _this.data.tel
    let wechat = _this.data.wechat
    let Introduction = _this.data.Introduction
    console.log(name)
    console.log(companyname)
    console.log(job)

    if (name == null || companyname == null || job == null){

      wx.showModal({
        title: '非空判断',
        content: '必填字段不能为空',
      })
      return
    }
    let userInfo = wx.getStorageSync("userInfo") == null ? null : wx.getStorageSync("userInfo")
    if (userInfo == null){
      let data = {
        params: {
          record: {
            CompanyName: companyname,
            UserName: phone == null ? "" : phone,
            UserPassword: "888888",
            Name: name,
            Type: "4",
            ExhibitionId: "5ab22555d8d2b4783bfb7337"
          }
        }
      }
      $.request.Visitor().post(data).then(res => {
        if (res.resCode == 0) {
          let result = res.result
          wx.setStorageSync("userInfo", result)
          let openId = wx.getStorageSync("openId")
          let dateInfo = {
            tenantId: result.TenantId,
            userId: result.UserId,
            params: {
              record: {
                AccountId: userInfo.UserId,
                ExhibitionId: "5ab22555d8d2b4783bfb7337",
                Name: name,
                CompanyName: companyname,
                CompNameEn: "",
                Job: job == null ? "" : job,
                Mob: phone,
                CardPath: _this.data.image == null ? "" : _this.data.image,
                CompAddr: add == null ? "" : add
              }
            }
          }
          $.request.Visitor().postInfo(dateInfo).then(ress=>{
            if(ress.resCode == 0){
              wx.navigateBack({
                delta :-1
              })
            }
          })
        }
      })
    }else{
      
      let openId = wx.getStorageSync("openId")
      let dateInfo = {
        tenantId: userInfo.TenantId,
        userId: userInfo.UserId,
        params: {
          record: {
            AccountId: userInfo.UserId,
            ExhibitionId: "5ab22555d8d2b4783bfb7337",
            Name: name,
            CompanyName: companyname,
            CompNameEn: "",
            Job: job == null ? "" : job,
            Mob: phone,
            CardPath: _this.data.image == null ? "" : _this.data.image,
            CompAddr: add == null ? "" : add
          }
        }
      }
      $.request.Visitor().postInfo(dateInfo).then(ress => {
        if (ress.resCode == 0) {
          let dataContact = {
            tenantId: userInfo.TenantId,
            userId: userInfo.UserId,
            params: {
              record: {
                Name: name,
                
              }
            }
          }
          $.request.contact().post(dateInfo).then(ress => {

          })
          wx.navigateBack({
            delta: -1
          })
        }
      })
    }
    

  },
  onCard(e){
    setNoRefresh = true;
    console.log(e)
    wx.chooseImage({
      count: 5,
      sourceType: ["camera","album"],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths[0]
        _this.onUploadFile(tempFilePaths)
      },
    })
  },
  onUploadFile(tempFilePaths) {
    wx.uploadFile({
      url: "https://deal.xiaovbao.cn/applet/album/upload",
      filePath: tempFilePaths,
      name: "exhibitor-linkmain-headimg-jiangchao",
      success: function (res) {
        let data = JSON.parse(res.data)
        if (data.code == 0) {
          wx.showToast({
            title: '上传成功',
          })
          _this.setData({
            image: data.data.imgUrl
          })
        }
      }
    })
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
  // formSubmit: function (e) {
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  // },
  onchangeSize(e){
    let profilesize = e.detail.cursor;
    this.setData({
      profilesize
    })
  },
})