import React, { useEffect, useState } from "react";
import { connect } from 'dva';
import {
    Form,
} from "antd";

import UploadImage from '../components/UploadImage';
import UploadFile from '../components/UploadFile';
import UEdit from '../components/UEdit';
function example(props) {
    let { dispatch, form, list, loading, pageNum, pageSize, totalSize, } = props;
    useEffect(() => {
        dispatch({
            type: 'CommonModel/concat',
            payload: { breadList: ["菜单1", "示例"] },
        })
    }, []);

    const layout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 14 },
	};

    return (
        <div>
            示例

            <UploadImage maxQuantity={1} disabled={false} maxSize={2 * 1024} />

            <UploadFile />

            <Form.Item
                label="富文本"
                {...layout}
                style={{ width: '100%' }}
            >
                <UEdit />
            </Form.Item>
        </div>
    );
}

function mapStateToProps(state) {
    return { ...state.ExampleModel };
}
export default connect(mapStateToProps)(example);