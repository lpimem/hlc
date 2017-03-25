export enum LogLevel {
  DEBUG = 0,
  INFO,
  WARN,
  ERROR
}

let __level: LogLevel = LogLevel.DEBUG;

export function setLogLevel(level: LogLevel) {
  __level = level;
}

function levelToString(level: LogLevel): string {
  switch (level) {
    case LogLevel.DEBUG:
      return 'debug';
    case LogLevel.INFO:
      return 'info';
    case LogLevel.WARN:
      return 'warn';
    case LogLevel.ERROR:
      return 'error';
    default:
      return 'debug';
  }
}

function log(level: LogLevel, messages: any[]):void{
  if (level >= __level) {
    if (console) {
      let stub = levelToString(level);
      if (messages.length <= 0) {
        messages = ['\r\n'];
      }
      let msg: any = messages.length > 1 ? messages : messages[0];
      try{
        ((<any> console)[stub])(msg);
      } catch (ignore){}
    }
  }
}

export function debug(...messages: any[]):void{
  log(LogLevel.DEBUG, messages);
}

export function info(...messages: any[]):void{
  log(LogLevel.INFO, messages);
}

export function warn(...messages: any[]):void{
  log(LogLevel.WARN, messages);
}

export function error(...messages: any[]):void{
  log(LogLevel.ERROR, messages);
}