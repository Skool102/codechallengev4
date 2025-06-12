import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Space, Typography } from 'antd';
import { getAllEmployees, deleteEmployee, editEmployee } from '../services/employeeService';
import CreateEmployeeModal from './CreateEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import './EmployeeTable.scss'

const { Title } = Typography;

export default function EmployeeTable() {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editEmployeeData, setEditEmployeeData] = useState(null);

    const loadEmployees = async () => {
        const res = await getAllEmployees();
        setEmployees(res.data);
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleEditEmployee = (employee) => {
        setEditEmployeeData(employee);
    };

    const handleToggleStatus = async (employee) => {
        const updatedStatus = employee.status === 'active' ? 'inactive' : 'active';
        await editEmployee(employee.id, { ...employee, status: updatedStatus });
        loadEmployees();
    };

    const columns = [
        {
            title: 'Employee Name',
            dataIndex: 'name',
            key: 'name',
            width: '200px',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '100%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '100%',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'volcano'}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: '100%',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEditEmployee(record)}>Edit</Button>
                    <Button
                        type="primary"
                        danger={record.status === 'active'}
                        onClick={() => handleToggleStatus(record)}
                    >
                        {record.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Title level={4} style={{ margin: 0 }}>{employees.length} Employee{employees.length !== 1 ? 's' : ''}</Title>
                <Button type="primary" onClick={() => setShowModal(true)}>Create Employee</Button>
            </div>

            <Table
                columns={columns}
                dataSource={employees.map(emp => ({ ...emp, key: emp.id }))}
                pagination={{ pageSize: 10 }}
                bordered
            />

            {showModal && (
                <CreateEmployeeModal
                    onClose={() => {
                        setShowModal(false);
                        loadEmployees();
                    }}
                />
            )}

            {editEmployeeData && (
                <EditEmployeeModal
                    employee={editEmployeeData}
                    onClose={() => {
                        setEditEmployeeData(null);
                        loadEmployees();
                    }}
                />
            )}
        </div>
    );
}
