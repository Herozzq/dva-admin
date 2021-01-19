import CommonInterface from '../services/common';
import { routerRedux } from 'dva/router'
export default {

  namespace: 'WelcomeModel',

  state: {
    
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, search }) => {
    
      })
    },
  },

  effects: {
  
  },

  reducers: {
    concat(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
