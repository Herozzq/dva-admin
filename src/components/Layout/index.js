
import React, { useEffect, useState } from "react";
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from "react-router-dom";

import styles from './index.less'
import AppHeader from './Header/index';
import SiderMeau from './SiderMeau/index';
const { Header, Content, Footer, Sider } = Layout;

function AppLayout(props) {

    let { dispatch, breadList } = props;
    console.log('breadList', breadList)
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SiderMeau />
            <Layout>
                <Header className={styles.siteLayoutBackground} style={{ padding: 0 }} >
                    <span className={styles.logo}>管理系统</span>
                    <AppHeader />
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {
                            breadList && breadList.map((item, name) => {
                                return (
                                    <Breadcrumb.Item key={typeof item === 'string' ? item : item.name}>
                                        {typeof item === 'string' ? item : <Link to={item.path}>{item.name}</Link>}
                                    </Breadcrumb.Item>
                                )
                            })
                        }
                    </Breadcrumb>
                    <div className={styles.siteLayoutBackground} style={{ padding: 24, minHeight: 360 }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

function mapStateToProps(state) {
    return { ...state.CommonModel };
}
export default connect(mapStateToProps)(AppLayout);
