const app = getApp()
const $ = getApp().$;

let template = {};
let disabled = false;
let backgroundimage = "/assets/image/cardes/card-0.png";
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
    phone: [{ label: "手机" }],
    email: [{ label: "邮箱" }],
    add: [{ label: "地址" }],
    tel: [{ label: "电话" }],
    wechat: null,
    Introduction: null,
    urlpath:[],
    faxes: [],
    other: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options){
    let more = ["其它", "手机", "邮箱", "电话", "地址", "网址", "传真"];
    let imageUrl = ["/assets/image/cardes/card-0.png", "/assets/image/cardes/card-1.png", 
                    "/assets/image/cardes/card-2.png", "/assets/image/cardes/card-3.png", 
                    "/assets/image/cardes/card-4.png","/assets/image/cardes/card-5.png"]

    this.setData({
      imageUrl,
      backgroundimage,
      more,
      disabled,
    })
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
    let dataContact = {
      tenantId: userInfo.TenantId,
      userId: userInfo.UserId,
      params: {
        record: {
          Name: name,
          Address: add == null ? "" : add,
          Tel: tel,
          Phone: phone,
          Email: email,
          Job: job,
          Department : "",
          Company: companyname,
          Image: _this.data.image == null ? "" : _this.data.image,
          "HaveCalled": false,
          "HaveSendMsg": false,
          "HaveSendEmail": false,
          "ExhibitionId": "5ab22555d8d2b4783bfb7337"
        }
      }
    }
    if (userInfo == null){
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
          _this.onContact(dataContact)
          
        }
      })
    }else{
      console.log(dataContact)
      // _this.onContact(dataContact)
      
    }
    

  },
  onContact(dataContact){
    $.request.contact().post(dataContact).then(ress => {
      wx.navigateBack({
        delta: -1
      })
    })
  },
  onCard(e){
    setNoRefresh = true;
    console.log(e)
    wx.chooseImage({
      count: 9,
      sourceType: ["camera","album"],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        for (let i of tempFilePaths){
          _this.onUploadFile(i);
        }
      },
    })
  },
  onUploadFile(tempFilePaths) {
    wx.uploadFile({
      url: "https://deal.xiaovbao.cn/applet/album/upload",
      filePath: tempFilePaths,
      name: "exhibitor-linkmain-headimg-jiangchao",
      success: function (res) {
        console.log(res.data);
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
    console.log(e);
    let index = e.detail.value;
    switch (index){
      case "0":
        let other = this.data.other
        other.push({label:"其它"})
        this.setData({ other });
      break;
      case "1":
        let phone = this.data.phone
        phone.push({ label: "手机" })
        this.setData({ phone });
      break;
      case "2":
        let email = this.data.email
        email.push({ label: "邮箱" })
        this.setData({ email });
      break;
      case "3":
        let tel = this.data.tel
        tel.push({ label: "电话" })
        this.setData({ tel });
      break;
      case "4":
        let add = this.data.add
        add.push({ label: "地址" })
        this.setData({ add });
      break;
      case "5":
        let urlpath = this.data.urlpath
        urlpath.push({ label: "网址" })
        this.setData({ urlpath });
      break;
      case "6":
        let faxes = this.data.faxes
        faxes.push({ label: "传真" })
        this.setData({ faxes });
      break;
    }

    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  },
})