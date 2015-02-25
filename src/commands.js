
var exec = require('child_process').exec;
var data = {};
var count = 0;
var onEndCallback = undefined;

module.exports = {
  run: function (callback) {
    onEndCallback = callback;
    
    // Run commands
    uname();
    uptime();
    top();
    free();
    df();
    dfi();
  }
};

// Execution

function execute(command, callback)
{
    count++;
    exec(command, function (error, stdout, stderr) {
        callback(stdout);
        executionFinish();
    });
}

function executionFinish()
{
    count--;
    if (count === 0)
        onEndCallback(data);
}

// Commands

function uname()
{
    execute('uname -a',
        function(output) {
            data.info = {};
            data.info.uname = output.trim();
        });
}

function uptime()
{
    execute('cat /proc/uptime',
        function(output) {
            data.system = {};
            var tokens = output.trim().split(' ');

            data.system.uptime = Math.floor(tokens[0]);
            data.system.idle = Math.floor(tokens[1]);
        });
}

function top()
{
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
            tokens = lines[2].split(' ');
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

function free()
{
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

function df()
{
    execute('df -T -x tmpfs -x rootfs -x devtmpfs --block-size=1',
        function(output) {
            data.partitions = data.partitions || {};
            var lines = output.split('\n');

            for(var i = 1; i < lines.length; i++)
            {
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

function dfi()
{
    execute('df -i -x tmpfs -x rootfs -x devtmpfs',
        function(output) {
            data.partitions = data.partitions || {};
            var lines = output.split('\n');

            for(var i = 1; i < lines.length; i++)
            {
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