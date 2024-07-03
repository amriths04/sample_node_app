import Database from 'better-sqlite3';
import { UserEntity } from './entity/UserEntity';

export class UserDataAccess {
    private db: Database.Database;

    constructor(databaseFilePath: string) {
        this.db = new Database(databaseFilePath);
    }

    private mapRowToUserEntity(row: any): UserEntity {
        return new UserEntity(
            row.UserId,
            row.Email,
            row.PwdHash,
            row.FirstName,
            row.LastName,
            row.Address1,
            row.Address2,
            row.City,
            row.StateProvince,
            row.Country,
            row.PinZipCode,
            row.PhoneNumber,
            new Date(row.CreatedAt),
            row.CreatedBy,
            new Date(row.LastModifiedAt),
            row.LastModifiedBy,
            row.OptLockVersion
        );
    }

    private getUserEntityParams(user: UserEntity): any[] {
        return [
            user.userId,
            user.email,
            user.pwdHash,
            user.firstName,
            user.lastName,
            user.address1,
            user.address2,
            user.city,
            user.stateProvince,
            user.country,
            user.pinZipCode,
            user.phoneNumber,
            user.createdAt.toISOString(),
            user.createdBy,
            user.lastModifiedAt.toISOString(),
            user.lastModifiedBy,
            user.optLockVersion
        ];
    }

    public findByUserId(userId: string): UserEntity | null {
        const stmt = this.db.prepare('SELECT * FROM User WHERE UserId = ?');
        const row = stmt.get(userId);
        return row ? this.mapRowToUserEntity(row) : null;
    }

    public findAll(): UserEntity[] {
        const stmt = this.db.prepare('SELECT * FROM User');
        const rows = stmt.all();
        return rows.map(row => this.mapRowToUserEntity(row));
    }

    public insert(user: UserEntity): void {
        const sql = `
            INSERT INTO User (UserId, Email, PwdHash, FirstName, LastName, Address1, Address2, City, 
                StateProvince, Country, PinZipCode, PhoneNumber, CreatedAt, CreatedBy, 
                LastModifiedAt, LastModifiedBy, OptLockVersion) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = this.getUserEntityParams(user);
        this.db.prepare(sql).run(params);
    }

    public update(user: UserEntity): void {
        const sql = `
            UPDATE User 
            SET Email = ?, PwdHash = ?, FirstName = ?, LastName = ?, Address1 = ?, Address2 = ?, 
                City = ?, StateProvince = ?, Country = ?, PinZipCode = ?, PhoneNumber = ?, 
                CreatedAt = ?, CreatedBy = ?, LastModifiedAt = ?, LastModifiedBy = ?, OptLockVersion = ?
            WHERE UserId = ?
        `;
        const params = this.getUserEntityParams(user).concat(user.userId);
        this.db.prepare(sql).run(params);
    }

    public delete(userId: string): void {
        const sql = 'DELETE FROM User WHERE UserId = ?';
        this.db.prepare(sql).run(userId);
    }

    public runSql(sql: string, params: any[]): any[] {
        return this.db.prepare(sql).all(params);
    }

    public execute(sql: string, params: any[]): void {
        this.db.prepare(sql).run(params);
    }

    public close(): void {
        this.db.close();
    }
}
