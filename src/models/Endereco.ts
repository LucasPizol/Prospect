export interface EnderecoCreationAttributes {
  logradouro: string;
  cep: string;
  bairro: number;
  cidade: string;
  numero: number;
  UF: string;
}

export interface Endereco extends EnderecoCreationAttributes {
  idendereco: number;
}
