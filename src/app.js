#!/usr/bin/env node

var commands = require('./commands');
var version = '0.0.5';
var executionTime;

function main() {
  // Run commands to get data.
  executionTime = process.hrtime === undefined ? new Date() : process.hrtime();
  commands.run(createStats);
}

function createStats(data) {
  // Calculate commands exec time.
  if (process.hrtime === undefined) {
    executionTime = (new Date() - executionTime);
  } else {
    var elapsed = process.hrtime(executionTime);
    executionTime = (elapsed[0] * 1000) + Math.floor(elapsed[1] / 1000000);
  }

  var collectDate = new Date();
  var stats = {};

  // Info
  set(stats, 'info.version', 'Version', version);
  set(stats, 'info.collect_date', 'Collect date', Math.floor(collectDate.getTime() / 1000), dateToDisplay);
  set(stats, 'info.exec_time', 'Execution time', executionTime);
  set(stats, 'info.uname', 'uname', data.info.uname);

  // System
  set(stats, 'system.uptime', 'Uptime', data.system.uptime, secondsToDisplay);
  set(stats, 'system.idle', 'Idle time', data.system.idle, secondsToDisplay);

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
  set(stats, 'cpu.memory.physical.total', 'Total physical memory', data.memory.physical.total, bytesToDisplay);
  set(stats, 'cpu.memory.physical.used', 'Used physical memory', data.memory.physical.used, bytesToDisplay, data.memory.physical.used / data.memory.physical.total * 100);
  set(stats, 'cpu.memory.physical.free', 'Free physical memory', data.memory.physical.free, bytesToDisplay, data.memory.physical.free / data.memory.physical.total * 100);
  set(stats, 'cpu.memory.physical.shared', 'Shared physical memory', data.memory.physical.shared, bytesToDisplay, data.memory.physical.shared / data.memory.physical.total * 100);
  set(stats, 'cpu.memory.physical.buffers', 'Buffers physical memory', data.memory.physical.buffers, bytesToDisplay, data.memory.physical.buffers / data.memory.physical.total * 100);
  set(stats, 'cpu.memory.physical.cached', 'Cached physical memory', data.memory.physical.cached, bytesToDisplay, data.memory.physical.cached / data.memory.physical.total * 100);

  set(stats, 'cpu.memory.swap.total', 'Total swap', data.memory.swap.total, bytesToDisplay);
  set(stats, 'cpu.memory.swap.used', 'Used swap', data.memory.swap.used, bytesToDisplay, data.memory.swap.used / data.memory.swap.total * 100);
  set(stats, 'cpu.memory.swap.free', 'Free swap', data.memory.swap.free, bytesToDisplay, data.memory.swap.free / data.memory.swap.total * 100);

  // Partitions
  for (var property in data.partitions) {
    if (data.partitions.hasOwnProperty(property)) {
      var partition = data.partitions[property];

      //set(stats, 'partition.' + property,  undefined, property);
      //set(stats, 'partition.' + property + '.device', 'Device', partition.device);
      //set(stats, 'partition.' + property + '.type', 'Type', partition.type);
      set(stats, 'partition.' + property + '.total', property + ' total', partition.total, bytesToDisplay);
      set(stats, 'partition.' + property + '.used', property + ' used', partition.used, bytesToDisplay, partition.used / partition.total * 100);
      set(stats, 'partition.' + property + '.free', property + ' free', partition.free, bytesToDisplay, partition.free / partition.total * 100);

      set(stats, 'partition.' + property + '.inodes_total', property + ' inodes total', partition.inodes_total);
      set(stats, 'partition.' + property + '.inodes_used', property + ' inodes used', partition.inodes_used, undefined, partition.inodes_used / partition.inodes_total * 100);
      set(stats, 'partition.' + property + '.inodes_free', property + ' inodes free', partition.inodes_free, undefined, partition.inodes_free / partition.inodes_total * 100);
    }
  }

  // Disks
  for (var property in data.disks) {
    if (data.disks.hasOwnProperty(property)) {
      var disk = data.disks[property];

      // Reads
      set(stats, 'disk.' + property + '.reads_completed', property + ' reads completed', disk.reads_completed_successfully);
      set(stats, 'disk.' + property + '.reads_merged', property + ' reads merged', disk.reads_merged);
      set(stats, 'disk.' + property + '.sectors_read', property + ' sectors read', disk.sectors_read);
      set(stats, 'disk.' + property + '.time_reading', property + ' time reading', disk.time_spent_reading_ms, millisecondsToDisplay);

      // Writes
      set(stats, 'disk.' + property + '.writes_completed', property + ' writes completed', disk.writes_completed);
      set(stats, 'disk.' + property + '.writes_merged', property + ' writes merged', disk.writes_merged);
      set(stats, 'disk.' + property + '.sectors_written', property + ' sectors written', disk.sectors_written);
      set(stats, 'disk.' + property + '.time_writing', property + ' time writing', disk.time_spent_writing_ms, millisecondsToDisplay);

      // IO
      set(stats, 'disk.' + property + '.IOs_currently_in_progress', property + ' IO in progress', disk.IOs_currently_in_progress);
      set(stats, 'disk.' + property + '.time_spent_doing_IOs_ms', property + ' time IO', disk.time_spent_doing_IOs_ms, millisecondsToDisplay);
      set(stats, 'disk.' + property + '.weighted_time_spent_doing_IOs_ms', property + ' weighted time IO', disk.weighted_time_spent_doing_IOs_ms, millisecondsToDisplay);
    }
  }

  // Network
  set(stats, 'network.hostname', 'Hostname', data.network.hostname);

  for (var property in data.network.interface) {
    if (data.network.interface.hasOwnProperty(property)) {
      var networkInterface = data.network.interface[property];

      set(stats, 'network.interfaces.' + property + '.rx_bytes', property + ' receive bytes', networkInterface.rx.bytes, bytesToDisplay);
      set(stats, 'network.interfaces.' + property + '.rx_packets', property + ' receive packets', networkInterface.rx.packets);
      set(stats, 'network.interfaces.' + property + '.rx_errors', property + ' receive errors', networkInterface.rx.errors);
      set(stats, 'network.interfaces.' + property + '.rx_dropped', property + ' receive dropped', networkInterface.rx.dropped);
      set(stats, 'network.interfaces.' + property + '.rx_overrun', property + ' receive overrun', networkInterface.rx.overrun);
      set(stats, 'network.interfaces.' + property + '.rx_mcast', property + ' receive multicast', networkInterface.rx.mcast);

      set(stats, 'network.interfaces.' + property + '.tx_bytes', property + ' transmit bytes', networkInterface.tx.bytes, bytesToDisplay);
      set(stats, 'network.interfaces.' + property + '.tx_packets', property + ' transmit packets', networkInterface.tx.packets);
      set(stats, 'network.interfaces.' + property + '.tx_errors', property + ' transmit errors', networkInterface.tx.errors);
      set(stats, 'network.interfaces.' + property + '.tx_dropped', property + ' transmit dropped', networkInterface.tx.dropped);
      set(stats, 'network.interfaces.' + property + '.tx_carrier', property + ' transmit carrier', networkInterface.tx.carrier);
      set(stats, 'network.interfaces.' + property + '.tx_collsns', property + ' transmit collisions', networkInterface.tx.collsns);
    }
  }

  // Processes

  for (var property in data.processes) {
    if (data.processes.hasOwnProperty(property)) {
      var curProcess = data.processes[property];

      set(stats, 'processes.' + property + '.cpu',     property + ' % CPU',    curProcess.cpu);
      set(stats, 'processes.' + property + '.memory',  property + ' % memory', curProcess.memory);
      set(stats, 'processes.' + property + '.binary',  property + ' Binary',   curProcess.binary);
      set(stats, 'processes.' + property + '.command', property + ' Command',  curProcess.command);
    }
  }

  // Output (TODO yargs)
  toJson(stats);
  toPlain(stats);
}

function set(stats, key, name, rawValue, toDisplayFunction, percentageValue) {
  var tokens = key.split('.');
  var ref = stats;

  for (var i = 0; i < tokens.length; i++) {
    var key = tokens[i];
    if (ref[key] === undefined)
      ref[key] = {};
    ref = ref[key];
  }

  if (name === undefined) {
    ref.name = rawValue;
  } else {
    ref.name = name;
    ref.raw = rawValue;
    if (toDisplayFunction !== undefined)
      ref.display = toDisplayFunction(rawValue);
    if (percentageValue !== undefined && !isNaN(percentageValue))
      ref.percentage = percentageToDisplay(percentageValue);
  }
}

// Convert

function millisecondsToDisplay(milliseconds) {
  return secondsToDisplay(Math.floor(milliseconds / 1000));
}

function secondsToDisplay(seconds) {
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

function percentageToDisplay(float) {
  return floatToDisplay(float) + ' %';
}

function intToDisplay(int) {
  return parseInt(int, 10) + '';
}

function floatToDisplay(float) {
  return (Math.floor(float * 100) / 100) + '';
}

function bytesToDisplay(bytes) {
  if (bytes < 1024)
    return bytes + ' B';

  var kibytes = Math.floor(bytes / 1024);
  if (kibytes < 1024)
    return kibytes + ' KiB';

  var mibytes = Math.floor(kibytes / 1024);
  //if (mibytes < 1024)
  return mibytes + ' MiB';

  //var gibytes = Math.floor(mibytes / 1024);
  //return gibytes + ' GiB';
}

function dateToDisplay(milliseconds) {
  return new Date(milliseconds * 1000).toISOString();
}

// Output

function toPlain(stats) {
  var walk = function(obj) {

    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        var p = obj[property];
        if (typeof p === 'object' && p.name !== undefined) {
          var display = p.display === undefined ? p.raw : p.display;
          if (p.percentage === undefined)
            console.log(p.name + '\t' + display);
          else
            console.log(p.name + '\t' + display + ' (' + p.percentage + ')');
        } else if (typeof p === 'object') {
          walk(p);
        }
      }
    }
  }
  walk(stats);
}

function toJson(stats) {
  console.log(JSON.stringify(stats, null, 2));
}

process.on('SIGINT', function() {
  process.exit(0);
});

main();