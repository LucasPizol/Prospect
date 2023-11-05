export interface AgendamentoCreationAttributes {
  dataVisita: Date;
  dataFim: Date;
  descricao: string;
  frequencia: number;
  idprospect: number;
  idsituacao: number;
  codAgendamento?: string;
}

export interface Agendamento extends AgendamentoCreationAttributes {
  idagendamento: number;
}
