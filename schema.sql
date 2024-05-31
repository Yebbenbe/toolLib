CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Phone VARCHAR(20),
    LendingDiameter INT, -- in kilometers, how far out they are willing to lend
    Latitude FLOAT, -- for storing latitude of the address
    Longitude FLOAT -- for storing longitude of the address
);


CREATE TABLE Tools (
    ToolID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Picture VARCHAR(255), -- URL or file path to the image
    Description TEXT,
    Deposit DECIMAL(10, 2), -- deposit requested (to be returned to borrower)
    Charge DECIMAL(10, 2), -- fee amount (to be decided if implemented)
    Teachable BOOLEAN, -- whether lender is free to teach borrower how to use the tool
    DI4U BOOLEAN,  -- whether the tool is available for drop-in-for-use
    OwnerID INT,
    FOREIGN KEY (OwnerID) REFERENCES Users(UserID)
);


CREATE TABLE History (
    HistoryID SERIAL PRIMARY KEY,
    LenderID INT,
    BorrowerID INT,
    ToolID INT,
    LenderApproval BOOLEAN,  -- whether lender approves the transaction, basically a thumbs up/down
    BorrowerApproval BOOLEAN, -- whether borrower approves the transaction
    BorrowerFeedback TEXT,  -- any text notes to leave
    LenderFeedback TEXT,  -- any text notes to leave
    FOREIGN KEY (LenderID) REFERENCES Users(UserID),
    FOREIGN KEY (BorrowerID) REFERENCES Users(UserID),
    FOREIGN KEY (ToolID) REFERENCES Tools(ToolID),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE User_Tool (  -- bridge table for borrower<>lender interaction
    UserID INT,
    ToolID INT,
    PRIMARY KEY (UserID, ToolID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ToolID) REFERENCES Tools(ToolID)
);


