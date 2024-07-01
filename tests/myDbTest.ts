// import { parseArgs } from "util";
import { MyDatabaseAccess } from "../src/MyDatabaseAccess";
import Database from "better-sqlite3";


const myDbAccess = new MyDatabaseAccess();
// try {
//     myDbAccess.createTable();
// } catch (error) {
//     console.log(error);
// }finally{
//     myDbAccess.close();
// }

function selectFirstName(firstName: string) {
    try {
        // const sql="Select * from user where firstname='"+firstName+"'"
        const params = [firstName];
        const sql = "Select * from user where firstname=?";
        const rows = myDbAccess.runSql(sql, params);
        console.log(rows);
    } catch (error) {
        console.log(error);
    }/*finally{
        myDbAccess.close();
    }*/
}

function selectCity(city: string) {
    try {
        const params = [city];
        const sql = "SELECT * FROM USER WHERE city =?";
        const rows = myDbAccess.runSql(sql, params);
        console.log(rows);
    } catch (error) {
        console.log(error);
    }
}
function insertSql(userId: string, email: string, firstName: string, lastName: string, address1: string, city: string, stateProvince: string, country: string, pinCode: string, phoneNumber: string) {
    const sql = `
        INSERT INTO User (
            UserId, Email, PwdHash, FirstName, LastName, Address1, Address2, City, 
            StateProvince, Country, PinZipCode, PhoneNumber, CreatedAt, CreatedBy, 
            LastModifiedAt, LastModifiedBy, OptLockVersion
        ) VALUES (
            ?, ?, 'root_pwd_hash', ?, ?, ?, 'Address 2', ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 
            '00000000-0000-0000-0000-000000000000', CURRENT_TIMESTAMP, '00000000-0000-0000-0000-000000000000', 1
        );
    `;
    const params = [userId, email, firstName, lastName, address1, city, stateProvince, country, pinCode, phoneNumber];
    return myDbAccess.execute(sql, params);
}


function deleteAccount(PhoneNumber: string,) {
    try {
        const sql = ` DELETE FROM User  WHERE PhoneNumber = ?;`;
const params = [PhoneNumber];
        const result = myDbAccess.execute(sql, params);
    } catch (error) {
        console.log(error);
    }

}


function updateSql(userId: string, firstName: string, lastName: string) {
    try {
        const sql = "UPDATE User SET FirstName = ?, LastName = ? WHERE UserId = ?";
        const params = [firstName, lastName, userId];
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
function updatePhoneNoWithUserID(userId: string, newPhoneNumber: string) {
    try {
        const sql = "UPDATE User SET PhoneNumber = ? WHERE UserId = ?";
        const params = [newPhoneNumber, userId];
        const result = myDbAccess.execute(sql, params);
    } catch (error) {
        console.log("Error encountered:", error);
    }
}

function UserinsertUpdateSelect(userId: string, newPhoneNumber: string) {
    try {
        console.log("Starting transaction for insert...");
        myDbAccess.execute("BEGIN TRANSACTION");
        insertSql("00000000-0000-0000-0000-000000000002", "shravari@coachbuddy.ai", "Shravari", "K", "Tiger Circle", "Manipal", "Karnataka", "India", "000000", "7896321455");
        myDbAccess.execute("COMMIT");
        console.log("User inserted successfully.");

        console.log("Starting transaction for update...");
        myDbAccess.execute("BEGIN TRANSACTION");
        updatePhoneNoWithUserID(userId, newPhoneNumber);
        myDbAccess.execute("COMMIT");
        console.log("User updated successfully.");

        console.log("Starting transaction for select...");
        myDbAccess.execute("BEGIN TRANSACTION");
        selectCity("Manipal");
        myDbAccess.execute("COMMIT");
        console.log("User shown successfully.");
    } catch (error) {
        console.log("Error encountered:", error);
        try {
            console.log("Rolling back transaction...");
            myDbAccess.execute("ROLLBACK");
        } catch (rollbackError) {
            console.log("Error rolling back transaction:", rollbackError);
        }
        console.log("Error during transaction:", error);
    }
}


// insertSql(
//     '00000000-0000-0000-0000-000000000002',
//     'sachin.tendulkar@example.com',
//     'Sachin',
//     'Tendulkar',
//     'Perry Cross Rd',
//     'Mumbai',
//     'Maharashtra',
//     'India',
//     '400050',
//     '1234567890'
// );


// insertSql(
//     '00000000-0000-0000-0000-000000000003',
//     'virat.kohli@example.com',
//     'Virat',
//     'Kohli',
//     'Meera Bagh',
//     'New Delhi',
//     'Delhi',
//     'India',
//     '110087',
//     '0987654321'
// );


// insertSql(
//     '00000000-0000-0000-0000-000000000004',
//     'mahendra.dhoni@example.com',
//     'Mahendra',
//     'Dhoni',
//     'Harmu Housing Colony',
//     'Ranchi',
//     'Jharkhand',
//     'India',
//     '834002',
//     '1122334455'
// );
// insertSql(
//     '00000000-0000-0000-0000-000000000005',
//     'rahul.dravid@example.com',
//     'Rahul',
//     'Dravid',
//     'Indiranagar',
//     'Bangalore',
//     'Karnataka',
//     'India',
//     '560038',
//     '2233445566'
// );


// insertSql(
//     '00000000-0000-0000-0000-000000000006',
//     'sourav.ganguly@example.com',
//     'Sourav',
//     'Ganguly',
//     'Behala',
//     'Kolkata',
//     'West Bengal',
//     'India',
//     '700034',
//     '3344556677'
// );

// selectFirstName("Root");
// selectCity("Manipal");
const userId = '00000000-0000-0000-0000-000000000001';
const newPhoneNumber = '1212121215';

// updatePhoneNoWithUserID(userId, newPhoneNumber);

// UserinsertUpdateSelect("00000000-0000-0000-0000-000000000002", "1234123455");

// deleteAccount("1234123455");