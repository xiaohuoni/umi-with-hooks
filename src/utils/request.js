import { extend } from 'umi-request';
import { Modal } from 'antd-mobile';

const prefix = '';
const headers = {
  'Content-Type': 'application/json'
};
const extendedRequest = extend({
  responseType: 'json',
  prefix: prefix, // prefix
  errorHandler: error => {
    // 集中处理错误
    const { response = {} } = error;
    const { status } = response;
    console.warn('error', error);
    let errorMessage = '请求错误，请重试!';
    switch (status) {
      case 400:
        errorMessage = '请求的参数不正确，或缺少必要信息，请对比文档';
        break;
      case 401:
        errorMessage = '需要用户认证的接口用户信息不正确';
        break;
      case 403:
        errorMessage = '缺少对应功能的权限';
        break;
      case 404:
        errorMessage = '数据不存在，或未开放';
        break;
      case 500:
        errorMessage = '服务器异常';
        break;
      default:
        break;
    }
    setTimeout(() => {
      Modal.alert('提示', errorMessage, [{ text: '确认' }]);
    }, 100);
  },
  headers: headers
});

export default async function request(url, options) {
  return extendedRequest(url, options).then(res => {
    // 错误提示统一放到这里了
    // if (res && res.resultcode !== '0') {
    //   Modal.alert('提示', res.resultdesc, [{ text: '确认' }]);
    // }
    // console.log('res', res);
    return res;
  });
}
