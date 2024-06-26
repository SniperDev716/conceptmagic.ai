import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Dropdown } from 'antd';
import { LockOutlined, UserOutlined, AreaChartOutlined, SafetyOutlined, IdcardOutlined, UnorderedListOutlined, CommentOutlined, FileImageOutlined } from '@ant-design/icons';

import { logout } from '../../../redux/auth/authSlice';

import avatarImage from "../../../assets/images/avatar.png";

const UserMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const items = [
    // {
    //   label: 'My projects',
    //   key: '/projects',
    //   icon: <FileImageOutlined />,
    // },
    {
      label: <div className=''>{user.name}<br />{user.email}</div>,
      key: 'user',
      type: 'group',
      children: [
        {
          label: 'Profile',
          key: '/user/profile',
          icon: <IdcardOutlined />,
        },
        // {
        //   label: 'Plans',
        //   key: '/plans',
        //   icon: <UnorderedListOutlined />,
        // },
      ]
    },
    {
      label: 'Admin',
      key: 'admin',
      type: 'group',
      icon: <SafetyOutlined />,
      children: [
        {
          label: 'Users',
          key: '/admin/users',
          icon: <UserOutlined />,
        },
        // {
        //   label: 'Analyze',
        //   key: '/admin/analyze',
        //   icon: <AreaChartOutlined />,
        // },
      ]
    },
    {
      label: 'Log Out',
      key: '/auth/logout',
      icon: <LockOutlined />,
    },
  ];

  const handleClick = ({ item, key }) => {
    if (key === '/auth/logout') {
      dispatch(logout());
    } else {
      navigate(key);
    }
  }

  return (
    <Dropdown
      menu={{
        items: items.filter(item => item.key != 'admin' || (item.key == 'admin' && user.isAdmin)),
        onClick: handleClick,
      }}
      trigger='click'
      placement="bottomLeft"
      arrow
    >
      {/* <Button type='primary' size='large' icon={<UserOutlined />}>{user.name}</Button> */}
      <Avatar src={avatarImage} className='shadow-lg cursor-pointer' />
    </Dropdown>
  )
};

export default UserMenu;
