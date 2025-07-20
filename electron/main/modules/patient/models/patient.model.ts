export interface Patient {
  id?: number;
  nome: string;
  dataNascimento: string;
  sexo: 'M' | 'F';
  contato: string;
  nomePai: string;
  nomeMae: string;
  bairro: string;
  cep: string;
  logradouro: string;
  tipoLogradouro: string;
  numero: string;
  diaDaSessao: string;
  horario: string;
  evolucao: string;
  dataCriacao: string;
  dataAtualizacao: string;
}