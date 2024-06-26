// import { parseArgs } from "util";
import { MyDatabaseAccess } from "../src/MyDatabaseAccess";
import Database from "better-sqlite3";


const myDbAccess =new MyDatabaseAccess();
// try {
//     myDbAccess.createTable();
// } catch (error) {
//     console.log(error);
// }finally{
//     myDbAccess.close();
// }

function selectFirstName(firstName:string) {
    try {
    // const sql="Select * from user where firstname='"+firstName+"'"
    const params =[firstName];
    const sql="Select * from user where firstname=?"
    console.log(sql)
    const rows=myDbAccess.runSql(sql, params);
    console.log(rows);
    } catch (error) {
        console.log(error);
    }/*finally{
        myDbAccess.close();
    }*/
}

function selectCity(city:string){
    try{
        const params=[city];
        const sql= "SELECT * FROM USER WHERE city =?"
        console.log(sql);
        const rows=myDbAccess.runSql(sql, params);
        console.log(rows);
    }catch (error) {
        console.log(error);
    }
    /*finally{
    myDbAccess.close();
    }*/
}
function insertSql(email: string, firstName: string, lastName: string, Address1: string, city: string, StateProvince: string, country: string, pincode: string, PhoneNumber: string) {
    try {
        const sql = `
            INSERT INTO User (
                UserId, Email, PwdHash, FirstName, LastName, Address1, Address2, City, 
                StateProvince, Country, PinZipCode, PhoneNumber, CreatedAt, CreatedBy, 
                LastModifiedAt, LastModifiedBy, OptLockVersion
            ) VALUES (
                '00000000-0000-0000-0000-000000000001', ?, 'root_pwd_hash', ?, ?, ?, 'Address 2', ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 
                '00000000-0000-0000-0000-000000000000', CURRENT_TIMESTAMP, '00000000-0000-0000-0000-000000000000', 1
            );
        `;
        
        const params = [email, firstName, lastName, Address1, city, StateProvince, country, pincode, PhoneNumber];
        
        // console.log(sql);
        // console.log("Params: ", params);
        
        const result = myDbAccess.execute(sql, params);
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
    
}

function deleteAccount(PhoneNumber: string,) {
    try {
        const sql = ` DELETE FROM User  WHERE PhoneNumber = ?;`;
        
        const params=[PhoneNumber];
        const result = myDbAccess.execute(sql, params);
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
    
}


function updateSql(userId: string, firstName: string, lastName: string) {
    try {
        const sql = "UPDATE User SET FirstName = ?, LastName = ? WHERE UserId = ?";
        const params = [firstName, lastName, userId];
        console.log(sql);
        const result = myDbAccess.execute(sql, params);
        console.log(result);
    } catch (error) {
        console.log(error);
    } finally {
        myDbAccess.close();
    }
}
function updatePhoneNo(userId: string, newPhoneNumber: string) {
    try {
        
        console.log("Starting transaction...");
        myDbAccess.execute("BEGIN TRANSACTION");
        const updatePhoneSql = "UPDATE User SET PhoneNumber = ? WHERE UserId = ?";
        const updatePhoneParams = [newPhoneNumber, userId];
        console.log("Executing update:", updatePhoneSql, updatePhoneParams);
        myDbAccess.execute(updatePhoneSql, updatePhoneParams);

        myDbAccess.execute("COMMIT");

        console.log("Phone number updated successfully.");
    } catch (error) {
        console.log("Error encountered:", error);

        try {
            console.log("Rolling back transaction...");
            myDbAccess.execute("ROLLBACK");
        } catch (rollbackError) {
            console.log("Error rolling back transaction:", rollbackError);
        }

        console.log("Error updating phone number:", error);
    } 
}


// insertSql("amrith@coachbuddy.ai", "Amrith", "Shet", "Tiger Circle", "Manipal", "Karnataka", "India", "000000", "9876543210");
// selectSql("Roo' OR'1=1");
selectFirstName("Root");
selectCity("Manipal");
// deleteAccount("9876543210");
const userId = '00000000-0000-0000-0000-000000000001';
const newPhoneNumber = '1212121212';

updatePhoneNo(userId, newPhoneNumber);