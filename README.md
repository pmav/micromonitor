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

- Network (TODO)
 - hostname
 - inet/inet6 addr
 - RX: bytes, packets, errors, dropped, overrun, mcast
 - TX: bytes, packets, errors, dropped, carrier, collsns

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

Network:

    hostname
    ip -s link
    ip -s addr (TOOO) (inet/inet6)

Process:

    TODO ps -eo pcpu,pid,user,args | sort -k 1 -r | head -10

### Output

Output example in plain text.
```
Version 0.0.5
Collect date  2015-02-28T00:24:32.000Z
Execution time  753
uname Linux raspberrypi 3.12.32+ #721 PREEMPT Fri Nov 7 16:50:31 GMT 2014 armv6l GNU/Linux
Uptime  7h 39m 40s
Idle time 6h 56m 2s
CPU 1min load 0.32
CPU 5min load 0.28
CPU 15min load  0.36
Total tasks 73
Running tasks 2
Sleeping tasks  71
Stopped tasks 0
Zombie tasks  0
CPU % user  4.59 %
CPU % system  1.7 %
CPU % nice  0 %
CPU % idle  90.5 %
CPU % IO wait 3.1 %
CPU % hardware interrupts 0 %
CPU % software interrupts 0.2 %
CPU % steal 0 %
Total physical memory 484 MiB
Used physical memory  471 MiB (97.26 %)
Free physical memory  13 MiB (2.73 %)
Shared physical memory  0 B (0 %)
Buffers physical memory 51 MiB (10.57 %)
Cached physical memory  342 MiB (70.71 %)
Total swap  99 MiB
Used swap 0 B (0 %)
Free swap 99 MiB (100 %)
/ total 14909 MiB
/ used  3090 MiB (20.72 %)
/ free  11169 MiB (74.91 %)
/ inodes total  957712
/ inodes used 93557 (9.76 %)
/ inodes free 864155 (90.23 %)
/media/MyBook2 total  1877634 MiB
/media/MyBook2 used 103848 MiB (5.53 %)
/media/MyBook2 free 1678385 MiB (89.38 %)
/media/MyBook2 inodes total 122093568
/media/MyBook2 inodes used  1235 (0 %)
/media/MyBook2 inodes free  122092333 (99.99 %)
/boot total 55 MiB
/boot used  14 MiB (25.7 %)
/boot free  41 MiB (74.29 %)
/boot inodes total  0
/boot inodes used 0
/boot inodes free 0
Hostname  raspberrypi
lo receive bytes  6 KiB
lo receive packets  114
lo receive errors 0
lo receive dropped  0
lo receive overrun  0
lo receive multicast  0
lo transmit bytes 6 KiB
lo transmit packets 114
lo transmit errors  0
lo transmit dropped 0
lo transmit carrier 0
lo transmit collisions  0
eth0 receive bytes  186 MiB
eth0 receive packets  351131
eth0 receive errors 0
eth0 receive dropped  0
eth0 receive overrun  0
eth0 receive multicast  0
eth0 transmit bytes 262 MiB
eth0 transmit packets 402326
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
      "raw": 1425083072,
      "display": "2015-02-28T00:24:32.000Z"
    },
    "exec_time": {
      "name": "Execution time",
      "raw": 753
    },
    "uname": {
      "name": "uname",
      "raw": "Linux raspberrypi 3.12.32+ #721 PREEMPT Fri Nov 7 16:50:31 GMT 2014 armv6l GNU/Linux"
    }
  },
  "system": {
    "uptime": {
      "name": "Uptime",
      "raw": 27580,
      "display": "7h 39m 40s"
    },
    "idle": {
      "name": "Idle time",
      "raw": 24962,
      "display": "6h 56m 2s"
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
        "raw": 0.28,
        "display": "0.28"
      },
      "15min": {
        "name": "CPU 15min load",
        "raw": 0.36,
        "display": "0.36"
      }
    },
    "tasks": {
      "total": {
        "name": "Total tasks",
        "raw": 73,
        "display": "73"
      },
      "running": {
        "name": "Running tasks",
        "raw": 2,
        "display": "2"
      },
      "sleeping": {
        "name": "Sleeping tasks",
        "raw": 71,
        "display": "71"
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
        "raw": 4.6,
        "display": "4.59 %"
      },
      "system": {
        "name": "CPU % system",
        "raw": 1.7,
        "display": "1.7 %"
      },
      "nice": {
        "name": "CPU % nice",
        "raw": 0,
        "display": "0 %"
      },
      "idle": {
        "name": "CPU % idle",
        "raw": 90.5,
        "display": "90.5 %"
      },
      "io_wait": {
        "name": "CPU % IO wait",
        "raw": 3.1,
        "display": "3.1 %"
      },
      "hardware_interrupts": {
        "name": "CPU % hardware interrupts",
        "raw": 0,
        "display": "0 %"
      },
      "software_interrupts": {
        "name": "CPU % software interrupts",
        "raw": 0.2,
        "display": "0.2 %"
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
          "raw": 494587904,
          "display": "471 MiB",
          "percentage": "97.26 %"
        },
        "free": {
          "name": "Free physical memory",
          "raw": 13930496,
          "display": "13 MiB",
          "percentage": "2.73 %"
        },
        "shared": {
          "name": "Shared physical memory",
          "raw": 0,
          "display": "0 B",
          "percentage": "0 %"
        },
        "buffers": {
          "name": "Buffers physical memory",
          "raw": 53800960,
          "display": "51 MiB",
          "percentage": "10.57 %"
        },
        "cached": {
          "name": "Cached physical memory",
          "raw": 359620608,
          "display": "342 MiB",
          "percentage": "70.71 %"
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
        "raw": 3240251392,
        "display": "3090 MiB",
        "percentage": "20.72 %"
      },
      "free": {
        "name": "/ free",
        "raw": 11711664128,
        "display": "11169 MiB",
        "percentage": "74.91 %"
      },
      "inodes_total": {
        "name": "/ inodes total",
        "raw": 957712
      },
      "inodes_used": {
        "name": "/ inodes used",
        "raw": 93557,
        "percentage": "9.76 %"
      },
      "inodes_free": {
        "name": "/ inodes free",
        "raw": 864155,
        "percentage": "90.23 %"
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
        "raw": 108893212672,
        "display": "103848 MiB",
        "percentage": "5.53 %"
      },
      "free": {
        "name": "/media/MyBook2 free",
        "raw": 1759914594304,
        "display": "1678385 MiB",
        "percentage": "89.38 %"
      },
      "inodes_total": {
        "name": "/media/MyBook2 inodes total",
        "raw": 122093568
      },
      "inodes_used": {
        "name": "/media/MyBook2 inodes used",
        "raw": 1235,
        "percentage": "0 %"
      },
      "inodes_free": {
        "name": "/media/MyBook2 inodes free",
        "raw": 122092333,
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
  "network": {
    "hostname": {
      "name": "Hostname",
      "raw": "raspberrypi"
    },
    "interfaces": {
      "lo": {
        "rx_bytes": {
          "name": "lo receive bytes",
          "raw": 6404,
          "display": "6 KiB"
        },
        "rx_packets": {
          "name": "lo receive packets",
          "raw": 114
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
          "raw": 6404,
          "display": "6 KiB"
        },
        "tx_packets": {
          "name": "lo transmit packets",
          "raw": 114
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
          "raw": 195076045,
          "display": "186 MiB"
        },
        "rx_packets": {
          "name": "eth0 receive packets",
          "raw": 351131
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
          "raw": 275446642,
          "display": "262 MiB"
        },
        "tx_packets": {
          "name": "eth0 transmit packets",
          "raw": 402326
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