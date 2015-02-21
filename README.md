# micromonitor

micromonitor is a fast linux command line tool that outputs a number of metrics from your OS in plain text or json format.

### Metrics

- Info
 - Hostname
 - Uname

- System
 - Uptime
 - Idle time

- CPU
 - Load: 1 min, 5 min, 15 min
 - Tasks: total, running, sleeping, stopped, zombie
 - State: user, system, nice, idle, IO wait, hardware interrupts, software interrupts, steal

- Memory
 - Physical: total, used, free, shared, buffers, cached 
 - Swap: total, used, free

- Network
 - TODO

- Disk
 - TODO

- Processes
 - TODO

### Commands

List of used commands, your OS must support this tools in order to micromonitor to work.

Info:

    uname -a
    hostname

System metrics:

    cat /proc/uptime

CPU metrics:

    top -bn 1 | head -n 3

Memory metrics:

    cat /proc/meminfo
    vmstat
    free -m

Network metrics:
    
    http://www.cyberciti.biz/faq/network-statistics-tools-rhel-centos-debian-linux/

Disk metrics:

    df --block-size=1
    df -i
    cat /proc/sys/fs/file-nr

Process metrics:

    ps -eo pcpu,pid,user,args | sort -k 1 -r | head -10
  

### Example

Output example in plain text.

    Uptime  87d 21h 30m 41s
    Idle time   82d 20h 32m 26s
    CPU 1min load   0.22
    CPU 5min load   0.28
    CPU 15min load  0.26
    Total tasks 74
    Running tasks   1
    Sleeping tasks  73
    Stopped tasks   0
    Zombie tasks    0
    CPU % user  3.7 %
    CPU % system    1.3 %
    CPU % nice  0 %
    CPU % idle  94.2 %
    CPU % IO wait   0.4 %
    CPU % hardware interrupts   0 %
    CPU % software interrupts   0.4 %
    CPU % steal 0 %

Output example in json format.

    {
      "generic": {
        "uptime": {
          "name": "Uptime",
          "raw": 7594241,
          "display": "87d 21h 30m 41s"
        },
        "idle": {
          "name": "Idle time",
          "raw": 7158746,
          "display": "82d 20h 32m 26s"
        }
      },
      "cpu": {
        "load": {
          "1min": {
            "name": "CPU 1min load",
            "raw": 0.22,
            "display": "0.22"
          },
          "5min": {
            "name": "CPU 5min load",
            "raw": 0.28,
            "display": "0.28"
          },
          "15min": {
            "name": "CPU 15min load",
            "raw": 0.26,
            "display": "0.26"
          }
        },
        "tasks": {
          "total": {
            "name": "Total tasks",
            "raw": 74,
            "display": "74"
          },
          "running": {
            "name": "Running tasks",
            "raw": 1,
            "display": "1"
          },
          "sleeping": {
            "name": "Sleeping tasks",
            "raw": 73,
            "display": "73"
          },
          "stopped": {
            "name": "Stopped tasks",
            "raw": 0,
            "display": "0"
          },
          "zombie": {
            "name": "Zombie tasks",
            "raw": 0,
            "display": "0"
          }
        },
        "state": {
          "user": {
            "name": "CPU % user",
            "raw": 3.7,
            "display": "3.7 %"
          },
          "system": {
            "name": "CPU % system",
            "raw": 1.3,
            "display": "1.3 %"
          },
          "nice": {
            "name": "CPU % nice",
            "raw": 0,
            "display": "0 %"
          },
          "idle": {
            "name": "CPU % idle",
            "raw": 94.2,
            "display": "94.2 %"
          },
          "io_wait": {
            "name": "CPU % IO wait",
            "raw": 0.4,
            "display": "0.4 %"
          },
          "hardware_interrupts": {
            "name": "CPU % hardware interrupts",
            "raw": 0,
            "display": "0 %"
          },
          "software_interrupts": {
            "name": "CPU % software interrupts",
            "raw": 0.4,
            "display": "0.4 %"
          },
          "steal": {
            "name": "CPU % steal",
            "raw": 0,
            "display": "0 %"
          }
        }
      }
    }