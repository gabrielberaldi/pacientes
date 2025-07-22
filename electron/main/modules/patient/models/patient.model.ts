export interface Patient {
  id?: number;
  nome: string;
  dataNascimento: Date;
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
  dataCriacao: string;
  dataAtualizacao: string;
}