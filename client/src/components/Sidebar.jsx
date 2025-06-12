import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, FileOutlined, MessageOutlined } from '@ant-design/icons';

export default function Sidebar() {
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
        >
            <Menu.Item key="1" icon={<UserOutlined />}>Manage Employee</Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />}>Manage Task</Menu.Item>
            <Menu.Item key="3" icon={<MessageOutlined />}>Message</Menu.Item>
        </Menu>
    );
}
