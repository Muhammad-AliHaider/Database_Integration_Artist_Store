
let object_upper = null;
let object_table = null;


const login_button = document.getElementById('login_button');
if(login_button != null){
    login_button.addEventListener('click', async function(myvar) {
        // console.log("123")
    x = await login_auth(myvar);

    console.log(x);

    if(x.length != 0){
        console.log("Verified")
        if(x[0][2] == 'admin'){
            localStorage.setItem("type",'admin')
            location.href = 'Home_Admin.html'
        }
        else if(x[0][2] == 'User'){
            localStorage.setItem("type","User")
            location.href = 'Home_User.html'
        }
    }
    else{
        alert("not a valid user please sign up")
    }

});
}


const sign_Up_Button = document.getElementById('SignUp')
if(sign_Up_Button != null){
    sign_Up_Button.addEventListener('click' ,async function(){
        await fetch('/sign_up_User',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
        Username:  document.getElementById("username").value,
        password: document.getElementById("password").value
        })
        })
        alert("user added ")
    })
    
}




const submitButton = document.getElementById('submit_Cus');
if (submitButton != null) {
    submitButton.addEventListener('click', async function(my_var) {

        y = await fetching_top_w_join("Cus_No_Search","Customers", "Cus_No", "Category","Cus_Category", "Cat");
        console.log("y",y.rows);


        x = await fetching_report_cus("Cus_No_Search");
        console.log("x",x);

        object_upper = y.rows;
        object_table = x;

        console.log("object_upper",object_upper);
        console.log("object_table",object_table);

        localStorage.setItem('object_upper', JSON.stringify(y.rows));
        localStorage.setItem('object_table', JSON.stringify(x));

        location.href = "/Report_Customer.html";




        // console.log("abx");

        });
    }

 var submitButton_Artist = document.getElementById('submit_Artist');
if (submitButton_Artist != null) {
    submitButton_Artist.addEventListener('click', async function(my_var) {

        y = await fetching_top("Artist_No_Search","Artist", "Artist_No");
        console.log("y",y.rows);


        x = await fetching_report_artist("Artist_No_Search");
        console.log("x",x);

        object_upper = y.rows;
        object_table = x;

        console.log("object_upper",object_upper);
        console.log("object_table",object_table);

        localStorage.setItem('object_upper', JSON.stringify(y.rows));
        localStorage.setItem('object_table', JSON.stringify(x));

        location.href = "/Report_Artist.html";

        });
    }




var submitButton_Owner = document.getElementById('submit_Owner');
if (submitButton_Owner != null) {
    submitButton_Owner.addEventListener('click', async function(my_var) {

        y = await fetching_top("Owner_No_search","Owner", "Owner_No");
        console.log("y",y.rows);


        x = await fetching_report_owner("Owner_No_search");
        console.log("x",x);

        object_upper = y.rows;
        object_table = x;

        console.log("object_upper",object_upper);
        console.log("object_table",object_table);

        localStorage.setItem('object_upper', JSON.stringify(y.rows));
        localStorage.setItem('object_table', JSON.stringify(x));

        location.href = "/Report_Owner.html";

        });
    }

    // onclick="location.href='/Report_Artist.html'"


const back_button = document.getElementById("Back_to_home");
if(back_button != null){
    back_button.addEventListener('click', async function(my_var) {
    console.log("abc")
    let x = localStorage.getItem("type")
    let type = x
    
    if(type == "admin"){
        location.href = "Home_Admin.html"
    }
    else if(type == "User"){
        location.href = "Home_User.html"
    }
    });
}

const delete_owner = document.getElementById("delete_Owner");
if(delete_owner != null){
delete_owner.addEventListener('click' , async function(){

    let table = "Owner"

    condition = ""

    if(document.getElementById("Owner_No_delete").value.length != 0 ){
        condition = condition + " Owner_No = " + document.getElementById("Owner_No_delete").value + " and ";
    }

    if(document.getElementById("Owner_Name_delete").value.length != 0 ){
        condition = condition + " Owner_Name = \'" + document.getElementById("Owner_Name_delete").value + "\' and ";
    }

    if(document.getElementById("Owner_Tel_delete").value.length != 0 ){
        condition = condition + " Owner_Tel = " + document.getElementById("Owner_Tel_delete").value + " and ";
    }

    if(document.getElementById("Owner_Address_delete").value.length != 0 ){
        condition = condition + " Owner_Address = \'" + document.getElementById("Owner_Address_delete").value + "\'";
    }

    if (condition == ""){
        alert("enter values before submitting")
        
    }
    else{
        // condition = condition.replaceAll(" ","")
        let x = condition.split(" ");
        if (x[x.length -2 ] == 'and'){
            condition = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                condition = condition + " "+x[i];
            }
        }
        console.log(condition)

        delete_entry(table,condition)
        alert("entry deleted")
    }

} )

}

const delete_Artist = document.getElementById("delete_Artist");
if(delete_Artist != null){
delete_Artist.addEventListener('click' , async function(){

    let table = "Artist"

    condition = ""

    if(document.getElementById("Artist_No_delete").value.length != 0 ){
        condition = condition + " Artist_No = " + document.getElementById("Artist_No_delete").value + " and ";
    }

    if(document.getElementById("Artist_Name_delete").value.length != 0 ){
        condition = condition + " Artist_Name = \'" + document.getElementById("Artist_Name_delete").value + "\' and ";
    }

    if(document.getElementById("Artist_CoB_delete").value.length != 0 ){
        condition = condition + " Artist_CoB = \'" + document.getElementById("Artist_CoB_delete").value + "\' and ";
    }

    if(document.getElementById("Artist_YoD_delete").value.length != 0 ){
        condition = condition + " Artist_YoD = " + document.getElementById("Artist_YoD_delete").value + " and ";
    }

    if(document.getElementById("Artist_YoB_delete").value.length != 0 ){
        condition = condition + " Artist_YoB_delete = " + document.getElementById("Artist_YoB_delete").value + "";
    }

    if (condition == ""){
        alert("enter values before submitting")
        
    }
    else{
        // condition = condition.replaceAll(" ","")
        let x = condition.split(" ");
        if (x[x.length -2 ] == 'and'){
            condition = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                condition = condition + " "+x[i];
            }
        }
        console.log(condition)

        delete_entry(table,condition)
        alert("entry deleted")
    }

} )

}



const delete_Customer = document.getElementById("delete_Customer");
if(delete_Customer != null){
delete_Customer.addEventListener('click' , async function(){

    let table = "Customers"

    condition = ""

    if(document.getElementById("Cus_No_delete").value.length != 0 ){
        condition = condition + " Cus_No = " + document.getElementById("Cus_No_delete").value + " and ";
    }

    if(document.getElementById("Cus_Name_delete").value.length != 0 ){
        condition = condition + " Cus_Name = \'" + document.getElementById("Cus_Name_delete").value + "\' and ";
    }

    if(document.getElementById("Cus_Address_delete").value.length != 0 ){
        condition = condition + " Cus_Address = \'" + document.getElementById("Cus_Address_delete").value + "\' and ";
    }

    if(document.getElementById("Cus_Category_delete").value.length != 0 ){
        condition = condition + " Cus_Category = \'" + document.getElementById("Cus_Category_delete").value + "\'";
    }

    if (condition == ""){
        alert("enter values before submitting")
        
    }
    else{
        // condition = condition.replaceAll(" ","")
        let x = condition.split(" ");
        if (x[x.length -2 ] == 'and'){
            condition = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                condition = condition + " "+x[i];
            }
        }
        console.log(condition)

        delete_entry(table,condition)
        alert("entry deleted")
    }

} )

}




const delete_Painting = document.getElementById("delete_Painting");
if(delete_Painting != null){
delete_Painting.addEventListener('click' , async function(){

    let table = "Painting"

    condition = ""

    if(document.getElementById("Paint_No_delete").value.length != 0 ){
        condition = condition + " Paint_No = " + document.getElementById("Paint_No_delete").value + " and ";
    }

    if(document.getElementById("Paint_Title_delete").value.length != 0 ){
        condition = condition + " Paint_Title = \'" + document.getElementById("Paint_Title_delete").value + "\' and ";
    }

    if(document.getElementById("Paint_Theme_delete").value.length != 0 ){
        condition = condition + " Paint_Theme = \'" + document.getElementById("Paint_Theme_delete").value + "\' and ";
    }

    if(document.getElementById("Paint_Price_delete").value.length != 0 ){
        condition = condition + " Paint_Price = " + document.getElementById("Paint_Price_delete").value + " and ";
    }

    if(document.getElementById("Paint_Artist_No_delete").value.length != 0 ){
        condition = condition + " Artist_No = " + document.getElementById("Paint_Artist_No_delete").value + "";
    }

    if (condition == ""){
        alert("enter values before submitting")
        
    }
    else{
        // condition = condition.replaceAll(" ","")
        let x = condition.split(" ");
        if (x[x.length -2 ] == 'and'){
            condition = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                condition = condition + " "+x[i];
            }
        }
        console.log(condition)

        delete_entry(table,condition)
        alert("entry deleted")
    }

} )

}


const delete_Hire = document.getElementById("delete_Hire");
if(delete_Hire != null){
delete_Hire.addEventListener('click' , async function(){

    let table = "Hire"

    condition = ""

    if(document.getElementById("Hire_No_delete").value.length != 0 ){
        condition = condition + " Hire_ID = " + document.getElementById("Hire_No_delete").value + " and ";
    }

    if(document.getElementById("Hire_Paint_No_delete").value.length != 0 ){
        condition = condition + " Paint_No = " + document.getElementById("Hire_Paint_No_delete").value + " and ";
    }

    if(document.getElementById("Hire_Cus_No_delete").value.length != 0 ){
        condition = condition + " Cus_No = " + document.getElementById("Hire_Cus_No_delete").value + " and ";
    }

    if(document.getElementById("Hire_D_D_delete").value.length != 0 ){
        condition = condition + " Hire_D_D = " + document.getElementById("Hire_D_D_delete").value + " and ";
    }

    if(document.getElementById("Hire_D_H_delete").value.length != 0 ){
        condition = condition + " Hire_D_H = " + document.getElementById("Hire_D_H_delete").value + "";
    }

    if (condition == ""){
        alert("enter values before submitting")
        
    }
    else{
        // condition = condition.replaceAll(" ","")
        let x = condition.split(" ");
        if (x[x.length -2 ] == 'and'){
            condition = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                condition = condition + " "+x[i];
            }
        }
        console.log(condition)

        delete_entry(table,condition)
        alert("entry deleted")
    }

} )

}


const delete_Owns = document.getElementById("delete_Owns");
if(delete_Owns != null){
delete_Owns.addEventListener('click' , async function(){

    let table = "Owns"

    condition = ""

    if(document.getElementById("Own_No_delete").value.length != 0 ){
        condition = condition + " Owns_ID = " + document.getElementById("Own_No_delete").value + " and ";
    }

    if(document.getElementById("Own_Paint_No_delete").value.length != 0 ){
        condition = condition + " Paint_No = " + document.getElementById("Own_Paint_No_delete").value + " and ";
    }

    if(document.getElementById("Own_Owner_No_delete").value.length != 0 ){
        condition = condition + " Owner_No = " + document.getElementById("Own_Owner_No_delete").value + " and ";
    }

    if(document.getElementById("Own_Return_Date_delete").value.length != 0 ){
        condition = condition + " Return_Date = " + document.getElementById("Own_Return_Date_delete").value + "";
    }

    if (condition == ""){
        alert("enter values before submitting")
        
    }
    else{
        // condition = condition.replaceAll(" ","")
        let x = condition.split(" ");
        if (x[x.length -2 ] == 'and'){
            condition = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                condition = condition + " "+x[i];
            }
        }
        console.log(condition)

        delete_entry(table,condition)
        alert("entry deleted")
    }

} )

}








const update_owner = document.getElementById("update_Owner");
if(update_owner != null){
update_owner.addEventListener('click' , async function(){

    let table = "Owner"

    let setting = ""

    if(document.getElementById("Owner_Name_Update_Setting").value.length != 0 ){
        setting = setting + " Owner_Name = \'" + document.getElementById("Owner_Name_Update_Setting").value + "\' , ";
    }

    if(document.getElementById("Owner_Tel_Update_Setting").value.length != 0 ){
        setting = setting + " Owner_Tel = " + document.getElementById("Owner_Tel_Update_Setting").value + " , ";
    }

    if(document.getElementById("Owner_Address_Update_Setting").value.length != 0 ){
        setting = setting + " Owner_Address = \'" + document.getElementById("Owner_Address_Update_Setting").value + "\'";
    }


    let condition = ""

    if(document.getElementById("Owner_No_Update_condition").value.length != 0 ){
        condition = condition + " Owner_No = " + document.getElementById("Owner_No_Update_condition").value + " and ";
    }

    if(document.getElementById("Owner_Name_Update_condition").value.length != 0 ){
        condition = condition + " Owner_Name = \'" + document.getElementById("Owner_Name_Update_condition").value + "\' and ";
    }

    if(document.getElementById("Owner_Tel_Update_condition").value.length != 0 ){
        condition = condition + " Owner_Tel = " + document.getElementById("Owner_Tel_Update_condition").value + " and ";
    }

    if(document.getElementById("Owner_Address_Update_condition").value.length != 0 ){
        condition = condition + " Owner_Address = \'" + document.getElementById("Owner_Address_Update_condition").value + "\'";
    }

    if (setting == ""){
        alert("enter setting values before submitting")

    }

    if (condition == ""){
        alert("enter condition values before submitting")

    }

    else{
        // setting = setting.replaceAll(" ","")
        let x = setting.split(" ");
        if (x[x.length -2 ] == ','){
            setting = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                setting = setting + " "+x[i];
            }
        }

        let y = condition.split(" ");
        if (y[y.length -2 ] == 'and'){
            condition = ""
            for (let i = 0 ; i < y.length-2 ; i++){
                condition = condition + " "+y[i];
            }
        }
        
        console.log(setting)
        console.log(condition)

        update_entry(table,setting,condition)
        alert("entry updated")
    }

} )

}


const update_Artist = document.getElementById("update_Artist");
if(update_Artist != null){
update_Artist.addEventListener('click' , async function(){

    let table = "Artist"

    let setting = ""

    if(document.getElementById("Artist_Name_Update_Setting").value.length != 0 ){
        setting = setting + " Artist_Name = \'" + document.getElementById("Artist_Name_Update_Setting").value + "\' , ";
    }

    if(document.getElementById("Artist_CoB_Update_Setting").value.length != 0 ){
        setting = setting + " Artist_CoB = \'" + document.getElementById("Artist_CoB_Update_Setting").value + "\' , ";
    }

    if(document.getElementById("Artist_YoB_Update_Setting").value.length != 0 ){
        setting = setting + " Artist_YoB = " + document.getElementById("Artist_YoB_Update_Setting").value + " , ";
    }


    if(document.getElementById("Artist_YoD_Update_Setting").value.length != 0 ){
        setting = setting + " Artist_YoD = " + document.getElementById("Artist_YoD_Update_Setting").value + "";
    }


    let condition = ""

    if(document.getElementById("Artist_No_Update_Condition").value.length != 0 ){
        condition = condition + " Artist_No = " + document.getElementById("Artist_No_Update_Condition").value + " and ";
    }

    if(document.getElementById("Artist_Name_Update_Condition").value.length != 0 ){
        condition = condition + " Artist_Name = \'" + document.getElementById("Artist_Name_Update_Condition").value + "\' and ";
    }

    if(document.getElementById("Artist_CoB_Update_Condition").value.length != 0 ){
        condition = condition + " Artist_CoB = \'" + document.getElementById("Artist_CoB_Update_Condition").value + "\' and ";
    }

    if(document.getElementById("Artist_YoB_Update_Condition").value.length != 0 ){
        condition = condition + " Artist_YoB = " + document.getElementById("Artist_YoB_Update_Condition").value + " and ";
    }

    if(document.getElementById("Artist_YoD_Update_Condition").value.length != 0 ){
        condition = condition + " Artist_YoD = " + document.getElementById("Artist_YoD_Update_Condition").value + "";
    }

    if (setting == ""){
        alert("enter setting values before submitting")

    }

    if (condition == ""){
        alert("enter condition values before submitting")

    }

    else{
        // setting = setting.replaceAll(" ","")
        let x = setting.split(" ");
        if (x[x.length -2 ] == ','){
            setting = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                setting = setting + " "+x[i];
            }
        }

        let y = condition.split(" ");
        if (y[y.length -2 ] == 'and'){
            condition = ""
            for (let i = 0 ; i < y.length-2 ; i++){
                condition = condition + " "+y[i];
            }
        }
        
        console.log(setting)
        console.log(condition)

        update_entry(table,setting,condition)
        alert("entry updated")
    }

} )

}




const update_Cus = document.getElementById("update_Cus");
if(update_Cus != null){
update_Cus.addEventListener('click' , async function(){

    let table = "Customers"

    let setting = ""

    if(document.getElementById("Cus_Name_Update_Setting").value.length != 0 ){
        setting = setting + " Cus_Name = \'" + document.getElementById("Cus_Name_Update_Setting").value + "\' , ";
    }

    if(document.getElementById("Cus_Address_Update_Setting").value.length != 0 ){
        setting = setting + " Cus_Address = \'" + document.getElementById("Cus_Address_Update_Setting").value + "\' , ";
    }

    if(document.getElementById("Cus_Category_Update_Setting").value.length != 0 ){
        setting = setting + " Cus_Category_Update_Setting = \'" + document.getElementById("Cus_Category_Update_Setting").value + "\' ";
    }


    let condition = ""

    if(document.getElementById("Cus_No_Update_Condition").value.length != 0 ){
        condition = condition + " Cus_No = " + document.getElementById("Cus_No_Update_Condition").value + " and ";
    }

    if(document.getElementById("Cus_Name_Update_Condition").value.length != 0 ){
        condition = condition + " Cus_Name = \'" + document.getElementById("Cus_Name_Update_Condition").value + "\' and ";
    }

    if(document.getElementById("Cus_Address_Update_Condition").value.length != 0 ){
        condition = condition + " Cus_Address = \'" + document.getElementById("Cus_Address_Update_Condition").value + "\' and ";
    }


    if(document.getElementById("Cus_Category_Update_Condition").value.length != 0 ){
        condition = condition + " Cus_Category = " + document.getElementById("Cus_Category_Update_Condition").value + "";
    }

    if (setting == ""){
        alert("enter setting values before submitting")

    }

    if (condition == ""){
        alert("enter condition values before submitting")

    }

    else{
        // setting = setting.replaceAll(" ","")
        let x = setting.split(" ");
        if (x[x.length -2 ] == ','){
            setting = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                setting = setting + " "+x[i];
            }
        }

        let y = condition.split(" ");
        if (y[y.length -2 ] == 'and'){
            condition = ""
            for (let i = 0 ; i < y.length-2 ; i++){
                condition = condition + " "+y[i];
            }
        }
        
        console.log(setting)
        console.log(condition)

        update_entry(table,setting,condition)
        alert("entry updated")
    }

} )

}


const update_Painting = document.getElementById("update_Painting");
if(update_Painting != null){
update_Painting.addEventListener('click' , async function(){

    let table = "Painting"

    let setting = ""

    if(document.getElementById("Paint_Title_Update_Setting").value.length != 0 ){
        setting = setting + " Paint_Title = \'" + document.getElementById("Paint_Title_Update_Setting").value + "\' , ";
    }

    if(document.getElementById("Paint_Theme_Update_Setting").value.length != 0 ){
        setting = setting + " Paint_Theme = \'" + document.getElementById("Paint_Theme_Update_Setting").value + "\' , ";
    }

    if(document.getElementById("Paint_Price_Update_Setting").value.length != 0 ){
        setting = setting + " Paint_Price = \'" + document.getElementById("Paint_Price_Update_Setting").value + "\' , ";
    }


    if(document.getElementById("Paint_Artist_No_Update_Setting").value.length != 0 ){
        setting = setting + " Artist_No = \'" + document.getElementById("Paint_Artist_No_Update_Setting").value + "\' ";
    }


    let condition = ""

    if(document.getElementById("Paint_No_Update_Condition").value.length != 0 ){
        condition = condition + " Paint_No = " + document.getElementById("Paint_No_Update_Condition").value + " and ";
    }

    if(document.getElementById("Paint_Title_Update_Condition").value.length != 0 ){
        condition = condition + " Paint_Title = \'" + document.getElementById("Paint_Title_Update_Condition").value + "\' and ";
    }

    if(document.getElementById("Paint_Theme_Update_Condition").value.length != 0 ){
        condition = condition + " Paint_Theme = \'" + document.getElementById("Paint_Theme_Update_Condition").value + "\' and ";
    }

    if(document.getElementById("Paint_Price_Update_Condition").value.length != 0 ){
        condition = condition + " Paint_Price = " + document.getElementById("Paint_Price_Update_Condition").value + " and ";
    }


    if(document.getElementById("Paint_Artist_No_Update_Condition").value.length != 0 ){
        condition = condition + " Artist_No = " + document.getElementById("Paint_Artist_No_Update_Condition").value + " ";
    }

    if (setting == ""){
        alert("enter setting values before submitting")

    }

    if (condition == ""){
        alert("enter condition values before submitting")

    }

    else{
        // setting = setting.replaceAll(" ","")
        let x = setting.split(" ");
        if (x[x.length -2 ] == ','){
            setting = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                setting = setting + " "+x[i];
            }
        }

        let y = condition.split(" ");
        if (y[y.length -2 ] == 'and'){
            condition = ""
            for (let i = 0 ; i < y.length-2 ; i++){
                condition = condition + " "+y[i];
            }
        }
        
        console.log(setting)
        console.log(condition)

        update_entry(table,setting,condition)
        alert("entry updated")
    }

} )

}


const update_Hire = document.getElementById("update_Hire");
if(update_Hire != null){
update_Hire.addEventListener('click' , async function(){

    let table = "Hire"

    let setting = ""

    if(document.getElementById("Hire_Paint_No_Update_Setting").value.length != 0 ){
        setting = setting + " Paint_No = " + document.getElementById("Hire_Paint_No_Update_Setting").value + " , ";
    }

    if(document.getElementById("Hire_Cus_No_Update_Setting").value.length != 0 ){
        setting = setting + " Cus_No = " + document.getElementById("Hire_Cus_No_Update_Setting").value + " , ";
    }

    if(document.getElementById("Hire_D_H_Update_Setting").value.length != 0 ){
        setting = setting + " Hire_D_H = " + document.getElementById("Hire_D_H_Update_Setting").value + " , ";
    }

    if(document.getElementById("Hire_D_D_Update_Setting").value.length != 0 ){
        setting = setting + " Hire_D_D = " + document.getElementById("Hire_D_D_Update_Setting").value + "  ";
    }


    let Condition = ""

    if(document.getElementById("Hire_No_Update_Condition").value.length != 0 ){
        Condition = Condition + " Hire_ID = " + document.getElementById("Hire_No_Update_Condition").value + " and ";
    }

    if(document.getElementById("Hire_Paint_No_Update_Condition").value.length != 0 ){
        Condition = Condition + " Paint_No = " + document.getElementById("Hire_Paint_No_Update_Condition").value + " and ";
    }

    if(document.getElementById("Hire_Cus_No_Update_Condition").value.length != 0 ){
        Condition = Condition + " Cus_No = " + document.getElementById("Hire_Cus_No_Update_Condition").value + " and ";
    }

    if(document.getElementById("Hire_D_H_Update_Condition").value.length != 0 ){
        Condition = Condition + " Hire_D_H = " + document.getElementById("Hire_D_H_Update_Condition").value + " and ";
    }

    if(document.getElementById("Hire_D_D_Update_Condition").value.length != 0 ){
        Condition = Condition + " Hire_D_D = " + document.getElementById("Hire_D_D_Update_Condition").value + " ";
    }

    if (setting == ""){
        alert("enter setting values before submitting")

    }

    if (Condition == ""){
        alert("enter condition values before submitting")

    }

    else{
        // setting = setting.replaceAll(" ","")
        let x = setting.split(" ");
        if (x[x.length -2 ] == ','){
            setting = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                setting = setting + " "+x[i];
            }
        }

        let y = Condition.split(" ");
        if (y[y.length -2 ] == 'and'){
            Condition = ""
            for (let i = 0 ; i < y.length-2 ; i++){
                Condition = Condition + " "+y[i];
            }
        }
        
        console.log(setting)
        console.log(Condition)

        update_entry(table,setting,Condition)
        alert("entry updated")
    }

} )

}

const update_Owns = document.getElementById("update_Owns");
if(update_Owns != null){
update_Owns.addEventListener('click' , async function(){

    let table = "Owns"

    let setting = ""

    if(document.getElementById("Own_Paint_No_Update_Setting").value.length != 0 ){
        setting = setting + " Paint_No = " + document.getElementById("Own_Paint_No_Update_Setting").value + " , ";
    }

    if(document.getElementById("Own_Owner_No_Update_Setting").value.length != 0 ){
        setting = setting + " Owner_No = " + document.getElementById("Own_Owner_No_Update_Setting").value + " , ";
    }

    if(document.getElementById("Own_Return_Date_Update_Setting").value.length != 0 ){
        setting = setting + " Return_Date = " + document.getElementById("Own_Return_Date_Update_Setting").value + " ";
    }


    let Condition = ""

    if(document.getElementById("Own_No_Update_Condition").value.length != 0 ){
        Condition = Condition + " Owns_ID = " + document.getElementById("Own_No_Update_Condition").value + " and ";
    }

    if(document.getElementById("Own_Paint_No_Update_Condition").value.length != 0 ){
        Condition = Condition + " Paint_No = " + document.getElementById("Own_Paint_No_Update_Condition").value + " and ";
    }

    if(document.getElementById("Own_Owner_No_Update_Condition").value.length != 0 ){
        Condition = Condition + " Owner_No = " + document.getElementById("Own_Owner_No_Update_Condition").value + " and ";
    }

    if(document.getElementById("Own_Return_Date_Update_Condition").value.length != 0 ){
        Condition = Condition + " Return_Date = " + document.getElementById("Own_Return_Date_Update_Condition").value + " ";
    }

    if (setting == ""){
        alert("enter setting values before submitting")

    }

    if (Condition == ""){
        alert("enter condition values before submitting")

    }

    else{
        // setting = setting.replaceAll(" ","")
        let x = setting.split(" ");
        if (x[x.length -2 ] == ','){
            setting = ""
            for (let i = 0 ; i < x.length-2 ; i++){
                setting = setting + " "+x[i];
            }
        }

        let y = Condition.split(" ");
        if (y[y.length -2 ] == 'and'){
            Condition = ""
            for (let i = 0 ; i < y.length-2 ; i++){
                Condition = Condition + " "+y[i];
            }
        }
        
        console.log(setting)
        console.log(Condition)

        update_entry(table,setting,Condition)
        alert("entry updated")
    }
});
}


const insert_Owner = document.getElementById("insert_Owner");
if(insert_Owner != null){
    insert_Owner.addEventListener('click' , async function(){

        let table = "Owner"


        let values = ""

        let a = document.getElementById("Owner_No_insert").value
        let b = document.getElementById("Owner_Name_insert").value
        let c =  document.getElementById("Owner_Tel_insert").value
        let d = document.getElementById("Owner_Address_insert").value

    if(a.length != 0 && b.length != 0 && c.length != 0 && d.length != 0){
        if(b != 'null' && c.length == 11 ){
            if(await validate( table,a) == 0){
            values = a + ", \'" + b + "\' , " + c + " , \'" + d +"\' "
            insert_entry(table,values)
            }
            else{
                alert("primary key already present")
            }
        }
        else{
            alert("make sure \n1)name is not null \n2) tel has a 11 digit length");
        }
    }
    else{
        alert("please fill all the field \n ps put null if nothing is available and the value can be null")
    }
    });
}


const insert_Artist = document.getElementById("insert_Artist");
if(insert_Artist != null){
    insert_Artist.addEventListener('click' , async function(){

        let table = "Artist"


        let values = ""

        let a = document.getElementById("Artist_No_insert").value
        let b = document.getElementById("Artist_Name_insert").value
        let c =  document.getElementById("Artist_CoB_insert").value
        let d = document.getElementById("Artist_YoB_insert").value
        let e = document.getElementById("Artist_YoD_insert").value

    if(a.length != 0 && b.length != 0 && c.length != 0 && d.length != 0 && e.lenght != 0){
            let x = await validate(table,a)
            console.log(x)
            if(x == 0){
            values = a + ", \'" + b + "\' , \'" + c + "\' , " + d +" , " + e +""
            insert_entry(table,values)
            }
            else{
                alert("primary key already present")
            }
        }
    else{
        alert("please fill all the field \n ps put null if nothing is available and the value can be null")
    }
    });

}

const insert_Cus = document.getElementById("insert_Cus");
if(insert_Cus != null){
    insert_Cus.addEventListener('click' , async function(){

        let table = "Customers"


        let values = ""

        let a = document.getElementById("Cus_No_insert").value
        let b = document.getElementById("Cus_Name_insert").value
        let c =  document.getElementById("Cus_Address_insert").value
        let d = document.getElementById("Cus_Category_insert").value
        
    if(a.length != 0 && b.length != 0 && c.length != 0 && d.length != 0 ){
            if(b != "null" ){
            let x = await validate(table,a)
            console.log(x)
            if(x == 0){
            values = a + ", \'" + b + "\' , \'" + c + "\' , \'" + d +"\' "
            insert_entry(table,values)
            }
            else{
                alert("primary key already present")
            }
        }
        else{
            alert("make sure \n1)name is not null \n2) tel has a 11 digit length");
        }
        }
    else{
        alert("please fill all the field \n ps put null if nothing is available and the value can be null")
    }
    });

}

const insert_Painting = document.getElementById("insert_Painting");
if(insert_Painting != null){
    insert_Painting.addEventListener('click' , async function(){

        let table = "Painting"


        let values = ""

        let a = document.getElementById("Paint_No_insert").value
        let b = document.getElementById("Paint_Title_insert").value
        let c =  document.getElementById("Paint_Theme_insert").value
        let d = document.getElementById("Paint_Price_insert").value
        let e = document.getElementById("Paint_Artist_No_insert").value

    if(a.length != 0 && b.length != 0 && c.length != 0 && d.length != 0 && e.lenght != 0){
            if(c != "null"){
            let x = await validate(table,a)
            console.log(x)
            if(x == 0){
            values = a + ", \'" + b + "\' , \'" + c + "\' , " + d +" , " + e +""
            insert_entry(table,values)
            }
            else{
                alert("primary key already present")
            }
        }
        else{
            alert("make sure \n1)name is not null ");
        }
        }
    else{
        alert("please fill all the field \n ps put null if nothing is available and the value can be null")
    }
    });

}



const insert_Owns = document.getElementById("insert_Owns");
if(insert_Owns != null){
    insert_Owns.addEventListener('click' , async function(){

        let table = "Owns"


        let values = ""

        let a = document.getElementById("Own_No_Insert").value
        let b = document.getElementById("Own_Paint_No_insert").value
        let c =  document.getElementById("Own_Owner_No_insert").value
        let d = document.getElementById("Own_Return_Date_insert").value

    if(a.length != 0 && b.length != 0 && c.length != 0 && d.length != 0 ){
            let x = await validate(table,a)
            console.log(x)
            if(x == 0){
            values = a + ", \'" + b + "\' , \'" + c + "\' , " + d 
            insert_entry(table,values)
            }
            else{
                alert("primary key already present")
            }
        }
    else{
        alert("please fill all the field \n ps put null if nothing is available and the value can be null")
    }
    });

}

const insert_Hire = document.getElementById("insert_Hire");
if(insert_Hire != null){
    insert_Hire.addEventListener('click' , async function(){

        let table = "Hire"


        let values = ""

        let a = document.getElementById("Hire_No_insert").value
        let b = document.getElementById("Hire_Paint_No_insert").value
        let c =  document.getElementById("Hire_Cus_No_insert").value
        let d = document.getElementById("Hire_D_H_insert").value
        let e = document.getElementById("Hire_D_D_insert").value

    if(a.length != 0 && b.length != 0 && c.length != 0 && d.length != 0 && e.lenght != 0){
            let x = await validate(table,a)
            console.log(x)
            if(x == 0){
            values = a + ", " + b + " , " + c + " , " + d +" , " + e +""
            insert_entry(table,values)
            }
            else{
                alert("primary key already present")
            }
        }
    else{
        alert("please fill all the field \n ps put null if nothing is available and the value can be null")
    }
    });

}


async function validate(table,id){
    x= await fetch ('/validate_entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Table:  table,
            id: id
            // print: console.log("asv")
        })
    })

    x = await x.json()
    console.log(x.rows[0][0] == 0)
    return x.rows[0][0]
}


async function delete_entry(table, condition){
         await fetch ('/delete_entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Table:  table,
            condition: condition
            // print: console.log("asv")
        })
    })
}

async function update_entry(table, setting,condition){
    await fetch ('/update_entry', {
   method: 'POST',
   headers: {
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({
       Table:  table,
       setting : setting,
       condition: condition
   })
})
}

async function insert_entry(table , values){
    await fetch ('/insert_entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Table:  table,
            values : values
        })
     })
}




const show_cus_report = document.getElementById('show_cus_report');
if (show_cus_report != null) {
    show_cus_report.addEventListener('click', async function(my_var) {
        const body = document.querySelector('body');
        body.innerHTML = '<h1>Report ~ Customer</h1>'+
        '<div class = "field">'+
            '<label for="textfield">Customer_No:</label>'+
            '<input type="number" id="Cus_No_Report" name="textfield" value="John Doe" disabled>'+
    
            '<label for="textfield" style = "margin-left: 200px;">Customer_Category:</label>'+
            '<input type="text" id="Cus_Category_Report" name="textfield" value="John Doe" disabled>'+
        '</div>'+
    
        '<div class="field">'+
            '<label for="textfield">Customer_Name:</label>'+
            '<input type="text" id="Cus_Name_Report" name="textfield" value="" disabled>'+
    
            '<label for="textfield" style = "margin-left: 200px;">Category_Description:</label>'+
            '<input type="text" id="Cat_Description_Report" name="textfield" value="" disabled> <br>'+
        '</div>'+
    
        '<div class = "field">'+
            '<label for="textfield">Customer_Address:</label>'+
            '<input type="text" id="Cus_Address_Report" name="textfield" value="" disabled>'+
    
            '<label for="textfield" style = "margin-left: 200px;">Category_Discount:</label>'+
            '<input type="text" id="Cat_Discount_Report" name="textfield" value="" disabled> <br>'+
        '</div>'+
        
        '<div class = container_table >'+
            '<table id="table_report_customer">'+
                '<tr>'+
                '<th>Painting_No</th>'+
                '<th>Painting_Title</th>'+
                '<th>Theme</th>'+
                '<th>Date_Hire</th>'+
                '<th>Date_Due_Back</th>'+
                '<th>Returned</th>'+
                '</tr>'+
                '<tr>'+
                '<td>John Doe</td>'+
                '<td>30</td>'+
                '<td>Male</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Jane Doe</td>'+
                '<td>28</td>'+
                '<td>Female</td>'+
                '</tr>'+
            '</table>'+
            '<div class = "btn" >'+
                '<button type="button" onclick = "location.href = \'\\Report_Owner.html\'"  class="btn btn-primary">Back</button>'
            '</div>'+ 
        '</div>'
        let x = localStorage.getItem('object_table');
        let y = localStorage.getItem('object_upper');
        object_table = JSON.parse(x);
        object_upper = JSON.parse(y);

        if(object_upper.length != 0){
        set_report_customer();
        }
        else{
            location.href = "/Not_found.html";
        }
        });

        
    }

// -----------------------------------------------------------

const show_artist_report = document.getElementById('show_artist_report');
if (show_artist_report != null) {
    show_artist_report.addEventListener('click', async function(my_var) {
        const body = document.querySelector('body');
        body.innerHTML = '<h1>Report ~ Artist</h1>'+
        '<div class = "field">'+
            '<label for="textfield">Artist_No:</label>'+
            '<input type="number" id="Artist_No_Report" name="textfield" value="John Doe" disabled>'+

            '<label for="textfield" style = "margin-left: 200px;">Year_of_Birth:</label>'+
            '<input type="text" id="Artist_YoB_Report" name="textfield" value="John Doe" disabled>'+
    
            '<label for="textfield" style = "margin-left: 10px;">Age:</label>'+
            '<input type="number" id="Artist_Age_Report" name="textfield" value="John Doe" disabled><br>'+
        '</div>'+
    
        '<div class="field">'+
            '<label for="textfield">Artist_Name:</label>'+
            '<input type="text" id="Artist_Name_Report" name="textfield" value="" disabled>'+
    
            '<label for="textfield" style = "margin-left: 200px;">Artist_YoD:</label>'+
            '<input type="text" id="Artist_YoD_Report" name="textfield" value="" disabled> <br>'+
        '</div>'+
    
        '<div class = "field">'+
            '<label for="textfield">Artist_CoB:</label>'+
            '<input type="text" id="Artist_CoB_Report" name="textfield" value="" disabled>'+
        '</div>'+
        
        '<div class = container_table >'+
            '<table id = "table_report_artist">'+
                '<tr>'+
                '<th>Painting_No</th>'+
                '<th>Painting_Title</th>'+
                '<th>Theme</th>'+
                '<th>Rental_price</th>'+
                '<th>Owner_No</th>'+
                '<th>Owner_Name</th>'+
                '<th>Owner_Tel</th>'+
                '</tr>'+
                '<tr>'+
                '<td>John Doe</td>'+
                '<td>30</td>'+
                '<td>Male</td>'+
                '</tr>'+
                '<tr>'+
            '</table>'+
            '<div class = "btn">'+
                '<button type="button" onclick = "location.href = \'\\Report_Artist.html\'"   class="btn btn-primary">Back</button>'+
            '</div> '+
        '</div>'
        let x = localStorage.getItem('object_table');
        let y = localStorage.getItem('object_upper');
        object_table = JSON.parse(x);
        object_upper = JSON.parse(y);

        if(object_upper.length != 0){
        set_report_artist();
        }
        else{
            location.href = "/Not_found.html";
        }
        });

        
    }


// -----------------------------------------------------------

const show_owner_report = document.getElementById('show_owner_report');
if (show_owner_report != null) {
    show_owner_report.addEventListener('click', async function(my_var) {
        const body = document.querySelector('body');
        body.innerHTML =  '<h1>Report ~ Owner</h1>'+
        '<div class = "field">'+
            '<label for="textfield">Owner_No:</label>'+
            '<input type="number" id="Owner_No_Report" name="textfield" value="John Doe" disabled>'+
    
            '<label for="textfield">Owner_Name:</label>'+
            '<input type="text" id="Owner_Name_Report" name="textfield" value="John Doe" disabled><br>'+
        '</div>'+
    
        '<div class="field">'+
            '<label for="textfield">Owner_Address:</label>'+
            '<input type="text" id="Owner_Address_Report" name="textfield" value=" " disabled>'+
        '</div>'+
        
        '<div class = container_table >'+
            '<table id = "table_report_owner">'+
                '<tr>'+
                '<th>Painting_No</th>'+
                '<th>Painting_Title</th>'+
                '<th>Return_Date</th>'+
                '</tr>'+
                '<tr>'+
                '<td>John Doe</td>'+
                '<td>30</td>'+
                '<td>Male</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Jane Doe</td>'+
                '<td>28</td>'+
                '<td>Female</td>'+
                '</tr>'+
            '</table>'+
            '<div class = "btn" >'+
                '<button type="button"   onclick = "location.href = \'\\Report_Owner.html\'" class="btn btn-primary">Back</button>'+
            '</div>'+
        '</div>';
        let x = localStorage.getItem('object_table');
        let y = localStorage.getItem('object_upper');
        object_table = JSON.parse(x);
        object_upper = JSON.parse(y);

        if(object_upper.length != 0){
        set_report_owner();
        }
        else{
            location.href = "/Not_found.html";
        }
        });

        
    }




// -----------------------------------------------------------------------------------------

function set_report_customer(){
    
    
    document.getElementById("Cus_No_Report").value = object_upper[0][0];
    document.getElementById("Cus_Category_Report").value = object_upper[0][3];
    document.getElementById("Cus_Name_Report").value = object_upper[0][1];
    document.getElementById("Cus_Address_Report").value = object_upper[0][2];
    document.getElementById("Cat_Description_Report").value = object_upper[0][6];
    document.getElementById("Cat_Discount_Report").value = object_upper[0][5];

    
    var table = document.getElementById("table_report_customer");
    if (table == null) {
        console.log(table);
    }

    if (table != null) {
        console.log("table is not null");
    }
    table.innerHTML = "";
    var newRow = table.insertRow(0);
    var newCell1 = newRow.insertCell(0);
    var newCell2 = newRow.insertCell(1);
    var newCell3 = newRow.insertCell(2);
    var newCell4 = newRow.insertCell(3);
    var newCell5 = newRow.insertCell(4);
    var newCell6 = newRow.insertCell(5);
    

    // Insert cells into the new row
    newCell1.innerHTML = "Painting_No";
    newCell2.innerHTML = "Painting_Title"; 
    newCell3.innerHTML = "Theme";
    newCell4.innerHTML = "Date_Hire";
    newCell5.innerHTML = "Date_Due_Back";
    newCell6.innerHTML = "Returned";

    
    for (let i = 0; i < object_table.length; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = object_table[i][0];
        cell2.innerHTML = object_table[i][1];
        cell3.innerHTML = object_table[i][2];
        cell4.innerHTML = object_table[i][3];
        cell5.innerHTML = object_table[i][4];
        cell6.innerHTML = object_table[i][5];
    }
}

function set_report_artist(){
    
    
    document.getElementById("Artist_No_Report").value = object_upper[0][0];
    document.getElementById("Artist_YoB_Report").value = object_upper[0][3];
    document.getElementById("Artist_Age_Report").value = object_upper[0][4] - object_upper[0][3] ;
    document.getElementById("Artist_Name_Report").value = object_upper[0][1];
    document.getElementById("Artist_YoD_Report").value = object_upper[0][4];
    document.getElementById("Artist_CoB_Report").value = object_upper[0][2];


    var table = document.getElementById("table_report_artist");
    if (table == null) {
        console.log(table);
    }

    if (table != null) {
        console.log("table is not null");
    }
    table.innerHTML = "";
    var newRow = table.insertRow(0);
    var newCell1 = newRow.insertCell(0);
    var newCell2 = newRow.insertCell(1);
    var newCell3 = newRow.insertCell(2);
    var newCell4 = newRow.insertCell(3);
    var newCell5 = newRow.insertCell(4);
    var newCell6 = newRow.insertCell(5);
    var newCell7 = newRow.insertCell(6);
    

    // Insert cells into the new row
    newCell1.innerHTML = "Painting_No";
    newCell2.innerHTML = "Painting_Title"; 
    newCell3.innerHTML = "Theme";
    newCell4.innerHTML = "Rental_price";
    newCell5.innerHTML = "Owner_No";
    newCell6.innerHTML = "Owner_Name";
    newCell7.innerHTML = "Owner_Tel"; 


    
    for (let i = 0; i < object_table.length; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        cell1.innerHTML = object_table[i][0];
        cell2.innerHTML = object_table[i][1];
        cell3.innerHTML = object_table[i][2];
        cell4.innerHTML = object_table[i][3];
        cell5.innerHTML = object_table[i][4];
        cell6.innerHTML = object_table[i][5];
        cell7.innerHTML = object_table[i][6];
    }
}
    
function set_report_owner(){
    
    
    document.getElementById("Owner_No_Report").value = object_upper[0][0];
    document.getElementById("Owner_Name_Report").value = object_upper[0][1];
    document.getElementById("Owner_Address_Report").value = object_upper[0][3] ;
    

    var table = document.getElementById("table_report_owner");
    if (table == null) {
        console.log(table);
    }

    if (table != null) {
        console.log("table is not null");
    }
    table.innerHTML = "";
    var newRow = table.insertRow(0);
    var newCell1 = newRow.insertCell(0);
    var newCell2 = newRow.insertCell(1);
    var newCell3 = newRow.insertCell(2);

    

    // Insert cells into the new row
    newCell1.innerHTML = "Painting_No";
    newCell2.innerHTML = "Painting_Title"; 
    newCell3.innerHTML = "Return Date";



    
    for (let i = 0; i < object_table.length; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        
        cell1.innerHTML = object_table[i][0];
        cell2.innerHTML = object_table[i][1];
        cell3.innerHTML = object_table[i][2];
    }
}


async function login_auth(my_var_id){
    // console.log("asb");
    x = await fetch ('/login_auth', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        Username:  document.getElementById('username').value,
        Password: document.getElementById('password').value,
        Type : document.getElementById('As_Admin').checked,
        // print: console.log("asv")
    })
})

x = await x.json();
return x.rows;
}





async function fetching_report_cus(my_var_id){
    x = await fetch ('/search_report_cus', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        Cus_No_Search:  document.getElementById(my_var_id).value
    })

})
x = await x.json();
return x.rows;
}

async function fetching_report_artist(my_var_id){
    x = await fetch ('/search_report_artist', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        Cus_No_Search:  document.getElementById(my_var_id).value
    })

})
x = await x.json();
return x.rows;
}

async function fetching_report_owner(my_var_id){
    x = await fetch ('/search_report_owner', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        Cus_No_Search:  document.getElementById(my_var_id).value
    })

})
x = await x.json();
return x.rows;
}

async function fetching_top(my_var_id, table_name , id_tag){
    x = await fetch ('http://localhost:3000/search_upper', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        table_Name: table_name,
        condition: id_tag + ' = ' + document.getElementById(my_var_id).value
    })

})
x = await x.json();
return x;
}

async function fetching_top_w_join(my_var_id, table_name , id_tag, table_join, on_condition_1st, on_condition_2nd){
    x = await fetch ('http://localhost:3000/search_upper_w_join', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        table_Name:  '( '+ table_name + ' inner join ' +table_join +' on ' + table_name +'.'+on_condition_1st + ' = ' + table_join +'.'+on_condition_2nd +' And ' + id_tag + ' = ' + document.getElementById(my_var_id).value + ' )'
    })

})
x = await x.json();
return x;
}


