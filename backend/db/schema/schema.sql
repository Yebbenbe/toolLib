-- Drop existing tables and types
DROP TABLE IF EXISTS "Requests";
DROP TABLE IF EXISTS "Tools";
DROP TABLE IF EXISTS "Users";
DROP TYPE IF EXISTS "RequestStatus";

-- Create Users table
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

-- Create Tools table with Charge column
CREATE TABLE "Tools" (
  "ToolID" SERIAL PRIMARY KEY, -- Auto-incrementing primary key
  "Name" varchar(255) NOT NULL,
  "Picture" varchar(255), -- URL or file path to the image
  "Description" text,
  "Deposit" decimal(10,2), -- Deposit requested (to be returned to borrower)
  "Charge" decimal(10,2) NULL, -- Fee amount (to be decided if implemented)
  "DI4U" bool, -- Whether the tool is available for drop-in-for-use
  "OwnerID" INT REFERENCES "Users" ("UserID"), -- Foreign key referencing Users(UserID)
  "LendingDiameter" INT 
);

-- Create RequestStatus type
CREATE TYPE "RequestStatus" AS ENUM ( -- Custom type for request status
  'Pending',
  'Approved',
  'Borrowed',
  'Returned',
  'NotReturned'
);

-- Create Requests table
CREATE TABLE "Requests" (  --For all borrow/lend transactions and history
  "RequestID" SERIAL PRIMARY KEY, -- Auto-incrementing
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
('John Doe', '1234 Maple St, Anytown, AN', 'john.doe@example.com', '555-1234', 10, 40.7128, -74.0060, '$2b$10$yg2iR/U9oE9uwW8nrH7HoOsmGBhr8BCa5TYUDWybZkhdNcVyjNSO.'), -- loveGettingCrushed
('Jane Smith', '5678 Oak St, Othertown, OT', 'jane.smith@example.com', '555-5678', 5, 34.0522, -118.2437, '$2b$10$izucC4odBHZbtgrb6a6kCutGRlssdOtwx0YpjrLJ4V7aVGwNgG5QC'), -- bigFurryWolfMen
('Alice Johnson', '9101 Pine St, Sometown, ST', 'alice.johnson@example.com', '555-9101', 15, 37.7749, -122.4194, '$2b$10$3MgA8esgBfHZkkAnCb915erM6alpFHo5TuK0nxcIrVbc1FySUBiDS'), -- hashPass1
('Bob Brown', '1213 Cedar St, Smalltown, ST', 'bob.brown@example.com', '555-1213', 20, 51.5074, -0.1278, '$2b$10$8PvWNlU3PZxM4tzBiGX9K.x90poxR85ixOTDsao8UJ/Ykai9yvoyO'), -- hashPass2
('Charlie Black', '1415 Birch St, Oldtown, OT', 'charlie.black@example.com', '555-1415', 25, 48.8566, 2.3522, '$2b$10$c2P8p3aaMeaHEWy7j612Q.SG64khkVe5nAdGG/S.x6mzcbODWsGvW'); -- hashPass3

-- Sample data for Tools table
INSERT INTO "Tools" ("Name", "Picture", "Description", "Deposit", "Charge", "DI4U", "OwnerID", "LendingDiameter")
VALUES
('Hammer', 'http://localhost:3005/public/images/hammer.jpg', 'A sturdy hammer suitable for all types of carpentry work.', 20.00, 5.00, FALSE, 1, 10),
('Screwdriver', 'http://localhost:3005/public/images/screwdriver.jpg', 'A flat-head screwdriver, ideal for basic home repairs.', 15.00, 3.00, TRUE, 2, 5),
('Wrench', 'http://localhost:3005/public/images/wrench.jpg', 'A versatile wrench for various nuts and bolts.', 25.00, 7.00, FALSE, 3, 15),
('Drill', 'http://localhost:3005/public/images/drill.png', 'A powerful drill for heavy-duty tasks.', 50.00, 10.00, TRUE, 4, 20),
('Saw', 'http://localhost:3005/public/images/saw.png', 'A sharp saw for cutting wood.', 30.00, 6.00, FALSE, 5, 25),
('Ladder', 'http://localhost:3005/public/images/ladder.png', 'A tall ladder for reaching high places.', 40.00, 8.00, TRUE, 1, 10),
('Plier', 'http://localhost:3005/public/images/plier.png', 'A strong plier for gripping and bending.', 10.00, 2.00, FALSE, 2, 5),
('Tape Measure', 'http://localhost:3005/public/images/tape_measure.png', 'A tape measure for accurate measurements.', 5.00, 1.00, TRUE, 3, 15),
('Paint Brush', 'http://localhost:3005/public/images/paint_brush.png', 'A large paint brush for painting walls.', 8.00, 1.50, FALSE, 4, 20),
('Chisel', 'http://localhost:3005/public/images/chisel.png', 'A sharp chisel for carving wood.', 12.00, 2.50, TRUE, 5, 25);

-- Sample data for Requests table
INSERT INTO "Requests" ("OwnerID", "BorrowerID", "ToolID", "Status", "RequestDate")
VALUES
(1, 2, 1, 'Pending', CURRENT_TIMESTAMP),
(2, 1, 2, 'Approved', CURRENT_TIMESTAMP),
(3, 4, 3, 'Borrowed', CURRENT_TIMESTAMP),
(4, 5, 4, 'Returned', CURRENT_TIMESTAMP),
(5, 3, 5, 'NotReturned', CURRENT_TIMESTAMP),
(1, 4, 6, 'Pending', CURRENT_TIMESTAMP),
(2, 5, 7, 'Approved', CURRENT_TIMESTAMP),
(3, 1, 8, 'Borrowed', CURRENT_TIMESTAMP),
(4, 2, 9, 'Returned', CURRENT_TIMESTAMP),
(5, 1, 10, 'NotReturned', CURRENT_TIMESTAMP);
