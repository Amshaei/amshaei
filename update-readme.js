const fs = require('fs');

const MYBIRTHDAY = new Date('2000-07-14');
const age = (new Date()).getFullYear() - MYBIRTHDAY.getFullYear();

const readmePath = 'README.md';
let content = fs.readFileSync(readmePath, 'utf8');

content = content.replace(/age:\d+/, `age: ${age}`);

fs.writeFileSync(readmePath, content);