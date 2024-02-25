const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password:'password',
  database:'dbName'
});
export default function Connection() {
  return (
    connection.connect((err) => {
      if(err) {
        console.error('Error connecting to MySQL server:', err);
        return;
      }
      console.log("Connected to MySQL!");
    })
  )
}
// queries

// connection.query('SELECT * FROM db_name', (err, results) => {
//   if (err) {
//     console.error('Error executing MySQL query', err);
//     return;
//   }
//   console.log('Query results:', results);
// })