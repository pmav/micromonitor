
var exec = require('child_process').exec;

module.exports = {
  run: function (callback) {
    Commands.run(callback);
  }
};

var Commands = {
    data: {},
    count: 0,
    callback: undefined,

    run: function(callback)
    {
        this.callback = callback;
        this.data = {};

        this.uptime();
        this.top();
        this.free();
    },

    execute: function (command, callback)
    {
        this.count++;
        exec(command, function (error, stdout, stderr) {
            callback(stdout);
            Commands.executionFinish();
        });
    },

    executionFinish: function()
    {
        Commands.count--;
        if (Commands.count === 0)
            Commands.callback(Commands.data);
    },

    uptime: function()
    {
        this.execute('cat /proc/uptime',
            function(output) {
                Commands.data.generic = {}
                var tokens = output.trim().split(' ');

                Commands.data.generic.uptime = Math.floor(tokens[0]);
                Commands.data.generic.idle = Math.floor(tokens[1]);
            });
    },

    top: function()
    {
        this.execute('top -bn 1 | head -n 3',
            function(output) {
                Commands.data.cpu = {};
                var lines = output.split('\n');

                // 1st line
                var tokens = lines[0].replace(/,/g, '').split(' ');
                Commands.data.cpu.load1min = Number(tokens[13]);
                Commands.data.cpu.load5min = Number(tokens[14]);
                Commands.data.cpu.load15min = Number(tokens[15]);
                
                // 2nd line
                tokens = lines[1].split(' ');
                Commands.data.cpu.tasksTotal = Number(tokens[2]);
                Commands.data.cpu.tasksRunning = Number(tokens[6]);
                Commands.data.cpu.tasksSleeping = Number(tokens[9]);
                Commands.data.cpu.tasksStopped = Number(tokens[13]);
                Commands.data.cpu.tasksZombie = Number(tokens[17]);

                // 3rd line
                tokens = lines[2].split(' ');
                Commands.data.cpu.user = Number(tokens[2]);
                Commands.data.cpu.system = Number(tokens[5]);
                Commands.data.cpu.nice = Number(tokens[8]);
                Commands.data.cpu.idle = Number(tokens[10]);
                Commands.data.cpu.ioWait = Number(tokens[13]);
                Commands.data.cpu.hi = Number(tokens[16]);
                Commands.data.cpu.si = Number(tokens[19]);
                Commands.data.cpu.steal = Number(tokens[22]);
            });
    },

    free: function()
    {
        this.execute('free -b',
            function(output) {
                Commands.data.memory = {}
                var lines = output.split('\n');

                // 2nd line
                var tokens = lines[1].split(/\s+/);
                Commands.data.memory.physical = {};
                Commands.data.memory.physical.total = Number(tokens[1]);
                Commands.data.memory.physical.used = Number(tokens[2]);
                Commands.data.memory.physical.free = Number(tokens[3]);
                Commands.data.memory.physical.shared = Number(tokens[4]);
                Commands.data.memory.physical.buffers = Number(tokens[5]);
                Commands.data.memory.physical.cached = Number(tokens[6]);

                // 4th line
                tokens = lines[3].split(/\s+/);
                Commands.data.memory.swap = {};
                Commands.data.memory.swap.total = Number(tokens[1]);
                Commands.data.memory.swap.used = Number(tokens[2]);
                Commands.data.memory.swap.free = Number(tokens[3]);
            });
    }
};
    