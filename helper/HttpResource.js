import __config from './Config'
import WxResource from './WxResource'
class HttpResource {
    /**
     * Creates an instance of HttpResource.
     * @param {any} url 控制器名称
     * @param {any} paramDefaults 
     * @param {any} actions 
     * @param {any} options 
     * @param {string} [prefix='/api'] 
     * @memberof HttpResource
     */
    constructor(url, paramDefaults, actions, options, prefix = '/v2') {
        Object.assign(this, {
            url,
            paramDefaults,
            actions,
            options,
            prefix
        })
        return this.init();
    }

    /**
     * 返回实例对象
     */
    init() {
        const resource = new WxResource(this.setUrl(this.url), this.paramDefaults, this.actions, this.options, {
            interceptors: this.setInterceptors(),
            suffix: ''
        })

        return resource;
    }

    /**
     * 设置请求路径
     */
    setUrl(url) {
        return `${__config.SERVER.HOST}${this.prefix}${url}`
    }

    /**
     * 拦截器
     */
    setInterceptors() {
        return [{
            request: (request) => {
                request.header = request.header || {}
                request.requestTimestamp = new Date().getTime()
                // if (request.url.indexOf('/api') !== -1 && wx.getStorageSync('token')) {
                //     request.header.Authorization = 'Bearer ' + wx.getStorageSync('token')
                // }
                // wx.showToast({
                //     title: '加载中',
                //     icon: 'loading',
                //     duration: 10000,
                //     mask: !0,
                // })
                return request
            },
            requestError: (requestError) => {
                wx.hideToast()
                return requestError
            },
            response: (response) => {
                response.responseTimestamp = new Date().getTime();
                
                if (response.statusCode === 4003) {

                } else if (response.statusCode !== 200) {
                    wx.redirectTo({
                        url: '/pages/carde/index'
                    })
                } 
                
                // wx.hideToast()
                return response
            },
            
        }]
    }
}

export default HttpResource