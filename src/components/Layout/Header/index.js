import React, { useState, useEffect, memo } from 'react';
import { connect } from 'dva';
import { Dropdown, Menu, Modal, Form, Input, message } from 'antd';
import { passwordExp } from '../../../utils/util';
import {
    DownOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import styles from './index.less'
//用户退出系统，修改密码设置
function AppHeader(props) {
    let { dispatch,  } = props;
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    function showModalHandle() {
        setVisible(true);
    }

    function logoutHandle() {
        Modal.confirm({
            title: '您确定要退出？',
            icon: <QuestionCircleOutlined />,
            onOk() {
                sessionStorage.removeItem('loginData');
                window.location.replace('/')
            }
        })
    }

    useEffect(() => {
        setVisible(visible);
    }, [visible]);

    const menu = (
        <Menu>
            <Menu.Item onClick={showModalHandle}>
                <span style={{ padding: '0 32px 0 8px' }} >修改密码</span>
            </Menu.Item>
            <Menu.Item onClick={logoutHandle}>
                <span style={{ padding: '0 32px 0 8px' }} >退出系统</span>
            </Menu.Item>
        </Menu>
    );

    function cancelHandle() {
        setVisible(false)
    }
    
    function okHandle() {
        form.validateFields().then((values) => {
            
              dispatch({
                type: 'CommonModel/changePassword',
                payload: values,
                callback: (res) => {
                    message.success('修改成功')
                    setTimeout(()=>{
                        window.location.replace('/')
                    },2000)
                }
            })
        })
    }

    function validateToNextPassword(rule, value, callback) {
        const newPasswordAgain = form.getFieldValue('newPasswordAgain');
        const newPassword = value;
        const oldPassword = form.getFieldValue('oldPassword');

        if (newPasswordAgain && newPassword) {
            if (newPasswordAgain != newPassword) {
                return Promise.reject('两次密码不一致')
            }
        }

        if (oldPassword && newPassword) {
            if (oldPassword === newPassword) {
                return Promise.reject('新密码不能跟原密码一样')
            }
        }

        return Promise.resolve();
    };

    function validateToPasswordAgain(rule, value, callback) {

        const newPasswordAgain = value;
        const newPassword = form.getFieldValue('newPassword');

        if (newPasswordAgain && newPassword) {
            if (newPasswordAgain != newPassword) {
                return Promise.reject('两次密码不一致')
            }
        }

        return Promise.resolve();
    };
    const loginInfo =JSON.parse(sessionStorage.getItem('loginData')) 
    return (
        <>
            <Dropdown overlay={menu} className={styles.loginbox}>
                <span>{loginInfo&&loginInfo.trueName || 'XX'}  <DownOutlined /></span>
            </Dropdown>

            <Modal
                title="修改密码"
                visible={visible}
                onCancel={cancelHandle}
                onOk={okHandle}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item
                        label="原密码"
                        name="oldPassword"
                        rules={[
                            { required: true, message: '请输入原密码' },
                            { max: 20, message: '最多20个字符' },
                            { pattern: passwordExp, message: '密码至少8个字符，且必须包含字母和数字' }
                        ]}
                    >
                        <Input placeholder="请输入原密码" type="password" />
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="newPassword"
                        rules={[
                            { required: true, message: '请输入新密码' },
                            { max: 20, message: '最多20个字符' },
                            { pattern: passwordExp, message: '密码至少8个字符，且必须包含字母和数字' },
                            { validator: validateToNextPassword }
                        ]}
                    >
                        <Input placeholder="请输入新密码" type="password" />
                    </Form.Item>

                    <Form.Item
                        label="确认密码"
                        name="newPasswordAgain"
                        rules={[
                            { required: true, message: '请再次确认密码' },
                            { validator: validateToPasswordAgain }
                        ]}
                    >
                        <Input placeholder="请确认密码" type="password" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

function mapStateToProps(state) {
    return { ...state.CommonModel };
}
export default connect(mapStateToProps)(AppHeader);