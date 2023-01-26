const connection = require('./connection_DB');
// create sql tables
async function createTable() {
    let connect = await connection();
    // creating tables
    connect.execute(''+
    'create Table Category('+
        'Cat VarChar(1) check (Cat = \'B\' or Cat = \'S\' or Cat = \'G\' or Cat = \'P\') , Constraint PK Primary key (Cat),'+
        'Cat_Discount Integer not Null,'+
        'Cat_Description VarChar(30)'+
        ');'+
    
    'create Table Customers('+
        'Cus_No INTEGER , Constraint PK_Cus primary key (Cus_No) ,' +
        'Cus_Name VarChar2(30) not null,'+
        'Cus_Address VarChar2(70),' +
        'Cus_Category VarChar(1), Constraint FK_Cus Foreign Key (Cus_Category) references Category(Cat) '+
        ');'+
            
    'create Table Artist('+
        'Artist_No Integer , Constraint PK_Artist Primary key (Artist_No),' +
        'Artist_Name Varchar2(30),' +
        'Artist_CoB Varchar2(30),' +
        'Artist_YoB Number(4),' +
        'Artist_YoD Number(4)' +
        ');'+
            
    'create Table Owner('+
        'Owner_No Integer, Constraint PK_Owner primary key (Owner_No),' +
        'Owner_Name Varchar2(30) not null,' +
        'Owner_Tel Integer,' +
        'Owner_Address Varchar2(40)' +
        ');'+
        
    'create Table Painting('+
        'Paint_No Integer , constraint PK_Paint Primary Key (Paint_No),' +
        'Paint_Title VarChar2(30),' +
        'Paint_Theme VarChar2(30) not null,' +
        'Paint_Price Integer not null,' +
        'Artist_No Integer , Constraint FK_Paint Foreign Key (Artist_No) references Artist (Artist_No),' +
        'Status VarChar2(1) check (Status = \'H\' or Status = \'S\')' +
        ');'+
        
    'create Table Owns('+
        'Paint_No integer not Null , Constraint FK_Paint_No_Owns foreign key (Paint_No) references Painting(Paint_No),' +
        'Owner_No Integer , Constraint FK_Owner_N_Owns foreign key(Owner_No) references Owner(Owner_No),' +
        'Return_date date not Null,' +
        'Owns_ID integer , Constraint  PK_Owns Primary Key (Owns_ID)' +
        ');'+
            
    'create Table Hire(' +
        'Paint_No integer not Null, Constraint FK_Paint_No_Hire Foreign key (Paint_No) references Painting(Paint_No),' +
        'Cus_No integer not Null, Constraint FK_Cus_No_Hire Foreign key (Cus_No) references Customers(Cus_No),' +
        'Hire_D_D date,' +
        'Hire_D_H date not Null,' +
        'Returned VarChar2(1) check (Returned = \'Y\' or Returned = \'N\'),' +
        'Hire_ID Integer, Constraint PK_Hire Primary key(Hire_ID)' +
    ');'
        );

        connect.close();
        
        
}

async function createTriggers(){
// write the triggers here
let connect = await connection();
// creating tables
connect.execute(''+
'CREATE OR REPLACE TRIGGER delete_Owner'+
'AFTER DELETE ON Owner'+
'FOR EACH ROW'+
'BEGIN'+
   'Update owns set Owner_No = null where owns.Owner_No = :old.Owner_No;'+
'END;'+


'CREATE OR REPLACE TRIGGER delete_Artist'+
'AFTER DELETE ON Artist'+
'FOR EACH ROW'+
'BEGIN'+
   'Update Painting set Painting.Artist_No = null where Painting.Artist_No = :old.Artist_No;'+
'END;'+

'CREATE OR REPLACE TRIGGER delete_Cus'+
'Before DELETE ON Customers'+
'FOR EACH ROW'+
'BEGIN'+
   'delete from Hire where Hire.Cus_No = :old.Cus_No;'+
'END;'+



'CREATE OR REPLACE TRIGGER delete_Painting'+
'Before DELETE ON Painting'+
'FOR EACH ROW'+
'BEGIN'+
   'delete from Hire where Hire.Paint_No = :old.Paint_No;'+
   'delete from Owns where Owns.Paint_No = :old.Paint_No;'+
'END;'+

'CREATE OR REPLACE TRIGGER check_owner_tel'+
'BEFORE INSERT OR UPDATE'+
'ON Owner'+
'FOR EACH ROW'+
'BEGIN'+
'IF :new.Owner_Tel > 11 THEN'+
  'RAISE_APPLICATION_ERROR(-20001, \'Owner_Tel cannot be greater than 11 digits\');'+
'END IF;'+
'END;'

);

connect.close();
}

async function createFunctions(){
    let connect = await connection();
    connect.execute(''+
    'create Table app_Users('+
      'Username VarChar(30),'+
      'UserPassword VarChar(20),'+
      'UserType VarChar(5) check (UserType = \'admin\' or UserType = \'User\') '+
      ');'+

      'Insert into app_Users '+
      'values (\'admin\',\'admin\',\'admin\');'+

'CREATE OR REPLACE TYPE report_c AS object ('+
    'Paint_No Integer,'+
    'Paint_Title VarChar2(30),'+
    'Paint_Theme VarChar2(30),'+
    'Hire_D_H date,'+
    'Hire_D_D date,'+
    'Returned VarChar(1)'+
 ');'+
 
 'CREATE OR REPLACE TYPE report_o AS object ('+
     'Paint_No Integer,'+
     'Paint_Title VarChar2(30),'+
     'Return_Date Date'+
 ');'+
 
 'CREATE OR REPLACE TYPE report_a AS object ('+
     'Paint_No Integer,'+
     'Paint_Title VarChar2(30),'+
     'Paint_Theme VarChar2(30),'+
     'Paint_Price Integer,'+
     'Owner_No Integer,'+
     'Owner_Name Varchar2(30),'+
     'Owner_Tel Integer'+
 ');'+
 
 
 
 'CREATE OR REPLACE TYPE Report_Artist_type AS TABLE OF report_a;'+
 
 
 'Create or Replace Type Report_Cus_Type As Table of report_c;'+
 
 
 'Create or Replace Type Report_Owner_Type As Table of report_o;'+
 
 
 'Create or Replace Function Report_Cus (Cus_No_func Integer)'+
 'return Report_Cus_Type'+
 'is'+
     'Paint_No Integer;'+
     'Paint_Title VarChar2(30);'+
     'Paint_Theme VarChar2(30);'+
     'Hire_Cus_No integer;'+
     'Hire_D_H date;'+
     'Hire_D_D date;'+
     'Returned VarChar(1);'+
 
     'Report_Table Report_Cus_Type := Report_Cus_Type();'+
 
 'begin'+
     'Report_Table.Extend();'+
     
     'Select report_c(Painting.Paint_No, Painting.Paint_Title, Painting.Paint_Theme, Hire.Hire_D_H, Hire.Hire_D_D, Hire.Returned)'+
     'bulk collect into Report_Table'+
     'from ((Painting inner join Hire on Hire.Paint_No = Painting.Paint_No) inner join Customers on Customers.Cus_No = Hire.Cus_No and Customers.Cus_No = Cus_No_func);'+
     'return Report_Table;'+
 'end;'+
 
 
 'Create or Replace Function Report_Artist (Artist_No_func Integer)'+
 'return Report_Artist_Type'+
 'is'+
     'Paint_No Integer;'+
     'Paint_Title VarChar2(30);'+
     'Paint_Theme VarChar2(30);'+
     'Paint_Price Integer;'+
     'Owner_No Integer;'+
     'Owner_Name Varchar2(30);'+
     'Owner_Tel Integer;'+
     
     'Report_Table Report_Artist_Type := Report_Artist_Type();'+
 
 'begin'+
     'Report_Table.Extend();'+
     
     'Select report_a(Painting.Paint_No, Painting.Paint_Title, Painting.Paint_Theme, Painting.Paint_Price, Owner.Owner_No, Owner.Owner_Name, Owner.Owner_Tel)'+
     'bulk collect into Report_Table'+
     'from (((Painting inner join Artist on Painting.Artist_No = Artist.Artist_No And Artist.Artist_No = Artist_No_func) inner join Owns on Owns.Paint_No = Painting.Paint_No ) inner join Owner on Owns.Owner_No = Owner.Owner_No);'+
     'return Report_Table;'+
 'end;'+
 
 
 'Create or Replace Function Report_Owner (Owner_No_func Integer)'+
 'return Report_Owner_Type'+
 'is'+
     'Paint_No Integer;'+
     'Paint_Title VarChar2(30);'+
     'Return_Date Date;'+
 
     'Report_Table Report_Owner_Type := Report_Owner_Type();'+
 
 'begin'+
     'Report_Table.Extend();'+
     
     'Select report_o(Painting.Paint_No, Painting.Paint_Title,Owns.Return_Date)'+
     'bulk collect into Report_Table'+
     'from ((Painting inner join Owns on Owns.Paint_No = Painting.Paint_No) inner join Owner on Owner.Owner_No = Owns.Owner_No and Owner.Owner_No = Owner_No_func);'+
     'return Report_Table;'+
 'end;'+

 'CREATE OR REPLACE FUNCTION owner_present (p_id IN Integer)'+
   'RETURN NUMBER'+
'AS'+
   'v_count NUMBER;'+
'BEGIN'+
   
   'SELECT COUNT(*)  INTO v_count FROM owner  WHERE owner_no = p_id;'+
   
   'RETURN v_count;'+
'END;'+

'CREATE OR REPLACE FUNCTION artist_present (p_id IN Integer)'+
   'RETURN NUMBER'+
'AS'+
   'v_count NUMBER;'+
'BEGIN'+
   
   'SELECT COUNT(*)  INTO v_count FROM Artist  WHERE artist_no = p_id;'+
   
   'RETURN v_count;'+
'END;'+


'CREATE OR REPLACE FUNCTION painting_present (p_id IN Integer)'+
   'RETURN NUMBER'+
'AS'+
   'v_count NUMBER;'+
'BEGIN'+
   
   'SELECT COUNT(*)  INTO v_count FROM Painting  WHERE paint_no = p_id;'+
   
   'RETURN v_count;'+
'END;'+

'CREATE OR REPLACE FUNCTION Customers_present (p_id IN Integer)'+
   'RETURN NUMBER'+
'AS'+
   'v_count NUMBER;'+
'BEGIN'+
   
   'SELECT COUNT(*)  INTO v_count FROM Customers  WHERE cus_no = p_id;'+
   
   'RETURN v_count;'+
'END;'+

'CREATE OR REPLACE FUNCTION Hire_present (p_id IN Integer)'+
   'RETURN NUMBER'+
'AS'+
   'v_count NUMBER;'+
'BEGIN'+
   
   'SELECT COUNT(*)  INTO v_count FROM Hire  WHERE Hire_id = p_id;'+
   
   'RETURN v_count;'+
'END;'+

'CREATE OR REPLACE FUNCTION owns_present (p_id IN Integer)'+
   'RETURN NUMBER'+
'AS'+
   'v_count NUMBER;'+
'BEGIN'+
   
   'SELECT COUNT(*)  INTO v_count FROM owns  WHERE owns_id = p_id;'+
   
   'RETURN v_count;'+
'END;'+

 
'CREATE OR REPLACE PROCEDURE delete_owner_with_or ('+
   'Owner_no NUMBER,'+
   'Owner_name VARCHAR2,'+
   'Owner_Tel NUMBER,'+
   'Owner_Address VARCHAR2'+
 ')'+
 'AS'+
 'BEGIN'+
   'DELETE FROM Owner'+
   'WHERE Owner.Owner_no = Owner_no'+
   'OR Owner.Owner_name = Owner_name'+
   'OR Owner.Owner_Tel = Owner_Tel'+
   'OR Owner.Owner_Address = Owner_Address;'+
 'END;'+
 
 
 'CREATE OR REPLACE PROCEDURE delete_owner_with_and ('+
   'p_Owner_no NUMBER,'+
   'p_Owner_name VARCHAR2,'+
   'p_Owner_Tel NUMBER,'+
   'p_Owner_Address VARCHAR2'+
 ')'+
 'AS'+
 'BEGIN'+
   'DELETE FROM Owner'+
   'WHERE Owner_no = p_Owner_no'+
   'AND Owner_name = p_Owner_name'+
   'AND Owner_Tel = p_Owner_Tel'+
   'AND Owner_Address = p_Owner_Address;'+
 'END;'+
 
 
 'CREATE OR REPLACE PROCEDURE delete_owner_by_no ('+
   'p_Owner_no NUMBER'+
 ')'+
 'AS'+
 'BEGIN'+
   'DELETE FROM Owner WHERE Owner_no = p_Owner_no;'+
 'END;'+
 
 'CREATE OR REPLACE PROCEDURE delete_owner_by_name ('+
   'p_Owner_name VARCHAR2'+
 ')'+
 'AS'+
 'BEGIN'+
   'DELETE FROM Owner WHERE Owner_name = p_Owner_name;'+
 'END;'+
 
 'CREATE OR REPLACE PROCEDURE delete_owner_by_tel ('+
   'p_Owner_Tel NUMBER'+
 ')'+
 'AS'+
 'BEGIN'+
   'DELETE FROM Owner WHERE Owner_Tel = p_Owner_Tel;'+
 'END;'+
 
 'CREATE OR REPLACE PROCEDURE delete_owner_by_address ('+
   'p_Owner_Address VARCHAR2'+
 ')'+
 'AS'+
 'BEGIN'+
   'DELETE FROM Owner WHERE Owner_Address = p_Owner_Address;'+
 'END;'
 
 
 );
    connect.close();
}