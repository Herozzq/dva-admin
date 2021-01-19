import React, { useEffect, useState } from "react";
import { connect } from 'dva';
import {} from "antd";
// import styles from './index.less'

function Detail(props) {
    let { dispatch } = props;
    useEffect(() => {
        dispatch({
            type: 'CommonModel/concat',
            payload: { breadList: ["菜单1",{ name: '列表1', path: "/List" },"详情"] },
        })
    }, []);


    return (
        <div>
            详情
        </div>
    );
}

function mapStateToProps(state) {
    return { ...state.ListModel };
}
export default connect(mapStateToProps)(Detail);