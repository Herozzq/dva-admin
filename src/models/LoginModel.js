import CommonInterface from '../services/common';
import { routerRedux } from 'dva/router'
import { message } from "antd";
export default {
  namespace: 'LoginModel',
  state: {
    codeUrl: '',
    imgKey: '',
    breadList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, search }) => {
        console.log('pathname', pathname)
        if (pathname == '/') {
          dispatch({ type: 'Code', payload: {} })
        }
      })
    },
  },

  effects: {
    *Code({ payload }, { call, put }) {
      // const { data, code } = yield call(CommonInterface.getCode, payload);
      // yield put({
      //   type: 'concat',
      //   payload: {
      //     codeUrl: data.img,
      //     imgKey: data.imgKey
      //   }
      // })
      yield put({
        type: 'concat',
        payload: {
          codeUrl: '',
          imgKey: ''
        }
      })
    },

    *Login({ payload }, { call, put }) {
      // const { data, code } = yield call(CommonInterface.getLogin, payload);
      // if (code == 1) {
      //   sessionStorage.setItem('loginData', JSON.stringify(data))
      //   yield put(routerRedux.push('/Welcome'));
      // }
      yield put(routerRedux.push('/Welcome'));
    },
  },

  reducers: {
    concat(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
