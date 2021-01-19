import fetch from 'dva/fetch';
import { message } from 'antd';
import { getUrl } from './util';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */


export default function request(url, options,call = () => { },) {
  let params = options
  params.appKey = 'householder-agent'
  let loginData = JSON.parse(sessionStorage.getItem('loginData')) 
  let token = loginData&&loginData.accessToken?loginData.accessToken:''
  let tokenType = loginData&&loginData.tokenType?loginData.tokenType:''
  let urls = getUrl() + url;
  let mergeOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': tokenType + '-' + token,
    },
    body: JSON.stringify(params)
  }
  return fetch(urls, mergeOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if (data.code == 1) {
        call();
      } else if (data.code == 10006) {
        setTimeout(() => {
          window.location.href = '#/';
        }, 3000);
        message.info('登录信息已失效，3秒后将自动跳转到登录页...');
      } else {
        setTimeout(() => {
          window.location.href = '#/';
        }, 1000);
        message.error(data.message);
      }
      return data;
    })
    .catch(err => ({ err }));
}
