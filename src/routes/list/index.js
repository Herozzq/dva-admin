import React, { useEffect, useState } from "react";
import { connect } from 'dva';
import {
    Form,
    Input,
    Space,
    Table
} from "antd";
// import styles from './index.less'
import { Link } from "react-router-dom";
function List(props) {
    let { dispatch, form, list, loading, pageNum, pageSize, totalSize, } = props;
    useEffect(() => {
        dispatch({
            type: 'CommonModel/concat',
            payload: { breadList: ["菜单1", "列表1"] },
        })
    }, []);

    const getData = (pageNum = 1, pageSize = 10) => {
        dispatch({
            type: 'ListModel/getList',
            payload: {
                pageNum: pageNum,
                pageSize: pageSize
            }
        })
    };

    const pageChange = (pageNum, pageSize) => {
        getData(pageNum, pageSize);
    };

    const sizeChange = (current, size) => {
        getData(current, size);
    };

    let columns = [

        {
            title: "姓名",
            dataIndex: "name",
            key: "zjyItemName",
        },
        {
            title: "性别",
            dataIndex: "sex",
            key: "sex",
        },
        {
            title: "详情",
            dataIndex: "detail",
            key: "detail",
            render(id, data) {
				return (
					<Link to={`/Detail`}>详情</Link>
				)
			},
        },
        
    ];

    return (
        <div>
            <Form form={form} layout="inline" style={{ marginBottom: 20 }}>

                <Form.Item
                    style={{ marginBottom: "20px" }}
                    label="预约项目名称"
                    name="appointmentName"
                >
                    <Input placeholder="预约项目名称" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "20px" }}
                    label="关联案场"
                    name="storeName"
                >
                    <Input placeholder="请输入关联案场" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "20px" }}
                    label="关联楼盘"
                    name="houseName"
                >
                    <Input placeholder="请输入关联楼盘" />
                </Form.Item>

                <Space style={{ marginBottom: "20px" }}>
                </Space>
            </Form>
            <Table
                columns={columns}
                loading={loading}
                dataSource={list}
                rowKey={(record) => record.id}
                pagination={{
                    current: pageNum,
                    pageSize,
                    total: totalSize,
                    onChange: pageChange,
                    onShowSizeChange: sizeChange,
                }}
            />

        </div>
    );
}

function mapStateToProps(state) {
    return { ...state.ListModel };
}
export default connect(mapStateToProps)(List);