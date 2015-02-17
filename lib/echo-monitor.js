#!/usr/bin/env node

var commands = require('./commands');

function main()
{
  // Run commands to get data.
  commands.run(createStats);
  
  // CPU Uptime
  //set(stats, 'cpu.uptime', 'CPU uptime', uptime, secondsToDisplay(uptime));

  // CPU Load
  //set(stats, 'cpu.load._1min', 'CPU 1min load', load1, floatToDisplay(load1));
  //set(stats, 'cpu.load._5min', 'CPU 5min load', load5, floatToDisplay(load5));
  //set(stats, 'cpu.load._15min', 'CPU 15min load', load15, floatToDisplay(load15));

  // Memory Total
  //set(stats, 'memory.total', 'Memory total', totalmem, bytesToDisplay(totalmem));
  
  // Memory Use
  //set(stats, 'memory.use', 'Memory use', usemem, bytesToDisplay(usemem), usemem / totalmem * 100);

  // Memory Free
  //set(stats, 'memory.free', 'Memory free', freemem, bytesToDisplay(freemem), freemem / totalmem * 100);
}

function createStats(data)
{
  // Stats
  var stats = {};

  // Generic
  set(stats, 'generic.uptime', 'Uptime', data.generic.uptime, secondsToDisplay);
  set(stats, 'generic.idle', 'Idle time', data.generic.idle, secondsToDisplay);

  // CPU
  set(stats, 'cpu.load.1min', 'CPU 1min load', data.cpu.load1min, floatToDisplay);
  set(stats, 'cpu.load.5min', 'CPU 5min load', data.cpu.load5min, floatToDisplay);
  set(stats, 'cpu.load.15min', 'CPU 15min load', data.cpu.load15min, floatToDisplay);

  set(stats, 'cpu.tasks.total', 'Total tasks', data.cpu.tasksTotal, intToDisplay);
  set(stats, 'cpu.tasks.running', 'Running tasks', data.cpu.tasksRunning, intToDisplay);
  set(stats, 'cpu.tasks.sleeping', 'Sleeping tasks', data.cpu.tasksSleeping, intToDisplay);
  set(stats, 'cpu.tasks.stopped', 'Stopped tasks', data.cpu.tasksStopped, intToDisplay);
  set(stats, 'cpu.tasks.zombie', 'Zombie tasks', data.cpu.tasksZombie, intToDisplay);


  set(stats, 'cpu.state.user', 'CPU % user', data.cpu.user, percentageToDisplay);
  set(stats, 'cpu.state.system', 'CPU % system', data.cpu.system, percentageToDisplay);
  set(stats, 'cpu.state.nice', 'CPU % nice', data.cpu.nice, percentageToDisplay);
  set(stats, 'cpu.state.idle', 'CPU % idle', data.cpu.idle, percentageToDisplay);
  set(stats, 'cpu.state.io_wait', 'CPU % IO wait', data.cpu.ioWait, percentageToDisplay);
  set(stats, 'cpu.state.hardware_interrupts', 'CPU % hardware interrupts', data.cpu.hi, percentageToDisplay);
  set(stats, 'cpu.state.software_interrupts', 'CPU % software interrupts', data.cpu.si, percentageToDisplay);
  set(stats, 'cpu.state.steal', 'CPU % steal', data.cpu.steal, percentageToDisplay);

  // Memory

  // Network

  // Disk

  // Processes

  // Output
  toJson(stats);
  toPlain(stats);
}

function set(stats, key, name, rawValue, toDisplayFunction, percentageValue)
{
  var tokens = key.split('.');
  var ref = stats;

  for (var i  = 0; i < tokens.length; i++) {
    var key = tokens[i];
    if (ref[key] === undefined)
      ref[key] = {};
    ref = ref[key];
  }

  ref.name = name;
  ref.raw = rawValue;
  ref.display = toDisplayFunction(rawValue);
  if (percentageValue !== undefined)
    ref.percentage = percentageValue;
}

function secondsToDisplay(seconds)
{
  seconds = Math.floor(seconds);

  if (seconds < 60)
    return seconds + 's';

  var minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  if (minutes < 60)
    return minutes + 'm ' + seconds + 's';

  var hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  if (hours < 24) 
    return hours + 'h ' + minutes + 'm ' + seconds + 's';

  var days = Math.floor(hours / 24);
  hours = hours % 24;
  return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
}

function percentageToDisplay(float)
{
  return floatToDisplay(float) + ' %';
}

function intToDisplay(int)
{
  return parseInt(int, 10) + '';
}

function floatToDisplay(float)
{
  return (Math.floor(float * 100) / 100) + '';
}

function bytesToDisplay(bytes)
{
  if (bytes < 1024)
    return bytes + ' B';
  
  var kibytes = Math.floor(bytes / 1024);
  if (kibytes < 1024)
    return kibytes + ' KiB';

  var mibytes = Math.floor(kibytes / 1024);
  //if (mibytes < 1024)
  return mibytes + ' MiB';

  //var gibytes = Math.floor(mibytes / 1024);
  //if (gibytes < 1024)
  //  return gibytes + ' GiB';
}

function toPlain(stats)
{
  var walk = function(obj) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        var p = obj[property];
        if (typeof p === 'object' && p.name !== undefined) {
         console.log(p.name + '\t' + p.display); 
        } else if (typeof p === 'object') {
          walk(p);
        }
      }
    }
  }
  walk(stats);
}

function toJson(stats)
{
  console.log(JSON.stringify(stats, null, 2));
}

process.on('SIGINT', function () {
  process.exit(0);
});

main();
