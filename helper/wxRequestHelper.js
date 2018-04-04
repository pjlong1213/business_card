import Http from './HttpResource';

/**
 * 构建请求
 *
 * @param {any} controller_Name 控制器名称 /users/:id
 * @param {any} paramDefaults 默认参数
 * @param {any} actions 添加请求方法
 * @param {any} options 可选配置
 * @returns
 */
let _structure = (controller_Name, paramDefaults, actions, options) => {
  let http = new Http(controller_Name, paramDefaults, actions, options);
  return http;
}

let _getOpenId = (cell) => {

  let openId = wx.getStorageSync('openId');
  console.log(userInfo)
  // let exInfo = wx.getStorageSync('exInfo');
  // console.log(exInfo)
  console.log(typeof cell == 'function')
  if (openId  && typeof cell == 'function') {
    cell(openId)
    return true;
  } else {
    wx.removeStorage({ key: 'openId' })
  }
}

class wxRequestHelper {
  constructor() {}
  /**
   * 查询联系人
   */
  contact(){
    var http = _structure("/data/insert/Contact")
    return{
      post : (data)=>{
        
        return http.post(data)
      }
    }
  }
  /**
   * 注册观众基本信息
   */
  Visitor() {
    var http = _structure("/data/VisitorReg")
    var httpInfo = _structure("/data/insert/Visitor")
    return{
      post : (data)=>{

        return http.post(data)
      },
      postInfo: (data)=>{
        return httpInfo.post(data)
      }

    }

  }


}

export default wxRequestHelper