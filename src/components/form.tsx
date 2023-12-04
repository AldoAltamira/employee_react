import { FC } from "react";
import { Input } from "./";

export interface FormProps {
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
  closeModal: () => void;
  dni: string;
  handleAgeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAgeKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleDNIChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePositionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  position: string;
  age: string;
}

export const Form: FC<FormProps> = ({
  submit,
  dni,
  handleDNIChange,
  handleAgeChange,
  handleAgeKeyDown,
  handleNameChange,
  handlePositionChange,
  name,
  position,
  age,
  closeModal,
}) => {
  return (
    <form className="formEmployee" onSubmit={submit}>
      <Input
        id="dni"
        label="DNI"
        onChange={handleDNIChange}
        placeholder="12345678"
        required
        type="text"
        value={dni}
      />
      <Input
        id="age"
        label="Edad"
        onChange={handleAgeChange}
        onKeyDown={handleAgeKeyDown}
        placeholder="25"
        required
        type="number"
        value={age}
      />
      <Input
        id="name"
        label="Nombre"
        onChange={handleNameChange}
        placeholder="Juan Pérez"
        required
        type="text"
        value={name}
      />
      <Input
        id="position"
        label="Cargo"
        onChange={handlePositionChange}
        placeholder="Desarrollador"
        required
        type="text"
        value={position}
      />

      <button type="submit" className="employeeAddBtn">
        Guardar
      </button>
      <button type="button" className="closeModalBtn" onClick={closeModal}>
        Cancelar
      </button>
    </form>
  );
};
