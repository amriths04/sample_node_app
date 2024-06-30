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
    }
}

showAllMatch(21);