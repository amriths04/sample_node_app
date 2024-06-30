import { MyDatabaseAccess } from "../src/MyDatabaseAccess";
import Database from "better-sqlite3";



const myDbAccess =new MyDatabaseAccess();



function showAllMatch(MatchStatus:Number) {
    try {
    const params =[MatchStatus];
    const sql="Select * from MatchSummary where MatchStatus=?"
    const rows=myDbAccess.runSql(sql, params);
    console.log(rows);
    } catch (error) {
        console.log(error);
    }finally{
        myDbAccess.close();
    }
}

function insertMatchSummary(MatchId:String,Url: string, Title: string, MatchStatus: number, ownerId: string) {
    try {
        const sql = `
            INSERT INTO MatchSummary (
                MatchID, Url, Title, MatchStatus, OwnerId, CreatedAt, CreatedBy,
                LastModifiedAt, LastModifiedBy, OptLockVersion
            ) VALUES (
             ?,?, ?, ?, ?, CURRENT_TIMESTAMP, 
                ?, CURRENT_TIMESTAMP, ?, 1
            );
        `;

        const params = [MatchId,Url, Title, MatchStatus, ownerId, ownerId, ownerId];
        
        // console.log(sql);
        // console.log("Params: ", params);
        
        const result = myDbAccess.execute(sql, params);
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
    finally{
        myDbAccess.close();
    }
    
}

// showAllMatch(21);
// insertMatchSummary("00000000-0000-0000-0000-000000000000","www.coachbuddy.com/ind_sa", "INDIA VS SA", 1, "00000000-0000-0000-0000-000000000001");
// insertMatchSummary("00000000-0000-0000-0000-000000000001","www.coachbuddy.com/ind_eng", "INDIA VS ENGLAND", 1, "00000000-0000-0000-0000-000000000001");
// insertMatchSummary("00000000-0000-0000-0000-000000000002","www.coachbuddy.com/ind_wi", "INDIA VS WEST INDIES", 1, "00000000-0000-0000-0000-000000000001");