# micromonitor

micromonitor is a fast linux command line tool that outputs a number of metrics from your OS in plain text or json format.

### How to use

TODO

### Metrics

- Info
 - Version
 - Collect date
 - Execution time
 - uname report

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

- Partitions
 - Device, mount point, type
 - Space: total, used, free
 - Inodes: total, used, free

- Network (TODO)
 - hostname
 - inet addr
 - RX packets, errors, dropped, overruns, frame
 - TX packets, errors, dropped, overruns, carrier
 - RX bytes
 - TX bytes

- Processes (TODO)
 - TODO

### Commands

List of commands used. Your OS must support these tools in order to micromonitor to work.

Info:

    uname -a

System:

    cat /proc/uptime

CPU:

    top -bn 1 | head -n 3

Memory:

    free -b

Partitions:

    df -T -x tmpfs -x rootfs -x devtmpfs --block-size=1
    df -i
    cat /proc/sys/fs/file-nr (TODO)

Network metrics:

    hostname (TODO)
    ip -s addr (TOOO)
    ip -s link (TOOO)

Process metrics:

    TODO ps -eo pcpu,pid,user,args | sort -k 1 -r | head -10

### Output

Output example in plain text.
```
Version 1.0.0
Collect date  1424904532
Execution time  
uname Linux raspberrypi 3.12.32+ #721 PREEMPT Fri Nov 7 16:50:31 GMT 2014 armv6l GNU/Linux
Uptime  2d 15h 20m 32s
Idle time 2d 13h 26m 10s
CPU 1min load 0.26
CPU 5min load 0.31
CPU 15min load  0.27
Total tasks 75
Running tasks 2
Sleeping tasks  73
Stopped tasks 0
Zombie tasks  0
CPU % user  1.8 %
CPU % system  0.7 %
CPU % nice  0 %
CPU % idle  97 %
CPU % IO wait 0.4 %
CPU % hardware interrupts 0 %
CPU % software interrupts 0.1 %
CPU % steal 0 %
Total physical memory 484 MiB
Used physical memory  472 MiB (97.39 %)
Free physical memory  12 MiB (2.6 %)
Shared physical memory  0 B (0 %)
Buffers physical memory 44 MiB (9.15 %)
Cached physical memory  364 MiB (75.13 %)
Total swap  99 MiB
Used swap 0 B (0 %)
Free swap 99 MiB (100 %)
/ total 14909 MiB
/ free  11403 MiB (76.48 %)
/ inodes total  957712
/ inodes used 90613 (9.46 %)
/ inodes free 867099 (90.53 %)
/boot used  9 MiB (17.26 %)
/media/MyBook2 total  1877634 MiB
/media/MyBook2 free 1678385 MiB (89.38 %)
/media/MyBook2 inodes total 122093568
/media/MyBook2 inodes used  1187 (0 %)
/media/MyBook2 inodes free  122092381 (99.99 %)
/boot total 55 MiB
/boot free  46 MiB (82.73 %)
/boot inodes total  0
/boot inodes used 0
/boot inodes free 0
```

Output example in json format.
```json
{
  "info": {
    "version": {
      "name": "Version",
      "raw": "1.0.0"
    },
    "collect_date": {
      "name": "Collect date",
      "raw": 1424904532
    },
    "exec_time": {
      "name": "Execution time",
      "raw": ""
    },
    "uname": {
      "name": "uname",
      "raw": "Linux raspberrypi 3.12.32+ #721 PREEMPT Fri Nov 7 16:50:31 GMT 2014 armv6l GNU/Linux"
    }
  },
  "system": {
    "uptime": {
      "name": "Uptime",
      "raw": 228032,
      "display": "2d 15h 20m 32s"
    },
    "idle": {
      "name": "Idle time",
      "raw": 221170,
      "display": "2d 13h 26m 10s"
    }
  },
  "cpu": {
    "load": {
      "1min": {
        "name": "CPU 1min load",
        "raw": 0.26,
        "display": "0.26"
      },
      "5min": {
        "name": "CPU 5min load",
        "raw": 0.31,
        "display": "0.31"
      },
      "15min": {
        "name": "CPU 15min load",
        "raw": 0.27,
        "display": "0.27"
      }
    },
    "tasks": {
      "total": {
        "name": "Total tasks",
        "raw": 75,
        "display": "75"
      },
      "running": {
        "name": "Running tasks",
        "raw": 2,
        "display": "2"
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
        "raw": 1.8,
        "display": "1.8 %"
      },
      "system": {
        "name": "CPU % system",
        "raw": 0.7,
        "display": "0.7 %"
      },
      "nice": {
        "name": "CPU % nice",
        "raw": 0,
        "display": "0 %"
      },
      "idle": {
        "name": "CPU % idle",
        "raw": 97,
        "display": "97 %"
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
        "raw": 0.1,
        "display": "0.1 %"
      },
      "steal": {
        "name": "CPU % steal",
        "raw": 0,
        "display": "0 %"
      }
    },
    "memory": {
      "physical": {
        "total": {
          "name": "Total physical memory",
          "raw": 508518400,
          "display": "484 MiB"
        },
        "used": {
          "name": "Used physical memory",
          "raw": 495267840,
          "display": "472 MiB",
          "percentage": "97.39 %"
        },
        "free": {
          "name": "Free physical memory",
          "raw": 13250560,
          "display": "12 MiB",
          "percentage": "2.6 %"
        },
        "shared": {
          "name": "Shared physical memory",
          "raw": 0,
          "display": "0 B",
          "percentage": "0 %"
        },
        "buffers": {
          "name": "Buffers physical memory",
          "raw": 46534656,
          "display": "44 MiB",
          "percentage": "9.15 %"
        },
        "cached": {
          "name": "Cached physical memory",
          "raw": 382058496,
          "display": "364 MiB",
          "percentage": "75.13 %"
        }
      },
      "swap": {
        "total": {
          "name": "Total swap",
          "raw": 104853504,
          "display": "99 MiB"
        },
        "used": {
          "name": "Used swap",
          "raw": 0,
          "display": "0 B",
          "percentage": "0 %"
        },
        "free": {
          "name": "Free swap",
          "raw": 104853504,
          "display": "99 MiB",
          "percentage": "100 %"
        }
      }
    }
  },
  "partition": {
    "/": {
      "total": {
        "name": "/ total",
        "raw": 15633403904,
        "display": "14909 MiB"
      },
      "free": {
        "name": "/ free",
        "raw": 11957030912,
        "display": "11403 MiB",
        "percentage": "76.48 %"
      },
      "inodes_total": {
        "name": "/ inodes total",
        "raw": 957712
      },
      "inodes_used": {
        "name": "/ inodes used",
        "raw": 90613,
        "percentage": "9.46 %"
      },
      "inodes_free": {
        "name": "/ inodes free",
        "raw": 867099,
        "percentage": "90.53 %"
      }
    },
    "function hasOwnProperty() { [native code] }": {
      "used": {
        "name": "/boot used",
        "raw": 10125312,
        "display": "9 MiB",
        "percentage": "17.26 %"
      }
    },
    "/media/MyBook2": {
      "total": {
        "name": "/media/MyBook2 total",
        "raw": 1968842792960,
        "display": "1877634 MiB"
      },
      "free": {
        "name": "/media/MyBook2 free",
        "raw": 1759914823680,
        "display": "1678385 MiB",
        "percentage": "89.38 %"
      },
      "inodes_total": {
        "name": "/media/MyBook2 inodes total",
        "raw": 122093568
      },
      "inodes_used": {
        "name": "/media/MyBook2 inodes used",
        "raw": 1187,
        "percentage": "0 %"
      },
      "inodes_free": {
        "name": "/media/MyBook2 inodes free",
        "raw": 122092381,
        "percentage": "99.99 %"
      }
    },
    "/boot": {
      "total": {
        "name": "/boot total",
        "raw": 58662912,
        "display": "55 MiB"
      },
      "free": {
        "name": "/boot free",
        "raw": 48537600,
        "display": "46 MiB",
        "percentage": "82.73 %"
      },
      "inodes_total": {
        "name": "/boot inodes total",
        "raw": 0
      },
      "inodes_used": {
        "name": "/boot inodes used",
        "raw": 0
      },
      "inodes_free": {
        "name": "/boot inodes free",
        "raw": 0
      }
    }
  }
}
```