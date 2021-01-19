import CommonInterface from '../services/common';
import { routerRedux } from 'dva/router'
export default {

  namespace: 'ListModel',

  state: {
    list: [],
    pageNum: 1,
    pageSize: 10,
    totalPage: '',
    totalSize: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, search }) => {
        if (pathname == '/list') {
          dispatch({ type: 'getList', payload: { pageNum: 1, pageSize: 10 } })
        }
      })
    },
  },

  effects: {
    *getList({ payload, callback }, { call, put }) {
      // const { data, code } = yield call(CommonInterface.getList, payload);
      // yield put({
      //   type: 'concat',
      //   payload: {
      //     list: data.list,
      //     pageNum: data.pageNum,
      //     pageSize:data.pageSize,
      //     totalPage: data.totalPage,
      //     totalSize: data.totalSize,

      //   }
      // })
      yield put({
        type: 'concat',
        payload: {
          list: [
            { name: '名', sex: '男', detail: 1 },
            { name: '名', sex: '女', detail: 1 },
            { name: '名', sex: '男', detail: 1 },
            { name: '名', sex: '女', detail: 1 },
          ],
          pageNum: 1,
          pageSize: 10,
          totalPage: 1,
          totalSize: 4,

        }
      })
    },

  },

  reducers: {
    concat(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
