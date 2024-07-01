import { join } from "path";
import { MyDatabaseAccess } from "../src/MyDatabaseAccess";
import Database from "better-sqlite3";


const myDbAccess = new MyDatabaseAccess();


function showAllMatch(MatchStatus: Number) {
    try {
        const params = [MatchStatus];
        const sql = "Select * from MatchSummary where MatchStatus=?"
        const rows = myDbAccess.runSql(sql, params);
    } catch (error) {
        console.log(error);
    }
}

function insertMatchSummary(MatchId: String, Url: string, Title: string, MatchStatus: number, ownerId: string) {
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
        const params = [MatchId, Url, Title, MatchStatus, ownerId, ownerId, ownerId]; 
        const result = myDbAccess.execute(sql, params);
    } catch (error) {
        console.log(error);
    }
}


function MatchStatusJoin(MatchStatus: number): void {
    try {
        const params = [MatchStatus];
        const sql = `
            SELECT 
                u.UserId, u.FirstName, u.LastName, 
                ms.MatchId, ms.Url, ms.Title, ms.MatchStatus
            FROM User u
            JOIN MatchSummary ms ON u.UserId = ms.OwnerId
            WHERE ms.MatchStatus = ?
        `;
        const rows = myDbAccess.runSql(sql, params);
    } catch (error) {
        console.error(error);
    }
}


function joinWithAggregateFunction(): void {
    try {
        const sql = `
            SELECT 
                u.UserId, u.FirstName, u.LastName, 
                MAX(ms.MatchId) AS MaxMatchId
            FROM User u
            LEFT JOIN MatchSummary ms ON u.UserId = ms.OwnerId
            GROUP BY u.UserId
        `;
        const rows = myDbAccess.runSql(sql, []);
        console.log("Join with Aggregate - User with Maximum Match Summary ID:", rows);
    } catch (error) {
        console.error(error);
    }
}

function retrieveLatestMatchSummary(): void {
    try {
        const sql = `
            SELECT 
                u.UserId, u.FirstName, u.LastName, 
                ms.MatchId, ms.Url, ms.Title, ms.MatchStatus
            FROM User u
            JOIN (
                SELECT *
                FROM MatchSummary
                WHERE MatchId IN (
                    SELECT MAX(MatchId)
                    FROM MatchSummary
                    GROUP BY OwnerId
                )
            ) ms ON u.UserId = ms.OwnerId
        `;
        const rows = myDbAccess.runSql(sql, []);
        console.log("Nested Join - User's Latest Match Summary:", rows);
    } catch (error) {
        console.error(error);
    }
}
function JoinUsersAndTheirReferralUsers(): void {
    try {
        const sql = `
            SELECT 
                u.UserId AS UserId, u.FirstName AS UserFirstName, u.LastName AS UserLastName, 
                ref.UserId AS ReferralUserId, ref.FirstName AS ReferralFirstName, ref.LastName AS ReferralLastName
            FROM User u
            LEFT JOIN User ref ON u.UserId = ref.UserId
        `;
        const rows = myDbAccess.runSql(sql, []);
        console.log("Self Join - Users and Their Referral Users:", rows);
    } catch (error) {
        console.error("Error executing join query:", error);
    }
}



// showAllMatch(21);
// insertMatchSummary("00000000-0000-0000-0000-000000000000","www.coachbuddy.com/ind_sa", "INDIA VS SA", 1, "00000000-0000-0000-0000-000000000001");
// insertMatchSummary("00000000-0000-0000-0000-000000000001","www.coachbuddy.com/ind_eng", "INDIA VS ENGLAND", 1, "00000000-0000-0000-0000-000000000001");
// insertMatchSummary("00000000-0000-0000-0000-000000000002","www.coachbuddy.com/ind_wi", "INDIA VS WEST INDIES", 1, "00000000-0000-0000-0000-000000000001");

// insertMatchSummary("00000000-0000-0000-0000-000000000003","www.coachbuddy.com/ind_aus", "INDIA VS AUSTRALIA", 1, "00000000-0000-0000-0000-000000000002");
// insertMatchSummary("00000000-0000-0000-0000-000000000004","www.coachbuddy.com/ind_afg", "INDIA VS AFGHANISTHAN", 1, "00000000-0000-0000-0000-000000000003");
// insertMatchSummary("00000000-0000-0000-0000-000000000005","www.coachbuddy.com/ind_pak", "INDIA VS PAKISTHAN", 1, "00000000-0000-0000-0000-000000000003");




// showAllMatch(1);
// MatchStatusJoin(1);
// joinWithAggregateFunction();
retrieveLatestMatchSummary();
// JoinUsersAndTheirReferralUsers();