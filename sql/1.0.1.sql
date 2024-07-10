CREATE TABLE IF NOT EXISTS User (
    -- ID CHAR(36) DEFAULT (uuid_generate_v4()) NOT NULL,
    UserId CHAR(36) DEFAULT (lower(hex(randomblob(4)) || '-' ||
                         hex(randomblob(2)) || '-' ||
                         '4' || substr(hex(randomblob(2)), 2) || '-' ||
                         substr('89ab', abs(random() % 4) + 1, 1) || substr(hex(randomblob(2)), 2) || '-' ||
                         hex(randomblob(6))))  NOT NULL,
    Email VARCHAR(250) UNIQUE,
    PwdHash VARCHAR(250),
    FirstName VARCHAR(250),
    LastName VARCHAR(250),
    Address1 VARCHAR(250),
    Address2 VARCHAR(250),
    City VARCHAR(250),
    StateProvince VARCHAR(250),
    Country VARCHAR(250),
    PinZipCode VARCHAR(15),
    PhoneNumber VARCHAR(15),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CreatedBy CHAR(36),
    LastModifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastModifiedBy CHAR(36),
    OptLockVersion INT(10),
    PRIMARY KEY (UserId),
    FOREIGN KEY (CreatedBy) REFERENCES User(UserId),
    FOREIGN KEY (LastModifiedBy) REFERENCES User(UserId)
);

CREATE TRIGGER IF NOT EXISTS USER_OPTLOCK_SET_INITIAL_VALUE
AFTER INSERT ON User
FOR EACH ROW
BEGIN
    UPDATE USER
    SET OptLockVersion = 1
    WHERE rowid = NEW.rowid;
END;

CREATE TRIGGER IF NOT EXISTS USER_OPTLOCK_INCREMENT_VALUE
AFTER UPDATE ON User
FOR EACH ROW
WHEN OLD.OptLockVersion = NEW.OptLockVersion
BEGIN
    UPDATE USER
    SET OptLockVersion = OptLockVersion + 1
    WHERE rowid = NEW.rowid;
END;



-- table two 

CREATE TABLE IF NOT EXISTS MatchSummary (
    MatchId CHAR(36) DEFAULT (lower(hex(randomblob(4)) || '-' ||
                         hex(randomblob(2)) || '-' ||
                         '4' || substr(hex(randomblob(2)), 2) || '-' ||
                         substr('89ab', abs(random() % 4) + 1, 1) || substr(hex(randomblob(2)), 2) || '-' ||
                         hex(randomblob(6))))  NOT NULL,
    Url VARCHAR(250) UNIQUE,
    Title VARCHAR(250),
    MatchStatus INT(2),
    OwnerId CHAR(36),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CreatedBy CHAR(36),
    LastModifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    LastModifiedBy CHAR(36),
    OptLockVersion INT(10),
    PRIMARY KEY (MatchId),
    FOREIGN KEY (OwnerId) REFERENCES User(UserId),
    FOREIGN KEY (CreatedBy) REFERENCES User(UserId),
    FOREIGN KEY (LastModifiedBy) REFERENCES User(UserId)
);


CREATE TRIGGER IF NOT EXISTS MATCH_SUMMARY_OPTLOCK_SET_INITIAL_VALUE
AFTER INSERT ON MatchSummary
FOR EACH ROW
BEGIN
    UPDATE MatchSummary
    SET OptLockVersion = 1
    WHERE rowid = NEW.rowid;
END;

CREATE TRIGGER IF NOT EXISTS MATCH_SUMMARY_OPTLOCK_INCREMENT_VALUE
AFTER UPDATE ON MatchSummary
FOR EACH ROW
WHEN OLD.OptLockVersion = NEW.OptLockVersion
BEGIN
    UPDATE MatchSummary
    SET OptLockVersion = OptLockVersion + 1
    WHERE rowid = NEW.rowid;
END;
