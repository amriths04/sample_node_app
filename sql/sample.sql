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

-- Define the UUID for the root user
-- SET @root_uuid = '00000000-0000-0000-0000-000000000000';
-- @root_uuid

-- Insert the root user with the same UUID for ID, CREATED_BY, and LAST_MODIFIED_BY
INSERT INTO User (
    UserId,
    Email,
    PwdHash,
    FirstName,
    LastName,
    Address1,
    Address2,
    City,
    StateProvince,
    Country,
    PinZipCode,
    PhoneNumber,
    CreatedAt,
    CreatedBy,
    LastModifiedAt,
    LastModifiedBy,
    OptLockVersion
) VALUES (
    '00000000-0000-0000-0000-000000000000', -- id
    'srikanth@coachbuddy.ai',               -- email
    'root_pwd_hash',                        -- password hash
    'Root',                                 -- first name
    'User',                                 -- last name
    'Address 1',                            -- address1
    'Address 2',                            -- address2
    'City',                                 -- city
    'State',                                -- state
    'Country',                              -- country
    '00000',                                -- pin/zip code
    '1234567890',                           -- phone number
    CURRENT_TIMESTAMP,                      -- created at
    '00000000-0000-0000-0000-000000000000', -- created by
    CURRENT_TIMESTAMP,                      -- last modified at
    '00000000-0000-0000-0000-000000000000', -- last modified by
    1                                       -- optlock version
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
