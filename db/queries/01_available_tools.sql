SELECT *
FROM Tools
JOIN Users AS Owner ON Tools.OwnerID = Owner.UserID
JOIN Users AS Borrower ON Borrower.UserID = loggedInUserID
WHERE
    <distance_calculation_function>(Borrower.Latitude, Borrower.Longitude, Owner.Latitude, Owner.Longitude) <= Owner.LendingDiameter;