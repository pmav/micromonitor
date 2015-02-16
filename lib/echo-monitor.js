#!/usr/bin/env node

var exec = require('child_process').exec;
var os = require('os');

function main()
{
  var uptime = os.uptime();
  var loadavg = os.loadavg();
  var load1 = loadavg[0];
  var load5 = loadavg[1];
  var load15 = loadavg[2];
  var totalmem = os.totalmem();
  var freemem = os.freemem();
  var usemem = totalmem - freemem;

  // Stats
  var stats = {};

  // CPU Uptime
  set(stats, 'cpu.uptime', 'CPU uptime', uptime, secondsToDisplay(uptime));

  // CPU Load
  set(stats, 'cpu.load._1min', 'CPU 1min load', load1, floatToDisplay(load1));
  set(stats, 'cpu.load._5min', 'CPU 5min load', load5, floatToDisplay(load5));
  set(stats, 'cpu.load._15min', 'CPU 15min load', load15, floatToDisplay(load15));

  // Memory Total
  set(stats, 'memory.total', 'Memory total', totalmem, bytesToDisplay(totalmem));
  
  // Memory Use
  set(stats, 'memory.use', 'Memory use', usemem, bytesToDisplay(usemem), usemem / totalmem * 100);

  // Memory Free
  set(stats, 'memory.free', 'Memory free', freemem, bytesToDisplay(freemem), freemem / totalmem * 100);

  // Output
  //toJson(stats);
  //toPlain(stats);

  loadAverage();

  /*
    CPU
    - top -bn 1 | head -n 3
      - Load average: 0.15, 0.21, 0.22
      - Tasks:        70 total,   1 running,  69 sleeping,   0 stopped,   0 zombie
      - %Cpu(s):      3.7 us,  1.3 sy,  0.0 ni, 94.2 id,  0.4 wa,  0.0 hi,  0.4 si,  0.0 st
      
    - Top 10 CPU usage: ps -eo pcpu,pid,user,args | sort -k 1 -r | head -10

    MEMORY
    - cat /proc/meminfo
    - vm_stat
    - free -m

    NETWORK
    - http://www.cyberciti.biz/faq/network-statistics-tools-rhel-centos-debian-linux/

    DISK
    - df
  */
}

function loadAverage()
{
  execute('uptime');
}

function execute(command)
{
  exec(command, function (error, stdout, stderr) {
    console.log(stdout);
  });
}

function set(stats, key, name, rawValue, displayValue, percentageValue)
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
  ref.display = displayValue;
  if (percentageValue !== undefined)
    ref.percentage = percentageValue;
}

function secondsToDisplay(seconds)
{
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

function floatToDisplay(float)
{
  return Math.floor(float * 100) / 100;
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
