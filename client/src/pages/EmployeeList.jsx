import { useEffect, useState } from 'react';
import { getAllEmployees } from '../services/employeeService';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees()
            .then(res => setEmployees(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Danh sách nhân viên</h1>
            <ul>
                {employees.map(emp => (
                    <li key={emp.id}>{emp.name} - {emp.role}</li>
                ))}
            </ul>
        </div>
    );
}
