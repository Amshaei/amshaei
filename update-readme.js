const fs = require('fs');

const BIRTHDAY = new Date('2000-07-14');
const age = (new Date()).getFullYear() - BIRTHDAY.getFullYear();

const readmePath = 'README.md';
let content = fs.readFileSync(readmePath, 'utf8');

content = content.replace(/age:\d+/, `age: ${age}`);

fs.writeFileSync(readmePath, content);