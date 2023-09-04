const express = require('express');
const app = express();
// import {Search_with_condition,generate_report_c,generate_report_a,generate_report_o} from './searching';
const searching = require('./controller/searching');
const modify = require('./controller/modify.js')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');



app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile( parent+ '/View/login.html');
});

app.get('/sign_up.html', (req, res) => {
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile( parent+ '/View/sign_up.html');
});

app.get('/Home_Admin.html', (req, res) => {
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile( parent+ '/View/Home_Admin.html');
});

app.get('/Home_User.html', (req, res) => {
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile( parent+ '/View/Home_User.html');
});

app.get('/Report_Customer.html', (req, res) => {
  // console.log(path_resolve(__dirname));
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile(parent+'/View/Report_Customer.html');
});

app.get('/Report_Artist.html', (req, res) => {
  // console.log(path_resolve(__dirname));
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile(parent+'/View/Report_Artist.html');

});

app.get('/Report_Owner.html', (req, res) => {
  // console.log(path_resolve(__dirname));
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile(parent+'/View/Report_Owner.html');

});

app.get('/delete.html',(req,res)=>{
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile(parent+'/View/delete.html');
})

app.get('/Update.html',(req,res)=>{
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile(parent+'/View/Update.html');
})

app.get('/Insert.html',(req,res)=>{
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile(parent+'/View/Insert.html');
})

app.get('/Not_found.html', (req, res) => {
  // console.log(path_resolve(__dirname));
  const parent = path.resolve(__dirname, '..');
  // console.log(parent);
  res.sendFile(parent+'/View/Not_found.html');

});

app.post('/delete_entry', async function(req,res){
   await modify.Delete(req.body.Table , req.body.condition);
   res.send("element deleted")
})

app.post('/validate_entry', async function(req,res){
  // await searching.validate(req.body.Table , req.body.id);
  x = await searching.validate(req.body.Table , req.body.id);
  // console.log(x)
  res.send(x)
})


app.post('/update_entry', async function(req,res){
  await modify.Update(req.body.Table , req.body.setting ,req.body.condition);
  // console.log("server")
  res.send("element updated")
})

app.post('/insert_entry', async function(req,res){
  await modify.Insert(req.body.Table , req.body.values);
  res.send("element added")
})


app.post('/login_auth',async function (req,res){
    // console.log(req.body.Username);
    // console.log(req.body.Password);
    // console.log(req.body.Type);
    let x = ''
    if(req.body.Type == true){
      x = 'admin'
    }
    else {
      x = 'User'
    }
    y = await searching.Search_Users(req.body.Username, req.body.Password , x)
    // console.log(y)
    res.send (y);
    // res.send(y);
});

app.post('/sign_up_User', async function(req,res){
  // console.log(req.body.password)
  await modify.insertUser(req.body.Username, req.body.password)
  res.send('user added')
})




app.post('/search_report_cus',async function (req,res){
    // console.log(String(req.body.Cus_No_Search));
    let x = String(req.body.Cus_No_Search);
    // console.log("meawww")
    // console.log(await searching.generate_report_c(parseInt(x)));
    res.send (await searching.generate_report_c(parseInt(x)));
});

app.post('/search_report_artist',async function (req,res){
  // console.log(String(req.body.Cus_No_Search));
  let x = String(req.body.Cus_No_Search);
  // console.log("meawww")
  // console.log(await searching.generate_report_c(parseInt(x)));
  res.send (await searching.generate_report_a(parseInt(x)));
});

app.post('/search_report_owner',async function (req,res){
  // console.log(String(req.body.Cus_No_Search));
  let x = String(req.body.Cus_No_Search);
  // console.log("meawww")
  // console.log(await searching.generate_report_c(parseInt(x)));
  res.send (await searching.generate_report_o(parseInt(x)));
});

app.post('/search_upper',async function (req,res){
  let condition = String(req.body.condition);
  let table_name = String(req.body.table_Name); 
  res.send (await searching.Search_with_condition(table_name,condition));
});


// search_upper_w_join

app.post('/search_upper_w_join',async function (req,res){

  let condition = String(req.body.condition);

  let table_name = String(req.body.table_Name); 
  res.send (await searching.Search_with_join(table_name));
});

app.get('/controller/front_end_Controller.js',(req,res) =>{

    res.sendFile('C:/Users/muham/OneDrive/Desktop/DB_project/controller/front_end_Controller.js');
});



app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
