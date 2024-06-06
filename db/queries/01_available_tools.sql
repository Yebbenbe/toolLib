SELECT *,
    (6371 * acos(
        cos(radians(Borrower.Latitude)) * cos(radians(Owner.Latitude)) * 
        cos(radians(Owner.Longitude) - radians(Borrower.Longitude)) + 
        sin(radians(Borrower.Latitude)) * sin(radians(Owner.Latitude))
    )) AS Distance
FROM Tools
JOIN Users AS Owner ON Tools.OwnerID = Owner.UserID
JOIN Users AS Borrower ON Borrower.UserID = ?
WHERE Distance <= Owner.LendingDiameter;