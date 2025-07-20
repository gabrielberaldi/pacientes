export interface PatientList { 
  id: number;
  nome: string;
  idade: number;
  dataNascimento: string;
  sexo: 'M' | 'F';
  nomeMae: string
}