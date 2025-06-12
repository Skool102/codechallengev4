import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import EmployeeTable from '../components/EmployeeTable';
import './Dashboard.scss';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

export default function Dashboard() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background">
                <Sidebar />
            </Sider>
            <Layout>
                <Header />
                <Content style={{ margin: '10px' }}>
                    <EmployeeTable />
                </Content>
            </Layout>
        </Layout>
    );
}