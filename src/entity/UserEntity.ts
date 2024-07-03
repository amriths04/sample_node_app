export class UserEntity {
    userId: string;
    email: string;
    pwdHash: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    stateProvince: string;
    country: string;
    pinZipCode: string;
    phoneNumber: string;
    createdAt: Date;
    createdBy: string;
    lastModifiedAt: Date;
    lastModifiedBy: string;
    optLockVersion: number;

    constructor(
        userId: string,
        email: string,
        pwdHash: string,
        firstName: string,
        lastName: string,
        address1: string,
        address2: string,
        city: string,
        stateProvince: string,
        country: string,
        pinZipCode: string,
        phoneNumber: string,
        createdAt: Date,
        createdBy: string,
        lastModifiedAt: Date,
        lastModifiedBy: string,
        optLockVersion: number
    ) {
        this.userId = userId;
        this.email = email;
        this.pwdHash = pwdHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.stateProvince = stateProvince;
        this.country = country;
        this.pinZipCode = pinZipCode;
        this.phoneNumber = phoneNumber;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.lastModifiedAt = lastModifiedAt;
        this.lastModifiedBy = lastModifiedBy;
        this.optLockVersion = optLockVersion;
    }
}
