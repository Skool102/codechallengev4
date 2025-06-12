import React from 'react';
import { Layout, Space, Avatar } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

export default function Header() {
    return (
        <Layout.Header style={{ background: '#fff', padding: '0 16px' }}>
            <div style={{ float: 'right' }}>
                <Space size="middle">
                    <BellOutlined />
                    <Avatar icon={<UserOutlined />} />
                </Space>
            </div>
        </Layout.Header>
    );
}
