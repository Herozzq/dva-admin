import React, { useEffect, useState } from "react";
import { connect } from 'dva';
import {} from "antd";


function Welcome(props) {
  let { dispatch } = props;

  return (
    <div>
       欢迎页面
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.LoginModel };
}
export default connect(mapStateToProps)(Welcome);