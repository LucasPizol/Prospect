export interface PesquisaCreationAttributes {
  id_cliente: string;
  nome_cliente: string;
  cidade: number;
  user_iduser: number;
}

export interface Pesquisa extends PesquisaCreationAttributes {
  idpesquisa_potencial: number;
}

export interface PesquisaUpdate {
  idpesquisa_potencial: number;
  linha_1: number;
  linha_2: number;
  moto: number;
  lubel: number;
  pesadas: number;
  frota?: number;
}
