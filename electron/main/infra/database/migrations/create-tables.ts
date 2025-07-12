import db from "../connection";

export function createTables(): void {
  try {
    db.exec(`
      BEGIN TRANSACTION;

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        data_nascimento DATE NOT NULL,
        contato TEXT NOT NULL,
        nome_pai TEXT,
        nome_mae TEXT,
        bairro TEXT,
        cep TEXT,
        logradouro TEXT,
        tipo_logradouro TEXT,
        numero TEXT,
        dia_da_sessao TEXT,
        horario TEXT,
        evolucao TEXT
      );

      CREATE TABLE IF NOT EXISTS patient_documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        paciente_id INTEGER NOT NULL,
        tipo TEXT NOT NULL,
        nome_arquivo TEXT NOT NULL,
        extensao TEXT NOT NULL,
        arquivo BLOB NOT NULL,
        data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
      );

      COMMIT;
    `);
    console.log('✅ Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
    db.exec('ROLLBACK;');
  }
}