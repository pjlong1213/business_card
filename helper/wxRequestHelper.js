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
/**
 * 获取缓存中的用户信息
 * userInfo.TenantId :展商;
 * exInfo.TenantId :主办;
 *
 * @returns
 */
let _getUserInfo = (cell) => {
  let userInfo = wx.getStorageSync('userInfo');
  let exInfo = wx.getStorageSync('exInfo');
  console.log(typeof cell == 'function')
  if (userInfo && cell && typeof cell == 'function') {

    cell(userInfo, exInfo)
    return true;
  } else {
    wx.removeStorage({ key: 'userInfo' });
    wx.reLaunch({ url: '/pages/login/index' })
  }
}

let _getToken = (cell) => {
  console.log(101010)
  let func = () => {
    let mob = wx.getStorageSync('PHONE_NUMBER');

    if (!mob) {
      wx.reLaunch({
        url: '/pages/login/index'
      });
    }
    _structure('/data/exhibitorLogin').post({ UserName: mob }).then(res => {
      if (res.resCode === 0) {
        wx.setStorageSync('userInfo', res.result);
        _getToken(cell);
      } else {
        wx.reLaunch({
          url: '/pages/login/index'
        });
      }
    });
  }
  let userInfo = wx.getStorageSync('userInfo');
  if (userInfo) {
    let expire = new Date('1970/1/1');
    expire.setSeconds(expire.getSeconds() + userInfo.ExpireTime);
    expire.setHours(expire.getHours() + 8);
    if (expire < new Date(new Date().toDateString())) {
      func();
    } else {
      typeof cell === 'function' && cell(userInfo.SignToken);
      return true;
    }
  } else {
    func();
  }

}


/**
 * 请求工厂
 *
 * @author TooClian
 * @class wxRequestHelper
 */
class wxRequestHelper {
  constructor() { }

  /**
   * 展商登录
   *
   * @returns
   * @memberof wxRequestHelper
   */
  exLogin() {
    var http = _structure('/data/userLogin');//v2
    return {
      /** 展商登录 */
      
      post: (userName,code) => {
        console.log(userName)
        return http.post({ params: { UserName: userName, UserPassword:code } })//v2
      },

      get: (userName, code)=>{
        let data = {
          params:{
            UserName: userName,
            UserPassword: code,
          }
        }
        return http.post(data)
      },
      /**
       * 
       */

      put: (token, extibitionId) => {
        let data = { token, extibitionId };
        return http.put(data);
      }
    };
  }
  
  /**
   * 获取展会信息（会展人接口-获取展会Id）
   *
   * @returns
   * @memberof wxRequestHelper
   */
  exInfo() {
    var http = _structure('/data/queryList/Exhibition');
    return {
      /**
       * 获取展会信息（会展人接口-获取展会Id）
       *
       * @param {any} userName 手机号码
       * @returns
       */
      post: (data) => {
        return http.post(data);
      }
    }
  }
  /**
   * 查询消息
   * 
   * 
   * 
   * 
   */
  MsgInfo() {
    // let http = _structure('/data/queryList/MsgInfo')
    let httpGet = _structure('/data/queryList/MsgInfo')
    // let httpDelete = _structure('/data/queryList/MsgInfo')
    let httpPut = _structure('/data/updateList/MsgInfo')
    let httpDelete = _structure('/data/delete/MsgInfo')
    let httpPost = _structure('/data/insert/MsgInfo')
    let httpArray = _structure('/data/queryArray/MsgInfo')
    return {
      post: (dataJson, page) => {
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          // data.tenantId = userInfo.TenantId;
          // data.userId = userInfo.UserId;
          data.params = {
            condition: {
              Receiver: userInfo.RecordId,
              ExhibitionId: exInfo.RecordId,
              Type: dataJson.type
            },
            options: {
              pageIndex: page.pageIndex,
              pageSize: page.pageSize
            }
          }
          console.log("date---------")
          console.log(data)
        })) {

          return http.post(data);
        }

      },
      get: (dataJson, page) => {
        let data = {}

        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {

          data.params = {
            condition: {

              ExhibitionId: exInfo.RecordId,
               ...dataJson
            },
            "properties": ["ExhibitorReceiver.Exhibitor.___all"],
            options: {
              pageIndex: page.pageIndex,
              pageSize: page.pageSize
            }
          }
        })) {
          console.log("查询消息")
          console.log(data)
          return httpGet.post(data);
        }
      },
      getById: (dataJson) => {
        let data = {}

        //获取用户Id/ExId
          data.params = {

            condition: {
              RecordId: dataJson.RecordId,
            }
            
          }
        
          
          return httpGet.post(data);
        
      },
      delete: (canshu) => {
        let data = {}
        data.params = {
          recordId: canshu.id
        }


        return httpDelete.post(data);

      },
      put: (dataJson) => {
        let data = {
          params: dataJson.updatearrayal
        }
        if (_getUserInfo((userInfo, exInfo) => {

        })) {
          console.log(data)
          return httpPut.post(data);
        }

      },
      insert: (dataJson) => {
        let data ={
          params:{
            record: dataJson
          }
        }
        if(_getUserInfo((userInfo,exInfo)=>{
          data.params.record.ExhibitionId = exInfo.RecordId;
          data.params.record.OrganizationSender = userInfo.OrganizationRecordId
        })){
          return httpPost.post(data)
        }
        
      },
      getByName:(dataJson)=>{
        
        return httpArray.post(dataJson)
      }
    }
  }

  /**
   * 查询消息数量
   * 
   */
  MsgInfoCount() {
    let http = _structure('/data/queryCount/MsgInfo')
    return {
      get: (countdate) => {
        console.log("00000000000000000000000000")
        console.log(countdate)
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.params = {
            condition: {
              ExhibitorReceiver: userInfo.RecordId,
              ExhibitionId: exInfo.RecordId,
              Type: countdate.type,
              State: countdate.State
            }
          }
        })) {
          return http.post(data);
        }

      },
    }
  }

  /**
  * 约请
  *
  * @returns
  * @memberof wxRequestHelper
  */
  matchVInfo() {
    //查询展商约请信息
    let http = _structure('/data/queryList/InvitationInfo');
    let httpPut = _structure('/data/update/InvitationInfo');
    let httpPutAll = _structure('/data/updateList/InvitationInfo');
    return {
      get: (page) => {
        console.log("888888888888")
      
        let data = {

          params: {

           
          }
        };

        data.params = { }
        data.params.condition = {}
        if (_getUserInfo((userInfo, exInfo) => {
            data.TenantId = userInfo.TenantId,
            data.UserId = userInfo.UserId;
            data.params.condition.OrganizationId=true;
            data.params.condition.State = "0";
            data.params.condition.ExhibitionId = exInfo.RecordId;
            data.params.options = page
        })) {
          return http.post(data);
        }

      },
      getAll: (dataJson,page) => {
        let data = {
          params: {
          }
        };
        data.params = {}
        data.params.condition = {}
        if (_getUserInfo((userInfo, exInfo) => {
          data.TenantId = userInfo.TenantId,
          data.UserId = userInfo.UserId;
          data.params.condition.OrganizationId = true;
          data.params.condition.State = dataJson.State;
          data.params.condition.ExhibitionId = exInfo.RecordId;
          data.params.options = page
        })) {
          return http.post(data);
        }

      },
     
      put: (dataJson) => {
        let data = {
          params: { ...dataJson }
        }
        return httpPut.post(data)
      },
      putAll: (dataJson) => {
        let data = {
          params: dataJson
        }
        return httpPutAll.post(data)
      },
      /**
       * 新增拉客约请
       *
       * @param {any} records { "ExhibitionId": "5a1d12f0fce99c7421e9b6b6","Type": "1","Initator": "5a1ce462fce99c7421e9b5c2","Receiver": "5a278dfc6d326a0415d8dfe8","State": "1" }
       * @returns
       */
      post: (records) => {

        console.log("约请确认")
        console.log(records)
        var data = {
          params: {
            record: { ...records }
          }
        };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;

          data.params.record.ExhibitionId = exInfo.RecordId;
          data.params.record.Initator = userInfo.RecordId;
          data.params.record.InitatorChild = userInfo.ContactRecordId;

        })) {
          return httppost.post(data);
        }
      },
      /**
       * 编辑约请
       *
       * @param {any} mId
       * @param {any} state
       * @returns
       */
      
      /**
       * 删除约请
       *
       * @param {any} mId
       */
      detele: (mId) => {
        var data = { mId };
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.joinId = userInfo.TenantId;
          data.userId = userInfo.UserId;
        })) {
          return http.detele(data);
        }
      }
    }

  }

  /**
   * 展商约请
   */
  InvitationInfoExhi() {
    let http = _structure('/data/queryList/InvitationInfoExhi');
    let httpPut = _structure('/data/update/InvitationInfoExhi');
    let httpPutAll = _structure('/data/updateList/InvitationInfoExhi');
    return {
      get: (page) => {

        let data = {

          params: {
          }
        };

        data.params = {}
        data.params.condition = {}
        if (_getUserInfo((userInfo, exInfo) => {
          data.TenantId = userInfo.TenantId,
            data.UserId = userInfo.UserId;
          data.params.condition.OrganizationId = true;
          data.params.condition.ExhibitionId = exInfo.RecordId;
          data.params.condition.State = "0";
          data.params.options = page
        })) {
          return http.post(data);
        }

      },
      getAll : (dataJson,page) => {

        let data = {

          params: {
          }
        };

        data.params = {}
        data.params.condition = {}
        if (_getUserInfo((userInfo, exInfo) => {
          data.TenantId = userInfo.TenantId,
            data.UserId = userInfo.UserId;
          data.params.condition.OrganizationId = true;
          data.params.condition.ExhibitionId = exInfo.RecordId;
          data.params.condition.State = dataJson.State;
          data.params.options = page
        })) {
          return http.post(data);
        }

      },
      
      put: (dataJson) => {
        let data = {
          params: { ...dataJson}
        }
        return httpPut.post(data)
      },
      putAll:(dataJson) =>{
        let data = {
          params: dataJson
        }
        return httpPutAll.post(data)
      }
      
    }

  }

  /**
   * 查询约请数量
   */
  inviteCount() {
    let http = _structure('/data/queryList/MsgInfo')
    return {
      post: (pageDate) => {
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params = {
            condition: {
              pageIndex: pageDate.pageIndex,
              pageSize: pageDate.pageSize
            }
          }
          console.log("date---------")
          console.log(data)
        })) {

          return http.post(data);
        }
      }
    }
  }

  /**
   * 日程相关
   */
  calendar(){
    let http = _structure('/data/querybycondition/Calendar')
    let httpput = _structure('/data/update/Calendar')
    return {
      post: (pageDate) => {
        let data = {}
        //获取用户Id/ExId
        if (_getUserInfo((userInfo, exInfo) => {
         
          data.params = {
            condition: {
              ExhibitionId: exInfo.RecordId,
              Type :"3"
            }
          }
          
        })) {

          return http.post(data);
        }
      },
      put: (pageDate) => {
        let data = {}
        //获取用户Id/ExId
        data.params = pageDate
        return httpput.post(data);
      }
    }
  }
  /**
   * 托管审核
   */
  AutoApprovalInvition() {
    let http = _structure('/data/queryList/AutoApprovalInvition')
    let httpPut = _structure('/data/update/AutoApprovalInvition')
    return {
      get : (dataJson)=>{
        let data = {}
        if (_getUserInfo((userInfo, exInfo) => {
          data.params = {
            
              ExhibitionId: exInfo.RecordId
            
          }
        })) {
          return http.post(data);
        }
      },
      put : (dataJson) => {
        let data = {}
        
        data.params = dataJson
        
        return httpPut.post(data);
        
      }
    }

  }
  SmsTemplate(){
    let http = _structure('/data/querybycondition/SmsTemplate')
    let httpPut = _structure('/data/update/SmsTemplate')
    return {
      get : (dataJson)=>{
        let data = {}
        if (_getUserInfo((userInfo, exInfo) => {
          data.params = {
            condition: {
              ExhibitionId: exInfo.RecordId,
              ...dataJson
            }
          }
        })) {
          return http.post(data);
        }
      },
      put : (dataJson) => {
        
        
        return httpPut.post(dataJson);
        
      }
    }

  }
  SmSAccount(){
    let httpGet = _structure('/data/queryList/SmSAccount')
    return{
      getAccount:()=>{
        let data = {params:{
          condition:{

          }
        }}
        if(_getUserInfo((userInfo,exInfo)=>{
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params.condition.OrgId = userInfo.OrganizationRecordId
        })){
          return httpGet.post(data)
        }
      }
    }


  }
  SmsSign() {
    let httpGet = _structure('/data/queryList/SmsSign')
    return {
      getSmsSign: () => {
        let data = {
          params: {
            condition: {

            }
          }
        }
        if (_getUserInfo((userInfo, exInfo) => {
          data.tenantId = userInfo.TenantId;
          data.userId = userInfo.UserId;
          data.params.condition.SignId = userInfo.OrganizationRecordId
        })) {
          return httpGet.post(data)
        }
      }
    }


  }
}

export default wxRequestHelper