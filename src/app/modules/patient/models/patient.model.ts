export interface Patient {
  id?: number;
  nome: string;
  dataNascimento: string ;
  sexo: 'M' | 'F';
  contato: string;
  nomePai: string;
  nomeMae: string;
  bairro: string;
  cep: string;
  logradouro: string;
  tipoLogradouro: string;
  numero: string;
  diaDaSessao: number;
  horario: string;
}