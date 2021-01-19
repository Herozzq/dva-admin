
import React, { useState } from "react";
import { connect } from 'dva';
import { Layout, Menu, } from 'antd';
import { Link } from "react-router-dom";
import menuData from './customMenu'
import styles from './index.less'
const { Sider } = Layout;


console.log('menuData',menuData)


function SiderMeau(props) {
  let { dispatch, permissionList } = props;
  const [collapsed, setcollapsed] = useState(false);

  function permissionStatus(permission) {
    const permissions = permissionList
    for (let i in permissions) {
        if (permission == permissions[i].permissionKey) {
            return true
        }
    }
    return false
}

  
  // const [menuData, setmenuData] = useState(menuData);
  const renderMenu = (menus) => {
    return menus.map((menu) => {
      if ((menu.permission && !permissionStatus(menu.permission))) {
        return null
      }
      if (menu.children && menu.children.length) {
        return (
          <Menu.SubMenu
            key={menu.selected}
            icon={menu.icon}
            title={
              <span>{menu.title}</span>
            }
          >
            {
              renderMenu(menu.children)
            }
          </Menu.SubMenu>
        )
      }
  
      return (
        <Menu.Item
          key={menu.selected}
          icon={menu.icon}
        >
          <Link to={menu.path}>
            {menu.title}
          </Link>
        </Menu.Item>
      )
    })
  }
  return (
      <Sider collapsible collapsed={collapsed} onCollapse={() => { setcollapsed(!collapsed) }}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {
            renderMenu(menuData)
          }
        </Menu>
      </Sider>
  );
}

function mapStateToProps(state) {
  return { ...state.CommonModel };
}

export default connect(mapStateToProps)(SiderMeau)