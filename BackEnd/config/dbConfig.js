// import pkg from 'pg';
// const { Pool } = pkg;


// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'studentdata', // Replace 'mydatabase' with your database name
//   password: 'priyesh@123',
//   port: 5432, // Default PostgreSQL port is 5432
// });

// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Error executing query', err.stack);
//   } else {
//     console.log('Connected to PostgreSQL database:', res.rows[0].now);
//   }
// });

// process.on('SIGINT', () => {
//   pool.end();
//   console.log('Pool has ended');
//   process.exit(0);
// });

// export default pool;

// db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('studentdata', 'postgres', 'priyesh@123', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;
