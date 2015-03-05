# micromonitor

micromonitor is a fast linux command line tool that outputs a number of metrics from your OS in plain text or json format.

Create micromonitor (package) and micromonitor-cli

## How to use

TODO

## Metrics

- Info
 - Version
 - Collect date
 - Execution time
 - uname report
 - Metric count (TODO)

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

- Disks
 - Reading: reads completed, reads merged, sectors read, time reading
 - Writing: writes completed, writes merged, sectors written, time writing
 - IO: I/Os in progress, time doing I/Os, weighted time doing I/Os

- Network
 - hostname
 - RX: bytes, packets, errors, dropped, overrun, mcast
 - TX: bytes, packets, errors, dropped, carrier, collsns
 - inet/inet6 addr (TODO)

- Processes
 - Top 10 by CPU: % CPU, % memory, binary, command

## Commands

List of commands used. Your OS must support these tools in order to micromonitor to work.
```bash
# Info
$ uname -a

# System
$ cat /proc/uptime

# CPU
$ top -bn 1 | head -n 3

# Memory
$ free -b

# Partitions
$ df -T -x tmpfs -x rootfs -x devtmpfs --block-size=1
$ df -i
$ cat /proc/sys/fs/file-nr (TODO)

# Disks
$ cat /proc/diskstats

# Network Interfaces
$ hostname
$ ip -s link
$ ip -s addr (inet/inet6) (TOOO)

# Processes
$ ps -eo pcpu,pmem,comm,args | sort -k 1 -r | head -11
```

## Output

Output example in plain text.
```
Version 0.0.5
Collect date  2015-03-04T00:33:55.000Z
Execution time  508
uname Linux raspberrypi 3.12.32+ #721 PREEMPT Fri Nov 7 16:50:31 GMT 2014 armv6l GNU/Linux
Uptime  4d 7h 49m 3s
Idle time 4d 3h 58m 19s
CPU 1min load 0.32
CPU 5min load 0.25
CPU 15min load  0.28
Total tasks 75
Running tasks 1
Sleeping tasks  74
Stopped tasks 0
Zombie tasks  0
CPU % user  2.29 %
CPU % system  0.8 %
CPU % nice  0 %
CPU % idle  96.3 %
CPU % IO wait 0.5 %
CPU % hardware interrupts 0 %
CPU % software interrupts 0.1 %
CPU % steal 0 %
Total physical memory 484 MiB
Used physical memory  473 MiB (97.73 %)
Free physical memory  11 MiB (2.26 %)
Shared physical memory  0 B (0 %)
Buffers physical memory 95 MiB (19.73 %)
Cached physical memory  299 MiB (61.72 %)
Total swap  99 MiB
Used swap 0 B (0 %)
Free swap 99 MiB (100 %)
/ total 14909 MiB
/ used  3076 MiB (20.63 %)
/ free  11182 MiB (75 %)
/ inodes total  957712
/ inodes used 92214 (9.62 %)
/ inodes free 865498 (90.37 %)
/media/MyBook2 total  1877634 MiB
/media/MyBook2 used 103848 MiB (5.53 %)
/media/MyBook2 free 1678385 MiB (89.38 %)
/media/MyBook2 inodes total 122093568
/media/MyBook2 inodes used  1260 (0 %)
/media/MyBook2 inodes free  122092308 (99.99 %)
/boot total 55 MiB
/boot used  14 MiB (25.7 %)
/boot free  41 MiB (74.29 %)
/boot inodes total  0
/boot inodes used 0
/boot inodes free 0
mmcblk0 reads completed 16153
mmcblk0 reads merged  7028
mmcblk0 sectors read  710091
mmcblk0 time reading  15m 50s
mmcblk0 writes completed  62318
mmcblk0 writes merged 74331
mmcblk0 sectors written 2710780
mmcblk0 time writing  6h 52m 40s
mmcblk0 IO in progress  0
mmcblk0 time IO 36m 54s
mmcblk0 weighted time IO  7h 8m 31s
mmcblk0p1 reads completed 67
mmcblk0p1 reads merged  23
mmcblk0p1 sectors read  265
mmcblk0p1 time reading  0s
mmcblk0p1 writes completed  234
mmcblk0p1 writes merged 69
mmcblk0p1 sectors written 29268
mmcblk0p1 time writing  1m 0s
mmcblk0p1 IO in progress  0
mmcblk0p1 time IO 39s
mmcblk0p1 weighted time IO  1m 0s
mmcblk0p2 reads completed 16009
mmcblk0p2 reads merged  7005
mmcblk0p2 sectors read  709210
mmcblk0p2 time reading  15m 50s
mmcblk0p2 writes completed  62084
mmcblk0p2 writes merged 74262
mmcblk0p2 sectors written 2681512
mmcblk0p2 time writing  6h 51m 40s
mmcblk0p2 IO in progress  0
mmcblk0p2 time IO 36m 44s
mmcblk0p2 weighted time IO  7h 7m 30s
sda reads completed 67936
sda reads merged  18230
sda sectors read  3197730
sda time reading  1h 4m 35s
sda writes completed  2015
sda writes merged 2280
sda sectors written 36264
sda time writing  2m 18s
sda IO in progress  0
sda time IO 28m 4s
sda weighted time IO  1h 6m 52s
sda1 reads completed  67783
sda1 reads merged 18230
sda1 sectors read 3196506
sda1 time reading 1h 4m 35s
sda1 writes completed 2015
sda1 writes merged  2280
sda1 sectors written  36264
sda1 time writing 2m 18s
sda1 IO in progress 0
sda1 time IO  28m 4s
sda1 weighted time IO 1h 6m 52s
Hostname  raspberrypi
lo receive bytes  134 KiB
lo receive packets  1915
lo receive errors 0
lo receive dropped  0
lo receive overrun  0
lo receive multicast  0
lo transmit bytes 134 KiB
lo transmit packets 1915
lo transmit errors  0
lo transmit dropped 0
lo transmit carrier 0
lo transmit collisions  0
eth0 receive bytes  282 MiB
eth0 receive packets  1558704
eth0 receive errors 0
eth0 receive dropped  0
eth0 receive overrun  0
eth0 receive multicast  0
eth0 transmit bytes 1652 MiB
eth0 transmit packets 2407923
eth0 transmit errors  0
eth0 transmit dropped 0
eth0 transmit carrier 0
eth0 transmit collisions  0
```

Output example in json format.
```json
{
  "info": {
    "version": {
      "name": "Version",
      "raw": "0.0.5"
    },
    "collect_date": {
      "name": "Collect date",
      "raw": 1425429235,
      "display": "2015-03-04T00:33:55.000Z"
    },
    "exec_time": {
      "name": "Execution time",
      "raw": 508
    },
    "uname": {
      "name": "uname",
      "raw": "Linux raspberrypi 3.12.32+ #721 PREEMPT Fri Nov 7 16:50:31 GMT 2014 armv6l GNU/Linux"
    }
  },
  "system": {
    "uptime": {
      "name": "Uptime",
      "raw": 373743,
      "display": "4d 7h 49m 3s"
    },
    "idle": {
      "name": "Idle time",
      "raw": 359899,
      "display": "4d 3h 58m 19s"
    }
  },
  "cpu": {
    "load": {
      "1min": {
        "name": "CPU 1min load",
        "raw": 0.32,
        "display": "0.32"
      },
      "5min": {
        "name": "CPU 5min load",
        "raw": 0.25,
        "display": "0.25"
      },
      "15min": {
        "name": "CPU 15min load",
        "raw": 0.29,
        "display": "0.28"
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
        "raw": 1,
        "display": "1"
      },
      "sleeping": {
        "name": "Sleeping tasks",
        "raw": 74,
        "display": "74"
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
        "raw": 2.3,
        "display": "2.29 %"
      },
      "system": {
        "name": "CPU % system",
        "raw": 0.8,
        "display": "0.8 %"
      },
      "nice": {
        "name": "CPU % nice",
        "raw": 0,
        "display": "0 %"
      },
      "idle": {
        "name": "CPU % idle",
        "raw": 96.3,
        "display": "96.3 %"
      },
      "io_wait": {
        "name": "CPU % IO wait",
        "raw": 0.5,
        "display": "0.5 %"
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
          "raw": 496975872,
          "display": "473 MiB",
          "percentage": "97.73 %"
        },
        "free": {
          "name": "Free physical memory",
          "raw": 11542528,
          "display": "11 MiB",
          "percentage": "2.26 %"
        },
        "shared": {
          "name": "Shared physical memory",
          "raw": 0,
          "display": "0 B",
          "percentage": "0 %"
        },
        "buffers": {
          "name": "Buffers physical memory",
          "raw": 100368384,
          "display": "95 MiB",
          "percentage": "19.73 %"
        },
        "cached": {
          "name": "Cached physical memory",
          "raw": 313905152,
          "display": "299 MiB",
          "percentage": "61.72 %"
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
      "used": {
        "name": "/ used",
        "raw": 3226415104,
        "display": "3076 MiB",
        "percentage": "20.63 %"
      },
      "free": {
        "name": "/ free",
        "raw": 11725500416,
        "display": "11182 MiB",
        "percentage": "75 %"
      },
      "inodes_total": {
        "name": "/ inodes total",
        "raw": 957712
      },
      "inodes_used": {
        "name": "/ inodes used",
        "raw": 92214,
        "percentage": "9.62 %"
      },
      "inodes_free": {
        "name": "/ inodes free",
        "raw": 865498,
        "percentage": "90.37 %"
      }
    },
    "/media/MyBook2": {
      "total": {
        "name": "/media/MyBook2 total",
        "raw": 1968842792960,
        "display": "1877634 MiB"
      },
      "used": {
        "name": "/media/MyBook2 used",
        "raw": 108893302784,
        "display": "103848 MiB",
        "percentage": "5.53 %"
      },
      "free": {
        "name": "/media/MyBook2 free",
        "raw": 1759914504192,
        "display": "1678385 MiB",
        "percentage": "89.38 %"
      },
      "inodes_total": {
        "name": "/media/MyBook2 inodes total",
        "raw": 122093568
      },
      "inodes_used": {
        "name": "/media/MyBook2 inodes used",
        "raw": 1260,
        "percentage": "0 %"
      },
      "inodes_free": {
        "name": "/media/MyBook2 inodes free",
        "raw": 122092308,
        "percentage": "99.99 %"
      }
    },
    "/boot": {
      "total": {
        "name": "/boot total",
        "raw": 58662912,
        "display": "55 MiB"
      },
      "used": {
        "name": "/boot used",
        "raw": 15081472,
        "display": "14 MiB",
        "percentage": "25.7 %"
      },
      "free": {
        "name": "/boot free",
        "raw": 43581440,
        "display": "41 MiB",
        "percentage": "74.29 %"
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
  },
  "disk": {
    "mmcblk0": {
      "reads_completed": {
        "name": "mmcblk0 reads completed",
        "raw": 16153
      },
      "reads_merged": {
        "name": "mmcblk0 reads merged",
        "raw": 7028
      },
      "sectors_read": {
        "name": "mmcblk0 sectors read",
        "raw": 710091
      },
      "time_reading": {
        "name": "mmcblk0 time reading",
        "raw": 950810,
        "display": "15m 50s"
      },
      "writes_completed": {
        "name": "mmcblk0 writes completed",
        "raw": 62318
      },
      "writes_merged": {
        "name": "mmcblk0 writes merged",
        "raw": 74331
      },
      "sectors_written": {
        "name": "mmcblk0 sectors written",
        "raw": 2710780
      },
      "time_writing": {
        "name": "mmcblk0 time writing",
        "raw": 24760580,
        "display": "6h 52m 40s"
      },
      "IOs_currently_in_progress": {
        "name": "mmcblk0 IO in progress",
        "raw": 0
      },
      "time_spent_doing_IOs_ms": {
        "name": "mmcblk0 time IO",
        "raw": 2214930,
        "display": "36m 54s"
      },
      "weighted_time_spent_doing_IOs_ms": {
        "name": "mmcblk0 weighted time IO",
        "raw": 25711140,
        "display": "7h 8m 31s"
      }
    },
    "mmcblk0p1": {
      "reads_completed": {
        "name": "mmcblk0p1 reads completed",
        "raw": 67
      },
      "reads_merged": {
        "name": "mmcblk0p1 reads merged",
        "raw": 23
      },
      "sectors_read": {
        "name": "mmcblk0p1 sectors read",
        "raw": 265
      },
      "time_reading": {
        "name": "mmcblk0p1 time reading",
        "raw": 60,
        "display": "0s"
      },
      "writes_completed": {
        "name": "mmcblk0p1 writes completed",
        "raw": 234
      },
      "writes_merged": {
        "name": "mmcblk0p1 writes merged",
        "raw": 69
      },
      "sectors_written": {
        "name": "mmcblk0p1 sectors written",
        "raw": 29268
      },
      "time_writing": {
        "name": "mmcblk0p1 time writing",
        "raw": 60200,
        "display": "1m 0s"
      },
      "IOs_currently_in_progress": {
        "name": "mmcblk0p1 IO in progress",
        "raw": 0
      },
      "time_spent_doing_IOs_ms": {
        "name": "mmcblk0p1 time IO",
        "raw": 39930,
        "display": "39s"
      },
      "weighted_time_spent_doing_IOs_ms": {
        "name": "mmcblk0p1 weighted time IO",
        "raw": 60260,
        "display": "1m 0s"
      }
    },
    "mmcblk0p2": {
      "reads_completed": {
        "name": "mmcblk0p2 reads completed",
        "raw": 16009
      },
      "reads_merged": {
        "name": "mmcblk0p2 reads merged",
        "raw": 7005
      },
      "sectors_read": {
        "name": "mmcblk0p2 sectors read",
        "raw": 709210
      },
      "time_reading": {
        "name": "mmcblk0p2 time reading",
        "raw": 950700,
        "display": "15m 50s"
      },
      "writes_completed": {
        "name": "mmcblk0p2 writes completed",
        "raw": 62084
      },
      "writes_merged": {
        "name": "mmcblk0p2 writes merged",
        "raw": 74262
      },
      "sectors_written": {
        "name": "mmcblk0p2 sectors written",
        "raw": 2681512
      },
      "time_writing": {
        "name": "mmcblk0p2 time writing",
        "raw": 24700380,
        "display": "6h 51m 40s"
      },
      "IOs_currently_in_progress": {
        "name": "mmcblk0p2 IO in progress",
        "raw": 0
      },
      "time_spent_doing_IOs_ms": {
        "name": "mmcblk0p2 time IO",
        "raw": 2204900,
        "display": "36m 44s"
      },
      "weighted_time_spent_doing_IOs_ms": {
        "name": "mmcblk0p2 weighted time IO",
        "raw": 25650830,
        "display": "7h 7m 30s"
      }
    },
    "sda": {
      "reads_completed": {
        "name": "sda reads completed",
        "raw": 67936
      },
      "reads_merged": {
        "name": "sda reads merged",
        "raw": 18230
      },
      "sectors_read": {
        "name": "sda sectors read",
        "raw": 3197730
      },
      "time_reading": {
        "name": "sda time reading",
        "raw": 3875640,
        "display": "1h 4m 35s"
      },
      "writes_completed": {
        "name": "sda writes completed",
        "raw": 2015
      },
      "writes_merged": {
        "name": "sda writes merged",
        "raw": 2280
      },
      "sectors_written": {
        "name": "sda sectors written",
        "raw": 36264
      },
      "time_writing": {
        "name": "sda time writing",
        "raw": 138030,
        "display": "2m 18s"
      },
      "IOs_currently_in_progress": {
        "name": "sda IO in progress",
        "raw": 0
      },
      "time_spent_doing_IOs_ms": {
        "name": "sda time IO",
        "raw": 1684300,
        "display": "28m 4s"
      },
      "weighted_time_spent_doing_IOs_ms": {
        "name": "sda weighted time IO",
        "raw": 4012900,
        "display": "1h 6m 52s"
      }
    },
    "sda1": {
      "reads_completed": {
        "name": "sda1 reads completed",
        "raw": 67783
      },
      "reads_merged": {
        "name": "sda1 reads merged",
        "raw": 18230
      },
      "sectors_read": {
        "name": "sda1 sectors read",
        "raw": 3196506
      },
      "time_reading": {
        "name": "sda1 time reading",
        "raw": 3875540,
        "display": "1h 4m 35s"
      },
      "writes_completed": {
        "name": "sda1 writes completed",
        "raw": 2015
      },
      "writes_merged": {
        "name": "sda1 writes merged",
        "raw": 2280
      },
      "sectors_written": {
        "name": "sda1 sectors written",
        "raw": 36264
      },
      "time_writing": {
        "name": "sda1 time writing",
        "raw": 138030,
        "display": "2m 18s"
      },
      "IOs_currently_in_progress": {
        "name": "sda1 IO in progress",
        "raw": 0
      },
      "time_spent_doing_IOs_ms": {
        "name": "sda1 time IO",
        "raw": 1684200,
        "display": "28m 4s"
      },
      "weighted_time_spent_doing_IOs_ms": {
        "name": "sda1 weighted time IO",
        "raw": 4012800,
        "display": "1h 6m 52s"
      }
    }
  },
  "network": {
    "hostname": {
      "name": "Hostname",
      "raw": "raspberrypi"
    },
    "interfaces": {
      "lo": {
        "rx_bytes": {
          "name": "lo receive bytes",
          "raw": 138146,
          "display": "134 KiB"
        },
        "rx_packets": {
          "name": "lo receive packets",
          "raw": 1915
        },
        "rx_errors": {
          "name": "lo receive errors",
          "raw": 0
        },
        "rx_dropped": {
          "name": "lo receive dropped",
          "raw": 0
        },
        "rx_overrun": {
          "name": "lo receive overrun",
          "raw": 0
        },
        "rx_mcast": {
          "name": "lo receive multicast",
          "raw": 0
        },
        "tx_bytes": {
          "name": "lo transmit bytes",
          "raw": 138146,
          "display": "134 KiB"
        },
        "tx_packets": {
          "name": "lo transmit packets",
          "raw": 1915
        },
        "tx_errors": {
          "name": "lo transmit errors",
          "raw": 0
        },
        "tx_dropped": {
          "name": "lo transmit dropped",
          "raw": 0
        },
        "tx_carrier": {
          "name": "lo transmit carrier",
          "raw": 0
        },
        "tx_collsns": {
          "name": "lo transmit collisions",
          "raw": 0
        }
      },
      "eth0": {
        "rx_bytes": {
          "name": "eth0 receive bytes",
          "raw": 296024822,
          "display": "282 MiB"
        },
        "rx_packets": {
          "name": "eth0 receive packets",
          "raw": 1558704
        },
        "rx_errors": {
          "name": "eth0 receive errors",
          "raw": 0
        },
        "rx_dropped": {
          "name": "eth0 receive dropped",
          "raw": 0
        },
        "rx_overrun": {
          "name": "eth0 receive overrun",
          "raw": 0
        },
        "rx_mcast": {
          "name": "eth0 receive multicast",
          "raw": 0
        },
        "tx_bytes": {
          "name": "eth0 transmit bytes",
          "raw": 1732798593,
          "display": "1652 MiB"
        },
        "tx_packets": {
          "name": "eth0 transmit packets",
          "raw": 2407923
        },
        "tx_errors": {
          "name": "eth0 transmit errors",
          "raw": 0
        },
        "tx_dropped": {
          "name": "eth0 transmit dropped",
          "raw": 0
        },
        "tx_carrier": {
          "name": "eth0 transmit carrier",
          "raw": 0
        },
        "tx_collsns": {
          "name": "eth0 transmit collisions",
          "raw": 0
        }
      }
    }
  }
}
```