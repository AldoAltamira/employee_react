import { useState, useEffect, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { Form } from "../components";
import { IEmployee } from "../interfaces";
import RepositoryFactory from "../repositories/RepositoryFactory";
import "../index.css";

const columns = [
  {
    title: "DNI",
    key: "dni",
  },
  {
    title: "Edad",
    key: "age",
  },
  {
    title: "Nombre",
    key: "name",
  },
  {
    title: "Cargo",
    key: "position",
  },
  {
    title: "Acciones",
    key: "actions",
  },
];

const List = () => {
  const EmployeeRepository = RepositoryFactory.get("Employee");
  const [dni, setDNI] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [employee, setEmployee] = useState<string>(); // [{}
  const [employees, setEmployees] = useState<IEmployee[]>([
    {
      dni: "12345678",
      age: "20",
      name: "John Doe",
      position: "CEO",
      id: "1",
    },
    {
      dni: "12345678",
      age: "20",
      name: "John Doe",
      position: "CEO",
      id: "2",
    },
    {
      dni: "12345678",
      age: "20",
      name: "John Doe",
      position: "CEO",
      id: "3",
    },
  ]);

  // useEffect(() => {
  //   getEmployees();
  // }, []);

  // const getEmployees = async () => {
  //   try {
  //     const employees = await EmployeeRepository.getAll();
  //     setEmployees(employees);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const resetStates = () => {
    setDNI("");
    setAge("");
    setName("");
    setPosition("");
    setEmployee("");
  };

  const addEmployee = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEmployee = {
      dni,
      age,
      name,
      position,
      id: employees.length.toString(),
    };
    const newEmployees = [...employees, newEmployee];
    setEmployees(newEmployees);
    // await EmployeeRepository.create(newEmployee);
    closeModal();
  };

  const openModal = () => {
    resetStates();
    const modal = document.getElementById("modalAddEmployee");
    if (modal) {
      modal.style.display = "flex";
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("modalAddEmployee");
    if (modal) {
      modal.style.display = "none";
    }
    const modalEdit = document.getElementById("modalEditEmployee");
    if (modalEdit) {
      modalEdit.style.display = "none";
    }
    const modalDelete = document.getElementById("modalDeleteEmployee");
    if (modalDelete) {
      modalDelete.style.display = "none";
    }
  };

  const handleDNIChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDNI(e.target.value);
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newAge = e.target.value.replace(/[^\d]/g, "").slice(0, 2);
    setAge(newAge);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.replace(/[^A-Za-z ]/g, "");
    setName(newName);
  };

  const handleAgeKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "e" ||
      e.key === "." ||
      e.key === "-" ||
      e.key === "+" ||
      e.key === "E" ||
      e.key === ","
    ) {
      e.preventDefault();
    }
  };

  const handlePositionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  const openEditModal = (employee: string) => {
    resetStates();
    const findEmployee = employees.find((e) => e.id === employee);
    if (findEmployee) {
      setEmployee(findEmployee.id);
      setDNI(findEmployee.dni);
      setAge(findEmployee.age);
      setName(findEmployee.name);
      setPosition(findEmployee.position);
    }

    const modal = document.getElementById("modalEditEmployee");
    if (modal) {
      modal.style.display = "flex";
    }
  }

  const editEmployee = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEmployees = employees.map((e) => {
      if (e.id === employee) {
        return {
          dni,
          age,
          name,
          position,
          id: employee,
        };
      }
      return e;
    });
    setEmployees(newEmployees);
    // await EmployeeRepository.update(newEmployees);
    closeModal();
  }

  const openDeleteModal = (employee: string) => {
    const findEmployee = employees.find((e) => e.id === employee);
    if (findEmployee) {
      setEmployee(findEmployee.id);
      setName(findEmployee.name);
    }

    const modal = document.getElementById("modalDeleteEmployee");
    if (modal) {
      modal.style.display = "flex";
    }
  }

  const deleteEmployee = () => {
    const newEmployees = employees.filter((e) => e.id !== employee);
    setEmployees(newEmployees);
    // await EmployeeRepository.delete(employee);
    closeModal();
  }
  

  return (
    <div className="listContainer">
      <h1>Lista de empleados</h1>

      <table className="employeeTable">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={`table-data-${employee.dni}-${index}`}>
              <td>{employee.dni}</td>
              <td>{employee.age}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td className="employeeTableActions">
                <button onClick={() => openEditModal(employee.id!)} className="employeeEditBtn">Editar</button>
                <button onClick={() => openDeleteModal(employee.id!)} className="employeeDeleteBtn">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="employeeAddBtn" onClick={openModal}>
        Agregar Nuevo Empleado
      </button>

      <div id="modalAddEmployee" className="modal">
        <div id="modalContent">
          <h2>Agregar Nuevo Empleado</h2>
          <Form
            submit={addEmployee}
            dni={dni}
            handleDNIChange={handleDNIChange}
            handleAgeChange={handleAgeChange}
            handleAgeKeyDown={handleAgeKeyDown}
            handleNameChange={handleNameChange}
            handlePositionChange={handlePositionChange}
            name={name}
            position={position}
            age={age}
            closeModal={closeModal}
          />
        </div>
      </div>

      <div id="modalEditEmployee" className="modal">
        <div id="modalContent">
          <h2>Editar Empleado</h2>
          <Form
            submit={editEmployee}
            dni={dni}
            handleDNIChange={handleDNIChange}
            handleAgeChange={handleAgeChange}
            handleAgeKeyDown={handleAgeKeyDown}
            handleNameChange={handleNameChange}
            handlePositionChange={handlePositionChange}
            name={name}
            position={position}
            age={age}
            closeModal={closeModal}
          />
        </div>
      </div>

      <div id="modalDeleteEmployee" className="modal">
        <div id="modalContent">
          <h2>Desea eliminar a {name}</h2>
          <div className="employeeTableActions">
            <button className="cancelModalBtn" onClick={closeModal}>
              Cancelar
            </button>
            <button className="closeModalBtn" onClick={deleteEmployee}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
