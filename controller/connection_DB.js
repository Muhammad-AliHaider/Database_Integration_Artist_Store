// import oracledb from 'oracledb';
const oracledb = require('oracledb');

async function getConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: 'c##alihaider',
      password: '123',
      connectString: 'localhost/orcl'
    });
    return connection;
  } catch (error) {
    console.error(error);
  }
}


// Create a connection to the database

    // Delete rows from the "users" table where the "age" column is greater than 18
    // let connection = getConnection();
    // const sql = 'select* from owner';
    // connection.query(sql, function(error, result) {
    //   if (error) throw error;
    //   // console.log(result.rowsAffected + ' rows deleted');
    // });
    // Close the connection
    


async function Search_with_condition() {
  let connect = await getConnection();

  console.log("lo hugaya kaam")
  let result = await connect.execute("select owner_present(1) from dual")
  // connect.execute ('delete from Owner where Owner_No = 12')
  // result = await connect.execute("select * from Owner")
  console.log(result.rows);
  
  console.log("xys");
  connect.close();
}

// Search_with_condition()

module.exports = getConnection;