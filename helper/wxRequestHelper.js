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
  contact(){
    var http = _structure("/data/queryList/Contact")
    return{
      get : ()=>{
        if(_getOpenId((openId)=>{
          
        })){

        }
        return http.post(data)
      }
    }
  }
}

export default wxRequestHelper