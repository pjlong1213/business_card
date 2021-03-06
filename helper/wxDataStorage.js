import Http from './wxRequestHelper'
// const _labelName=
/**
 * 数据缓存
 * 
 * @class wxDataStorage
 */
class wxDataStorage {
    constructor() {
        this.http = new Http();
        this._init();
    }
    /**
     * 
     * 
     * @memberof wxDataStorage
     */
    _init() {
        //获取的数据处理
        let dataFun = (key, res, fun) => {
          console.log(555)
          console.log(res)
          console.log(fun)
            if (res.resCode == 0) {
              console.log(res.result)
                wx.setStorageSync(key, res.result);
                if (typeof fun === 'function') {
                  fun(res.result);
                }
            } else {
                wx.showToast({
                    title: '拉取数据失败',
                    image: '/assets/images/icon/fail.png'
                })
                wx.stopPullDownRefresh();
            }
        }
        //构建请求的数据接口
        this.GET_FUN = {
           
            
            /**
             * 拉客列表
             * 
             * @param {any} fun 回调方法 返回数据列表
             */
            MATCH_VISITORS: (fun) => {
                this.http.matchVisitor().post().then(res => {
                    dataFun('MATCH_VISITORS', res, fun);
                })
            },
            
        }
    }
    /**
     * 调用方法接口
     * 
     * @param {any} key 方法名称
     * @param {any} fun 回调方法
     * @memberof wxDataStorage
     */
    GET(key, fun) {
        let data = wx.getStorageSync(key);

        if (!data) {
            this.GET_FUN[key](fun);
        } else if (typeof fun === 'function') {
            fun(data);
        }
    }
    /**
     * 移除缓存里的数据
     * 
     * @param {any} key 缓存的键值
     * @memberof wxDataStorage
     */
    Refresh(key) {
        wx.removeStorageSync(key)
    }

}


export default wxDataStorage