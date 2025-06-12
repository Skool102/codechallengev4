import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { editEmployee } from '../services/employeeService';

export default function EditEmployeeModal({ employee, onClose }) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(employee);
    }, [employee]);

    const handleOk = async () => {
        const values = await form.validateFields();
        await editEmployee(employee.id, values);
        onClose();
    };

    return (
        <Modal
            open
            title="Edit Employee"
            onOk={handleOk}
            onCancel={onClose}
            okText="Save"
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input />
                </Form.Item>
                <Form.Item name="role" label="Role">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}
