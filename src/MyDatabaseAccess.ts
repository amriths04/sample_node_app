import Database from "better-sqlite3";
import fs from 'fs';

const sqlFile ="sql/sample.sql";
const dbfile="sample.db";


export class MyDatabaseAccess{
    //connection object
    private connection:Database.Database;

    constructor(){
        this.connection=new Database(dbfile,{verbose:console.log});
    }
    
    public createTable(){
        const initScript =fs.readFileSync(sqlFile,'utf8');
        this.connection.exec(initScript);
    }

    public runSql(sql:string,params: any[]){
        const stmt =this.connection.prepare(sql);
        const rows =stmt.all(params)
        return rows;
    }
    public execute(sql:string,params?: any) : Database.RunResult{
        const stmt =this.connection.prepare(sql);
        const result =stmt.run(params)
        return result;
    }


    //close connection
    public close(){
        this.connection.close();
    }
    
}