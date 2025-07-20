export interface PatientList { 
  id: number;
  nome: string;
  dataNascimento: string;
  sexo: 'M' | 'F';
  nomeMae: string
}