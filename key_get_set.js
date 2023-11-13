// var redis = require('redis');
// var client = redis.createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// client.connect();

// //single value write & read
// client.set("my_key", "Hello World");
// client.get("my_key", function(err, reply){
//     console.log(reply);
// });

// //multiple value write & read
// client.mSet('header',0,'left',0,'article',0,'right',0,'footer',0);
// client.mGet(['header','left','article','right','footer'], 
//   function(err, value) {
//     console.log(value);
// });   

// client.quit();

const Redis = require('ioredis');

// Connect to the Redis server
const client = new Redis({
  host: 'localhost',
  port: 6379,
  db: 0,
});

// User data
const userData = {
  'user:1': 'Alice',
  'user:2': 'Bob',
  'user:3': 'Charlie',
};

// Using mSet to set multiple key-value pairs
client.mset(userData);

// Using mGet to retrieve values for multiple keys
const userIds = ['user:1', 'user:2', 'user:3'];
client.mget(userIds, (err, userNames) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  // Print the retrieved user names
  userIds.forEach((userId, index) => {
    const userName = userNames[index];
    console.log(`User ID: ${userId}, User Name: ${userName}`);
  });

  // Close the Redis connection
  client.quit();
});
