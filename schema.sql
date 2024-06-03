CREATE DATABASE toollib_development;

\c toollib_development

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

-- Insert sample data into the Users table
INSERT INTO Users (Name, Address, Email, Phone, LendingDiameter, Latitude, Longitude)
VALUES
('John Doe', '1234 Maple St, Anytown, AN', 'john.doe@example.com', '555-1234', 10, 40.7128, -74.0060),
('Jane Smith', '5678 Oak St, Othertown, OT', 'jane.smith@example.com', '555-5678', 5, 34.0522, -118.2437);

-- Insert sample data into the Tools table
INSERT INTO Tools (Name, Picture, Description, Deposit, Charge, Teachable, DI4U, OwnerID)
VALUES
('Hammer', 'path/to/hammer.jpg', 'A sturdy hammer suitable for all types of carpentry work.', 20.00, 2.00, TRUE, FALSE, 1),
('Screwdriver', 'path/to/screwdriver.jpg', 'A flat-head screwdriver, ideal for basic home repairs.', 15.00, 1.50, FALSE, TRUE, 2);

-- Insert sample data into the History table
INSERT INTO History (LenderID, BorrowerID, ToolID, LenderApproval, BorrowerApproval, BorrowerFeedback, LenderFeedback)
VALUES
(1, 2, 1, TRUE, TRUE, 'Great condition, worked perfectly.', 'Prompt return, excellent borrower.'),
(2, 1, 2, TRUE, TRUE, 'Useful tool, easy to handle.', 'Took good care of the tool.');

-- Insert sample data into the User_Tool table
INSERT INTO User_Tool (UserID, ToolID)
VALUES
(1, 1),
(2, 2);
