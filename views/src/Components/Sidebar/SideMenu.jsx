import React from 'react';

import { Menu, Icon } from 'antd';
const { Item } = Menu;
import { Link } from 'react-router-dom';

const SideMenu = () => {

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}>

      <Item key="1" >
        <Link to='/'>
          <Icon type="user-delete" />
          <span>Kick users</span>
        </Link>
      </Item>

      <Item key="2">
        <Link to='/userstable'>
          <Icon type="table" />
          <span>Show all users</span>
        </Link>
      </Item>
    </Menu>
  );

};

export default SideMenu;
