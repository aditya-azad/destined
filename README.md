# Destined

![Screenshot](/assets/screenshot.png)

## Why is this?

This project aims to combine calendar and tasks management systems into one. It is pretty similar to some other software/web applications available.

This exists to sidestep the complexity that comes with most other scheduling software. It simply tells you what you have to do, when you have to do it and you don't need to worry about organizing anything.

There are no servers involved, everything is stored in a JSON file.

## How it works?

### Today's tasks

You can view all the tasks that are supposed to be done/started/due today in one place. Rest of the scheduled tasks are displayed in upcoming tasks section. This is the place which serves as the calendar. You can assign time to the task which will also serve as a reminder.

### Upcoming tasks

Since, all the scheduled tasks are displayed together at one place, it is easier to know what it is that you have to do next at all times.

### Overdue tasks

If you missed a deadline on a task, it is displayed in this section.

### Unscheduled tasks

Tasks that do not have a deadline are put into this section.

## Tiny features

- Optionally add date/time/repeat
- You can sort the categories according to date/time, color and todo body by click the button on the side of category headings
- Date
  - Writing `t` in date section adds today's date to the task date
  - Writing `tom` in date section adds tomorrow's date to the task date
- Repeat
  - Writing `d`, `w`, `m`, `y` in repeat section makes the task repeatable on daily, weekly, monthly, yearly basis
  - Once the task is done a new date is added to it depending on the repeat value

## Disclaimer

- Not fully tested on Linux (partial) and Mac OS (none)
- The todos are stored in `destined-todos.json` file in the main directory keep a backup of it
- **`v1` destined todos file is not compatible with `v2` and so on**

## Installation

1. Clone the repository
2. Run these commands in the directory

```
npm install
```

Then for windows/linux:

```
npm run build
```

For OSX (not tested):

```
npm run build-osx
```

3. A directory named `destined*` will be created (\* can be anything depending on your OS eg. on Windows 64bit it will be `destined-win32-x64`)
4. Copy it to any place on your PC and run the destined executable
