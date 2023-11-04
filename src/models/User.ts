export interface UserCreationAttributes {
  email: string;
  nome: string,
  sobrenome: string,
  codigo: string;
  password: string;
  supervisorId: number;
}

export interface User extends UserCreationAttributes {
  iduser: number;
}
