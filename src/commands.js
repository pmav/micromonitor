var exec = require('child_process').exec;
var data = {};
var count = 0;
var onEndCallback = undefined;

module.exports = {
  run: function(callback) {
    onEndCallback = callback;

    // Run commands
    uname();
    uptime();
    top();
    free();
    df();
    dfi();
    diskstats();
    hostname();
    iplink();
    processes();
  }
};

// Execution

function execute(command, callback) {
  count++;
  exec(command, function(error, stdout, stderr) {
    callback(stdout);
    executionFinish();
  });
}

function executionFinish() {
  count--;
  if (count === 0)
    onEndCallback(data);
}

// Commands

function uname() {
  execute('uname -a',
    function(output) {
      data.info = {};
      data.info.uname = output.trim();
    });
}

function uptime() {
  execute('cat /proc/uptime',
    function(output) {
      data.system = {};
      var tokens = output.trim().split(' ');

      data.system.uptime = Math.floor(tokens[0]);
      data.system.idle = Math.floor(tokens[1]);
    });
}

function top() {
  execute('top -bn 1 | head -n 3',
    function(output) {
      data.cpu = {};
      var lines = output.split('\n');

      // 1st line
      var tokens = lines[0].split(': ')[1].trim().replace(/,/g, '').split(' ');
      data.cpu.load1min = Number(tokens[0]);
      data.cpu.load5min = Number(tokens[1]);
      data.cpu.load15min = Number(tokens[2]);

      // 2nd line
      tokens = lines[1].split(' ');
      data.cpu.tasksTotal = Number(tokens[2]);
      data.cpu.tasksRunning = Number(tokens[6]);
      data.cpu.tasksSleeping = Number(tokens[9]);
      data.cpu.tasksStopped = Number(tokens[13]);
      data.cpu.tasksZombie = Number(tokens[17]);

      // 3rd line
      tokens = lines[2].replace(/\%/g, ' ').trim().split(' ');
      data.cpu.user = Number(tokens[2]);
      data.cpu.system = Number(tokens[5]);
      data.cpu.nice = Number(tokens[8]);
      data.cpu.idle = Number(tokens[10]);
      data.cpu.ioWait = Number(tokens[13]);
      data.cpu.hi = Number(tokens[16]);
      data.cpu.si = Number(tokens[19]);
      data.cpu.steal = Number(tokens[22]);
    });
}

function free() {
  execute('free -b',
    function(output) {
      data.memory = {}
      var lines = output.split('\n');

      // 2nd line
      var tokens = lines[1].split(/\s+/);
      data.memory.physical = {};
      data.memory.physical.total = Number(tokens[1]);
      data.memory.physical.used = Number(tokens[2]);
      data.memory.physical.free = Number(tokens[3]);
      data.memory.physical.shared = Number(tokens[4]);
      data.memory.physical.buffers = Number(tokens[5]);
      data.memory.physical.cached = Number(tokens[6]);

      // 4th line
      tokens = lines[3].split(/\s+/);
      data.memory.swap = {};
      data.memory.swap.total = Number(tokens[1]);
      data.memory.swap.used = Number(tokens[2]);
      data.memory.swap.free = Number(tokens[3]);
    });
}

function df() {
  execute('df -T -x tmpfs -x rootfs -x devtmpfs --block-size=1',
    function(output) {
      data.partitions = data.partitions || {};
      var lines = output.split('\n');

      for (var i = 1; i < lines.length; i++) {
        if (lines[i] === '')
          continue;

        var tokens = lines[i].replace(/\s+/g, ' ').split(' ');

        var mountPoint = tokens[6];
        data.partitions[mountPoint] = data.partitions[mountPoint] || {};
        data.partitions[mountPoint].device = tokens[0];
        data.partitions[mountPoint].type = tokens[1];
        data.partitions[mountPoint].total = Number(tokens[2]);
        data.partitions[mountPoint].used = Number(tokens[3]);
        data.partitions[mountPoint].free = Number(tokens[4]);
      }
    });
}

function dfi() {
  execute('df -i -x tmpfs -x rootfs -x devtmpfs',
    function(output) {
      data.partitions = data.partitions || {};
      var lines = output.split('\n');

      for (var i = 1; i < lines.length; i++) {
        if (lines[i] === '')
          continue;

        var tokens = lines[i].replace(/\s+/g, ' ').split(' ');

        var mountPoint = tokens[5];
        data.partitions[mountPoint] = data.partitions[mountPoint] || {};
        data.partitions[mountPoint].inodes_total = Number(tokens[1]);
        data.partitions[mountPoint].inodes_used = Number(tokens[2]);
        data.partitions[mountPoint].inodes_free = Number(tokens[3]);
      }
    });
}

function diskstats() {
  execute('cat /proc/diskstats',
    function(output) {
      data.disks = {};
      var lines = output.trim().split('\n');

      for (var i = 0; i < lines.length; i++) {
        var tokens = lines[i].trim().replace(/\s+/g, ' ').split(' ');
        if (tokens[3] === '0')
          continue;
        var disk = tokens[2];

        data.disks[disk] = {};
        data.disks[disk].reads_completed_successfully = Number(tokens[3]);
        data.disks[disk].reads_merged = Number(tokens[4]);
        data.disks[disk].sectors_read = Number(tokens[5]);
        data.disks[disk].time_spent_reading_ms = Number(tokens[6]);
        data.disks[disk].writes_completed = Number(tokens[7]);
        data.disks[disk].writes_merged = Number(tokens[8]);
        data.disks[disk].sectors_written = Number(tokens[9]);
        data.disks[disk].time_spent_writing_ms = Number(tokens[10]);
        data.disks[disk].IOs_currently_in_progress = Number(tokens[11]);
        data.disks[disk].time_spent_doing_IOs_ms = Number(tokens[12]);
        data.disks[disk].weighted_time_spent_doing_IOs_ms = Number(tokens[13]);
      }
    });
}

function hostname() {
  execute('hostname',
    function(output) {
      data.network = data.network || {};
      data.network.hostname = output.trim();
    });
}

function iplink() {
  execute('ip -s link',
    function(output) {
      data.network = data.network || {};
      data.network.interface = {};

      var networkInterface = undefined;
      var lines = output.trim().split('\n');
      var state = 0;

      for (var i = 0; i < lines.length; i++) {
        switch (state) {
          case 0:
            networkInterface = lines[i].split(':')[1].trim()
            break;
          case 3:
            var rx = lines[i].trim().replace(/\s+/g, ' ').split(' ')
            data.network.interface[networkInterface] = data.network.interface[networkInterface] || {};
            data.network.interface[networkInterface].rx = {}
            var ref = data.network.interface[networkInterface].rx;
            ref.bytes = Number(rx[0]);
            ref.packets = Number(rx[1]);
            ref.errors = Number(rx[2]);
            ref.dropped = Number(rx[3]);
            ref.overrun = Number(rx[4]);
            ref.mcast = Number(rx[5]);
            break;
          case 5:
            var tx = lines[i].trim().replace(/\s+/g, ' ').split(' ')
            data.network.interface[networkInterface] = data.network.interface[networkInterface] || {};
            data.network.interface[networkInterface].tx = {};
            var ref = data.network.interface[networkInterface].tx;
            ref.bytes = Number(tx[0]);
            ref.packets = Number(tx[1]);
            ref.errors = Number(tx[2]);
            ref.dropped = Number(tx[3]);
            ref.carrier = Number(tx[4]);
            ref.collsns = Number(tx[5]);
            break;
        }
        state = (state + 1) % 6;
      }
    });
}

function processes()
{
  execute('ps -eo pcpu,pmem,comm,args | sort -k 1 -r | head -11',
    function(output) {
      data.processes = {};
      var lines = output.trim().split('\n');

      var c = 1;
      for (var i = 0; i < lines.length; i++) {
        var tokens = lines[i].trim().replace(/\s+/g, ' ').split(' ');
        if (tokens[0].indexOf('CPU') != -1)
          continue;

        var key = 'process#' + (c++);
        data.processes[key] = {};
        data.processes[key].cpu = Number(tokens[0]);
        data.processes[key].memory = Number(tokens[1]);
        data.processes[key].binary = tokens[2];
        data.processes[key].command = tokens.splice(3, tokens.length - 1).join(' ');
      };
    });
}