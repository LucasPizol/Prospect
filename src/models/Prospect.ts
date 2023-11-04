export interface ProspectCreationAttributes {
  nome: string;
  descricao: string;
  finalizado: number;
  telefone: string;
  iduser: number,
  idendereco: number,
}

export interface Prospect extends ProspectCreationAttributes {
  idprospect: number;
}
