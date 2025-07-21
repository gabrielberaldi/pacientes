export interface PatientListDto {
  id: number;
  nome: string;
  dataNascimento: Date;
  sexo: 'M' | 'F';
  nomeMae: string
}