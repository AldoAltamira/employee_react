import { IEmployee } from "../interfaces";
import EmployeeClient from "./clients/EmployeeClient";

interface IEmployeeRepository {
  getEmployees(): Promise<IEmployee[]>;
  createEmployee(employee: IEmployee): Promise<boolean>;
  updateEmployee(employee: IEmployee): Promise<boolean>;
  deleteEmployee(id: string): Promise<boolean>;
}

export default {
  getEmployees() {
    return EmployeeClient.get('/list');
  },
  createEmployee(employee: IEmployee) {
    return EmployeeClient.post('/create', employee);
  },
  updateEmployee(employee: IEmployee) {
    return EmployeeClient.put('/update', employee);
  },
  deleteEmployee(id: string) {
    return EmployeeClient.delete(`/delete/${id}`);
  },
} as IEmployeeRepository;
