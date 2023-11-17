db.createUser({
  user: 'root',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'spacody',
    },
  ],
});
db.createCollection('test'); //MongoDB creates the database when you first store data in that database
