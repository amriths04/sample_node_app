import { parseArgs } from "util";
import { MyDatabaseAccess } from "../src/MyDatabaseAccess";


const myDbAccess =new MyDatabaseAccess();
// try {
//     myDbAccess.createTable();
// } catch (error) {
//     console.log(error);
// }finally{
//     myDbAccess.close();
// }

function selectSql(firstName:string) {
    try {
    // const sql="Select * from user where firstname='"+firstName+"'"
    const params =[firstName];
    const sql="Select * from user where firstname=?"
    console.log(sql)
    const rows=myDbAccess.runSql(sql, params);
    console.log(rows);
} catch (error) {
    console.log(error);
}finally{
    myDbAccess.close();
}
}
function insertSql(firstName:string,lastname:string) {
    try {
    // const sql="Select * from user where firstname='"+firstName+"'"
    
    const sql="INSERT INTO User (FirstName,LastName) values (?,?)";
    console.log(sql)
    const params =[firstName,lastname];
    const result=myDbAccess.runSql(sql, params);
    console.log(result);
} catch (error) {
    console.log(error);
}finally{
    myDbAccess.close();
}
}

// selectSql("Roo' OR'1=1");
selectSql("Root");
insertSql("hi","name");
