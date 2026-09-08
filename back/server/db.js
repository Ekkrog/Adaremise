// config/db.js
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'laremise',
  password: 'laremise',
  database: 'la_remise',
});

export default pool;