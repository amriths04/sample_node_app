import { UserDataAccess } from "../src/UserDataAccess";
import { UserEntity } from "../src/entity/UserEntity";

const myDbAccess = new UserDataAccess('./sample.db'); 

function selectFirstName(firstName: string) {
    try {
        const sql = "Select * from User where FirstName = ?";
        const params = [firstName];
        const rows = myDbAccess.runSql(sql, params);
        console.log(rows);
    } catch (error) {
        console.log(error);
    }
}

function selectCity(city: string) {
    try {
        const sql = "SELECT * FROM User WHERE City = ?";
        const params = [city];
        const rows = myDbAccess.runSql(sql, params);
        console.log(rows);
    } catch (error) {
        console.log(error);
    }
}

function insertUser(user: UserEntity) {
    try {
        myDbAccess.insert(user);
        console.log("User inserted successfully.");
    } catch (error) {
        console.log(error);
    }
}


function deleteAccount(phoneNumber: string) {
    try {
        const sql = "DELETE FROM User WHERE PhoneNumber = ?";
        const params = [phoneNumber];
        myDbAccess.execute(sql, params);
        console.log("Account deleted successfully.");
    } catch (error) {
        console.log(error);
    }
}

function updateUser(user: UserEntity) {
    try {
        myDbAccess.update(user);
        console.log("User updated successfully.");
    } catch (error) {
        console.log(error);
    }
}
function updatePhoneNo(userId: string, newPhoneNumber: string) {
    try {
        console.log("Starting transaction...");
        myDbAccess.execute("BEGIN TRANSACTION", []);
        const updatePhoneSql = "UPDATE User SET PhoneNumber = ? WHERE UserId = ?";
        const updatePhoneParams = [newPhoneNumber, userId];
        console.log("Executing update:", updatePhoneSql, updatePhoneParams);
        myDbAccess.execute(updatePhoneSql, updatePhoneParams);
        myDbAccess.execute("COMMIT", []);
        console.log("Phone number updated successfully.");
    } catch (error) {
        console.log("Error encountered:", error);

        try {
            console.log("Rolling back transaction...");
            myDbAccess.execute("ROLLBACK", []);
        } catch (rollbackError) {
            console.log("Error rolling back transaction:", rollbackError);
        }

        console.log("Error updating phone number:", error);
    }
}

function userInsertUpdateSelect(user: UserEntity, newPhoneNumber: string) {
    try {
        console.log("Starting transaction for insert...");
        myDbAccess.execute("BEGIN TRANSACTION", []);
        insertUser(user);
        myDbAccess.execute("COMMIT", []);
        console.log("User inserted successfully.");

        console.log("Starting transaction for update...");
        myDbAccess.execute("BEGIN TRANSACTION", []);
        updatePhoneNo(user.userId, newPhoneNumber);
        myDbAccess.execute("COMMIT", []);
        console.log("User updated successfully.");

        console.log("Starting transaction for select...");
        myDbAccess.execute("BEGIN TRANSACTION", []);
        selectCity("Manipal");
        myDbAccess.execute("COMMIT", []);
        console.log("User shown successfully.");
    } catch (error) {
        console.log("Error encountered:", error);
        try {
            console.log("Rolling back transaction...");
            myDbAccess.execute("ROLLBACK", []);
        } catch (rollbackError) {
            console.log("Error rolling back transaction:", rollbackError);
        }
        console.log("Error during transaction:", error);
    }
}

// Usage examples
const userId = '00000000-0000-0000-0000-000000000001';
const newPhoneNumber = '1212121215';

const user = new UserEntity(
    '00000000-0000-0000-0000-000000000002',
    'shravari@coachbuddy.ai',
    'root_pwd_hash',
    'Shravari',
    'K',
    'Tiger Circle',
    'Address 2',
    'Manipal',
    'Karnataka',
    'India',
    '000000',
    '7896321455',
    new Date(),
    '00000000-0000-0000-0000-000000000000',
    new Date(),
    '00000000-0000-0000-0000-000000000000',
    1
);

userInsertUpdateSelect(user, newPhoneNumber);
deleteAccount("1234123455");
