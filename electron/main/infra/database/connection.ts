import { app } from 'electron';
import path from 'path'
import sqlite3 from 'sqlite3';

const dbPath = path.join(app.getPath('userData'), 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err);
  } else {
    console.log('Conectado ao SQLite em:', dbPath);
  }
});

export default db;
