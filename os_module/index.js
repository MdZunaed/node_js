const os = require('os');

console.log('platform-> ' + os.platform());
console.log('host name-> ' + os.hostname());
console.log('free memory-> ' + os.freemem());
console.log('home directory-> ' + os.homedir());
console.log('user name-> ' + os.userInfo().username);