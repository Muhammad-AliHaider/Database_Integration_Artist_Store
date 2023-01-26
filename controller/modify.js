const connection = require('./connection_DB');


//------------------------- Updating tables----------------------------------------------------------------------------------

async function Update(table ,setting_value, condition) {
    let connect = await connection();
    let x = 'update '+table+' set' + setting_value +' where '+ condition + '' ;
    console.log(x);
    await connect.execute(x);
    await connect.execute('commit')
    
    connect.close();
}



//------------------------- deleting data from tables----------------------------------------------------------------------------------


async function Delete(table,condition) {
    let connect = await connection();
    // let result = await connect.execute("select * from Owner")
    // console.log(result);
    let x = 'delete from '+ table +' where ' +  condition +'';
    console.log(x)
    

    await connect.execute(x)
    // console.log("aaaaaaahhhh")

    await connect.execute("commit")
    
    
  
    connect.close();
}



//------------------------- inserting data into tables----------------------------------------------------------------------------------


async function Insert(table, values){
    let connect = await connection();
    let x = "insert into " + table + " values ( "+ values+" ) ";
    console.log(x);
    await connect.execute(x);
    await connect.execute("commit");

    connect.close();
}


// ------------------------------------------------------------------------------------------------------------

async function insertUser(Username , Password ){
    let connect = await connection();
    let x =  'Insert into app_Users values (\''+String(Username)+'\',\''+String(Password)+'\', \'User\')';
    await connect.execute(x);
    await connect.execute('commit')
    connect.close();
}



module.exports = {Insert,Update,Delete , insertUser}

