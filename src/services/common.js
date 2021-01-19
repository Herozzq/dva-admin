import request from '../utils/request';

const commonInterface = {
   // 发图形验证码
   getCode: (data) => {
    return request('/shopkeeperUser/graph-validate-code', data);
  },

  getLogin: (data) => {
    return request('/shopkeeperUser/login', data);
  },

  //修改密码
  changePassword: (data) => {
    return request('/shopkeeperUser/passwordReset', data)
  },

  //获取青牛token
  getQiniuToken: (data) => {
    return request('/mgt/gov/upload/qiniu_token', data)
  },

  //权限
  getPermission: (data) => {
    return request('/permission/list', data)
  },
  
  getList: (data) => {
    return request('/item/query', data);
  },
  
}

export default commonInterface;

