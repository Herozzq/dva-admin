import CommonInterface from '../services/common';
import { routerRedux } from 'dva/router'
import { message } from "antd";

export default {

  namespace: 'CommonModel',

  state: {
    breadList: [],
    permissionList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, search }) => {
          dispatch({ type: 'getPermissions', payload: {} })
      })
    },
  },

  effects: {
    *changePassword({ payload, callback }, { call, put }) {
      // const { code, data } = yield call(CommonInterface.changePassword, payload);
      // if (code == 1) {
      //   message.success('密码修改成功');
      //   callback && callback(data);
      //   yield put(routerRedux.replace('/'));
      // }
      message.success('密码修改成功');
    },

    //获取图片token 
    *getQiniuToken({ payload, callback }, { call, put }) {
      // const { code, data } = yield call(CommonInterface.getQiniuToken, payload);
      // if (code == 1) {
      //   callback && callback(data);
      // }
      message.success('请对接接口');
    },

    //获取权限
    *getPermissions({ payload, callback }, { call, put }) {
      // const { data, code } = yield call(CommonInterface.getPermission, payload);
      // yield put({
      //   type: 'concat',
      //   payload: {
      //     permissionList:data
      //   }
      // })
      yield put({
        type: 'concat',
        payload: {
          permissionList:[
            {id: "1",
            parentId: "0",
            permissionIcon: "item-mgt",
            permissionKey: "item-mgt",
            permissionLevel: 1,
            permissionType: 0,
            permissionVOS: null,
          },
          {id: "2",
            parentId: "0",
            permissionIcon: "item-list",
            permissionKey: "item-list",
            permissionLevel: 1,
            permissionType: 0,
            permissionVOS: null,
          },
          {id: "3",
            parentId: "0",
            permissionIcon: "user-mgt",
            permissionKey: "user-mgt",
            permissionLevel: 1,
            permissionType: 0,
            permissionVOS: null,
          },
          ]
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
