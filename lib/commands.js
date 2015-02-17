
var exec = require('child_process').exec;

module.exports = {
  run: function (callback) {
    run(callback);
  }
};

var data = {};
var count = 0;
var callback = undefined;

function run(c)
{
    callback = c;

    uptime();
    cpu();
}

function uptime()
{
    count++;
    execute('cat /proc/uptime',
        function(output) {
            var tokens = output.trim().split(' ');

            data.generic = {}
            data.generic.uptime = Math.floor(tokens[0]);
            data.generic.idle = Math.floor(tokens[1]);

            executionFinish();
        });
}

function cpu()
{
    count++;
    execute('top -bn 1 | head -n 3',
        function(output) {
            var lines = output.split('\n');
            data.cpu = {};

            // 1st line
            var tokens = lines[0].replace(/,/g, '').split(' ');
            data.cpu.load1min = Number(tokens[13]);
            data.cpu.load5min = Number(tokens[14]);
            data.cpu.load15min = Number(tokens[15]);
            
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

            executionFinish();
        });
}

function execute(command, callback)
{
  exec(command, function (error, stdout, stderr) {
    callback(stdout);
  });
}

function executionFinish()
{
    count--;
    if (count === 0)
        callback(data);
}



    