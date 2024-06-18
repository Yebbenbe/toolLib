const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = [
  { name: 'John Doe', address: '1234 Maple St, Anytown, AN', email: 'john.doe@example.com', phone: '555-1234', experience: 10, lat: 40.7128, lon: -74.0060, password: 'loveGettingCrushed' },
  { name: 'Jane Smith', address: '5678 Oak St, Othertown, OT', email: 'jane.smith@example.com', phone: '555-5678', experience: 5, lat: 34.0522, lon: -118.2437, password: 'bigFurryWolfMen' },
  { name: 'Alice Johnson', address: '9101 Pine St, Sometown, ST', email: 'alice.johnson@example.com', phone: '555-9101', experience: 15, lat: 37.7749, lon: -122.4194, password: 'hashPass1' },
  { name: 'Bob Brown', address: '1213 Cedar St, Smalltown, ST', email: 'bob.brown@example.com', phone: '555-1213', experience: 20, lat: 51.5074, lon: -0.1278, password: 'hashPass2' },
  { name: 'Charlie Black', address: '1415 Birch St, Oldtown, OT', email: 'charlie.black@example.com', phone: '555-1415', experience: 25, lat: 48.8566, lon: 2.3522, password: 'hashPass3' }
];

(async () => {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    console.log(`('${user.name}', '${user.address}', '${user.email}', '${user.phone}', ${user.experience}, ${user.lat}, ${user.lon}, '${hashedPassword}'),`);
  }
})();
