import API from './api';

export const createEmployee = (data) => API.post('/CreateEmployee', data);

export const getAllEmployees = () => API.get('/GetAllEmployees');
export const editEmployee = (id, data,updatedData ) => API.put(`/EditEmployee/${id}` , data, updatedData);
export const deleteEmployee = (id) => API.post(`/DeleteEmployee/${id}`);

