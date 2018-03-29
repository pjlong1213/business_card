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


class wxRequestHelper {
  constructor() { }

  
}

export default wxRequestHelper