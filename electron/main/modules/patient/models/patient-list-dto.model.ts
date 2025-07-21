export interface PatientListDto {
  id: number;
  nome: string;
  dataNascimento: string;
  sexo: 'M' | 'F';
  nomeMae: string
}