import EmployeeRepository from "./EmployeeRepository";

interface IRepositoryFactory {
  get(name: string): any;
}

interface IRepositories {
  [key: string]: any;
}

const repositories: IRepositories = {
  Employee: EmployeeRepository,
};

export const RepositoryFactory: IRepositoryFactory = {
  get: (name: string) => repositories[name],
};

export default RepositoryFactory;
