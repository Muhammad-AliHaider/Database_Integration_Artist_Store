const connection = require('./connection_DB');

//------------------------------------------------------- searching tables----------------------------------------------------------------------------------

async function Search_with_condition(table,condition) {
    let connect = await connection();
    // console.log(String(table));
    let x = 'select * from ' + String(table) + ' where '+ String(condition) ;
    // console.log(x)
    let result = await connect.execute(x);
    // let result = await connect.execute('select * from Customers where cus_no = 2' );
    connect.close();
    return result;
}

async function Search_with_join(table) {
    let connect = await connection();
    let x = 'select * from ' + String(table) + '' ;
    // console.log(x);
    let result = await connect.execute(x);
    // console.log(result);
    connect.close();
    return result;
}

async function Search_Users(username, password , type){
    let connect = await connection();
    let x = 'select * from app_Users where Username = \'' + username + '\'And UserPassword = \'' + password + '\'And UserType = \''+ type  +'\' ';
    // console.log(x);
    let result = await connect.execute(x);
    // console.log(result.rows)
    connect.close(); 
    return result;
}

async function generate_report_c(Cus_No){
    let connect = await connection();
    let x = 'select * from TABLE(Report_Cus('+String(Cus_No)+'))';
    // console.log(x);
    let result =   await connect.execute(x);
    console.log(result);
    connect.close();
    return result;
}

async function generate_report_a(Art_No){
    let connect = await connection();
    let x = 'select * from TABLE(Report_Artist('+String(Art_No)+'))';
    // console.log(x)
    let result = await connect.execute(x);
    // console.log(result);
    connect.close();
    return result;
}

async function generate_report_o(Owner_No){
    let connect = await connection();
    let x = 'select * from TABLE(Report_Owner('+String(Owner_No)+'))';
    let result = connect.execute(x);
    connect.close();
    return result;
}

async function validate(table, id){
    let connect = await connection();
    let x = ''
    if (table == "Owner") 
     x = 'select owner_present(' + parseInt(id) + ') from dual';
    
    else if (table == "Artist") 
     x = 'select artist_present(' + id + ') from dual';
    
    else if (table == "Painting") 
     x = 'select painting_present(' + id + ') from dual';
    
     
    else if (table == "Customers") 
     x = 'select Customers_present(' + id + ') from dual';
    

    else if (table == "Hire") 
     x = 'select Hire_present(' + id + ') from dual';

    else if (table == "Owns") 
     x = 'select owns_present(' + id + ') from dual'; 

    console.log(x);
    // x = "select owner_present(1) from dual"
    let result = await connect.execute(x);
    // console.log(result)
    connect.close();
    return result;
}

async function a(){

let q = await Search_with_condition("Customers","cus_no = 2");

console.log(q);
}

// validate("Owner" , 2)

// a();
module.exports = {validate,Search_with_condition,Search_with_join,generate_report_c,generate_report_a,generate_report_o, Search_Users};

// console.log(generate_report_c(2).rows);
