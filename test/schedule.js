const schedule = require('node-schedule');

let rule = new schedule.RecurrenceRule();
rule.second = 1;

let j = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!');
  console.log('Current time: ',new Date(Date.now()))
});