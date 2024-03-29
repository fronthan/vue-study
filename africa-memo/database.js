const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'cruenc',
  connectionLimit: 5,
  database: 'memo'
});

module.exports = {
  async run(query, params) {
    return new Promise((resolve) => {
      pool.getConnection()
        .then(conn => {

          conn.query(query, params)
            .then((rows) => {
              resolve(rows);
              conn.end(); // (필수) connection 종료
            })
            .catch(err => {
              //handle error
              console.log(err);
              conn.end();// (필수) connection 종료
            })

        }).catch(err => {
           //not connected
           console.log(err);
           reject(err);
        });
    })
  }
}
