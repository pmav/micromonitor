# micromonitor

micromonitor is a fast linux command line tool that outputs a number of metrics from your OS in plain text or json format.

### Metrics

- Info
 - TODO: uname, exec time, version

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
 - TODO inodes

- Network
 - TODO: hostname, ip by interface, dns servers

- Processes
 - TODO

### Commands

List of commands used. Your OS must support these tools in order to micromonitor to work.

Info:

    TODO uname -a

System metrics:

    cat /proc/uptime

CPU metrics:

    top -bn 1 | head -n 3

Memory metrics:

    free -b

Partitions metrics:

    df -T -x tmpfs -x rootfs -x devtmpfs --block-size=1
    TODO df -i
    TODO cat /proc/sys/fs/file-nr

Network metrics:

    TODO hostname
    TODO http://www.cyberciti.biz/faq/network-statistics-tools-rhel-centos-debian-linux/

Process metrics:

    TODO ps -eo pcpu,pid,user,args | sort -k 1 -r | head -10
  

### Example

Output example in plain text.
```
Uptime  15h 23m 26s
Idle time 14h 51m 29s
CPU 1min load 0.32
CPU 5min load 0.28
CPU 15min load  0.3
Total tasks 75
Running tasks 1
Sleeping tasks  74
Stopped tasks 0
Zombie tasks  0
CPU % user  2.2 %
CPU % system  0.8 %
CPU % nice  0 %
CPU % idle  96.5 %
CPU % IO wait 0.4 %
CPU % hardware interrupts 0 %
CPU % software interrupts 0.1 %
CPU % steal 0 %
Total physical memory 484 MiB
Used physical memory  471 MiB (97.14 %)
Free physical memory  13 MiB (2.85 %)
Shared physical memory  0 B (0 %)
Buffers physical memory 46 MiB (9.59 %)
Cached physical memory  368 MiB (75.92 %)
Total swap  99 MiB
Used swap 0 B (0 %)
Free swap 99 MiB (100 %)
'/' device  /dev/root
'/' type  ext4
'/' total 14909 MiB
'/' used  2855 MiB (19.15 %)
'/' free  11403 MiB (76.48 %)
'/media/MyBook2' device /dev/sda1
'/media/MyBook2' type ext4
'/media/MyBook2' total  1877634 MiB
'/media/MyBook2' used 103848 MiB (5.53 %)
'/media/MyBook2' free 1678385 MiB (89.38 %)
'/boot' device  /dev/mmcblk0p1
'/boot' type  vfat
'/boot' total 55 MiB
'/boot' used  9 MiB (17.26 %)
'/boot' free  46 MiB (82.73 %)
```

Output example in json format.
```json
{
  "system": {
    "uptime": {
      "name": "Uptime",
      "raw": 55406,
      "display": "15h 23m 26s"
    },
    "idle": {
      "name": "Idle time",
      "raw": 53489,
      "display": "14h 51m 29s"
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
        "raw": 0.3,
        "display": "0.3"
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
        "raw": 2.2,
        "display": "2.2 %"
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
        "raw": 96.5,
        "display": "96.5 %"
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
          "raw": 493993984,
          "display": "471 MiB",
          "percentage": "97.14 %"
        },
        "free": {
          "name": "Free physical memory",
          "raw": 14524416,
          "display": "13 MiB",
          "percentage": "2.85 %"
        },
        "shared": {
          "name": "Shared physical memory",
          "raw": 0,
          "display": "0 B",
          "percentage": "0 %"
        },
        "buffers": {
          "name": "Buffers physical memory",
          "raw": 48803840,
          "display": "46 MiB",
          "percentage": "9.59 %"
        },
        "cached": {
          "name": "Cached physical memory",
          "raw": 386076672,
          "display": "368 MiB",
          "percentage": "75.92 %"
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
      "device": {
        "name": "'/' device",
        "raw": "/dev/root"
      },
      "type": {
        "name": "'/' type",
        "raw": "ext4"
      },
      "total": {
        "name": "'/' total",
        "raw": "15633403904",
        "display": "14909 MiB"
      },
      "used": {
        "name": "'/' used",
        "raw": "2994294784",
        "display": "2855 MiB",
        "percentage": "19.15 %"
      },
      "free": {
        "name": "'/' free",
        "raw": "11957620736",
        "display": "11403 MiB",
        "percentage": "76.48 %"
      }
    },
    "/media/MyBook2": {
      "device": {
        "name": "'/media/MyBook2' device",
        "raw": "/dev/sda1"
      },
      "type": {
        "name": "'/media/MyBook2' type",
        "raw": "ext4"
      },
      "total": {
        "name": "'/media/MyBook2' total",
        "raw": "1968842792960",
        "display": "1877634 MiB"
      },
      "used": {
        "name": "'/media/MyBook2' used",
        "raw": "108892864512",
        "display": "103848 MiB",
        "percentage": "5.53 %"
      },
      "free": {
        "name": "'/media/MyBook2' free",
        "raw": "1759914942464",
        "display": "1678385 MiB",
        "percentage": "89.38 %"
      }
    },
    "/boot": {
      "device": {
        "name": "'/boot' device",
        "raw": "/dev/mmcblk0p1"
      },
      "type": {
        "name": "'/boot' type",
        "raw": "vfat"
      },
      "total": {
        "name": "'/boot' total",
        "raw": "58662912",
        "display": "55 MiB"
      },
      "used": {
        "name": "'/boot' used",
        "raw": "10125312",
        "display": "9 MiB",
        "percentage": "17.26 %"
      },
      "free": {
        "name": "'/boot' free",
        "raw": "48537600",
        "display": "46 MiB",
        "percentage": "82.73 %"
      }
    }
  }
}
```