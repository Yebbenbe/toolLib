CREATE DATABASE toollib_development;

\c toollib_development

CREATE TABLE "Users" (
  "UserID" SERIAL PRIMARY KEY,
  "Name" text NOT NULL,
  "Address" text NOT NULL,
  "Email" text UNIQUE NOT NULL, -- User email address
  "Phone" varchar(10),
  "LendingDiameter" int, -- In kilometers, how far out they are willing to lend
  "Latitude" float, -- For storing latitude of the address
  "Longitude" float, -- For storing longitude of the address
  "PasswordHash" TEXT NOT NULL  -- for storing password hash
);

CREATE TABLE "Tools" (
  "ToolID" SERIAL PRIMARY KEY, -- Auto-incrementing primary key
  "Name" varchar(255) NOT NULL,
  "Picture" varchar(255), -- URL or file path to the image
  "Description" text,
  "Deposit" decimal(10,2), -- Deposit requested (to be returned to borrower)
  -- "Charge" decimal(10,2) NULL, -- Fee amount (to be decided if implemented)
  "DI4U" bool, -- Whether the tool is available for drop-in-for-use
  "OwnerID" INT REFERENCES "Users" ("UserID"), -- Foreign key referencing Users(UserID)
  "LendingDiameter" INT 
);

CREATE TYPE "RequestStatus" AS ENUM ( -- Custom type for request status
  'Pending',
  'Approved',
  'Borrowed',
  'Returned',
  'NotReturned'
);

CREATE TABLE "Requests" (  --For all borrow/lend transactions and history
  "Requests" SERIAL PRIMARY KEY, -- Auto-incrementing
  "OwnerID" INT REFERENCES "Users" ("UserID"),
  "BorrowerID" INT REFERENCES "Users" ("UserID"),
  "ToolID" INT REFERENCES "Tools" ("ToolID"),
  "Status" "RequestStatus", -- Status of the lending request
  "LenderRating" bool NULL, -- Whether lender approves the transaction, basically a thumbs up/down
  "BorrowerRating" bool NULL, -- Whether borrower approves the transaction
  "BorrowerFeedback" text NULL, -- Any text notes to leave
  "LenderFeedback" text NULL, -- Any text notes to leave
  "RequestDate" timestamp DEFAULT (now()), -- Date and time when the request was made, auto-date when new row inserted
  "ApproveDate" timestamp NULL, -- Date and time when the request was approved
  "BorrowDate" timestamp NULL, -- Date and time when the tool was borrowed
  "ReturnDate" timestamp NULL -- Date and time when the tool was returned
);


-- Sample data for Users table
INSERT INTO "Users" ("Name", "Address", "Email", "Phone", "LendingDiameter", "Latitude", "Longitude", "PasswordHash")
VALUES
('John Doe', '1234 Maple St, Anytown, AN', 'john.doe@example.com', '555-1234', 10, 40.7128, -74.0060, 'loveGettingCrushed'),
('Jane Smith', '5678 Oak St, Othertown, OT', 'jane.smith@example.com', '555-5678', 5, 34.0522, -118.2437, 'bigFurryWolfMen');

-- Sample data for Tools table
INSERT INTO "Tools" ("Name", "Picture", "Description", "Deposit", "DI4U", "OwnerID", "LendingDiameter")
VALUES
('Hammer', 'http://localhost:3001/public/images/hammer.jpg', 'A sturdy hammer suitable for all types of carpentry work.', 20.00, FALSE, 1, 10),
('Screwdriver', 'http://localhost:3001/public/images/screwdriver.jpg', 'A flat-head screwdriver, ideal for basic home repairs.', 15.00, TRUE, 2, 5);

-- Sample data for Requests table
INSERT INTO "Requests" ("OwnerID", "BorrowerID", "ToolID", "Status", "RequestDate")
VALUES
(1, 2, 1, 'Pending', CURRENT_TIMESTAMP),
(2, 1, 2, 'Approved', CURRENT_TIMESTAMP);
