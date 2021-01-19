import React, { useEffect, useState } from "react";
import { connect } from 'dva';
import {
  Button,
  Form,
  Input,
  Row,
} from "antd";
import styles from './index.less'
const FormItem = Form.Item

function Login(props) {
  let { dispatch, form, codeUrl, imgKey } = props;
  function refreshCodeHandle() {
    dispatch({
      type: 'LoginModel/Code',
      payload: {}
    })
  }

  function onFinish(values) {
    console.log('表单提交',values)
   
    values.imgKey=imgKey
    dispatch({
      type: 'LoginModel/Login',
      payload: values
    })
    refreshCodeHandle()
  }


  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <span>XX后台管理</span>
      </div>
      <Form form={form} onFinish={onFinish}>
        <FormItem name="accountName"
          rules={[{ required: true }]} hasFeedback>
          <Input
            placeholder='请输入账号'
          />
        </FormItem>
        <FormItem name="password"
          rules={[{ required: true }]} hasFeedback>
          <Input
            type="password"
            placeholder='请输入密码'
          />
        </FormItem>
        <FormItem name="imgCode"
          rules={[{ required: true }]} >
          <div>
            <Input
              type="password"
              placeholder={`请输入验证码`}
              className={styles.codeinput}
            />
            <img src={`data:image/png;base64,${codeUrl}`} className={styles.code} onClick={refreshCodeHandle} />
          </div>
        </FormItem>
        <Row>
          <Button
            type="primary"
            htmlType="submit"
          >
            登录
            </Button>

        </Row>
      </Form>
    </div>
  );
}

function mapStateToProps(state) {
  return { ...state.LoginModel };
}
export default connect(mapStateToProps)(Login);