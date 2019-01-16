#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const child_process = require('child_process');
const vm = require('vm');
const _module = require('module');
'use strict';
var $jscompDefaultExport$$module$node_modules$module$index = _module;
const {"Module":Module$$module$node_modules$module$index, "builtinModules":builtinModules$$module$node_modules$module$index, "globalPaths":globalPaths$$module$node_modules$module$index, "runMain":runMain$$module$node_modules$module$index, "wrap":wrap$$module$node_modules$module$index, "wrapper":wrapper$$module$node_modules$module$index} = _module;
var module$node_modules$module$index = {};
module$node_modules$module$index.default = $jscompDefaultExport$$module$node_modules$module$index;
module$node_modules$module$index.Module = Module$$module$node_modules$module$index;
module$node_modules$module$index.builtinModules = builtinModules$$module$node_modules$module$index;
module$node_modules$module$index.globalPaths = globalPaths$$module$node_modules$module$index;
module$node_modules$module$index.runMain = runMain$$module$node_modules$module$index;
module$node_modules$module$index.wrap = wrap$$module$node_modules$module$index;
module$node_modules$module$index.wrapper = wrapper$$module$node_modules$module$index;
var $jscompDefaultExport$$module$node_modules$fs$index = fs;
const {"F_OK":F_OK$$module$node_modules$fs$index, "FileReadStream":FileReadStream$$module$node_modules$fs$index, "FileWriteStream":FileWriteStream$$module$node_modules$fs$index, "R_OK":R_OK$$module$node_modules$fs$index, "ReadStream":ReadStream$$module$node_modules$fs$index, "Stats":Stats$$module$node_modules$fs$index, "W_OK":W_OK$$module$node_modules$fs$index, "WriteStream":WriteStream$$module$node_modules$fs$index, "X_OK":X_OK$$module$node_modules$fs$index, "access":access$$module$node_modules$fs$index, 
"accessSync":accessSync$$module$node_modules$fs$index, "appendFile":appendFile$$module$node_modules$fs$index, "appendFileSync":appendFileSync$$module$node_modules$fs$index, "chmod":chmod$$module$node_modules$fs$index, "chmodSync":chmodSync$$module$node_modules$fs$index, "chown":chown$$module$node_modules$fs$index, "chownSync":chownSync$$module$node_modules$fs$index, "close":close$$module$node_modules$fs$index, "closeSync":closeSync$$module$node_modules$fs$index, "constants":constants$$module$node_modules$fs$index, 
"copyFile":copyFile$$module$node_modules$fs$index, "copyFileSync":copyFileSync$$module$node_modules$fs$index, "createReadStream":createReadStream$$module$node_modules$fs$index, "createWriteStream":createWriteStream$$module$node_modules$fs$index, "exists":exists$$module$node_modules$fs$index, "existsSync":existsSync$$module$node_modules$fs$index, "fchmod":fchmod$$module$node_modules$fs$index, "fchmodSync":fchmodSync$$module$node_modules$fs$index, "fchown":fchown$$module$node_modules$fs$index, "fchownSync":fchownSync$$module$node_modules$fs$index, 
"fdatasync":fdatasync$$module$node_modules$fs$index, "fdatasyncSync":fdatasyncSync$$module$node_modules$fs$index, "fstat":fstat$$module$node_modules$fs$index, "fstatSync":fstatSync$$module$node_modules$fs$index, "fsync":fsync$$module$node_modules$fs$index, "fsyncSync":fsyncSync$$module$node_modules$fs$index, "ftruncate":ftruncate$$module$node_modules$fs$index, "ftruncateSync":ftruncateSync$$module$node_modules$fs$index, "futimes":futimes$$module$node_modules$fs$index, "futimesSync":futimesSync$$module$node_modules$fs$index, 
"lchmod":lchmod$$module$node_modules$fs$index, "lchmodSync":lchmodSync$$module$node_modules$fs$index, "lchown":lchown$$module$node_modules$fs$index, "lchownSync":lchownSync$$module$node_modules$fs$index, "link":link$$module$node_modules$fs$index, "linkSync":linkSync$$module$node_modules$fs$index, "lstat":lstat$$module$node_modules$fs$index, "lstatSync":lstatSync$$module$node_modules$fs$index, "mkdir":mkdir$$module$node_modules$fs$index, "mkdirSync":mkdirSync$$module$node_modules$fs$index, "mkdtemp":mkdtemp$$module$node_modules$fs$index, 
"mkdtempSync":mkdtempSync$$module$node_modules$fs$index, "open":open$$module$node_modules$fs$index, "openSync":openSync$$module$node_modules$fs$index, "read":read$$module$node_modules$fs$index, "readFile":readFile$$module$node_modules$fs$index, "readFileSync":readFileSync$$module$node_modules$fs$index, "readSync":readSync$$module$node_modules$fs$index, "readdir":readdir$$module$node_modules$fs$index, "readdirSync":readdirSync$$module$node_modules$fs$index, "readlink":readlink$$module$node_modules$fs$index, 
"readlinkSync":readlinkSync$$module$node_modules$fs$index, "realpath":realpath$$module$node_modules$fs$index, "realpathSync":realpathSync$$module$node_modules$fs$index, "rename":rename$$module$node_modules$fs$index, "renameSync":renameSync$$module$node_modules$fs$index, "rmdir":rmdir$$module$node_modules$fs$index, "rmdirSync":rmdirSync$$module$node_modules$fs$index, "stat":stat$$module$node_modules$fs$index, "statSync":statSync$$module$node_modules$fs$index, "symlink":symlink$$module$node_modules$fs$index, 
"symlinkSync":symlinkSync$$module$node_modules$fs$index, "truncate":truncate$$module$node_modules$fs$index, "truncateSync":truncateSync$$module$node_modules$fs$index, "unlink":unlink$$module$node_modules$fs$index, "unlinkSync":unlinkSync$$module$node_modules$fs$index, "unwatchFile":unwatchFile$$module$node_modules$fs$index, "utimes":utimes$$module$node_modules$fs$index, "utimesSync":utimesSync$$module$node_modules$fs$index, "watch":watch$$module$node_modules$fs$index, "watchFile":watchFile$$module$node_modules$fs$index, 
"write":write$$module$node_modules$fs$index, "writeFile":writeFile$$module$node_modules$fs$index, "writeFileSync":writeFileSync$$module$node_modules$fs$index, "writeSync":writeSync$$module$node_modules$fs$index} = fs;
var module$node_modules$fs$index = {};
module$node_modules$fs$index.default = $jscompDefaultExport$$module$node_modules$fs$index;
module$node_modules$fs$index.F_OK = F_OK$$module$node_modules$fs$index;
module$node_modules$fs$index.FileReadStream = FileReadStream$$module$node_modules$fs$index;
module$node_modules$fs$index.FileWriteStream = FileWriteStream$$module$node_modules$fs$index;
module$node_modules$fs$index.R_OK = R_OK$$module$node_modules$fs$index;
module$node_modules$fs$index.ReadStream = ReadStream$$module$node_modules$fs$index;
module$node_modules$fs$index.Stats = Stats$$module$node_modules$fs$index;
module$node_modules$fs$index.W_OK = W_OK$$module$node_modules$fs$index;
module$node_modules$fs$index.WriteStream = WriteStream$$module$node_modules$fs$index;
module$node_modules$fs$index.X_OK = X_OK$$module$node_modules$fs$index;
module$node_modules$fs$index.access = access$$module$node_modules$fs$index;
module$node_modules$fs$index.accessSync = accessSync$$module$node_modules$fs$index;
module$node_modules$fs$index.appendFile = appendFile$$module$node_modules$fs$index;
module$node_modules$fs$index.appendFileSync = appendFileSync$$module$node_modules$fs$index;
module$node_modules$fs$index.chmod = chmod$$module$node_modules$fs$index;
module$node_modules$fs$index.chmodSync = chmodSync$$module$node_modules$fs$index;
module$node_modules$fs$index.chown = chown$$module$node_modules$fs$index;
module$node_modules$fs$index.chownSync = chownSync$$module$node_modules$fs$index;
module$node_modules$fs$index.close = close$$module$node_modules$fs$index;
module$node_modules$fs$index.closeSync = closeSync$$module$node_modules$fs$index;
module$node_modules$fs$index.constants = constants$$module$node_modules$fs$index;
module$node_modules$fs$index.copyFile = copyFile$$module$node_modules$fs$index;
module$node_modules$fs$index.copyFileSync = copyFileSync$$module$node_modules$fs$index;
module$node_modules$fs$index.createReadStream = createReadStream$$module$node_modules$fs$index;
module$node_modules$fs$index.createWriteStream = createWriteStream$$module$node_modules$fs$index;
module$node_modules$fs$index.exists = exists$$module$node_modules$fs$index;
module$node_modules$fs$index.existsSync = existsSync$$module$node_modules$fs$index;
module$node_modules$fs$index.fchmod = fchmod$$module$node_modules$fs$index;
module$node_modules$fs$index.fchmodSync = fchmodSync$$module$node_modules$fs$index;
module$node_modules$fs$index.fchown = fchown$$module$node_modules$fs$index;
module$node_modules$fs$index.fchownSync = fchownSync$$module$node_modules$fs$index;
module$node_modules$fs$index.fdatasync = fdatasync$$module$node_modules$fs$index;
module$node_modules$fs$index.fdatasyncSync = fdatasyncSync$$module$node_modules$fs$index;
module$node_modules$fs$index.fstat = fstat$$module$node_modules$fs$index;
module$node_modules$fs$index.fstatSync = fstatSync$$module$node_modules$fs$index;
module$node_modules$fs$index.fsync = fsync$$module$node_modules$fs$index;
module$node_modules$fs$index.fsyncSync = fsyncSync$$module$node_modules$fs$index;
module$node_modules$fs$index.ftruncate = ftruncate$$module$node_modules$fs$index;
module$node_modules$fs$index.ftruncateSync = ftruncateSync$$module$node_modules$fs$index;
module$node_modules$fs$index.futimes = futimes$$module$node_modules$fs$index;
module$node_modules$fs$index.futimesSync = futimesSync$$module$node_modules$fs$index;
module$node_modules$fs$index.lchmod = lchmod$$module$node_modules$fs$index;
module$node_modules$fs$index.lchmodSync = lchmodSync$$module$node_modules$fs$index;
module$node_modules$fs$index.lchown = lchown$$module$node_modules$fs$index;
module$node_modules$fs$index.lchownSync = lchownSync$$module$node_modules$fs$index;
module$node_modules$fs$index.link = link$$module$node_modules$fs$index;
module$node_modules$fs$index.linkSync = linkSync$$module$node_modules$fs$index;
module$node_modules$fs$index.lstat = lstat$$module$node_modules$fs$index;
module$node_modules$fs$index.lstatSync = lstatSync$$module$node_modules$fs$index;
module$node_modules$fs$index.mkdir = mkdir$$module$node_modules$fs$index;
module$node_modules$fs$index.mkdirSync = mkdirSync$$module$node_modules$fs$index;
module$node_modules$fs$index.mkdtemp = mkdtemp$$module$node_modules$fs$index;
module$node_modules$fs$index.mkdtempSync = mkdtempSync$$module$node_modules$fs$index;
module$node_modules$fs$index.open = open$$module$node_modules$fs$index;
module$node_modules$fs$index.openSync = openSync$$module$node_modules$fs$index;
module$node_modules$fs$index.read = read$$module$node_modules$fs$index;
module$node_modules$fs$index.readFile = readFile$$module$node_modules$fs$index;
module$node_modules$fs$index.readFileSync = readFileSync$$module$node_modules$fs$index;
module$node_modules$fs$index.readSync = readSync$$module$node_modules$fs$index;
module$node_modules$fs$index.readdir = readdir$$module$node_modules$fs$index;
module$node_modules$fs$index.readdirSync = readdirSync$$module$node_modules$fs$index;
module$node_modules$fs$index.readlink = readlink$$module$node_modules$fs$index;
module$node_modules$fs$index.readlinkSync = readlinkSync$$module$node_modules$fs$index;
module$node_modules$fs$index.realpath = realpath$$module$node_modules$fs$index;
module$node_modules$fs$index.realpathSync = realpathSync$$module$node_modules$fs$index;
module$node_modules$fs$index.rename = rename$$module$node_modules$fs$index;
module$node_modules$fs$index.renameSync = renameSync$$module$node_modules$fs$index;
module$node_modules$fs$index.rmdir = rmdir$$module$node_modules$fs$index;
module$node_modules$fs$index.rmdirSync = rmdirSync$$module$node_modules$fs$index;
module$node_modules$fs$index.stat = stat$$module$node_modules$fs$index;
module$node_modules$fs$index.statSync = statSync$$module$node_modules$fs$index;
module$node_modules$fs$index.symlink = symlink$$module$node_modules$fs$index;
module$node_modules$fs$index.symlinkSync = symlinkSync$$module$node_modules$fs$index;
module$node_modules$fs$index.truncate = truncate$$module$node_modules$fs$index;
module$node_modules$fs$index.truncateSync = truncateSync$$module$node_modules$fs$index;
module$node_modules$fs$index.unlink = unlink$$module$node_modules$fs$index;
module$node_modules$fs$index.unlinkSync = unlinkSync$$module$node_modules$fs$index;
module$node_modules$fs$index.unwatchFile = unwatchFile$$module$node_modules$fs$index;
module$node_modules$fs$index.utimes = utimes$$module$node_modules$fs$index;
module$node_modules$fs$index.utimesSync = utimesSync$$module$node_modules$fs$index;
module$node_modules$fs$index.watch = watch$$module$node_modules$fs$index;
module$node_modules$fs$index.watchFile = watchFile$$module$node_modules$fs$index;
module$node_modules$fs$index.write = write$$module$node_modules$fs$index;
module$node_modules$fs$index.writeFile = writeFile$$module$node_modules$fs$index;
module$node_modules$fs$index.writeFileSync = writeFileSync$$module$node_modules$fs$index;
module$node_modules$fs$index.writeSync = writeSync$$module$node_modules$fs$index;
const getLastItem$$module$node_modules$erotic$src$lib = (array) => {
  const item = array[array.length - 1];
  return item;
};
const getItemsFrom$$module$node_modules$erotic$src$lib = (array, from) => array.slice(from);
const getStackSegment$$module$node_modules$erotic$src$lib = (stack, from = 0, oneLine = false) => {
  if (from === 0 && !oneLine) {
    return stack;
  }
  const splitStack = stack.split("\n", oneLine ? from + 1 : Number.Infinity);
  if (oneLine) {
    const line = getLastItem$$module$node_modules$erotic$src$lib(splitStack);
    return line;
  } else {
    const items = getItemsFrom$$module$node_modules$erotic$src$lib(splitStack, from);
    return items.join("\n");
  }
};
const getEntryStack$$module$node_modules$erotic$src$lib = (stack, transparent) => {
  const stackSegment = getStackSegment$$module$node_modules$erotic$src$lib(stack, 2 + (transparent ? 1 : 0));
  return stackSegment;
};
const getCalleeStackLine$$module$node_modules$erotic$src$lib = (stack) => {
  const calleeStackLine = getStackSegment$$module$node_modules$erotic$src$lib(stack, 2, true);
  return calleeStackLine;
};
const getStackHeading$$module$node_modules$erotic$src$lib = (message) => `Error: ${message}`;
const getCallerFromArguments$$module$node_modules$erotic$src$lib = (args) => {
  const {callee:{caller}} = args;
  return caller;
};
var module$node_modules$erotic$src$lib = {};
module$node_modules$erotic$src$lib.getStackSegment = getStackSegment$$module$node_modules$erotic$src$lib;
module$node_modules$erotic$src$lib.getEntryStack = getEntryStack$$module$node_modules$erotic$src$lib;
module$node_modules$erotic$src$lib.getCalleeStackLine = getCalleeStackLine$$module$node_modules$erotic$src$lib;
module$node_modules$erotic$src$lib.getStackHeading = getStackHeading$$module$node_modules$erotic$src$lib;
module$node_modules$erotic$src$lib.getCallerFromArguments = getCallerFromArguments$$module$node_modules$erotic$src$lib;
var $jscompDefaultExport$$module$node_modules$os$index = os;
const {"EOL":EOL$$module$node_modules$os$index, "arch":arch$$module$node_modules$os$index, "constants":constants$$module$node_modules$os$index, "cpus":cpus$$module$node_modules$os$index, "endianness":endianness$$module$node_modules$os$index, "freemem":freemem$$module$node_modules$os$index, "getNetworkInterfaces":getNetworkInterfaces$$module$node_modules$os$index, "homedir":homedir$$module$node_modules$os$index, "hostname":hostname$$module$node_modules$os$index, "loadavg":loadavg$$module$node_modules$os$index, 
"networkInterfaces":networkInterfaces$$module$node_modules$os$index, "platform":platform$$module$node_modules$os$index, "release":release$$module$node_modules$os$index, "tmpDir":tmpDir$$module$node_modules$os$index, "tmpdir":tmpdir$$module$node_modules$os$index, "totalmem":totalmem$$module$node_modules$os$index, "type":type$$module$node_modules$os$index, "uptime":uptime$$module$node_modules$os$index, "userInfo":userInfo$$module$node_modules$os$index} = os;
var module$node_modules$os$index = {};
module$node_modules$os$index.default = $jscompDefaultExport$$module$node_modules$os$index;
module$node_modules$os$index.EOL = EOL$$module$node_modules$os$index;
module$node_modules$os$index.arch = arch$$module$node_modules$os$index;
module$node_modules$os$index.constants = constants$$module$node_modules$os$index;
module$node_modules$os$index.cpus = cpus$$module$node_modules$os$index;
module$node_modules$os$index.endianness = endianness$$module$node_modules$os$index;
module$node_modules$os$index.freemem = freemem$$module$node_modules$os$index;
module$node_modules$os$index.getNetworkInterfaces = getNetworkInterfaces$$module$node_modules$os$index;
module$node_modules$os$index.homedir = homedir$$module$node_modules$os$index;
module$node_modules$os$index.hostname = hostname$$module$node_modules$os$index;
module$node_modules$os$index.loadavg = loadavg$$module$node_modules$os$index;
module$node_modules$os$index.networkInterfaces = networkInterfaces$$module$node_modules$os$index;
module$node_modules$os$index.platform = platform$$module$node_modules$os$index;
module$node_modules$os$index.release = release$$module$node_modules$os$index;
module$node_modules$os$index.tmpDir = tmpDir$$module$node_modules$os$index;
module$node_modules$os$index.tmpdir = tmpdir$$module$node_modules$os$index;
module$node_modules$os$index.totalmem = totalmem$$module$node_modules$os$index;
module$node_modules$os$index.type = type$$module$node_modules$os$index;
module$node_modules$os$index.uptime = uptime$$module$node_modules$os$index;
module$node_modules$os$index.userInfo = userInfo$$module$node_modules$os$index;
const extractPathRegex$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index = /\s+at.*(?:\(|\s)(.*)\)?/;
const pathRegex$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/;
const homeDir$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index = homedir$$module$node_modules$os$index();
const cleanStack$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index = (stack, options = {}) => {
  const {pretty = false, ignoredModules = ["pirates"]} = options;
  const j = ignoredModules.join("|");
  const re = new RegExp(pathRegex$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index.source.replace("IGNORED_MODULES", j));
  return stack.replace(/\\/g, "/").split("\n").filter((x) => {
    const pathMatches = x.match(extractPathRegex$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index);
    if (pathMatches === null || !pathMatches[1]) {
      return true;
    }
    const match = pathMatches[1];
    if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar")) {
      return false;
    }
    return !re.test(match);
  }).filter((x) => x.trim() !== "").map((x) => {
    if (pretty) {
      return x.replace(extractPathRegex$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index, (m, p1) => m.replace(p1, p1.replace(homeDir$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index, "~")));
    }
    return x;
  }).join("\n");
};
var $jscompDefaultExport$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index = cleanStack$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index;
var module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index = {};
module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index.default = $jscompDefaultExport$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index;
function makeCallback$$module$node_modules$erotic$src$callback(entryCaller, entryStack, shadow = false) {
  function cb(messageOrError) {
    const caller = module$node_modules$erotic$src$lib.getCallerFromArguments(arguments);
    const {stack:errorStack} = new Error;
    const calleeStackLine = getCalleeStackLine$$module$node_modules$erotic$src$lib(errorStack);
    const isError = messageOrError instanceof Error;
    const message = isError ? messageOrError.message : messageOrError;
    const stackHeading = getStackHeading$$module$node_modules$erotic$src$lib(message);
    const entryHasCallee = caller !== null && entryCaller === caller;
    const stackMessage = [stackHeading, ...entryHasCallee || shadow ? [entryStack] : [calleeStackLine, entryStack]].join("\n");
    const stack = $jscompDefaultExport$$module$node_modules$erotic$node_modules$$artdeco$clean_stack$src$index(stackMessage);
    const properties = {message, stack};
    const e = isError ? messageOrError : new Error;
    return Object.assign(e, properties);
  }
  return cb;
}
var module$node_modules$erotic$src$callback = {};
module$node_modules$erotic$src$callback.makeCallback = makeCallback$$module$node_modules$erotic$src$callback;
function erotic$$module$node_modules$erotic$src$index(transparent) {
  const {stack} = new Error;
  const caller = module$node_modules$erotic$src$lib.getCallerFromArguments(arguments);
  const entryStack = module$node_modules$erotic$src$lib.getEntryStack(stack, transparent);
  return module$node_modules$erotic$src$callback.makeCallback(caller, entryStack, transparent);
}
var module$node_modules$erotic$src$index = {};
module$node_modules$erotic$src$index.default = erotic$$module$node_modules$erotic$src$index;
function checkArgumentIndex$$module$node_modules$makepromise$src$index(length, i) {
  if (i > length - 2) {
    throw new Error("Function does not accept that many arguments.");
  }
}
async function makePromise$$module$node_modules$makepromise$src$index(fn, args, resolveValue) {
  const er = erotic$$module$node_modules$erotic$src$index(true);
  if (typeof fn !== "function") {
    throw new Error("Function must be passed.");
  }
  const {length:fnLength} = fn;
  if (!fnLength) {
    throw new Error("Function does not accept any arguments.");
  }
  const res = await new Promise((resolve, reject) => {
    const cb = (err, res) => {
      if (err) {
        const error = er(err);
        return reject(error);
      }
      return resolve(resolveValue || res);
    };
    let allArgs = [cb];
    if (Array.isArray(args)) {
      args.forEach((arg, i) => {
        checkArgumentIndex$$module$node_modules$makepromise$src$index(fnLength, i);
      });
      allArgs = [...args, cb];
    } else {
      if (Array.from(arguments).length > 1) {
        checkArgumentIndex$$module$node_modules$makepromise$src$index(fnLength, 0);
        allArgs = [args, cb];
      }
    }
    fn.apply(fn.this, allArgs);
  });
  return res;
}
var module$node_modules$makepromise$src$index = {};
module$node_modules$makepromise$src$index.default = makePromise$$module$node_modules$makepromise$src$index;
var $jscompDefaultExport$$module$node_modules$path$index = path;
const {"basename":basename$$module$node_modules$path$index, "delimiter":delimiter$$module$node_modules$path$index, "dirname":dirname$$module$node_modules$path$index, "extname":extname$$module$node_modules$path$index, "format":format$$module$node_modules$path$index, "isAbsolute":isAbsolute$$module$node_modules$path$index, "join":join$$module$node_modules$path$index, "normalize":normalize$$module$node_modules$path$index, "parse":parse$$module$node_modules$path$index, "posix":posix$$module$node_modules$path$index, 
"relative":relative$$module$node_modules$path$index, "resolve":resolve$$module$node_modules$path$index, "sep":sep$$module$node_modules$path$index, "win32":win32$$module$node_modules$path$index} = path;
var module$node_modules$path$index = {};
module$node_modules$path$index.default = $jscompDefaultExport$$module$node_modules$path$index;
module$node_modules$path$index.basename = basename$$module$node_modules$path$index;
module$node_modules$path$index.delimiter = delimiter$$module$node_modules$path$index;
module$node_modules$path$index.dirname = dirname$$module$node_modules$path$index;
module$node_modules$path$index.extname = extname$$module$node_modules$path$index;
module$node_modules$path$index.format = format$$module$node_modules$path$index;
module$node_modules$path$index.isAbsolute = isAbsolute$$module$node_modules$path$index;
module$node_modules$path$index.join = join$$module$node_modules$path$index;
module$node_modules$path$index.normalize = normalize$$module$node_modules$path$index;
module$node_modules$path$index.parse = parse$$module$node_modules$path$index;
module$node_modules$path$index.posix = posix$$module$node_modules$path$index;
module$node_modules$path$index.relative = relative$$module$node_modules$path$index;
module$node_modules$path$index.resolve = resolve$$module$node_modules$path$index;
module$node_modules$path$index.sep = sep$$module$node_modules$path$index;
module$node_modules$path$index.win32 = win32$$module$node_modules$path$index;
async function lstatFiles$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index(dirPath, dirContent) {
  const readFiles = dirContent.map(async(relativePath) => {
    const path = resolve$$module$node_modules$path$index(dirPath, relativePath);
    const ls = await makePromise$$module$node_modules$makepromise$src$index(lstat$$module$node_modules$fs$index, path);
    return {lstat:ls, path, relativePath};
  });
  const res = await Promise.all(readFiles);
  return res;
}
const isDirectory$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index = (lstatRes) => lstatRes.lstat.isDirectory();
const isNotDirectory$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index = (lstatRes) => !lstatRes.lstat.isDirectory();
const getType$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index = (lstatRes) => {
  if (lstatRes.lstat.isDirectory()) {
    return "Directory";
  }
  if (lstatRes.lstat.isFile()) {
    return "File";
  }
  if (lstatRes.lstat.isSymbolicLink()) {
    return "SymbolicLink";
  }
};
async function readDirStructure$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index(dirPath) {
  if (!dirPath) {
    throw new Error("Please specify a path to the directory");
  }
  const ls = await makePromise$$module$node_modules$makepromise$src$index(lstat$$module$node_modules$fs$index, dirPath);
  if (!ls.isDirectory()) {
    const err = new Error("Path is not a directory");
    err.code = "ENOTDIR";
    throw err;
  }
  const dir = await makePromise$$module$node_modules$makepromise$src$index(readdir$$module$node_modules$fs$index, dirPath);
  const lsr = await lstatFiles$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index(dirPath, dir);
  const directories = lsr.filter(isDirectory$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index);
  const notDirectories = lsr.filter(isNotDirectory$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index);
  const files = notDirectories.reduce((acc, current) => {
    const type = getType$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index(current);
    return {...acc, [current.relativePath]:{type}};
  }, {});
  const dirs = await directories.reduce(async(acc, {path, relativePath}) => {
    const res = await acc;
    const structure = await readDirStructure$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index(path);
    return {...res, [relativePath]:structure};
  }, {});
  const content = {...files, ...dirs};
  return {content, type:"Directory"};
}
var module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index = {};
module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index.default = readDirStructure$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index;
const removeFile$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index = async(path) => {
  await makePromise$$module$node_modules$makepromise$src$index(unlink$$module$node_modules$fs$index, path);
};
const removeDir$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index = async(path) => {
  const {content} = await readDirStructure$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index(path);
  const files = Object.keys(content).filter((k) => {
    const {type} = content[k];
    if (type == "File" || type == "SymbolicLink") {
      return true;
    }
  });
  const dirs = Object.keys(content).filter((k) => {
    const {type} = content[k];
    if (type == "Directory") {
      return true;
    }
  });
  const filesFullPaths = files.map((file) => join$$module$node_modules$path$index(path, file));
  await Promise.all(filesFullPaths.map(removeFile$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index));
  const dirsFullPaths = dirs.map((dir) => join$$module$node_modules$path$index(path, dir));
  await Promise.all(dirsFullPaths.map(removeDir$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index));
  await makePromise$$module$node_modules$makepromise$src$index(rmdir$$module$node_modules$fs$index, path);
};
const rm$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index = async(path) => {
  const s = await makePromise$$module$node_modules$makepromise$src$index(lstat$$module$node_modules$fs$index, path);
  if (s.isDirectory()) {
    await removeDir$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index(path);
  } else {
    await removeFile$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index(path);
  }
};
var $jscompDefaultExport$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index = rm$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index;
var module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index = {};
module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index.default = $jscompDefaultExport$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index;
var $jscompDefaultExport$$module$node_modules$stream$index = stream;
const {"Duplex":Duplex$$module$node_modules$stream$index, "PassThrough":PassThrough$$module$node_modules$stream$index, "Readable":Readable$$module$node_modules$stream$index, "Stream":Stream$$module$node_modules$stream$index, "Transform":Transform$$module$node_modules$stream$index, "Writable":Writable$$module$node_modules$stream$index, "super_":super_$$module$node_modules$stream$index} = stream;
var module$node_modules$stream$index = {};
module$node_modules$stream$index.default = $jscompDefaultExport$$module$node_modules$stream$index;
module$node_modules$stream$index.Duplex = Duplex$$module$node_modules$stream$index;
module$node_modules$stream$index.PassThrough = PassThrough$$module$node_modules$stream$index;
module$node_modules$stream$index.Readable = Readable$$module$node_modules$stream$index;
module$node_modules$stream$index.Stream = Stream$$module$node_modules$stream$index;
module$node_modules$stream$index.Transform = Transform$$module$node_modules$stream$index;
module$node_modules$stream$index.Writable = Writable$$module$node_modules$stream$index;
module$node_modules$stream$index.super_ = super_$$module$node_modules$stream$index;
const extractPathRegex$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index = /\s+at.*(?:\(|\s)(.*)\)?/;
const pathRegex$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/;
const homeDir$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index = homedir$$module$node_modules$os$index();
const cleanStack$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index = (stack, options = {}) => {
  const {pretty = false, ignoredModules = ["pirates"]} = options;
  const j = ignoredModules.join("|");
  const re = new RegExp(pathRegex$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index.source.replace("IGNORED_MODULES", j));
  return stack.replace(/\\/g, "/").split("\n").filter((x) => {
    const pathMatches = x.match(extractPathRegex$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index);
    if (pathMatches === null || !pathMatches[1]) {
      return true;
    }
    const match = pathMatches[1];
    if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar")) {
      return false;
    }
    return !re.test(match);
  }).filter((x) => x.trim() !== "").map((x) => {
    if (pretty) {
      return x.replace(extractPathRegex$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index, (m, p1) => m.replace(p1, p1.replace(homeDir$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index, "~")));
    }
    return x;
  }).join("\n");
};
var $jscompDefaultExport$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index = cleanStack$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index;
var module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index = {};
module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index.default = $jscompDefaultExport$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index;
const pipeError$$module$node_modules$catchment$src$lib$index = (streamA, streamB) => {
  streamB.once("error", (e) => {
    streamA.emit("error", e);
  });
  return streamB;
};
var module$node_modules$catchment$src$lib$index = {};
module$node_modules$catchment$src$lib$index.pipeError = pipeError$$module$node_modules$catchment$src$lib$index;
function joinBufferData$$module$node_modules$catchment$src$index(array) {
  return array.join("");
}
class Catchment$$module$node_modules$catchment$src$index extends Writable$$module$node_modules$stream$index {
  constructor({er = erotic$$module$node_modules$erotic$src$index(true), proxyError, ...options} = {}) {
    const wrap = (_, e) => er(e);
    super(options);
    const {binary, rs} = options;
    this._caughtData = [];
    this._promise = new Promise((r, j) => {
      this.on("finish", () => {
        let d;
        if (binary) {
          d = Buffer.concat(this._caughtData);
        } else {
          d = joinBufferData$$module$node_modules$catchment$src$index(this._caughtData);
        }
        r(d);
        this._caughtData = [];
      });
      this.once("error", (e) => {
        if (e.stack.indexOf("\n") == -1) {
          wrap`${e}`;
          j(e);
        } else {
          const stack = $jscompDefaultExport$$module$node_modules$catchment$node_modules$$artdeco$clean_stack$src$index(e.stack);
          e.stack = stack;
          if (proxyError) {
            wrap`${e}`;
          }
          j(e);
        }
      });
      if (rs) {
        pipeError$$module$node_modules$catchment$src$lib$index(this, rs).pipe(this);
      }
    });
  }
  _write(chunk, encoding, callback) {
    this._caughtData.push(chunk);
    callback();
  }
  get promise() {
    return this._promise;
  }
}
var $jscompDefaultExport$$module$node_modules$catchment$src$index = Catchment$$module$node_modules$catchment$src$index;
const collect$$module$node_modules$catchment$src$index = async(readable, options = {}) => {
  const {promise} = new Catchment$$module$node_modules$catchment$src$index({rs:readable, ...options, er:erotic$$module$node_modules$erotic$src$index(true)});
  const res = await promise;
  return res;
};
var module$node_modules$catchment$src$index = {};
module$node_modules$catchment$src$index.default = $jscompDefaultExport$$module$node_modules$catchment$src$index;
module$node_modules$catchment$src$index.collect = collect$$module$node_modules$catchment$src$index;
async function ensurePath$$module$node_modules$$wrote$wrote$node_modules$$wrote$ensure_path$src$index(path) {
  const dir = dirname$$module$node_modules$path$index(path);
  try {
    await make$$module$node_modules$$wrote$wrote$node_modules$$wrote$ensure_path$src$index(dir);
    return path;
  } catch (err) {
    if (/EEXIST/.test(err.message) && err.message.indexOf(dir) != -1) {
      return path;
    }
    throw err;
  }
}
async function make$$module$node_modules$$wrote$wrote$node_modules$$wrote$ensure_path$src$index(dir) {
  try {
    await makePromise$$module$node_modules$makepromise$src$index(mkdir$$module$node_modules$fs$index, dir);
  } catch (err) {
    if (err.code == "ENOENT") {
      const parentDir = dirname$$module$node_modules$path$index(dir);
      await make$$module$node_modules$$wrote$wrote$node_modules$$wrote$ensure_path$src$index(parentDir);
      await make$$module$node_modules$$wrote$wrote$node_modules$$wrote$ensure_path$src$index(dir);
    } else {
      if (err.code != "EEXIST") {
        throw err;
      }
    }
  }
}
var module$node_modules$$wrote$wrote$node_modules$$wrote$ensure_path$src$index = {};
module$node_modules$$wrote$wrote$node_modules$$wrote$ensure_path$src$index.default = ensurePath$$module$node_modules$$wrote$wrote$node_modules$$wrote$ensure_path$src$index;
var module$node_modules$indicatrix$package_json = {"name":"indicatrix", "version":"1.0.0", "description":"A CLI Loading Indicator Implemented As A Changing Ellipsis (Triple-Dot).", "main":"build/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec test/mask", "spec":"yarn t test/spec", "mask":"yarn t test/mask", "test-build":"ALAMODE_ENV=test-build yarn test", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "b":"alamode src -o build -s", "d":"yarn-s d1", "d1":"NODE_DEBUG=doc doc src/index.js -g", 
"build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build"], "repository":{"type":"git", "url":"git://github.com/artdecocode/indicatrix.git"}, "keywords":["indicatrix", "load", "loading", "cli", "terminal", "console", "ellipsis", "triple dot", "dots", "indicator", "indication", "ui", "wait"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/indicatrix/issues"}, 
"homepage":"https://github.com/artdecocode/indicatrix#readme", "devDependencies":{"alamode":"1.6.0", "catchment":"3.2.0", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}};
async function write$$module$node_modules$$wrote$wrote$node_modules$$wrote$write$src$index(path, data) {
  if (!path) {
    throw new Error("No path is given.");
  }
  const er = erotic$$module$node_modules$erotic$src$index(true);
  const ws = createWriteStream$$module$node_modules$fs$index(path);
  await new Promise((r, j) => {
    ws.on("error", (e) => {
      const err = er(e);
      j(err);
    }).on("close", r).end(data);
  });
}
var module$node_modules$$wrote$wrote$node_modules$$wrote$write$src$index = {};
module$node_modules$$wrote$wrote$node_modules$$wrote$write$src$index.default = write$$module$node_modules$$wrote$wrote$node_modules$$wrote$write$src$index;
async function read$$module$node_modules$$wrote$wrote$node_modules$$wrote$read$src$index(path) {
  const rs = createReadStream$$module$node_modules$fs$index(path);
  const res = await collect$$module$node_modules$catchment$src$index(rs);
  return res;
}
async function readBuffer$$module$node_modules$$wrote$wrote$node_modules$$wrote$read$src$index(path) {
  const rs = createReadStream$$module$node_modules$fs$index(path);
  const res = await collect$$module$node_modules$catchment$src$index(rs, {binary:true});
  return res;
}
var module$node_modules$$wrote$wrote$node_modules$$wrote$read$src$index = {};
module$node_modules$$wrote$wrote$node_modules$$wrote$read$src$index.default = read$$module$node_modules$$wrote$wrote$node_modules$$wrote$read$src$index;
module$node_modules$$wrote$wrote$node_modules$$wrote$read$src$index.readBuffer = readBuffer$$module$node_modules$$wrote$wrote$node_modules$$wrote$read$src$index;
function Diff$$module$node_modules$diff$lib$index_es6() {
}
Diff$$module$node_modules$diff$lib$index_es6.prototype = {diff:function diff(oldString, newString) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var callback = options.callback;
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  this.options = options;
  var self = this;
  function done(value) {
    if (callback) {
      setTimeout(function() {
        callback(undefined, value);
      }, 0);
      return true;
    } else {
      return value;
    }
  }
  oldString = this.castInput(oldString);
  newString = this.castInput(newString);
  oldString = this.removeEmpty(this.tokenize(oldString));
  newString = this.removeEmpty(this.tokenize(newString));
  var newLen = newString.length;
  var oldLen = oldString.length;
  var editLength = 1;
  var maxEditLength = newLen + oldLen;
  var bestPath = [{newPos:-1, components:[]}];
  var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
  if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
    return done([{value:this.join(newString), count:newString.length}]);
  }
  function execEditLength() {
    for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
      var basePath = void 0;
      var addPath = bestPath[diagonalPath - 1];
      var removePath = bestPath[diagonalPath + 1];
      var _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
      if (addPath) {
        bestPath[diagonalPath - 1] = undefined;
      }
      var canAdd = addPath && addPath.newPos + 1 < newLen;
      var canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
      if (!canAdd && !canRemove) {
        bestPath[diagonalPath] = undefined;
        continue;
      }
      if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
        basePath = clonePath$$module$node_modules$diff$lib$index_es6(removePath);
        self.pushComponent(basePath.components, undefined, true);
      } else {
        basePath = addPath;
        basePath.newPos++;
        self.pushComponent(basePath.components, true, undefined);
      }
      _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);
      if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
        return done(buildValues$$module$node_modules$diff$lib$index_es6(self, basePath.components, newString, oldString, self.useLongestToken));
      } else {
        bestPath[diagonalPath] = basePath;
      }
    }
    editLength++;
  }
  if (callback) {
    (function exec() {
      setTimeout(function() {
        if (editLength > maxEditLength) {
          return callback();
        }
        if (!execEditLength()) {
          exec();
        }
      }, 0);
    })();
  } else {
    while (editLength <= maxEditLength) {
      var ret = execEditLength();
      if (ret) {
        return ret;
      }
    }
  }
}, pushComponent:function pushComponent(components, added, removed) {
  var last = components[components.length - 1];
  if (last && last.added === added && last.removed === removed) {
    components[components.length - 1] = {count:last.count + 1, added:added, removed:removed};
  } else {
    components.push({count:1, added:added, removed:removed});
  }
}, extractCommon:function extractCommon(basePath, newString, oldString, diagonalPath) {
  var newLen = newString.length;
  var oldLen = oldString.length;
  var newPos = basePath.newPos;
  var oldPos = newPos - diagonalPath;
  var commonCount = 0;
  while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
    newPos++;
    oldPos++;
    commonCount++;
  }
  if (commonCount) {
    basePath.components.push({count:commonCount});
  }
  basePath.newPos = newPos;
  return oldPos;
}, equals:function equals(left, right) {
  if (this.options.comparator) {
    return this.options.comparator(left, right);
  } else {
    return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
  }
}, removeEmpty:function removeEmpty(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i]) {
      ret.push(array[i]);
    }
  }
  return ret;
}, castInput:function castInput(value) {
  return value;
}, tokenize:function tokenize(value) {
  return value.split("");
}, join:function join(chars) {
  return chars.join("");
}};
function buildValues$$module$node_modules$diff$lib$index_es6(diff, components, newString, oldString, useLongestToken) {
  var componentPos = 0;
  var componentLen = components.length;
  var newPos = 0;
  var oldPos = 0;
  for (; componentPos < componentLen; componentPos++) {
    var component = components[componentPos];
    if (!component.removed) {
      if (!component.added && useLongestToken) {
        var value = newString.slice(newPos, newPos + component.count);
        value = value.map(function(value, i) {
          var oldValue = oldString[oldPos + i];
          return oldValue.length > value.length ? oldValue : value;
        });
        component.value = diff.join(value);
      } else {
        component.value = diff.join(newString.slice(newPos, newPos + component.count));
      }
      newPos += component.count;
      if (!component.added) {
        oldPos += component.count;
      }
    } else {
      component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
      oldPos += component.count;
      if (componentPos && components[componentPos - 1].added) {
        var tmp = components[componentPos - 1];
        components[componentPos - 1] = components[componentPos];
        components[componentPos] = tmp;
      }
    }
  }
  var lastComponent = components[componentLen - 1];
  if (componentLen > 1 && typeof lastComponent.value === "string" && (lastComponent.added || lastComponent.removed) && diff.equals("", lastComponent.value)) {
    components[componentLen - 2].value += lastComponent.value;
    components.pop();
  }
  return components;
}
function clonePath$$module$node_modules$diff$lib$index_es6(path) {
  return {newPos:path.newPos, components:path.components.slice(0)};
}
var characterDiff$$module$node_modules$diff$lib$index_es6 = new Diff$$module$node_modules$diff$lib$index_es6;
function diffChars$$module$node_modules$diff$lib$index_es6(oldStr, newStr, options) {
  return characterDiff$$module$node_modules$diff$lib$index_es6.diff(oldStr, newStr, options);
}
function generateOptions$$module$node_modules$diff$lib$index_es6(options, defaults) {
  if (typeof options === "function") {
    defaults.callback = options;
  } else {
    if (options) {
      for (var name in options) {
        if (options.hasOwnProperty(name)) {
          defaults[name] = options[name];
        }
      }
    }
  }
  return defaults;
}
var extendedWordChars$$module$node_modules$diff$lib$index_es6 = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
var reWhitespace$$module$node_modules$diff$lib$index_es6 = /\S/;
var wordDiff$$module$node_modules$diff$lib$index_es6 = new Diff$$module$node_modules$diff$lib$index_es6;
wordDiff$$module$node_modules$diff$lib$index_es6.equals = function(left, right) {
  if (this.options.ignoreCase) {
    left = left.toLowerCase();
    right = right.toLowerCase();
  }
  return left === right || this.options.ignoreWhitespace && !reWhitespace$$module$node_modules$diff$lib$index_es6.test(left) && !reWhitespace$$module$node_modules$diff$lib$index_es6.test(right);
};
wordDiff$$module$node_modules$diff$lib$index_es6.tokenize = function(value) {
  var tokens = value.split(/(\s+|[()[\]{}'"]|\b)/);
  for (var i = 0; i < tokens.length - 1; i++) {
    if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars$$module$node_modules$diff$lib$index_es6.test(tokens[i]) && extendedWordChars$$module$node_modules$diff$lib$index_es6.test(tokens[i + 2])) {
      tokens[i] += tokens[i + 2];
      tokens.splice(i + 1, 2);
      i--;
    }
  }
  return tokens;
};
function diffWords$$module$node_modules$diff$lib$index_es6(oldStr, newStr, options) {
  options = generateOptions$$module$node_modules$diff$lib$index_es6(options, {ignoreWhitespace:true});
  return wordDiff$$module$node_modules$diff$lib$index_es6.diff(oldStr, newStr, options);
}
function diffWordsWithSpace$$module$node_modules$diff$lib$index_es6(oldStr, newStr, options) {
  return wordDiff$$module$node_modules$diff$lib$index_es6.diff(oldStr, newStr, options);
}
var lineDiff$$module$node_modules$diff$lib$index_es6 = new Diff$$module$node_modules$diff$lib$index_es6;
lineDiff$$module$node_modules$diff$lib$index_es6.tokenize = function(value) {
  var retLines = [];
  var linesAndNewlines = value.split(/(\n|\r\n)/);
  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
    linesAndNewlines.pop();
  }
  for (var i = 0; i < linesAndNewlines.length; i++) {
    var line = linesAndNewlines[i];
    if (i % 2 && !this.options.newlineIsToken) {
      retLines[retLines.length - 1] += line;
    } else {
      if (this.options.ignoreWhitespace) {
        line = line.trim();
      }
      retLines.push(line);
    }
  }
  return retLines;
};
function diffLines$$module$node_modules$diff$lib$index_es6(oldStr, newStr, callback) {
  return lineDiff$$module$node_modules$diff$lib$index_es6.diff(oldStr, newStr, callback);
}
function diffTrimmedLines$$module$node_modules$diff$lib$index_es6(oldStr, newStr, callback) {
  var options = generateOptions$$module$node_modules$diff$lib$index_es6(callback, {ignoreWhitespace:true});
  return lineDiff$$module$node_modules$diff$lib$index_es6.diff(oldStr, newStr, options);
}
var sentenceDiff$$module$node_modules$diff$lib$index_es6 = new Diff$$module$node_modules$diff$lib$index_es6;
sentenceDiff$$module$node_modules$diff$lib$index_es6.tokenize = function(value) {
  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};
function diffSentences$$module$node_modules$diff$lib$index_es6(oldStr, newStr, callback) {
  return sentenceDiff$$module$node_modules$diff$lib$index_es6.diff(oldStr, newStr, callback);
}
var cssDiff$$module$node_modules$diff$lib$index_es6 = new Diff$$module$node_modules$diff$lib$index_es6;
cssDiff$$module$node_modules$diff$lib$index_es6.tokenize = function(value) {
  return value.split(/([{}:;,]|\s+)/);
};
function diffCss$$module$node_modules$diff$lib$index_es6(oldStr, newStr, callback) {
  return cssDiff$$module$node_modules$diff$lib$index_es6.diff(oldStr, newStr, callback);
}
function _typeof$$module$node_modules$diff$lib$index_es6(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$$module$node_modules$diff$lib$index_es6 = function(obj) {
      return typeof obj;
    };
  } else {
    _typeof$$module$node_modules$diff$lib$index_es6 = function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof$$module$node_modules$diff$lib$index_es6(obj);
}
function _toConsumableArray$$module$node_modules$diff$lib$index_es6(arr) {
  return _arrayWithoutHoles$$module$node_modules$diff$lib$index_es6(arr) || _iterableToArray$$module$node_modules$diff$lib$index_es6(arr) || _nonIterableSpread$$module$node_modules$diff$lib$index_es6();
}
function _arrayWithoutHoles$$module$node_modules$diff$lib$index_es6(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}
function _iterableToArray$$module$node_modules$diff$lib$index_es6(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") {
    return Array.from(iter);
  }
}
function _nonIterableSpread$$module$node_modules$diff$lib$index_es6() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
var objectPrototypeToString$$module$node_modules$diff$lib$index_es6 = Object.prototype.toString;
var jsonDiff$$module$node_modules$diff$lib$index_es6 = new Diff$$module$node_modules$diff$lib$index_es6;
jsonDiff$$module$node_modules$diff$lib$index_es6.useLongestToken = true;
jsonDiff$$module$node_modules$diff$lib$index_es6.tokenize = lineDiff$$module$node_modules$diff$lib$index_es6.tokenize;
jsonDiff$$module$node_modules$diff$lib$index_es6.castInput = function(value) {
  var _this$options = this.options;
  var undefinedReplacement = _this$options.undefinedReplacement;
  var _this$options$stringi = _this$options.stringifyReplacer;
  var stringifyReplacer = _this$options$stringi === void 0 ? function(k, v) {
    return typeof v === "undefined" ? undefinedReplacement : v;
  } : _this$options$stringi;
  return typeof value === "string" ? value : JSON.stringify(canonicalize$$module$node_modules$diff$lib$index_es6(value, null, null, stringifyReplacer), stringifyReplacer, "  ");
};
jsonDiff$$module$node_modules$diff$lib$index_es6.equals = function(left, right) {
  return Diff$$module$node_modules$diff$lib$index_es6.prototype.equals.call(jsonDiff$$module$node_modules$diff$lib$index_es6, left.replace(/,([\r\n])/g, "$1"), right.replace(/,([\r\n])/g, "$1"));
};
function diffJson$$module$node_modules$diff$lib$index_es6(oldObj, newObj, options) {
  return jsonDiff$$module$node_modules$diff$lib$index_es6.diff(oldObj, newObj, options);
}
function canonicalize$$module$node_modules$diff$lib$index_es6(obj, stack, replacementStack, replacer, key) {
  stack = stack || [];
  replacementStack = replacementStack || [];
  if (replacer) {
    obj = replacer(key, obj);
  }
  var i;
  for (i = 0; i < stack.length; i += 1) {
    if (stack[i] === obj) {
      return replacementStack[i];
    }
  }
  var canonicalizedObj;
  if ("[object Array]" === objectPrototypeToString$$module$node_modules$diff$lib$index_es6.call(obj)) {
    stack.push(obj);
    canonicalizedObj = new Array(obj.length);
    replacementStack.push(canonicalizedObj);
    for (i = 0; i < obj.length; i += 1) {
      canonicalizedObj[i] = canonicalize$$module$node_modules$diff$lib$index_es6(obj[i], stack, replacementStack, replacer, key);
    }
    stack.pop();
    replacementStack.pop();
    return canonicalizedObj;
  }
  if (obj && obj.toJSON) {
    obj = obj.toJSON();
  }
  if (_typeof$$module$node_modules$diff$lib$index_es6(obj) === "object" && obj !== null) {
    stack.push(obj);
    canonicalizedObj = {};
    replacementStack.push(canonicalizedObj);
    var sortedKeys = [];
    var _key;
    for (_key in obj) {
      if (obj.hasOwnProperty(_key)) {
        sortedKeys.push(_key);
      }
    }
    sortedKeys.sort();
    for (i = 0; i < sortedKeys.length; i += 1) {
      _key = sortedKeys[i];
      canonicalizedObj[_key] = canonicalize$$module$node_modules$diff$lib$index_es6(obj[_key], stack, replacementStack, replacer, _key);
    }
    stack.pop();
    replacementStack.pop();
  } else {
    canonicalizedObj = obj;
  }
  return canonicalizedObj;
}
var arrayDiff$$module$node_modules$diff$lib$index_es6 = new Diff$$module$node_modules$diff$lib$index_es6;
arrayDiff$$module$node_modules$diff$lib$index_es6.tokenize = function(value) {
  return value.slice();
};
arrayDiff$$module$node_modules$diff$lib$index_es6.join = arrayDiff$$module$node_modules$diff$lib$index_es6.removeEmpty = function(value) {
  return value;
};
function diffArrays$$module$node_modules$diff$lib$index_es6(oldArr, newArr, callback) {
  return arrayDiff$$module$node_modules$diff$lib$index_es6.diff(oldArr, newArr, callback);
}
function parsePatch$$module$node_modules$diff$lib$index_es6(uniDiff) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/);
  var delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [];
  var list = [];
  var i = 0;
  function parseIndex() {
    var index = {};
    list.push(index);
    while (i < diffstr.length) {
      var line = diffstr[i];
      if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
        break;
      }
      var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
      if (header) {
        index.index = header[1];
      }
      i++;
    }
    parseFileHeader(index);
    parseFileHeader(index);
    index.hunks = [];
    while (i < diffstr.length) {
      var _line = diffstr[i];
      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
        break;
      } else {
        if (/^@@/.test(_line)) {
          index.hunks.push(parseHunk());
        } else {
          if (_line && options.strict) {
            throw new Error("Unknown line " + (i + 1) + " " + JSON.stringify(_line));
          } else {
            i++;
          }
        }
      }
    }
  }
  function parseFileHeader(index) {
    var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);
    if (fileHeader) {
      var keyPrefix = fileHeader[1] === "---" ? "old" : "new";
      var data = fileHeader[2].split("\t", 2);
      var fileName = data[0].replace(/\\\\/g, "\\");
      if (/^".*"$/.test(fileName)) {
        fileName = fileName.substr(1, fileName.length - 2);
      }
      index[keyPrefix + "FileName"] = fileName;
      index[keyPrefix + "Header"] = (data[1] || "").trim();
      i++;
    }
  }
  function parseHunk() {
    var chunkHeaderIndex = i;
    var chunkHeaderLine = diffstr[i++];
    var chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
    var hunk = {oldStart:+chunkHeader[1], oldLines:+chunkHeader[2] || 1, newStart:+chunkHeader[3], newLines:+chunkHeader[4] || 1, lines:[], linedelimiters:[]};
    var addCount = 0;
    var removeCount = 0;
    for (; i < diffstr.length; i++) {
      if (diffstr[i].indexOf("--- ") === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf("+++ ") === 0 && diffstr[i + 2].indexOf("@@") === 0) {
        break;
      }
      var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? " " : diffstr[i][0];
      if (operation === "+" || operation === "-" || operation === " " || operation === "\\") {
        hunk.lines.push(diffstr[i]);
        hunk.linedelimiters.push(delimiters[i] || "\n");
        if (operation === "+") {
          addCount++;
        } else {
          if (operation === "-") {
            removeCount++;
          } else {
            if (operation === " ") {
              addCount++;
              removeCount++;
            }
          }
        }
      } else {
        break;
      }
    }
    if (!addCount && hunk.newLines === 1) {
      hunk.newLines = 0;
    }
    if (!removeCount && hunk.oldLines === 1) {
      hunk.oldLines = 0;
    }
    if (options.strict) {
      if (addCount !== hunk.newLines) {
        throw new Error("Added line count did not match for hunk at line " + (chunkHeaderIndex + 1));
      }
      if (removeCount !== hunk.oldLines) {
        throw new Error("Removed line count did not match for hunk at line " + (chunkHeaderIndex + 1));
      }
    }
    return hunk;
  }
  while (i < diffstr.length) {
    parseIndex();
  }
  return list;
}
function distanceIterator$$module$node_modules$diff$lib$index_es6(start, minLine, maxLine) {
  var wantForward = true;
  var backwardExhausted = false;
  var forwardExhausted = false;
  var localOffset = 1;
  return function iterator() {
    if (wantForward && !forwardExhausted) {
      if (backwardExhausted) {
        localOffset++;
      } else {
        wantForward = false;
      }
      if (start + localOffset <= maxLine) {
        return localOffset;
      }
      forwardExhausted = true;
    }
    if (!backwardExhausted) {
      if (!forwardExhausted) {
        wantForward = true;
      }
      if (minLine <= start - localOffset) {
        return -localOffset++;
      }
      backwardExhausted = true;
      return iterator();
    }
  };
}
function applyPatch$$module$node_modules$diff$lib$index_es6(source, uniDiff) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (typeof uniDiff === "string") {
    uniDiff = parsePatch$$module$node_modules$diff$lib$index_es6(uniDiff);
  }
  if (Array.isArray(uniDiff)) {
    if (uniDiff.length > 1) {
      throw new Error("applyPatch only works with a single input.");
    }
    uniDiff = uniDiff[0];
  }
  var lines = source.split(/\r\n|[\n\v\f\r\x85]/);
  var delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [];
  var hunks = uniDiff.hunks;
  var compareLine = options.compareLine || function(lineNumber, line, operation, patchContent) {
    return line === patchContent;
  };
  var errorCount = 0;
  var fuzzFactor = options.fuzzFactor || 0;
  var minLine = 0;
  var offset = 0;
  var removeEOFNL;
  var addEOFNL;
  function hunkFits(hunk, toPos) {
    for (var j = 0; j < hunk.lines.length; j++) {
      var line = hunk.lines[j];
      var operation = line.length > 0 ? line[0] : " ";
      var content = line.length > 0 ? line.substr(1) : line;
      if (operation === " " || operation === "-") {
        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
          errorCount++;
          if (errorCount > fuzzFactor) {
            return false;
          }
        }
        toPos++;
      }
    }
    return true;
  }
  for (var i = 0; i < hunks.length; i++) {
    var hunk = hunks[i];
    var maxLine = lines.length - hunk.oldLines;
    var localOffset = 0;
    var toPos = offset + hunk.oldStart - 1;
    var iterator = distanceIterator$$module$node_modules$diff$lib$index_es6(toPos, minLine, maxLine);
    for (; localOffset !== undefined; localOffset = iterator()) {
      if (hunkFits(hunk, toPos + localOffset)) {
        hunk.offset = offset += localOffset;
        break;
      }
    }
    if (localOffset === undefined) {
      return false;
    }
    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
  }
  var diffOffset = 0;
  for (var _i = 0; _i < hunks.length; _i++) {
    var _hunk = hunks[_i];
    var _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;
    diffOffset += _hunk.newLines - _hunk.oldLines;
    if (_toPos < 0) {
      _toPos = 0;
    }
    for (var j = 0; j < _hunk.lines.length; j++) {
      var line = _hunk.lines[j];
      var operation = line.length > 0 ? line[0] : " ";
      var content = line.length > 0 ? line.substr(1) : line;
      var delimiter = _hunk.linedelimiters[j];
      if (operation === " ") {
        _toPos++;
      } else {
        if (operation === "-") {
          lines.splice(_toPos, 1);
          delimiters.splice(_toPos, 1);
        } else {
          if (operation === "+") {
            lines.splice(_toPos, 0, content);
            delimiters.splice(_toPos, 0, delimiter);
            _toPos++;
          } else {
            if (operation === "\\") {
              var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;
              if (previousOperation === "+") {
                removeEOFNL = true;
              } else {
                if (previousOperation === "-") {
                  addEOFNL = true;
                }
              }
            }
          }
        }
      }
    }
  }
  if (removeEOFNL) {
    while (!lines[lines.length - 1]) {
      lines.pop();
      delimiters.pop();
    }
  } else {
    if (addEOFNL) {
      lines.push("");
      delimiters.push("\n");
    }
  }
  for (var _k = 0; _k < lines.length - 1; _k++) {
    lines[_k] = lines[_k] + delimiters[_k];
  }
  return lines.join("");
}
function applyPatches$$module$node_modules$diff$lib$index_es6(uniDiff, options) {
  if (typeof uniDiff === "string") {
    uniDiff = parsePatch$$module$node_modules$diff$lib$index_es6(uniDiff);
  }
  var currentIndex = 0;
  function processIndex() {
    var index = uniDiff[currentIndex++];
    if (!index) {
      return options.complete();
    }
    options.loadFile(index, function(err, data) {
      if (err) {
        return options.complete(err);
      }
      var updatedContent = applyPatch$$module$node_modules$diff$lib$index_es6(data, index, options);
      options.patched(index, updatedContent, function(err) {
        if (err) {
          return options.complete(err);
        }
        processIndex();
      });
    });
  }
  processIndex();
}
function structuredPatch$$module$node_modules$diff$lib$index_es6(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  if (!options) {
    options = {};
  }
  if (typeof options.context === "undefined") {
    options.context = 4;
  }
  var diff = diffLines$$module$node_modules$diff$lib$index_es6(oldStr, newStr, options);
  diff.push({value:"", lines:[]});
  function contextLines(lines) {
    return lines.map(function(entry) {
      return " " + entry;
    });
  }
  var hunks = [];
  var oldRangeStart = 0;
  var newRangeStart = 0;
  var curRange = [];
  var oldLine = 1;
  var newLine = 1;
  var _loop = function _loop(i) {
    var current = diff[i];
    var lines = current.lines || current.value.replace(/\n$/, "").split("\n");
    current.lines = lines;
    if (current.added || current.removed) {
      var _curRange;
      if (!oldRangeStart) {
        var prev = diff[i - 1];
        oldRangeStart = oldLine;
        newRangeStart = newLine;
        if (prev) {
          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
          oldRangeStart -= curRange.length;
          newRangeStart -= curRange.length;
        }
      }
      (_curRange = curRange).push.apply(_curRange, _toConsumableArray$$module$node_modules$diff$lib$index_es6(lines.map(function(entry) {
        return (current.added ? "+" : "-") + entry;
      })));
      if (current.added) {
        newLine += lines.length;
      } else {
        oldLine += lines.length;
      }
    } else {
      if (oldRangeStart) {
        if (lines.length <= options.context * 2 && i < diff.length - 2) {
          var _curRange2;
          (_curRange2 = curRange).push.apply(_curRange2, _toConsumableArray$$module$node_modules$diff$lib$index_es6(contextLines(lines)));
        } else {
          var _curRange3;
          var contextSize = Math.min(lines.length, options.context);
          (_curRange3 = curRange).push.apply(_curRange3, _toConsumableArray$$module$node_modules$diff$lib$index_es6(contextLines(lines.slice(0, contextSize))));
          var hunk = {oldStart:oldRangeStart, oldLines:oldLine - oldRangeStart + contextSize, newStart:newRangeStart, newLines:newLine - newRangeStart + contextSize, lines:curRange};
          if (i >= diff.length - 2 && lines.length <= options.context) {
            var oldEOFNewline = /\n$/.test(oldStr);
            var newEOFNewline = /\n$/.test(newStr);
            var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;
            if (!oldEOFNewline && noNlBeforeAdds) {
              curRange.splice(hunk.oldLines, 0, "\\ No newline at end of file");
            }
            if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
              curRange.push("\\ No newline at end of file");
            }
          }
          hunks.push(hunk);
          oldRangeStart = 0;
          newRangeStart = 0;
          curRange = [];
        }
      }
      oldLine += lines.length;
      newLine += lines.length;
    }
  };
  for (var i = 0; i < diff.length; i++) {
    _loop(i);
  }
  return {oldFileName:oldFileName, newFileName:newFileName, oldHeader:oldHeader, newHeader:newHeader, hunks:hunks};
}
function createTwoFilesPatch$$module$node_modules$diff$lib$index_es6(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  var diff = structuredPatch$$module$node_modules$diff$lib$index_es6(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
  var ret = [];
  if (oldFileName == newFileName) {
    ret.push("Index: " + oldFileName);
  }
  ret.push("===================================================================");
  ret.push("--- " + diff.oldFileName + (typeof diff.oldHeader === "undefined" ? "" : "\t" + diff.oldHeader));
  ret.push("+++ " + diff.newFileName + (typeof diff.newHeader === "undefined" ? "" : "\t" + diff.newHeader));
  for (var i = 0; i < diff.hunks.length; i++) {
    var hunk = diff.hunks[i];
    ret.push("@@ -" + hunk.oldStart + "," + hunk.oldLines + " +" + hunk.newStart + "," + hunk.newLines + " @@");
    ret.push.apply(ret, hunk.lines);
  }
  return ret.join("\n") + "\n";
}
function createPatch$$module$node_modules$diff$lib$index_es6(fileName, oldStr, newStr, oldHeader, newHeader, options) {
  return createTwoFilesPatch$$module$node_modules$diff$lib$index_es6(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
}
function arrayEqual$$module$node_modules$diff$lib$index_es6(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  return arrayStartsWith$$module$node_modules$diff$lib$index_es6(a, b);
}
function arrayStartsWith$$module$node_modules$diff$lib$index_es6(array, start) {
  if (start.length > array.length) {
    return false;
  }
  for (var i = 0; i < start.length; i++) {
    if (start[i] !== array[i]) {
      return false;
    }
  }
  return true;
}
function calcLineCount$$module$node_modules$diff$lib$index_es6(hunk) {
  var _calcOldNewLineCount = calcOldNewLineCount$$module$node_modules$diff$lib$index_es6(hunk.lines);
  var oldLines = _calcOldNewLineCount.oldLines;
  var newLines = _calcOldNewLineCount.newLines;
  if (oldLines !== undefined) {
    hunk.oldLines = oldLines;
  } else {
    delete hunk.oldLines;
  }
  if (newLines !== undefined) {
    hunk.newLines = newLines;
  } else {
    delete hunk.newLines;
  }
}
function merge$$module$node_modules$diff$lib$index_es6(mine, theirs, base) {
  mine = loadPatch$$module$node_modules$diff$lib$index_es6(mine, base);
  theirs = loadPatch$$module$node_modules$diff$lib$index_es6(theirs, base);
  var ret = {};
  if (mine.index || theirs.index) {
    ret.index = mine.index || theirs.index;
  }
  if (mine.newFileName || theirs.newFileName) {
    if (!fileNameChanged$$module$node_modules$diff$lib$index_es6(mine)) {
      ret.oldFileName = theirs.oldFileName || mine.oldFileName;
      ret.newFileName = theirs.newFileName || mine.newFileName;
      ret.oldHeader = theirs.oldHeader || mine.oldHeader;
      ret.newHeader = theirs.newHeader || mine.newHeader;
    } else {
      if (!fileNameChanged$$module$node_modules$diff$lib$index_es6(theirs)) {
        ret.oldFileName = mine.oldFileName;
        ret.newFileName = mine.newFileName;
        ret.oldHeader = mine.oldHeader;
        ret.newHeader = mine.newHeader;
      } else {
        ret.oldFileName = selectField$$module$node_modules$diff$lib$index_es6(ret, mine.oldFileName, theirs.oldFileName);
        ret.newFileName = selectField$$module$node_modules$diff$lib$index_es6(ret, mine.newFileName, theirs.newFileName);
        ret.oldHeader = selectField$$module$node_modules$diff$lib$index_es6(ret, mine.oldHeader, theirs.oldHeader);
        ret.newHeader = selectField$$module$node_modules$diff$lib$index_es6(ret, mine.newHeader, theirs.newHeader);
      }
    }
  }
  ret.hunks = [];
  var mineIndex = 0;
  var theirsIndex = 0;
  var mineOffset = 0;
  var theirsOffset = 0;
  while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
    var mineCurrent = mine.hunks[mineIndex] || {oldStart:Infinity};
    var theirsCurrent = theirs.hunks[theirsIndex] || {oldStart:Infinity};
    if (hunkBefore$$module$node_modules$diff$lib$index_es6(mineCurrent, theirsCurrent)) {
      ret.hunks.push(cloneHunk$$module$node_modules$diff$lib$index_es6(mineCurrent, mineOffset));
      mineIndex++;
      theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
    } else {
      if (hunkBefore$$module$node_modules$diff$lib$index_es6(theirsCurrent, mineCurrent)) {
        ret.hunks.push(cloneHunk$$module$node_modules$diff$lib$index_es6(theirsCurrent, theirsOffset));
        theirsIndex++;
        mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
      } else {
        var mergedHunk = {oldStart:Math.min(mineCurrent.oldStart, theirsCurrent.oldStart), oldLines:0, newStart:Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset), newLines:0, lines:[]};
        mergeLines$$module$node_modules$diff$lib$index_es6(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
        theirsIndex++;
        mineIndex++;
        ret.hunks.push(mergedHunk);
      }
    }
  }
  return ret;
}
function loadPatch$$module$node_modules$diff$lib$index_es6(param, base) {
  if (typeof param === "string") {
    if (/^@@/m.test(param) || /^Index:/m.test(param)) {
      return parsePatch$$module$node_modules$diff$lib$index_es6(param)[0];
    }
    if (!base) {
      throw new Error("Must provide a base reference or pass in a patch");
    }
    return structuredPatch$$module$node_modules$diff$lib$index_es6(undefined, undefined, base, param);
  }
  return param;
}
function fileNameChanged$$module$node_modules$diff$lib$index_es6(patch) {
  return patch.newFileName && patch.newFileName !== patch.oldFileName;
}
function selectField$$module$node_modules$diff$lib$index_es6(index, mine, theirs) {
  if (mine === theirs) {
    return mine;
  } else {
    index.conflict = true;
    return {mine:mine, theirs:theirs};
  }
}
function hunkBefore$$module$node_modules$diff$lib$index_es6(test, check) {
  return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
}
function cloneHunk$$module$node_modules$diff$lib$index_es6(hunk, offset) {
  return {oldStart:hunk.oldStart, oldLines:hunk.oldLines, newStart:hunk.newStart + offset, newLines:hunk.newLines, lines:hunk.lines};
}
function mergeLines$$module$node_modules$diff$lib$index_es6(hunk, mineOffset, mineLines, theirOffset, theirLines) {
  var mine = {offset:mineOffset, lines:mineLines, index:0};
  var their = {offset:theirOffset, lines:theirLines, index:0};
  insertLeading$$module$node_modules$diff$lib$index_es6(hunk, mine, their);
  insertLeading$$module$node_modules$diff$lib$index_es6(hunk, their, mine);
  while (mine.index < mine.lines.length && their.index < their.lines.length) {
    var mineCurrent = mine.lines[mine.index];
    var theirCurrent = their.lines[their.index];
    if ((mineCurrent[0] === "-" || mineCurrent[0] === "+") && (theirCurrent[0] === "-" || theirCurrent[0] === "+")) {
      mutualChange$$module$node_modules$diff$lib$index_es6(hunk, mine, their);
    } else {
      if (mineCurrent[0] === "+" && theirCurrent[0] === " ") {
        var _hunk$lines;
        (_hunk$lines = hunk.lines).push.apply(_hunk$lines, _toConsumableArray$$module$node_modules$diff$lib$index_es6(collectChange$$module$node_modules$diff$lib$index_es6(mine)));
      } else {
        if (theirCurrent[0] === "+" && mineCurrent[0] === " ") {
          var _hunk$lines2;
          (_hunk$lines2 = hunk.lines).push.apply(_hunk$lines2, _toConsumableArray$$module$node_modules$diff$lib$index_es6(collectChange$$module$node_modules$diff$lib$index_es6(their)));
        } else {
          if (mineCurrent[0] === "-" && theirCurrent[0] === " ") {
            removal$$module$node_modules$diff$lib$index_es6(hunk, mine, their);
          } else {
            if (theirCurrent[0] === "-" && mineCurrent[0] === " ") {
              removal$$module$node_modules$diff$lib$index_es6(hunk, their, mine, true);
            } else {
              if (mineCurrent === theirCurrent) {
                hunk.lines.push(mineCurrent);
                mine.index++;
                their.index++;
              } else {
                conflict$$module$node_modules$diff$lib$index_es6(hunk, collectChange$$module$node_modules$diff$lib$index_es6(mine), collectChange$$module$node_modules$diff$lib$index_es6(their));
              }
            }
          }
        }
      }
    }
  }
  insertTrailing$$module$node_modules$diff$lib$index_es6(hunk, mine);
  insertTrailing$$module$node_modules$diff$lib$index_es6(hunk, their);
  calcLineCount$$module$node_modules$diff$lib$index_es6(hunk);
}
function mutualChange$$module$node_modules$diff$lib$index_es6(hunk, mine, their) {
  var myChanges = collectChange$$module$node_modules$diff$lib$index_es6(mine);
  var theirChanges = collectChange$$module$node_modules$diff$lib$index_es6(their);
  if (allRemoves$$module$node_modules$diff$lib$index_es6(myChanges) && allRemoves$$module$node_modules$diff$lib$index_es6(theirChanges)) {
    if (arrayStartsWith$$module$node_modules$diff$lib$index_es6(myChanges, theirChanges) && skipRemoveSuperset$$module$node_modules$diff$lib$index_es6(their, myChanges, myChanges.length - theirChanges.length)) {
      var _hunk$lines3;
      (_hunk$lines3 = hunk.lines).push.apply(_hunk$lines3, _toConsumableArray$$module$node_modules$diff$lib$index_es6(myChanges));
      return;
    } else {
      if (arrayStartsWith$$module$node_modules$diff$lib$index_es6(theirChanges, myChanges) && skipRemoveSuperset$$module$node_modules$diff$lib$index_es6(mine, theirChanges, theirChanges.length - myChanges.length)) {
        var _hunk$lines4;
        (_hunk$lines4 = hunk.lines).push.apply(_hunk$lines4, _toConsumableArray$$module$node_modules$diff$lib$index_es6(theirChanges));
        return;
      }
    }
  } else {
    if (arrayEqual$$module$node_modules$diff$lib$index_es6(myChanges, theirChanges)) {
      var _hunk$lines5;
      (_hunk$lines5 = hunk.lines).push.apply(_hunk$lines5, _toConsumableArray$$module$node_modules$diff$lib$index_es6(myChanges));
      return;
    }
  }
  conflict$$module$node_modules$diff$lib$index_es6(hunk, myChanges, theirChanges);
}
function removal$$module$node_modules$diff$lib$index_es6(hunk, mine, their, swap) {
  var myChanges = collectChange$$module$node_modules$diff$lib$index_es6(mine);
  var theirChanges = collectContext$$module$node_modules$diff$lib$index_es6(their, myChanges);
  if (theirChanges.merged) {
    var _hunk$lines6;
    (_hunk$lines6 = hunk.lines).push.apply(_hunk$lines6, _toConsumableArray$$module$node_modules$diff$lib$index_es6(theirChanges.merged));
  } else {
    conflict$$module$node_modules$diff$lib$index_es6(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
  }
}
function conflict$$module$node_modules$diff$lib$index_es6(hunk, mine, their) {
  hunk.conflict = true;
  hunk.lines.push({conflict:true, mine:mine, theirs:their});
}
function insertLeading$$module$node_modules$diff$lib$index_es6(hunk, insert, their) {
  while (insert.offset < their.offset && insert.index < insert.lines.length) {
    var line = insert.lines[insert.index++];
    hunk.lines.push(line);
    insert.offset++;
  }
}
function insertTrailing$$module$node_modules$diff$lib$index_es6(hunk, insert) {
  while (insert.index < insert.lines.length) {
    var line = insert.lines[insert.index++];
    hunk.lines.push(line);
  }
}
function collectChange$$module$node_modules$diff$lib$index_es6(state) {
  var ret = [];
  var operation = state.lines[state.index][0];
  while (state.index < state.lines.length) {
    var line = state.lines[state.index];
    if (operation === "-" && line[0] === "+") {
      operation = "+";
    }
    if (operation === line[0]) {
      ret.push(line);
      state.index++;
    } else {
      break;
    }
  }
  return ret;
}
function collectContext$$module$node_modules$diff$lib$index_es6(state, matchChanges) {
  var changes = [];
  var merged = [];
  var matchIndex = 0;
  var contextChanges = false;
  var conflicted = false;
  while (matchIndex < matchChanges.length && state.index < state.lines.length) {
    var change = state.lines[state.index];
    var match = matchChanges[matchIndex];
    if (match[0] === "+") {
      break;
    }
    contextChanges = contextChanges || change[0] !== " ";
    merged.push(match);
    matchIndex++;
    if (change[0] === "+") {
      conflicted = true;
      while (change[0] === "+") {
        changes.push(change);
        change = state.lines[++state.index];
      }
    }
    if (match.substr(1) === change.substr(1)) {
      changes.push(change);
      state.index++;
    } else {
      conflicted = true;
    }
  }
  if ((matchChanges[matchIndex] || "")[0] === "+" && contextChanges) {
    conflicted = true;
  }
  if (conflicted) {
    return changes;
  }
  while (matchIndex < matchChanges.length) {
    merged.push(matchChanges[matchIndex++]);
  }
  return {merged:merged, changes:changes};
}
function allRemoves$$module$node_modules$diff$lib$index_es6(changes) {
  return changes.reduce(function(prev, change) {
    return prev && change[0] === "-";
  }, true);
}
function skipRemoveSuperset$$module$node_modules$diff$lib$index_es6(state, removeChanges, delta) {
  for (var i = 0; i < delta; i++) {
    var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);
    if (state.lines[state.index + i] !== " " + changeContent) {
      return false;
    }
  }
  state.index += delta;
  return true;
}
function calcOldNewLineCount$$module$node_modules$diff$lib$index_es6(lines) {
  var oldLines = 0;
  var newLines = 0;
  lines.forEach(function(line) {
    if (typeof line !== "string") {
      var myCount = calcOldNewLineCount$$module$node_modules$diff$lib$index_es6(line.mine);
      var theirCount = calcOldNewLineCount$$module$node_modules$diff$lib$index_es6(line.theirs);
      if (oldLines !== undefined) {
        if (myCount.oldLines === theirCount.oldLines) {
          oldLines += myCount.oldLines;
        } else {
          oldLines = undefined;
        }
      }
      if (newLines !== undefined) {
        if (myCount.newLines === theirCount.newLines) {
          newLines += myCount.newLines;
        } else {
          newLines = undefined;
        }
      }
    } else {
      if (newLines !== undefined && (line[0] === "+" || line[0] === " ")) {
        newLines++;
      }
      if (oldLines !== undefined && (line[0] === "-" || line[0] === " ")) {
        oldLines++;
      }
    }
  });
  return {oldLines:oldLines, newLines:newLines};
}
function convertChangesToDMP$$module$node_modules$diff$lib$index_es6(changes) {
  var ret = [];
  var change;
  var operation;
  for (var i = 0; i < changes.length; i++) {
    change = changes[i];
    if (change.added) {
      operation = 1;
    } else {
      if (change.removed) {
        operation = -1;
      } else {
        operation = 0;
      }
    }
    ret.push([operation, change.value]);
  }
  return ret;
}
function convertChangesToXML$$module$node_modules$diff$lib$index_es6(changes) {
  var ret = [];
  for (var i = 0; i < changes.length; i++) {
    var change = changes[i];
    if (change.added) {
      ret.push("<ins>");
    } else {
      if (change.removed) {
        ret.push("<del>");
      }
    }
    ret.push(escapeHTML$$module$node_modules$diff$lib$index_es6(change.value));
    if (change.added) {
      ret.push("</ins>");
    } else {
      if (change.removed) {
        ret.push("</del>");
      }
    }
  }
  return ret.join("");
}
function escapeHTML$$module$node_modules$diff$lib$index_es6(s) {
  var n = s;
  n = n.replace(/&/g, "&amp;");
  n = n.replace(/</g, "&lt;");
  n = n.replace(/>/g, "&gt;");
  n = n.replace(/"/g, "&quot;");
  return n;
}
var module$node_modules$diff$lib$index_es6 = {};
module$node_modules$diff$lib$index_es6.Diff = Diff$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.diffChars = diffChars$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.diffWords = diffWords$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.diffWordsWithSpace = diffWordsWithSpace$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.diffLines = diffLines$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.diffTrimmedLines = diffTrimmedLines$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.diffSentences = diffSentences$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.diffCss = diffCss$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.diffJson = diffJson$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.diffArrays = diffArrays$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.structuredPatch = structuredPatch$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.createTwoFilesPatch = createTwoFilesPatch$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.createPatch = createPatch$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.applyPatch = applyPatch$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.applyPatches = applyPatches$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.parsePatch = parsePatch$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.merge = merge$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.convertChangesToDMP = convertChangesToDMP$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.convertChangesToXML = convertChangesToXML$$module$node_modules$diff$lib$index_es6;
module$node_modules$diff$lib$index_es6.canonicalize = canonicalize$$module$node_modules$diff$lib$index_es6;
const colors$$module$node_modules$erte$src$index = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
const backgroundColors$$module$node_modules$erte$src$index = {black:40, red:41, green:42, yellow:43, blue:44, magenta:45, cyan:46, white:47};
function c$$module$node_modules$erte$src$index(string, color) {
  const c = colors$$module$node_modules$erte$src$index[color];
  if (!c) {
    return string;
  }
  return `\x1b[${c}m${string}\x1b[0m`;
}
function b$$module$node_modules$erte$src$index(string, color) {
  const c = backgroundColors$$module$node_modules$erte$src$index[color];
  if (!c) {
    return string;
  }
  return `\x1b[${c}m${string}\x1b[0m`;
}
function erte$$module$node_modules$erte$src$index(source, target) {
  const d = diffChars$$module$node_modules$diff$lib$index_es6(source, target);
  const m = d.map(({added, removed, value}) => {
    let p;
    const s = value.split(" ");
    if (added) {
      p = s.map((t) => c$$module$node_modules$erte$src$index(t, "green")).join(b$$module$node_modules$erte$src$index(" ", "green"));
    } else {
      if (removed) {
        p = s.map((t) => c$$module$node_modules$erte$src$index(t, "red")).join(b$$module$node_modules$erte$src$index(" ", "red"));
      } else {
        p = c$$module$node_modules$erte$src$index(value, "grey");
      }
    }
    return p;
  });
  const s = m.join("");
  return s;
}
var module$node_modules$erte$src$index = {};
module$node_modules$erte$src$index.c = c$$module$node_modules$erte$src$index;
module$node_modules$erte$src$index.b = b$$module$node_modules$erte$src$index;
module$node_modules$erte$src$index.default = erte$$module$node_modules$erte$src$index;
const find$$module$node_modules$argufy$src$index = (argv, long, short, bool = false, number = false) => {
  const re = new RegExp(`^-(${short}|-${long})`);
  const i = argv.findIndex((a) => re.test(a));
  if (i == -1) {
    return {argv};
  }
  if (bool) {
    return {value:true, argv:[...argv.slice(0, i), ...argv.slice(i + 1)]};
  }
  const j = i + 1;
  let value = argv[j];
  if (!value || typeof value == "string" && value.startsWith("--")) {
    return {argv};
  }
  if (number) {
    value = parseInt(value, 10);
  }
  return {value, argv:[...argv.slice(0, i), ...argv.slice(j + 1)]};
};
function argufy$$module$node_modules$argufy$src$index(config = {}, args = process.argv) {
  let [, , ...argv] = args;
  const titles = findTitles$$module$node_modules$argufy$src$index(argv);
  argv = argv.slice(titles.length);
  let commandFound = !titles.length;
  const res = Object.keys(config).reduce(({_argv, ...acc}, key) => {
    if (_argv.length == 0 && commandFound) {
      return {_argv, ...acc};
    }
    const val = config[key];
    let value;
    if (typeof val == "string") {
      ({value, argv:_argv} = find$$module$node_modules$argufy$src$index(_argv, key, val));
    } else {
      try {
        const {short, boolean, number, command, multiple} = val;
        if (command && multiple && titles.length) {
          value = titles;
          commandFound = true;
        } else {
          if (command && titles.length) {
            value = titles[0];
            commandFound = true;
          } else {
            ({value, argv:_argv} = find$$module$node_modules$argufy$src$index(_argv, key, short, boolean, number));
          }
        }
      } catch (err) {
        return {_argv, ...acc};
      }
    }
    if (value === undefined) {
      return {_argv, ...acc};
    }
    const r = {_argv, ...acc, [key]:value};
    return r;
  }, {_argv:argv});
  return res;
}
const findTitles$$module$node_modules$argufy$src$index = (argv) => {
  const titles = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("-")) {
      break;
    }
    titles.push(a);
  }
  return titles;
};
var module$node_modules$argufy$src$index = {};
module$node_modules$argufy$src$index.default = argufy$$module$node_modules$argufy$src$index;
var module$node_modules$child_process$package_json = {"name":"child_process", "module":"index.js", "depack":"v8"};
var module$node_modules$os$package_json = {"name":"os", "module":"index.js", "depack":"v8"};
var $jscompDefaultExport$$module$node_modules$child_process$index = child_process;
const {"ChildProcess":ChildProcess$$module$node_modules$child_process$index, "exec":exec$$module$node_modules$child_process$index, "execFile":execFile$$module$node_modules$child_process$index, "execFileSync":execFileSync$$module$node_modules$child_process$index, "execSync":execSync$$module$node_modules$child_process$index, "fork":fork$$module$node_modules$child_process$index, "spawn":spawn$$module$node_modules$child_process$index, "spawnSync":spawnSync$$module$node_modules$child_process$index} = 
child_process;
var module$node_modules$child_process$index = {};
module$node_modules$child_process$index.default = $jscompDefaultExport$$module$node_modules$child_process$index;
module$node_modules$child_process$index.ChildProcess = ChildProcess$$module$node_modules$child_process$index;
module$node_modules$child_process$index.exec = exec$$module$node_modules$child_process$index;
module$node_modules$child_process$index.execFile = execFile$$module$node_modules$child_process$index;
module$node_modules$child_process$index.execFileSync = execFileSync$$module$node_modules$child_process$index;
module$node_modules$child_process$index.execSync = execSync$$module$node_modules$child_process$index;
module$node_modules$child_process$index.fork = fork$$module$node_modules$child_process$index;
module$node_modules$child_process$index.spawn = spawn$$module$node_modules$child_process$index;
module$node_modules$child_process$index.spawnSync = spawnSync$$module$node_modules$child_process$index;
var module$node_modules$vm$package_json = {"name":"vm", "module":"index.js", "depack":"v8"};
var $jscompDefaultExport$$module$node_modules$vm$index = vm;
const {"Script":Script$$module$node_modules$vm$index, "createContext":createContext$$module$node_modules$vm$index, "createScript":createScript$$module$node_modules$vm$index, "isContext":isContext$$module$node_modules$vm$index, "runInContext":runInContext$$module$node_modules$vm$index, "runInDebugContext":runInDebugContext$$module$node_modules$vm$index, "runInNewContext":runInNewContext$$module$node_modules$vm$index, "runInThisContext":runInThisContext$$module$node_modules$vm$index} = vm;
var module$node_modules$vm$index = {};
module$node_modules$vm$index.default = $jscompDefaultExport$$module$node_modules$vm$index;
module$node_modules$vm$index.Script = Script$$module$node_modules$vm$index;
module$node_modules$vm$index.createContext = createContext$$module$node_modules$vm$index;
module$node_modules$vm$index.createScript = createScript$$module$node_modules$vm$index;
module$node_modules$vm$index.isContext = isContext$$module$node_modules$vm$index;
module$node_modules$vm$index.runInContext = runInContext$$module$node_modules$vm$index;
module$node_modules$vm$index.runInDebugContext = runInDebugContext$$module$node_modules$vm$index;
module$node_modules$vm$index.runInNewContext = runInNewContext$$module$node_modules$vm$index;
module$node_modules$vm$index.runInThisContext = runInThisContext$$module$node_modules$vm$index;
var module$node_modules$mismatch$build$index = {};
module$node_modules$mismatch$build$index.default = function(re, string, keys) {
  const m = [];
  string.replace(re, (match, ...args) => {
    const p = args.slice(0, args.length - 2);
    const o = p.reduce((acc, capturedGroup, i) => {
      const key = keys[i];
      if (!(key && capturedGroup !== undefined)) {
        return acc;
      }
      acc[key] = capturedGroup;
      return acc;
    }, {});
    m.push(o);
  });
  return m;
};
var module$node_modules$restream$build$lib$markers = {default:{}};
const getDefaultRegExp$$module$node_modules$restream$build$lib$markers = (name) => {
  return new RegExp(`%%_RESTREAM_${name.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g");
};
const getDefaultReplacement$$module$node_modules$restream$build$lib$markers = (name, index) => {
  return `%%_RESTREAM_${name.toUpperCase()}_REPLACEMENT_${index}_%%`;
};
const makeMarker$$module$node_modules$restream$build$lib$markers = (name, re, {getReplacement = getDefaultReplacement$$module$node_modules$restream$build$lib$markers, getRegex = getDefaultRegExp$$module$node_modules$restream$build$lib$markers} = {}) => {
  const regExp = getRegex(name);
  return {name, re, regExp, getReplacement, map:{}, lastIndex:0};
};
module$node_modules$restream$build$lib$markers.default.makeMarkers = (matchers, config) => {
  const res = Object.keys(matchers).reduce((acc, key) => {
    const re = matchers[key];
    const marker = makeMarker$$module$node_modules$restream$build$lib$markers(key, re, config);
    const m = {...acc, [key]:marker};
    return m;
  }, {});
  return res;
};
module$node_modules$restream$build$lib$markers.default.makePasteRule = (marker) => {
  const {regExp:re, map} = marker;
  const rule = {re, replacement(match, index) {
    const m = map[index];
    delete map[index];
    return m;
  }};
  return rule;
};
module$node_modules$restream$build$lib$markers.default.makeCutRule = (marker) => {
  const {re, map, getReplacement, name} = marker;
  const rule = {re, replacement(match) {
    const {lastIndex} = marker;
    map[lastIndex] = match;
    marker.lastIndex += 1;
    const m = getReplacement(name, lastIndex);
    return m;
  }};
  return rule;
};
var module$node_modules$restream$build$lib$index = {default:{}};
module$node_modules$restream$build$lib$index.default.checkRule = function(reObject) {
  if (typeof reObject != "object") {
    return false;
  }
  const {re, replacement} = reObject;
  const hasRe = re instanceof RegExp;
  const type = ["string", "function"].indexOf(typeof replacement) != -1;
  return hasRe && type;
};
module$node_modules$restream$build$lib$index.default.hideStack = (commonError, thrownError) => {
  if (!(thrownError instanceof Error)) {
    throw thrownError;
  }
  const [, , commonLine] = commonError.stack.split("\n", 3);
  const i = thrownError.stack.indexOf(commonLine);
  if (i == -1) {
    throw thrownError;
  }
  const stack = thrownError.stack.substr(0, i - 1);
  const li = stack.lastIndexOf("\n");
  thrownError.stack = stack.substr(0, li);
  throw thrownError;
};
var module$node_modules$$artdeco$clean_stack$build$index = {};
const {homedir:homedir$$module$node_modules$$artdeco$clean_stack$build$index} = module$node_modules$os$index;
const extractPathRegex$$module$node_modules$$artdeco$clean_stack$build$index = /\s+at.*(?:\(|\s)(.*)\)?/;
const pathRegex$$module$node_modules$$artdeco$clean_stack$build$index = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/;
const homeDir$$module$node_modules$$artdeco$clean_stack$build$index = homedir$$module$node_modules$os$index();
module$node_modules$$artdeco$clean_stack$build$index.default = (stack, options = {}) => {
  const {pretty = false, ignoredModules = ["pirates"]} = options;
  const j = ignoredModules.join("|");
  const re = new RegExp(pathRegex$$module$node_modules$$artdeco$clean_stack$build$index.source.replace("IGNORED_MODULES", j));
  return stack.replace(/\\/g, "/").split("\n").filter((x) => {
    const pathMatches = x.match(extractPathRegex$$module$node_modules$$artdeco$clean_stack$build$index);
    if (pathMatches === null || !pathMatches[1]) {
      return true;
    }
    const match = pathMatches[1];
    if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar")) {
      return false;
    }
    return !re.test(match);
  }).filter((x) => x.trim() !== "").map((x) => {
    if (pretty) {
      return x.replace(extractPathRegex$$module$node_modules$$artdeco$clean_stack$build$index, (m, p1) => m.replace(p1, p1.replace(homeDir$$module$node_modules$$artdeco$clean_stack$build$index, "~")));
    }
    return x;
  }).join("\n");
};
var module$node_modules$restream$build$Replaceable = {};
const {Transform:Transform$$module$node_modules$restream$build$Replaceable} = module$node_modules$stream$index;
const {checkRule:checkRule$$module$node_modules$restream$build$Replaceable, hideStack:hideStack$$module$node_modules$restream$build$Replaceable} = module$node_modules$restream$build$lib$index.default;
let cleanStack$$module$node_modules$restream$build$Replaceable = module$node_modules$$artdeco$clean_stack$build$index.default;
if (module$node_modules$$artdeco$clean_stack$build$index.default && module$node_modules$$artdeco$clean_stack$build$index.default.__esModule) {
  module$node_modules$$artdeco$clean_stack$build$index.default = module$node_modules$$artdeco$clean_stack$build$index.default.default;
}
module$node_modules$restream$build$Replaceable.default = class extends Transform$$module$node_modules$stream$index {
  constructor(rules) {
    super();
    const re = Array.isArray(rules) ? rules : [rules];
    const fr = re.filter(module$node_modules$restream$build$lib$index.default.checkRule);
    this.rules = fr;
  }
  brake() {
    this._broke = true;
  }
  async reduce(chunk) {
    const s = await this.rules.reduce(async(acc, {re, replacement}) => {
      let string = await acc;
      if (this._broke) {
        return string;
      }
      if (typeof replacement == "string") {
        string = string.replace(re, replacement);
      } else {
        const R = replacement.bind(this);
        const promises = [];
        let commonError;
        const t = string.replace(re, (match, ...args) => {
          commonError = new Error;
          try {
            if (this._broke) {
              return match;
            }
            const p = R(match, ...args);
            if (p instanceof Promise) {
              promises.push(p);
            }
            return p;
          } catch (e) {
            (0,module$node_modules$restream$build$lib$index.default.hideStack)(commonError, e);
          }
        });
        if (promises.length) {
          try {
            const data = await Promise.all(promises);
            string = string.replace(re, () => data.shift());
          } catch (e) {
            (0,module$node_modules$restream$build$lib$index.default.hideStack)(commonError, e);
          }
        } else {
          string = t;
        }
      }
      return string;
    }, `${chunk}`);
    return s;
  }
  async _transform(chunk, _, next) {
    try {
      const s = await this.reduce(chunk);
      this.push(s);
      next();
    } catch (e) {
      const s = (0,module$node_modules$$artdeco$clean_stack$build$index.default)(e["stack"]);
      e["stack"] = s;
      next(e);
    }
  }
};
module$node_modules$restream$build$Replaceable.default.SerialAsyncReplaceable = class extends module$node_modules$restream$build$Replaceable.default {
  constructor(rules) {
    super(rules);
    this.promise = Promise.resolve();
  }
  addItem(fn) {
    const pp = this["promise"].then(fn);
    this["promise"] = pp;
    return pp;
  }
};
var module$node_modules$restream$build$SyncReplaceable = {};
const {checkRule:checkRule$$module$node_modules$restream$build$SyncReplaceable, hideStack:hideStack$$module$node_modules$restream$build$SyncReplaceable} = module$node_modules$restream$build$lib$index.default;
module$node_modules$restream$build$SyncReplaceable.default = (input, rules) => {
  const fr = rules.filter(module$node_modules$restream$build$lib$index.default.checkRule);
  const s = fr.reduce((acc, {re, replacement}) => {
    let Acc = acc;
    if (this._broke) {
      return Acc;
    }
    if (typeof replacement == "string") {
      Acc = Acc.replace(re, replacement);
    } else {
      const R = replacement.bind(this);
      let commonError;
      const t = Acc.replace(re, (match, ...args) => {
        commonError = new Error;
        try {
          if (this._broke) {
            return match;
          }
          const p = R(match, ...args);
          return p;
        } catch (e) {
          (0,module$node_modules$restream$build$lib$index.default.hideStack)(commonError, e);
        }
      });
      return t;
    }
  }, `${input}`);
  return s;
};
var module$node_modules$restream$build$index = {};
module$node_modules$restream$build$index.default = function(regex) {
  let buffer = "";
  const ts = new Transform$$module$node_modules$stream$index({transform(chunk, encoding, next) {
    let lastMatch;
    let match;
    buffer += chunk.toString();
    while (match = regex.exec(buffer)) {
      ts.push(match);
      lastMatch = match;
      if (!regex.global) {
        break;
      }
    }
    if (lastMatch) {
      buffer = buffer.slice(lastMatch.index + lastMatch[0].length);
    }
    next();
  }, objectMode:true});
  return ts;
};
const {Transform:Transform$$module$node_modules$restream$build$index} = module$node_modules$stream$index;
const $_lib_markers$$module$node_modules$restream$build$index = module$node_modules$restream$build$lib$markers.default;
const $_Replaceable$$module$node_modules$restream$build$index = module$node_modules$restream$build$Replaceable.default;
const $_SyncReplaceable$$module$node_modules$restream$build$index = module$node_modules$restream$build$SyncReplaceable.default;
module$node_modules$restream$build$index.default.makeMarkers = module$node_modules$restream$build$lib$markers.default.makeMarkers;
module$node_modules$restream$build$index.default.makeCutRule = module$node_modules$restream$build$lib$markers.default.makeCutRule;
module$node_modules$restream$build$index.default.makePasteRule = module$node_modules$restream$build$lib$markers.default.makePasteRule;
module$node_modules$restream$build$index.default.Replaceable = module$node_modules$restream$build$Replaceable.default;
module$node_modules$restream$build$index.default.SerialAsyncReplaceable = module$node_modules$restream$build$Replaceable.default.SerialAsyncReplaceable;
module$node_modules$restream$build$index.default.SyncReplaceable = module$node_modules$restream$build$SyncReplaceable.default;
const getTagName$$module$node_modules$$a_la$jsx$src$lib$index = (string) => {
  const [, tagName] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(string) || [];
  return tagName;
};
const getProps$$module$node_modules$$a_la$jsx$src$lib$index = (props) => {
  let stack = 0;
  const positions = [];
  let current;
  module$node_modules$restream$build$index.SyncReplaceable(props, [{re:/[{}]/g, replacement(m, i) {
    const closing = m == "}";
    const opening = !closing;
    if (!stack && closing) {
      throw new Error("A closing } is found without opening one.");
    }
    stack += opening ? 1 : -1;
    if (stack == 1 && opening) {
      current = {open:i};
    } else {
      if (stack == 0 && closing) {
        current.close = i;
        positions.push(current);
        current = {};
      }
    }
  }}]);
  if (stack) {
    throw new Error(`Unbalanced props (level ${stack})`);
  }
  const obj = {};
  const destructuring = [];
  const lastClose = positions.reduce((acc, {open, close}) => {
    const before = props.slice(acc, open);
    const [, propName] = /(\S+)\s*=\s*$/.exec(before) || [];
    const val = props.slice(open + 1, close);
    if (!propName && !/\s*\.\.\./.test(val)) {
      throw new Error("Could not detect prop name");
    }
    if (!propName) {
      destructuring.push(val);
    } else {
      obj[propName] = val;
    }
    const beforeOrNot = before || "";
    const propOrNot = propName || "";
    const bb = beforeOrNot.slice(0, beforeOrNot.length - propOrNot.length - 1);
    const plain = getPlain$$module$node_modules$$a_la$jsx$src$lib$index(bb);
    Object.assign(obj, plain);
    return close + 1;
  }, 0);
  if (!positions.length) {
    const plain = getPlain$$module$node_modules$$a_la$jsx$src$lib$index(props);
    Object.assign(obj, plain);
  } else {
    const whatsLeft = props.slice(lastClose);
    const plain = getPlain$$module$node_modules$$a_la$jsx$src$lib$index(whatsLeft);
    Object.assign(obj, plain);
  }
  return {obj, destructuring};
};
const getPlain$$module$node_modules$$a_la$jsx$src$lib$index = (string) => {
  const res = module$node_modules$mismatch$build$index.default(/(\S+)\s*=\s*(["'])([\s\S]+?)\2/g, string, ["n", "q", "v"]).reduce((acc, {n, v, q}) => {
    acc[n] = `${q}${v}${q}`;
    return acc;
  }, {});
  return res;
};
const makeObjectBody$$module$node_modules$$a_la$jsx$src$lib$index = (pp, destructuring = [], quoteProps = false) => {
  const {length} = Object.keys(pp);
  if (!length && !destructuring.length) {
    return "{}";
  }
  const pr = `{${Object.keys(pp).reduce((a, k) => {
    const v = pp[k];
    const kk = quoteProps ? `'${k}'` : k;
    return [...a, `${kk}:${v}`];
  }, destructuring).join(",")}}`;
  return pr;
};
const isComponentName$$module$node_modules$$a_la$jsx$src$lib$index = (tagName = "") => {
  const [t] = tagName;
  if (!t) {
    throw new Error("No tag name is given");
  }
  return t.toUpperCase() == t;
};
const pragma$$module$node_modules$$a_la$jsx$src$lib$index = (tagName, props = {}, children = [], destructuring = [], quoteProps = false) => {
  const tn = isComponentName$$module$node_modules$$a_la$jsx$src$lib$index(tagName) ? tagName : `'${tagName}'`;
  if (!Object.keys(props).length && !children.length && !destructuring.length) {
    return `h(${tn})`;
  }
  const pr = makeObjectBody$$module$node_modules$$a_la$jsx$src$lib$index(props, destructuring, quoteProps);
  const c = children.join(",");
  const res = `h(${tn},${pr}${c ? `,${c}` : ""})`;
  return res;
};
const replaceChunk$$module$node_modules$$a_la$jsx$src$lib$index = (input, index, length, chunk) => {
  const before = input.slice(0, index);
  const after = input.slice(index + length);
  const ld = length - chunk.length;
  let p = chunk;
  if (ld > 0) {
    p = `${" ".repeat(ld)}${p}`;
  }
  const res = `${before}${p}${after}`;
  return res;
};
var module$node_modules$$a_la$jsx$src$lib$index = {};
module$node_modules$$a_la$jsx$src$lib$index.getTagName = getTagName$$module$node_modules$$a_la$jsx$src$lib$index;
module$node_modules$$a_la$jsx$src$lib$index.getProps = getProps$$module$node_modules$$a_la$jsx$src$lib$index;
module$node_modules$$a_la$jsx$src$lib$index.makeObjectBody = makeObjectBody$$module$node_modules$$a_la$jsx$src$lib$index;
module$node_modules$$a_la$jsx$src$lib$index.isComponentName = isComponentName$$module$node_modules$$a_la$jsx$src$lib$index;
module$node_modules$$a_la$jsx$src$lib$index.pragma = pragma$$module$node_modules$$a_la$jsx$src$lib$index;
module$node_modules$$a_la$jsx$src$lib$index.replaceChunk = replaceChunk$$module$node_modules$$a_la$jsx$src$lib$index;
const getQuoted$$module$node_modules$$a_la$jsx$src$lib$parse_content = (s) => `\`${s}\``;
const parseSimpleContent$$module$node_modules$$a_la$jsx$src$lib$parse_content = (string) => {
  const temps = [];
  string.replace(/{\s*(.*?)\s*}/g, ({length}, expression, i) => {
    const a = {from:i, to:i + length, expression};
    temps.push(a);
  });
  const res = temps.length ? getTemps$$module$node_modules$$a_la$jsx$src$lib$parse_content(string, temps) : [getQuoted$$module$node_modules$$a_la$jsx$src$lib$parse_content(string)];
  return res;
};
const getTemps$$module$node_modules$$a_la$jsx$src$lib$parse_content = (string, temps) => {
  let lastTo = 0;
  const ar = temps.reduce((acc, {from, to, expression}) => {
    const b = string.slice(lastTo, from);
    if (b) {
      acc.push(getQuoted$$module$node_modules$$a_la$jsx$src$lib$parse_content(b));
    }
    lastTo = to;
    acc.push(expression);
    return acc;
  }, []);
  if (lastTo < string.length) {
    const a = string.slice(lastTo, string.length);
    if (a) {
      ar.push(getQuoted$$module$node_modules$$a_la$jsx$src$lib$parse_content(a));
    }
  }
  return ar;
};
var module$node_modules$$a_la$jsx$src$lib$parse_content = {};
module$node_modules$$a_la$jsx$src$lib$parse_content.getQuoted = getQuoted$$module$node_modules$$a_la$jsx$src$lib$parse_content;
module$node_modules$$a_la$jsx$src$lib$parse_content.parseSimpleContent = parseSimpleContent$$module$node_modules$$a_la$jsx$src$lib$parse_content;
const findPosition$$module$node_modules$$a_la$detect_jsx$src$lib$index = (stack, input) => {
  const [h, , l2] = stack.split("\n");
  const l = parseInt(h.replace(/.+?(\d+)$/, (m, d) => d)) - 1;
  const c = l2.indexOf("^");
  const {length} = input.split("\n").slice(0, l).join("\n");
  const lb = length + c + (l ? 1 : 0);
  return lb;
};
var module$node_modules$$a_la$detect_jsx$src$lib$index = {};
module$node_modules$$a_la$detect_jsx$src$lib$index.findPosition = findPosition$$module$node_modules$$a_la$detect_jsx$src$lib$index;
const detectJSX$$module$node_modules$$a_la$detect_jsx$src$index = (input) => {
  try {
    new Script$$module$node_modules$vm$index(input);
  } catch (err) {
    const {message, stack} = err;
    if ("Unexpected token <" != message) {
      throw err;
    }
    const bl = findPosition$$module$node_modules$$a_la$detect_jsx$src$lib$index(stack, input);
    return bl;
  }
  return null;
};
var $jscompDefaultExport$$module$node_modules$$a_la$detect_jsx$src$index = detectJSX$$module$node_modules$$a_la$detect_jsx$src$index;
var module$node_modules$$a_la$detect_jsx$src$index = {};
module$node_modules$$a_la$detect_jsx$src$index.default = $jscompDefaultExport$$module$node_modules$$a_la$detect_jsx$src$index;
const extract$$module$node_modules$$a_la$jsx$src$lib$extract = (stringWithTag) => {
  const tagName = getTagName$$module$node_modules$$a_la$jsx$src$lib$index(stringWithTag);
  const re = new RegExp(`<\\s*(/)?\\s*${tagName}(\\s+[\\s\\S]+?)?\\s*(/\\s*>|>)`, "g");
  let stack = 0;
  let end;
  let contentEnd;
  let contentStart;
  let props;
  const {arrow} = module$node_modules$restream$build$index.makeMarkers({arrow:/=>/g});
  const preString = module$node_modules$restream$build$index.SyncReplaceable(stringWithTag, [module$node_modules$restream$build$index.makeCutRule(arrow), {re, replacement(m, closing = false, p = "", selfClosing, i) {
    if (end) {
      return m;
    }
    const isSelfClosing = selfClosing.startsWith("/") || p.endsWith("/");
    if (!contentStart) {
      contentStart = m.length;
      props = p;
    }
    if (isSelfClosing && !stack) {
      contentEnd = contentStart;
      end = i + m.length;
      return m;
    }
    if (!stack && closing) {
      throw new Error("The tag closed before opening.");
    }
    if (!isSelfClosing) {
      stack += closing ? -1 : 1;
    }
    if (stack == 0) {
      contentEnd = i;
      end = i + m.length;
    }
    return m;
  }}]);
  if (!end) {
    throw new Error(`Could not find the matching closing tag for ${tagName}.`);
  }
  const string = preString.slice(0, end);
  const content = preString.slice(contentStart, contentEnd);
  const s = string.replace(arrow.regExp, "=>");
  const pp = props.replace(arrow.regExp, "=>");
  const c = content.replace(arrow.regExp, "=>");
  return {string:s, props:pp, content:c, tagName};
};
var $jscompDefaultExport$$module$node_modules$$a_la$jsx$src$lib$extract = extract$$module$node_modules$$a_la$jsx$src$lib$extract;
var module$node_modules$$a_la$jsx$src$lib$extract = {};
module$node_modules$$a_la$jsx$src$lib$extract.default = $jscompDefaultExport$$module$node_modules$$a_la$jsx$src$lib$extract;
const transpileJSX$$module$node_modules$$a_la$jsx$src$lib$components = (input, config = {}) => {
  const {quoteProps} = config;
  const position = $jscompDefaultExport$$module$node_modules$$a_la$detect_jsx$src$index(input);
  if (position === null) {
    return input;
  }
  const s = input.slice(position);
  const {props = "", content, tagName, string:{length}} = $jscompDefaultExport$$module$node_modules$$a_la$jsx$src$lib$extract(s);
  const children = parseContent$$module$node_modules$$a_la$jsx$src$lib$components(content, quoteProps);
  const {obj, destructuring} = getProps$$module$node_modules$$a_la$jsx$src$lib$index(props);
  const f = pragma$$module$node_modules$$a_la$jsx$src$lib$index(tagName, obj, children, destructuring, quoteProps);
  const res = replaceChunk$$module$node_modules$$a_la$jsx$src$lib$index(input, position, length, f);
  const newRes = transpileJSX$$module$node_modules$$a_la$jsx$src$lib$components(res);
  return newRes;
};
var $jscompDefaultExport$$module$node_modules$$a_la$jsx$src$lib$components = transpileJSX$$module$node_modules$$a_la$jsx$src$lib$components;
const parseContent$$module$node_modules$$a_la$jsx$src$lib$components = (content, quoteProps = false) => {
  if (!content) {
    return [];
  }
  const bl = content.indexOf("<");
  if (bl == -1) {
    const c = parseSimpleContent$$module$node_modules$$a_la$jsx$src$lib$parse_content(content);
    return c;
  }
  const b = content.slice(0, bl);
  const before = b ? parseSimpleContent$$module$node_modules$$a_la$jsx$src$lib$parse_content(b) : [];
  const trim = content.slice(bl);
  const {string:{length}, props = "", content:jsx, tagName} = $jscompDefaultExport$$module$node_modules$$a_la$jsx$src$lib$extract(trim);
  const {obj, destructuring} = getProps$$module$node_modules$$a_la$jsx$src$lib$index(props);
  const children = parseContent$$module$node_modules$$a_la$jsx$src$lib$components(jsx, quoteProps);
  const p = pragma$$module$node_modules$$a_la$jsx$src$lib$index(tagName, obj, children, destructuring, quoteProps);
  const a = content.slice(bl + length);
  const after = a ? parseContent$$module$node_modules$$a_la$jsx$src$lib$components(a, quoteProps) : [];
  return [...before, p, ...after];
};
var module$node_modules$$a_la$jsx$src$lib$components = {};
module$node_modules$$a_la$jsx$src$lib$components.default = $jscompDefaultExport$$module$node_modules$$a_la$jsx$src$lib$components;
module$node_modules$$a_la$jsx$src$lib$components.parseContent = parseContent$$module$node_modules$$a_la$jsx$src$lib$components;
const jsx$$module$node_modules$$a_la$jsx$src$index = (input, config = {}) => {
  const {e, i, ias, ii} = module$node_modules$restream$build$index.makeMarkers({e:/^ *export\s+(?:default\s+)?/mg, i:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, ias:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, ii:/^ *import\s+['"].+['"]/gm}, {getReplacement(name, index) {
    return `/*%%_RESTREAM_${name.toUpperCase()}_REPLACEMENT_${index}_%%*/`;
  }, getRegex(name) {
    return new RegExp(`/\\*%%_RESTREAM_${name.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  const s = module$node_modules$restream$build$index.SyncReplaceable(input, [module$node_modules$restream$build$index.makeCutRule(e), module$node_modules$restream$build$index.makeCutRule(i), module$node_modules$restream$build$index.makeCutRule(ias), module$node_modules$restream$build$index.makeCutRule(ii)]);
  const tt = $jscompDefaultExport$$module$node_modules$$a_la$jsx$src$lib$components(s, config);
  const as = module$node_modules$restream$build$index.SyncReplaceable(tt, [module$node_modules$restream$build$index.makePasteRule(e), module$node_modules$restream$build$index.makePasteRule(i), module$node_modules$restream$build$index.makePasteRule(ias), module$node_modules$restream$build$index.makePasteRule(ii)]);
  return as;
};
var $jscompDefaultExport$$module$node_modules$$a_la$jsx$src$index = jsx$$module$node_modules$$a_la$jsx$src$index;
var module$node_modules$$a_la$jsx$src$index = {};
module$node_modules$$a_la$jsx$src$index.default = $jscompDefaultExport$$module$node_modules$$a_la$jsx$src$index;
var module$node_modules$$wrote$wrote$src$index = {get read() {
  return read$$module$node_modules$$wrote$wrote$node_modules$$wrote$read$src$index;
}, get write() {
  return write$$module$node_modules$$wrote$wrote$node_modules$$wrote$write$src$index;
}, get ensurePath() {
  return ensurePath$$module$node_modules$$wrote$wrote$node_modules$$wrote$ensure_path$src$index;
}, get rm() {
  return $jscompDefaultExport$$module$node_modules$$wrote$wrote$node_modules$$wrote$rm$src$index;
}, get readDirStructure() {
  return readDirStructure$$module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$src$index;
}};
var module$node_modules$module$package_json = {"name":"module", "module":"index.js", "depack":"v8"};
var module$node_modules$$a_la$detect_jsx$package_json = {"name":"@a-la/detect-jsx", "version":"1.0.1", "description":"Detects Position Of JSX Tag In JavaScript File.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec test/mask", "spec":"yarn t test/spec", "mask":"yarn t test/mask", "test-build":"ALAMODE_ENV=test-build yarn test", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "b":"alamode src -o build -s", "d":"yarn-s d1", "d1":"NODE_DEBUG=doc doc src/index.js -g", 
"build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/a-la/detect-jsx.git"}, "keywords":["detect-jsx", "a-la"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/a-la/detect-jsx/issues"}, "homepage":"https://github.com/a-la/detect-jsx#readme", "devDependencies":{"@wrote/read":"1.0.2", "alamode":"1.6.1", 
"documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}};
var module$node_modules$$a_la$jsx$package_json = {"name":"@a-la/jsx", "version":"1.1.4", "description":"The JSX Transform For \u00c0LaMode And Other Packages.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec test/mask", "spec":"yarn t test/spec", "mask":"yarn t test/mask", "test-build":"ALAMODE_ENV=test-build yarn test", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "b":"alamode src -o build -s", "d":"yarn-s d1", "d1":"NODE_DEBUG=doc doc src/index.js -g", 
"build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/a-la/jsx.git"}, "keywords":["jsx", "transpile", "template", "compile", "react", "a-la", "alamode"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/a-la/jsx/issues"}, "homepage":"https://github.com/a-la/jsx#readme", "devDependencies":{"@wrote/read":"1.0.2", 
"alamode":"1.6.1", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"@a-la/detect-jsx":"1.0.1", "restream":"3.4.1"}};
var module$node_modules$diff$package_json = {"name":"diff", "version":"4.0.1", "description":"A javascript text diff implementation.", "keywords":["diff", "javascript"], "maintainers":["Kevin Decker <kpdecker@gmail.com> (http://incaseofstairs.com)"], "bugs":{"email":"kpdecker@gmail.com", "url":"http://github.com/kpdecker/jsdiff/issues"}, "license":"BSD-3-Clause", "repository":{"type":"git", "url":"git://github.com/kpdecker/jsdiff.git"}, "engines":{"node":">=0.3.1"}, "main":"./lib/index.js", "module":"./lib/index.es6.js", 
"browser":"./dist/diff.js", "scripts":{"clean":"rm -rf lib/ dist/", "build:node":"yarn babel --out-dir lib  --source-maps=inline src", "test":"grunt"}, "devDependencies":{"@babel/cli":"^7.2.3", "@babel/core":"^7.2.2", "@babel/plugin-transform-modules-commonjs":"^7.2.0", "@babel/preset-env":"^7.2.3", "@babel/register":"^7.0.0", "babel-eslint":"^10.0.1", "babel-loader":"^8.0.5", "chai":"^4.2.0", "colors":"^1.3.3", "eslint":"^5.12.0", "grunt":"^1.0.3", "grunt-babel":"^8.0.0", "grunt-clean":"^0.4.0", 
"grunt-cli":"^1.3.2", "grunt-contrib-clean":"^2.0.0", "grunt-contrib-copy":"^1.0.0", "grunt-contrib-uglify":"^4.0.0", "grunt-contrib-watch":"^1.1.0", "grunt-eslint":"^21.0.0", "grunt-exec":"^3.0.0", "grunt-karma":"^3.0.1", "grunt-mocha-istanbul":"^5.0.2", "grunt-mocha-test":"^0.13.3", "grunt-webpack":"^3.1.3", "istanbul":"github:kpdecker/istanbul", "karma":"^3.1.4", "karma-chrome-launcher":"^2.2.0", "karma-mocha":"^1.3.0", "karma-mocha-reporter":"^2.0.0", "karma-sauce-launcher":"^2.0.2", "karma-sourcemap-loader":"^0.3.6", 
"karma-webpack":"^3.0.5", "mocha":"^5.2.0", "rollup":"^1.0.2", "rollup-plugin-babel":"^4.2.0", "semver":"^5.6.0", "webpack":"^4.28.3", "webpack-dev-server":"^3.1.14"}, "optionalDependencies":{}};
var module$node_modules$erte$package_json = {"name":"erte", "version":"1.1.5", "description":"String difference with colour for Node.js.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "test-build":"ALAMODE_ENV=test-build yarn t test/spec", "b":"alamode src -o build -s", "doc":"doc documentary -o README.md", "d":"doc src/index.js -g", "example":"node example", "example-c":"yarn e example/c.js", "example-b":"yarn e example/b.js", "e":"node example/run"}, 
"files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/artdecocode/erte.git"}, "keywords":["erte", "art deco", "string", "diff", "color", "colour", "difference"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/erte/issues"}, "homepage":"https://github.com/artdecocode/erte#readme", "devDependencies":{"alamode":"1.6.1", "snapshot-context":"2.0.4", "zoroaster":"3.6.6"}, "dependencies":{"diff":"4.0.1"}};
var module$node_modules$makepromise$package_json = {"name":"makepromise", "version":"3.0.2", "description":"Make a Promise from a function with a callback and preserve its error stack.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"zoroaster test/spec -a", "test-build":"ALAMODE_ENV=test-build zoroaster test/spec -a", "build":"yarn-s b doc", "b":"alamode src -o build -s", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "e":"node example"}, "files":["build", 
"src"], "repository":{"type":"git", "url":"git+https://github.com/artdecocode/makepromise.git"}, "keywords":["promise", "async", "await", "ecmascript", "es6", "ecma", "promisify", "node", "callback", "cb", "error", "stack"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/makepromise/issues"}, "homepage":"https://github.com/artdecocode/makepromise#readme", "devDependencies":{"alamode":"1.6.1", "catchment":"3.2.1", "documentary":"1.20.1", "wrote":"1.4.0", 
"yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"erotic":"2.0.2"}};
var module$node_modules$stream$package_json = {"name":"stream", "module":"index.js", "depack":"v8"};
var module$node_modules$erotic$node_modules$$artdeco$clean_stack$package_json = {"name":"@artdeco/clean-stack", "version":"1.0.1", "description":"A utility to remove internal Node.js lines and specific modules from error stacks.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "test-build":"ALAMODE_ENV=test-build yarn test", "test-all":"yarn-s test test-build", "test-watch":"yarn test -w", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", 
"b":"alamode src -o build -s", "d":"NODE_DEBUG=doc doc src/index.js -g", "build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/artdecocode/clean-stack.git"}, "keywords":["@artdeco/clean-stack", "stack", "error", "trace", "internal", "loader", "pirates"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/clean-stack/issues"}, 
"homepage":"https://github.com/artdecocode/clean-stack#readme", "devDependencies":{"alamode":"1.6.1", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}};
var module$node_modules$indicatrix$build$index = {};
module$node_modules$indicatrix$build$index.default = async function(text, promise, options = {}) {
  const {interval = 250, writable = process.stdout} = options;
  const p = typeof promise == "function" ? promise() : promise;
  const write = writable.write.bind(writable);
  let i = 1;
  const getText = () => `${text}${".".repeat(i)}`;
  const clear = () => write(`\r${" ".repeat(text.length + 3)}\r`);
  let s = getText();
  write(s);
  const int = setInterval(() => {
    i = (i + 1) % 4;
    s = getText();
    clear();
    write(s);
  }, interval);
  try {
    const res = await p;
    return res;
  } finally {
    clearInterval(int);
    clear();
  }
};
var module$node_modules$catchment$node_modules$$artdeco$clean_stack$package_json = {"name":"@artdeco/clean-stack", "version":"1.0.1", "description":"A utility to remove internal Node.js lines and specific modules from error stacks.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "test-build":"ALAMODE_ENV=test-build yarn test", "test-all":"yarn-s test test-build", "test-watch":"yarn test -w", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", 
"b":"alamode src -o build -s", "d":"NODE_DEBUG=doc doc src/index.js -g", "build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/artdecocode/clean-stack.git"}, "keywords":["@artdeco/clean-stack", "stack", "error", "trace", "internal", "loader", "pirates"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/clean-stack/issues"}, 
"homepage":"https://github.com/artdecocode/clean-stack#readme", "devDependencies":{"alamode":"1.6.1", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}};
var module$node_modules$spawncommand$node_modules$erotic$build$lib = {default:{}};
const getLastItem$$module$node_modules$spawncommand$node_modules$erotic$build$lib = (array) => {
  const item = array[array.length - 1];
  return item;
};
const getItemsFrom$$module$node_modules$spawncommand$node_modules$erotic$build$lib = (array, from) => array.slice(from);
module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getStackSegment = (stack, from = 0, oneLine = false) => {
  if (from === 0 && !oneLine) {
    return stack;
  }
  const splitStack = stack.split("\n", oneLine ? from + 1 : Number.Infinity);
  if (oneLine) {
    const line = getLastItem$$module$node_modules$spawncommand$node_modules$erotic$build$lib(splitStack);
    return line;
  } else {
    const items = getItemsFrom$$module$node_modules$spawncommand$node_modules$erotic$build$lib(splitStack, from);
    return items.join("\n");
  }
};
module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getEntryStack = (stack, transparent) => {
  const stackSegment = (0,module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getStackSegment)(stack, 2 + (transparent ? 1 : 0));
  return stackSegment;
};
module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getCalleeStackLine = (stack) => {
  const calleeStackLine = (0,module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getStackSegment)(stack, 2, true);
  return calleeStackLine;
};
module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getStackHeading = (message) => `Error: ${message}`;
module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getCallerFromArguments = (args) => {
  const {callee:{caller}} = args;
  return caller;
};
var module$node_modules$spawncommand$node_modules$erotic$build$callback = {default:{}};
module$node_modules$spawncommand$node_modules$erotic$build$callback.default.makeCallback = function(entryCaller, entryStack, shadow = false) {
  function cb(messageOrError) {
    const caller = (0,module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getCallerFromArguments)(arguments);
    const {stack:errorStack} = new Error;
    const calleeStackLine = (0,module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getCalleeStackLine)(errorStack);
    const isError = messageOrError instanceof Error;
    const message = isError ? messageOrError.message : messageOrError;
    const stackHeading = (0,module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getStackHeading)(message);
    const entryHasCallee = caller !== null && entryCaller === caller;
    const stackMessage = [stackHeading, ...entryHasCallee || shadow ? [entryStack] : [calleeStackLine, entryStack]].join("\n");
    const stack = (0,module$node_modules$$artdeco$clean_stack$build$index.default)(stackMessage);
    const properties = {message, stack};
    const e = isError ? messageOrError : new Error;
    return Object.assign(e, properties);
  }
  return cb;
};
let cleanStack$$module$node_modules$spawncommand$node_modules$erotic$build$callback = module$node_modules$$artdeco$clean_stack$build$index.default;
if (module$node_modules$$artdeco$clean_stack$build$index.default && module$node_modules$$artdeco$clean_stack$build$index.default.__esModule) {
  module$node_modules$$artdeco$clean_stack$build$index.default = module$node_modules$$artdeco$clean_stack$build$index.default.default;
}
const {getCallerFromArguments:getCallerFromArguments$$module$node_modules$spawncommand$node_modules$erotic$build$callback, getCalleeStackLine:getCalleeStackLine$$module$node_modules$spawncommand$node_modules$erotic$build$callback, getStackHeading:getStackHeading$$module$node_modules$spawncommand$node_modules$erotic$build$callback} = module$node_modules$spawncommand$node_modules$erotic$build$lib.default;
var module$node_modules$spawncommand$node_modules$erotic$build$index = {};
module$node_modules$spawncommand$node_modules$erotic$build$index.default = function(transparent) {
  const {stack} = new Error;
  const caller = (0,module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getCallerFromArguments)(arguments);
  const entryStack = (0,module$node_modules$spawncommand$node_modules$erotic$build$lib.default.getEntryStack)(stack, transparent);
  return (0,module$node_modules$spawncommand$node_modules$erotic$build$callback.default.makeCallback)(caller, entryStack, transparent);
};
const {getEntryStack:getEntryStack$$module$node_modules$spawncommand$node_modules$erotic$build$index, getCallerFromArguments:getCallerFromArguments$$module$node_modules$spawncommand$node_modules$erotic$build$index} = module$node_modules$spawncommand$node_modules$erotic$build$lib.default;
const {makeCallback:makeCallback$$module$node_modules$spawncommand$node_modules$erotic$build$index} = module$node_modules$spawncommand$node_modules$erotic$build$callback.default;
var module$node_modules$spawncommand$node_modules$catchment$build$index = {};
const {Writable:Writable$$module$node_modules$spawncommand$node_modules$catchment$build$index} = module$node_modules$stream$index;
let erotic$$module$node_modules$spawncommand$node_modules$catchment$build$index = module$node_modules$spawncommand$node_modules$erotic$build$index.default;
if (module$node_modules$spawncommand$node_modules$erotic$build$index.default && module$node_modules$spawncommand$node_modules$erotic$build$index.default.__esModule) {
  module$node_modules$spawncommand$node_modules$erotic$build$index.default = module$node_modules$spawncommand$node_modules$erotic$build$index.default.default;
}
let cleanStack$$module$node_modules$spawncommand$node_modules$catchment$build$index = module$node_modules$$artdeco$clean_stack$build$index.default;
if (module$node_modules$$artdeco$clean_stack$build$index.default && module$node_modules$$artdeco$clean_stack$build$index.default.__esModule) {
  module$node_modules$$artdeco$clean_stack$build$index.default = module$node_modules$$artdeco$clean_stack$build$index.default.default;
}
function joinBufferData$$module$node_modules$spawncommand$node_modules$catchment$build$index(array) {
  return array.join("");
}
module$node_modules$spawncommand$node_modules$catchment$build$index.default = class extends Writable$$module$node_modules$stream$index {
  constructor({er = (0,module$node_modules$spawncommand$node_modules$erotic$build$index.default)(true), ...options} = {}) {
    super(options);
    const {binary, rs} = options;
    this._caughtData = [];
    this._promise = new Promise((r, j) => {
      this.on("finish", () => {
        let d;
        if (binary) {
          d = Buffer.concat(this._caughtData);
        } else {
          d = joinBufferData$$module$node_modules$spawncommand$node_modules$catchment$build$index(this._caughtData);
        }
        r(d);
        this._caughtData = [];
      });
      this.once("error", (e) => {
        if (e.stack.indexOf("\n") == -1) {
          const err = er(e);
          j(err);
        } else {
          const stack = (0,module$node_modules$$artdeco$clean_stack$build$index.default)(e.stack);
          e.stack = stack;
          j(e);
        }
      });
      if (rs) {
        rs.once("error", (e) => this.emit("error", e));
        rs.pipe(this);
      }
    });
  }
  _write(chunk, encoding, callback) {
    this._caughtData.push(chunk);
    callback();
  }
  get promise() {
    return this._promise;
  }
};
module$node_modules$spawncommand$node_modules$catchment$build$index.default.collect = async(readable, options = {binary:false}) => {
  const {promise} = new module$node_modules$spawncommand$node_modules$catchment$build$index.default({rs:readable, ...options, er:(0,module$node_modules$spawncommand$node_modules$erotic$build$index.default)(true)});
  const res = await promise;
  return res;
};
var module$node_modules$spawncommand$build$index = {};
module$node_modules$spawncommand$build$index.default = function(command, args = [], options = {}) {
  if (!command) {
    throw new Error("Please specify a command to spawn.");
  }
  const proc = spawn$$module$node_modules$child_process$index(command, args, options);
  const promise = getPromise$$module$node_modules$spawncommand$build$index(proc);
  proc.promise = promise;
  proc.spawnCommand = proc.spawnargs.join(" ");
  return proc;
};
module$node_modules$spawncommand$build$index.default.fork = function(mod, args = [], options) {
  if (!mod) {
    throw new Error("Please specify a module to fork");
  }
  const proc = fork$$module$node_modules$child_process$index(mod, args, options);
  const promise = getPromise$$module$node_modules$spawncommand$build$index(proc);
  proc.promise = promise;
  proc.spawnCommand = proc.spawnargs.join(" ");
  return proc;
};
const {spawn:spawn$$module$node_modules$spawncommand$build$index, fork:forkCp$$module$node_modules$spawncommand$build$index} = module$node_modules$child_process$index;
const {collect:collect$$module$node_modules$spawncommand$build$index} = module$node_modules$spawncommand$node_modules$catchment$build$index.default;
const getPromise$$module$node_modules$spawncommand$build$index = async(proc) => {
  const [code, stdout, stderr] = await Promise.all([new Promise((resolve, reject) => {
    proc.on("error", reject).on("exit", (code) => {
      resolve(code);
    });
  }), proc.stdout ? (0,module$node_modules$spawncommand$node_modules$catchment$build$index.default.collect)(proc.stdout) : undefined, proc.stderr ? (0,module$node_modules$spawncommand$node_modules$catchment$build$index.default.collect)(proc.stderr) : undefined]);
  return {code, stdout, stderr};
};
var module$node_modules$erotic$package_json = {"name":"erotic", "version":"2.0.2", "description":"Capture error stacks in asynchronous functions at the point of call.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "test-build":"ALAMODE_ENV=test-build yarn test", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "b":"alamode src -o build -i hide.js -s", "build":"yarn-s doc b", "e":"node example", "example/message.js":"yarn e example/message", 
"example/error.js":"yarn e example/error", "example/transparent.js":"yarn e example/transparent", "example/read-file.js":"yarn e example/read-file", "example/erotic.js":"yarn e example/erotic"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/artdecocode/erotic.git"}, "keywords":["error", "stack", "throw", "preserve", "line", "column", "internal", "node", "reject", "transparent", "proxy", "hide"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/erotic/issues"}, 
"homepage":"https://github.com/artdecocode/erotic#readme", "devDependencies":{"alamode":"1.6.1", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "noddy":"1.1.1", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"@artdeco/clean-stack":"1.0.1"}};
var module$node_modules$catchment$package_json = {"name":"catchment", "version":"3.2.1", "description":"Collect Node.js Stream Data Into Catchment: Stream With Promise Property Resolved On Finish.", "main":"build", "module":"src/index.js", "files":["build", "src"], "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "test-build":"ALAMODE_ENV=test-build yarn test", "test-examples/":"ZOROASTER_TIMEOUT=5000 zoroaster test-examples/spec -b", "b":"alamode src -o build -s", "d":"doc src/index.js -g", 
"doc":"NODE_DEBUG=doc doc documentary -o README.md", "build":"yarn-s doc b", "e":"node example", "example/catchment.js":"yarn e example/catchment", "example/binary.js":"yarn e example/binary", "example/rs.js":"yarn e example/rs"}, "repository":{"type":"git", "url":"git+https://github.com/artdecocode/catchment.git"}, "keywords":["stream", "buffer", "collect", "readable", "read", "memory", "writable", "promise", "data", "resolve"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/catchment/issues"}, 
"homepage":"https://catchment.page", "devDependencies":{"alamode":"1.6.1", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "frame-of-mind":"1.0.0", "noddy":"1.1.1", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"@artdeco/clean-stack":"1.0.1", "erotic":"2.0.2"}};
var module$node_modules$$wrote$wrote$node_modules$$wrote$read_dir_structure$package_json = {"name":"@wrote/read-dir-structure", "version":"1.0.2", "description":"Reads directory structure.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"zoroaster -a test/spec", "test-build":"ALAMODE_ENV=test-build yarn test", "test-all":"yarn-s test test-build", "test-watch":"yarn test -w", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "e":"node example", 
"example/":"yarn e example/example.js", "b":"alamode src -o build -s", "build":"yarn-s doc b"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/wrote/read-dir-structure.git"}, "keywords":["@wrote", "directory", "dir", "folder", "read", "structure", "tree", "path", "filesystem", "fs", "file", "ls", "stat", "lstat"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/wrote/read-dir-structure/issues"}, "homepage":"https://github.com/wrote/read-dir-structure#readme", 
"devDependencies":{"alamode":"1.6.1", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "snapshot-context":"2.0.4", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"makepromise":"3.0.2"}};
var module$node_modules$$wrote$wrote$node_modules$$wrote$rm$package_json = {"name":"@wrote/rm", "version":"1.1.2", "description":"A package to remove files and directories.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec test/mask", "spec":"yarn t test/spec", "mask":"yarn t test/mask", "test-build":"ALAMODE_ENV=test-build yarn test", "test-all":"yarn-s test test-build", "test-watch":"yarn test -w", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", 
"b":"alamode src -o build -s", "d":"NODE_DEBUG=doc doc src/index.js -g", "build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/wrote/rm.git"}, "keywords":["rm", "wrote", "filesystem", "fs", "files", "file", "directory", "directories", "dir", "dirs", "rimraf", "erase", "trash", "bin", "remove"], "author":"Anton <anton@adc.sh>", 
"license":"MIT", "bugs":{"url":"https://github.com/wrote/rm/issues"}, "homepage":"https://github.com/wrote/rm#readme", "devDependencies":{"@wrote/clone":"1.1.0", "@wrote/ensure-path":"1.0.4", "alamode":"1.6.1", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "temp-context":"2.1.0", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"@wrote/read-dir-structure":"1.0.2", "makepromise":"3.0.2"}};
var module$node_modules$$wrote$wrote$node_modules$$wrote$ensure_path$package_json = {"name":"@wrote/ensure-path", "version":"1.0.5", "description":"Create all directories on the way to the path.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "spec":"yarn t test/spec", "mask":"yarn t test/mask", "test-build":"ALAMODE_ENV=test-build yarn test", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", 
"e":"node example", "example/":"yarn e example/example.js", "b":"alamode src -o build -s", "build":"yarn-s b doc"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/wrote/ensure-path.git"}, "keywords":["@wrote", "path", "ensure", "traverse", "tree", "fs", "filesystem", "directory", "dir", "folder", "file", "mkdir"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/wrote/ensure-path/issues"}, "homepage":"https://github.com/wrote/ensure-path#readme", 
"devDependencies":{"catchment":"3.2.1", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "spawncommand":"2.1.0", "temp-context":"2.1.0", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"makepromise":"3.0.2"}};
var module$node_modules$$wrote$wrote$node_modules$$wrote$write$package_json = {"name":"@wrote/write", "version":"1.0.2", "description":"Write a file to the filesystem.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec test/mask", "spec":"yarn t test/spec", "mask":"yarn t test/mask", "test-build":"ALAMODE_ENV=test-build yarn test", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "b":"alamode src -o build -s", "d":"yarn-s d1", 
"d1":"NODE_DEBUG=doc doc src/index.js -g", "build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/wrote/write.git"}, "keywords":["write", "wrote", "filesystem", "fs", "stream", "data"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/wrote/write/issues"}, "homepage":"https://github.com/wrote/write#readme", 
"devDependencies":{"alamode":"1.6.1", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "temp-context":"2.1.0", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"erotic":"2.0.2"}};
var module$node_modules$$wrote$wrote$node_modules$$wrote$read$package_json = {"name":"@wrote/read", "version":"1.0.2", "description":"Read a file.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "test-build":"ALAMODE_ENV=test-build yarn test", "test-all":"yarn-s test test-build", "test-watch":"yarn test -w", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "b":"alamode src -o build", "d":"NODE_DEBUG=doc doc src/index.js -g", 
"build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/wrote/read.git"}, "keywords":["read", "wrote", "filesystem", "fs", "buffer", "string", "access", "data"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/wrote/read/issues"}, "homepage":"https://github.com/wrote/read#readme", "devDependencies":{"alamode":"1.6.1", 
"documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "temp-context":"2.1.0", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"catchment":"3.2.1"}};
var module$node_modules$argufy$package_json = {"name":"argufy", "version":"1.3.2", "description":"Parse command line arguments to Node.js CLI programs.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "spec":"yarn t test/spec", "mask":"yarn t test/mask", "test-build":"ALAMODE_ENV=test-build yarn t test/spec", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "d":"NODE_DEBUG=doc doc src/index.js -g", "e":"node example", "example/":"yarn e example/example.js", 
"build":"yarn-s d b doc", "b":"alamode src -o build -s"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/artdecocode/argufy.git"}, "keywords":["argufy"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/argufy/issues"}, "homepage":"https://github.com/artdecocode/argufy#readme", "devDependencies":{"alamode":"1.6.1", "documentary":"1.20.1", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}};
var module$node_modules$$wrote$wrote$package_json = {"name":"@wrote/wrote", "version":"1.1.0", "description":"The Collection Of The Methods To Work With The Filesystem.", "main":"build", "module":"src/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec test/mask", "spec":"yarn t test/spec", "mask":"yarn t test/mask", "test-build":"ALAMODE_ENV=test-build yarn test", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "b":"alamode src -o build -s", "d":"yarn-s d1", 
"d1":"NODE_DEBUG=doc doc src/index.js -g", "build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build", "src"], "repository":{"type":"git", "url":"git://github.com/wrote/wrote.git"}, "keywords":["wrote", "wrote"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/wrote/wrote/issues"}, "homepage":"https://github.com/wrote/wrote#readme", "devDependencies":{"alamode":"1.6.1", 
"documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"@wrote/ensure-path":"1.0.5", "@wrote/read":"1.0.2", "@wrote/read-dir-structure":"1.0.2", "@wrote/rm":"1.1.2", "@wrote/write":"1.0.2"}};
var module$node_modules$usually$package_json = {"name":"usually", "version":"1.1.0", "description":"Print usage of a Node.js command-line application.", "main":"build/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec test/mask", "test-build":"ALAMODE_ENV=test-build yarn test", "test-all":"yarn-s test test-build", "test-watch":"yarn test --watch", "lint":"eslint .", "e":"node example", "example/":"yarn e example/example.js", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "d":"yarn-s d1", 
"d1":"doc src/index.js -g", "build":"yarn-s d b doc", "b":"alamode src -o build -s"}, "files":["build"], "repository":{"type":"git", "url":"git://github.com/artdecocode/usually.git"}, "keywords":["cli", "usage", "help", "bin", "binary", "usually"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/usually/issues"}, "homepage":"https://github.com/artdecocode/usually#readme", "devDependencies":{"alamode":"1.6.0", "documentary":"1.20.1", "eslint":"4.19.1", 
"eslint-config-artdeco":"1.0.0", "snapshot-context":"2.0.1", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}};
var module$node_modules$mismatch$package_json = {"name":"mismatch", "version":"1.0.3", "description":"A JavaScript package to return captured groups of a regular expression as an object.", "main":"build/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "test-build":"ALAMODE_ENV=test-build yarn test", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js", 
"example/extra.js":"yarn e example/extra", "build":"yarn-s b doc", "b":"alamode src -o build"}, "files":["build"], "repository":{"type":"git", "url":"git://github.com/artdecocode/mismatch.git"}, "keywords":["mismatch", "regex", "regexp", "re", "exec", "replace", "regular", "expression", "match", "regular expression"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/mismatch/issues"}, "homepage":"https://github.com/artdecocode/mismatch#readme", "devDependencies":{"alamode":"1.5.0", 
"documentary":"1.16.1", "eslint-config-artdeco":"1.0.1", "yarn-s":"1.1.0", "zoroaster":"3.3.0"}};
var module$node_modules$restream$package_json = {"name":"restream", "version":"3.4.1", "description":"Regular Expression Detection & Replacement streams.", "main":"build/index.js", "scripts":{"t":"zoroaster -a", "test":"zoroaster test/spec test/result -a", "test-build":"ALAMODE_ENV=test-build yarn test", "test-examples/":"zoroaster test-examples/spec -a", "build":"yarn-s d doc b", "b":"alamode src -o build -s", "d1":"NODE_DEBUG=doc doc src/index.js -g", "d2":"NODE_DEBUG=doc doc src/lib/markers.js -g", 
"d3":"NODE_DEBUG=doc doc src/Replaceable.js -g", "d4":"NODE_DEBUG=doc doc src/SyncReplaceable.js -g", "d":"yarn-s d1 d2 d3", "e":"node example", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "example/replacer.js":"yarn e example/replacer", "example/replace-stream.js":"yarn e example/replace-stream", "example/Replaceable.js":"yarn e example/Replaceable", "example/restream.js":"yarn e example/restream", "example/context.js":"yarn e example/context", "example/errors.js":"yarn e example/errors", 
"example/catchment.js":"yarn e example/catchment", "example/markers/":"yarn e example/markers"}, "files":["build"], "repository":{"type":"git", "url":"git+https://github.com/artdecocode/restream.git"}, "keywords":["stream", "transform", "regex", "regexp", "re", "exec", "regular", "expression", "string", "update", "replace", "regular expression"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/restream/issues"}, "homepage":"https://github.com/artdecocode/restream#readme", 
"devDependencies":{"alamode":"1.6.0", "catchment":"3.1.1", "documentary":"1.20.1", "eslint-config-artdeco":"1.0.1", "snapshot-context":"2.0.4", "spawncommand":"2.1.0", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "dependencies":{"@artdeco/clean-stack":"1.0.0"}};
var module$node_modules$usually$build$index = {};
module$node_modules$usually$build$index.default = function(config = {}) {
  const {usage = {}, description, line, example} = config;
  const commands = Object.keys(usage);
  const descriptions = Object.values(usage);
  const [commandLength] = commands.reduce(([longestName = 0, longestDescription = 0], name) => {
    const command = usage[name];
    const theLongest = command.split("\n").reduce((acc, c) => {
      if (c.length > acc) {
        return c.length;
      }
      return acc;
    }, 0);
    if (theLongest > longestDescription) {
      longestDescription = theLongest;
    }
    if (name.length > longestName) {
      longestName = name.length;
    }
    return [longestName, longestDescription];
  }, []);
  const pad = (string, length) => {
    const l = length - string.length;
    const ts = " ".repeat(l);
    const s = `${string}${ts}`;
    return s;
  };
  const usa = commands.reduce((acc, command, i) => {
    const value = descriptions[i];
    const vals = value.split("\n");
    const c = pad(command, commandLength);
    const [firstVal, ...otherVals] = vals;
    const firstLine = `${c}\t${firstVal}`;
    const emptyPad = pad("", commandLength);
    const otherLines = otherVals.map((val) => {
      const r = `${emptyPad}\t${val}`;
      return r;
    });
    const res = [...acc, firstLine, ...otherLines];
    return res;
  }, []);
  const USA = usa.map((a) => `\t${a}`);
  const s = [description, `  ${line || ""}`].filter((l) => l ? l.trim() : l).join("\n\n");
  const u = `${s ? `${s}\n` : ""}
${USA.join("\n")}
`;
  if (example) {
    return `${u}
  Example:

    ${example}
`;
  }
  return u;
};
var module$node_modules$$artdeco$clean_stack$package_json = {"name":"@artdeco/clean-stack", "version":"1.0.0", "description":"A utility to remove internal Node.js lines and specific modules from error stacks.", "main":"build/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "test-build":"ALAMODE_ENV=test-build yarn test", "test-all":"yarn-s test test-build", "test-watch":"yarn test -w", "lint":"eslint .", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "b":"alamode src -o build", 
"d":"NODE_DEBUG=doc doc src/index.js -g", "build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build"], "repository":{"type":"git", "url":"git://github.com/artdecocode/clean-stack.git"}, "keywords":["@artdeco/clean-stack", "stack", "error", "trace", "internal", "loader", "pirates"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/clean-stack/issues"}, 
"homepage":"https://github.com/artdecocode/clean-stack#readme", "devDependencies":{"alamode":"1.4.0", "documentary":"1.15.1", "eslint-config-artdeco":"1.0.1", "yarn-s":"1.1.0", "zoroaster":"3.0.4"}};
var module$node_modules$path$package_json = {"name":"path", "module":"index.js", "depack":"v8"};
var module$node_modules$spawncommand$node_modules$erotic$package_json = {"name":"erotic", "version":"2.0.1", "description":"Capture error stacks in asynchronous functions at the point of call.", "main":"build/index.js", "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "test-build":"ALAMODE_ENV=test-build yarn test", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "b":"alamode src -o build -i hide.js", "build":"yarn-s doc b", "e":"node example", "example/message.js":"yarn e example/message", 
"example/error.js":"yarn e example/error", "example/transparent.js":"yarn e example/transparent", "example/read-file.js":"yarn e example/read-file", "example/erotic.js":"yarn e example/erotic"}, "files":["build"], "repository":{"type":"git", "url":"git://github.com/artdecocode/erotic.git"}, "keywords":["error", "stack", "throw", "preserve", "line", "column", "internal", "node", "reject", "transparent", "proxy", "hide"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/erotic/issues"}, 
"homepage":"https://github.com/artdecocode/erotic#readme", "devDependencies":{"alamode":"1.4.0", "documentary":"1.15.1", "eslint-config-artdeco":"1.0.1", "noddy":"1.1.1", "yarn-s":"1.1.0", "zoroaster":"3.1.0"}, "dependencies":{"@artdeco/clean-stack":"1.0.0"}};
var module$node_modules$spawncommand$node_modules$catchment$package_json = {"name":"catchment", "version":"3.1.1", "description":"Collect stream data into a catchment.", "main":"build/index.js", "files":["build"], "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "test-build":"ALAMODE_ENV=test-build yarn test", "test-examples/":"ZOROASTER_TIMEOUT=5000 zoroaster test-examples/spec -b", "b":"alamode src -o build", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "build":"yarn-s doc b", 
"e":"node example", "example/catchment.js":"yarn e example/catchment", "example/binary.js":"yarn e example/binary", "example/rs.js":"yarn e example/rs"}, "repository":{"type":"git", "url":"git+https://github.com/artdecocode/catchment.git"}, "keywords":["stream", "buffer", "collect", "readable", "memory", "writable", "readable", "promise", "data", "resolve"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/catchment/issues"}, "homepage":"https://github.com/artdecocode/catchment#readme", 
"devDependencies":{"alamode":"1.4.0", "documentary":"1.15.1", "eslint-config-artdeco":"1.0.1", "noddy":"1.1.1", "yarn-s":"1.1.0", "zoroaster":"3.1.0"}, "dependencies":{"@artdeco/clean-stack":"1.0.0", "erotic":"2.0.1"}};
var module$node_modules$fs$package_json = {"name":"fs", "module":"index.js", "depack":"v8"};
var module$node_modules$spawncommand$package_json = {"name":"spawncommand", "version":"2.1.0", "description":"Spawn or fork a child process with a promise property resolved on exit with stdout, stderr and code.", "main":"build/index.js", "files":["build"], "scripts":{"t":"zoroaster -a", "test":"yarn t test/spec", "b":"alamode src -o build", "build":"yarn-s d b doc", "d":"doc src/index.js -g", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "test-build":"ALAMODE_ENV=test-build yarn test", "example/spawncommand.js":"node example example/spawncommand", 
"example/fork.js":"node example example/fork", "example/pipe.js":"node example example/pipe"}, "repository":{"type":"git", "url":"git+https://github.com/artdecocode/spawncommand.git"}, "keywords":["spawn", "fork", "async", "child_process", "child process", "ChildProcess", "promise", "stdout", "stderr", "stdio"], "author":"anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/spawncommand/issues"}, "homepage":"https://github.com/artdecocode/spawncommand#readme", "devDependencies":{"alamode":"1.5.0", 
"documentary":"1.18.0", "yarn-s":"1.1.0", "zoroaster":"3.4.1"}, "dependencies":{"catchment":"3.1.1"}};
const exists$$module$src$lib$lib = async(path) => {
  try {
    const ls = await makePromise$$module$node_modules$makepromise$src$index(lstat$$module$node_modules$fs$index, path);
    return ls;
  } catch (err) {
    return null;
  }
};
const getCommand$$module$src$lib$lib = (args, getJs = (js) => js) => {
  const js = [];
  const a = args.join(" ").replace(/--js (\S+)\s*/g, (m, f) => {
    const j = `  --js ${c$$module$node_modules$erte$src$index(getJs(f), "green")}`;
    js.push(j);
    return "";
  }).replace(/--externs (\S+)/g, (m, f) => {
    return `\n  --externs ${c$$module$node_modules$erte$src$index(f, "grey")}`;
  }).replace(/--js_output_file (\S+)/g, (m, f) => {
    return `\n  --js_output_file ${c$$module$node_modules$erte$src$index(f, "red")}`;
  });
  const jss = js.join("\n");
  return `${a}\n${jss}`;
};
const addSourceMap$$module$src$lib$lib = async(path) => {
  const name = basename$$module$node_modules$path$index(path);
  const r = await module$node_modules$$wrote$wrote$src$index.read(path);
  const s = [r, "//" + `# sourceMappingURL=${name}.map`].join("\n");
  await module$node_modules$$wrote$wrote$src$index.write(path, s);
};
const removeStrict$$module$src$lib$lib = async(path) => {
  const r = await module$node_modules$$wrote$wrote$src$index.read(path);
  const s = r.replace(/^'use strict';/m, " ".repeat(13));
  await module$node_modules$$wrote$wrote$src$index.write(path, s);
};
const updateSourceMaps$$module$src$lib$lib = async(path, tempDir) => {
  const map = `${path}.map`;
  const r = await module$node_modules$$wrote$wrote$src$index.read(map);
  const j = JSON.parse(r);
  const {"sources":sources} = j;
  const newSources = sources.map((s) => `/${relative$$module$node_modules$path$index(tempDir, s)}`);
  j.sources = newSources;
  const jj = JSON.stringify(j, null, 2);
  await module$node_modules$$wrote$wrote$src$index.write(map, jj);
};
const checkIfLib$$module$src$lib$lib = (modName) => /^[./]/.test(modName);
var module$src$lib$lib = {};
module$src$lib$lib.exists = exists$$module$src$lib$lib;
module$src$lib$lib.getCommand = getCommand$$module$src$lib$lib;
module$src$lib$lib.addSourceMap = addSourceMap$$module$src$lib$lib;
module$src$lib$lib.removeStrict = removeStrict$$module$src$lib$lib;
module$src$lib$lib.updateSourceMaps = updateSourceMaps$$module$src$lib$lib;
module$src$lib$lib.checkIfLib = checkIfLib$$module$src$lib$lib;
const RE$$module$src$lib$detect$index = /^ *import(?:\s+(?:[^\s,]+)\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+(['"])(.+?)\1/gm;
const RE2$$module$src$lib$detect$index = /^ *import\s+(?:.+?\s*,\s*)?\*\s+as\s+.+?\s+from\s+(['"])(.+?)\1/gm;
const RE3$$module$src$lib$detect$index = /^ *export\s+{(?:[^}]+?)}\s+from\s+(['"])(.+?)\1/gm;
var $jscompDefaultExport$$module$src$lib$detect$index = async(path) => {
  const detected = await detect$$module$src$lib$detect$index(path);
  const filtered = detected.filter((Item, i) => {
    if (Item.internal) {
      const fi = detected.findIndex((IItem) => {
        return IItem.internal == Item.internal;
      });
      return fi == i;
    }
    const ei = detected.findIndex((IItem) => {
      return Item.entry == IItem.entry;
    });
    return ei == i;
  });
  const f = filtered.map((ff) => {
    const {entry, internal} = ff;
    const froms = detected.filter((Item) => {
      if (internal) {
        return internal == Item.internal;
      }
      if (entry) {
        return entry == Item.entry;
      }
    }).map((Item) => Item.from).filter((el, i, a) => a.indexOf(el) == i);
    const newF = {...ff, from:froms};
    return newF;
  });
  return f;
};
const detect$$module$src$lib$detect$index = async(path, cache = {}) => {
  if (path in cache) {
    return [];
  }
  cache[path] = 1;
  const source = await module$node_modules$$wrote$wrote$src$index.read(path);
  const matches = getMatches$$module$src$lib$detect$index(source);
  const requireMatches = getRequireMatches$$module$src$lib$detect$index(source);
  const allMatches = [...matches, ...requireMatches];
  const deps = await calculateDependencies$$module$src$lib$detect$index(path, allMatches);
  const d = deps.map((o) => ({...o, from:path}));
  const entries = deps.filter((Item) => Item.entry && !(Item.entry in cache));
  const discovered = await entries.reduce(async(acc, {entry, hasMain}) => {
    const accRes = await acc;
    const res = await detect$$module$src$lib$detect$index(entry, cache);
    const r = res.map((o) => ({...o, from:o.from ? o.from : entry, ...!o.packageJson && hasMain ? {hasMain} : {}}));
    return [...accRes, ...r];
  }, d);
  return discovered;
};
const calculateDependencies$$module$src$lib$detect$index = async(path, matches) => {
  const dir = dirname$$module$node_modules$path$index(path);
  const proms = matches.map(async(name) => {
    const internal = builtinModules$$module$node_modules$module$index.includes(name);
    if (internal) {
      return {internal:name};
    }
    const isLib = checkIfLib$$module$src$lib$lib(name);
    if (isLib) {
      const entry = await getLibRequire$$module$src$lib$detect$index(path, name);
      const e = await exists$$module$src$lib$lib(entry);
      if (e) {
        return {entry};
      }
    }
    const {entry, packageJson, version, packageName, hasMain} = await findPackageJson$$module$src$lib$detect$index(dir, name);
    return {entry, packageJson, version, name:packageName, ...hasMain ? {hasMain} : {}};
  });
  return await Promise.all(proms);
};
const getLibRequire$$module$src$lib$detect$index = async(source, mod) => {
  let d = join$$module$node_modules$path$index(dirname$$module$node_modules$path$index(source), mod);
  if (mod.endsWith("/")) {
    d = join$$module$node_modules$path$index(d, "index.js");
  } else {
    const stat = await exists$$module$src$lib$lib(d);
    if (!stat) {
      d = `${d}.js`;
    } else {
      if (stat.isDirectory()) {
        d = join$$module$node_modules$path$index(d, "index.js");
      }
    }
  }
  return d;
};
const getMatches$$module$src$lib$detect$index = (source) => {
  const r = module$node_modules$mismatch$build$index.default(RE$$module$src$lib$detect$index, source, ["q", "from"]);
  const r2 = module$node_modules$mismatch$build$index.default(RE2$$module$src$lib$detect$index, source, ["q", "from"]);
  const r3 = module$node_modules$mismatch$build$index.default(RE3$$module$src$lib$detect$index, source, ["q", "from"]);
  const res = [...r, ...r2, ...r3].map((a) => a["from"]);
  return res;
};
const getRequireMatches$$module$src$lib$detect$index = (source) => {
  const m = module$node_modules$mismatch$build$index.default(/(?:^|\s+)require\((['"])(.+?)\1\)/gm, source, ["q", "from"]);
  const res = m.map((a) => a["from"]);
  return res;
};
const findPackageJson$$module$src$lib$detect$index = async(dir, name) => {
  const fold = join$$module$node_modules$path$index(dir, "node_modules", name);
  const path = join$$module$node_modules$path$index(fold, "package.json");
  const e = await exists$$module$src$lib$lib(path);
  if (e) {
    const res = await findEntry$$module$src$lib$detect$index(path);
    if (res === undefined) {
      throw new Error(`The package ${relative$$module$node_modules$path$index("", path)} does export the module.`);
    } else {
      if (res === null) {
        throw new Error(`The exported module in package ${name} does not exist.`);
      }
    }
    const {entry, version, packageName, main} = res;
    return {entry:relative$$module$node_modules$path$index("", entry), packageJson:relative$$module$node_modules$path$index("", path), version, packageName, ...main ? {hasMain:true} : {}};
  }
  if (dir == "/" && !e) {
    throw new Error(`Package.json for module ${name} not found.`);
  }
  return findPackageJson$$module$src$lib$detect$index(join$$module$node_modules$path$index(resolve$$module$node_modules$path$index(dir), ".."), name);
};
const findEntry$$module$src$lib$detect$index = async(path) => {
  const f = await module$node_modules$$wrote$wrote$src$index.read(path);
  let mod;
  let version;
  let packageName;
  let main;
  try {
    ({"module":mod, "version":version, "name":packageName, "main":main} = JSON.parse(f));
  } catch (err) {
    throw new Error(`Could not parse ${path}.`);
  }
  const resolved = mod || main;
  if (!resolved) {
    return undefined;
  }
  let entry = join$$module$node_modules$path$index(dirname$$module$node_modules$path$index(path), resolved);
  const stat = await exists$$module$src$lib$lib(entry);
  if (!stat) {
    return null;
  }
  if (stat.isDirectory()) {
    const tt = join$$module$node_modules$path$index(entry, "index.js");
    const e2 = await exists$$module$src$lib$lib(tt);
    if (!e2) {
      return null;
    }
    entry = tt;
  }
  return {entry, version, packageName, main:!mod && main};
};
const sort$$module$src$lib$detect$index = (detected) => {
  const packageJsons = [];
  const commonJsPackageJsons = [];
  const commonJs = [];
  const js = [];
  const internals = [];
  const deps = [];
  detected.forEach(({packageJson, hasMain, name, entry, internal}) => {
    if (internal) {
      return internals.push(internal);
    }
    if (packageJson && hasMain) {
      commonJsPackageJsons.push(packageJson);
    } else {
      if (packageJson) {
        packageJsons.push(packageJson);
      }
    }
    if (entry && hasMain) {
      commonJs.push(entry);
    } else {
      if (entry) {
        js.push(entry);
      }
    }
    if (name) {
      deps.push(name);
    }
  });
  return {commonJsPackageJsons, packageJsons, commonJs, js, internals, deps};
};
const getWrapper$$module$src$lib$detect$index = (internals) => {
  if (!internals.length) {
    return;
  }
  const wrapper = internals.map((i) => {
    const m = i == "module" ? "_module" : i;
    return `const ${m} = r` + `equire('${i}');`;
  }).join("\n") + "\n%output%";
  return `#!/usr/bin/env node\n${wrapper}`;
};
var module$src$lib$detect$index = {};
module$src$lib$detect$index.default = $jscompDefaultExport$$module$src$lib$detect$index;
module$src$lib$detect$index.detect = detect$$module$src$lib$detect$index;
module$src$lib$detect$index.getLibRequire = getLibRequire$$module$src$lib$detect$index;
module$src$lib$detect$index.getMatches = getMatches$$module$src$lib$detect$index;
module$src$lib$detect$index.getRequireMatches = getRequireMatches$$module$src$lib$detect$index;
module$src$lib$detect$index.findPackageJson = findPackageJson$$module$src$lib$detect$index;
module$src$lib$detect$index.findEntry = findEntry$$module$src$lib$detect$index;
module$src$lib$detect$index.sort = sort$$module$src$lib$detect$index;
module$src$lib$detect$index.getWrapper = getWrapper$$module$src$lib$detect$index;
const makeError$$module$src$lib$closure = (exitCode, se) => {
  const r = se.split("\n\n");
  const s = r.map((t) => {
    const warn = /^.+?:\d+:(?:\s*Originally at:\s*.+?)? WARNING -/.test(t);
    if (warn) {
      return c$$module$node_modules$erte$src$index(t, "grey");
    }
    return c$$module$node_modules$erte$src$index(t, "red");
  }).join("\n\n");
  const er = `Exit code ${exitCode}\n${s}`;
  return er;
};
const [VER$$module$src$lib$closure] = process.version.split(".", 1);
const prepareCoreModules$$module$src$lib$closure = async({internals, nodeModulesPath = "node_modules", force = true}) => {
  const corePath = relative$$module$node_modules$path$index("", join$$module$node_modules$path$index(dirname$$module$node_modules$path$index(require.resolve("depack/package.json")), "builtin-modules", VER$$module$src$lib$closure));
  const r = await Promise.all(internals.map(async(name) => {
    const path = join$$module$node_modules$path$index(nodeModulesPath, name);
    const packageJson = join$$module$node_modules$path$index(path, "package.json");
    const index = join$$module$node_modules$path$index(path, "index.js");
    const ret = {packageJson, index};
    const e = await exists$$module$src$lib$lib(packageJson);
    if (e && !force) {
      const depackExist = await testDepack$$module$src$lib$closure(packageJson);
      if (depackExist && depackExist == VER$$module$src$lib$closure) {
        return ret;
      } else {
        throw new Error(`Could not prepare core module ${name}: ${path} exists.`);
      }
    }
    await module$node_modules$$wrote$wrote$src$index.ensurePath(packageJson);
    await module$node_modules$$wrote$wrote$src$index.write(packageJson, JSON.stringify({name, module:"index.js", depack:VER$$module$src$lib$closure}));
    const core = await module$node_modules$$wrote$wrote$src$index.read(join$$module$node_modules$path$index(corePath, `${name}.js`));
    await module$node_modules$$wrote$wrote$src$index.write(index, core);
    return ret;
  }));
  return r.reduce((acc, {packageJson, index}) => {
    return [...acc, packageJson, index];
  }, []);
};
const testDepack$$module$src$lib$closure = async(packageJson) => {
  try {
    const testPackage = await module$node_modules$$wrote$wrote$src$index.read(packageJson);
    const {"depack":depack} = JSON.parse(testPackage);
    return depack;
  } catch (err) {
  }
};
const fixDependencies$$module$src$lib$closure = async(deps) => {
  await Promise.all(deps.map(async(dep) => {
    const f = await module$node_modules$$wrote$wrote$src$index.read(dep);
    const p = JSON.parse(f);
    const {"main":main} = p;
    const j = join$$module$node_modules$path$index(dirname$$module$node_modules$path$index(dep), main);
    const e = await exists$$module$src$lib$lib(j);
    if (!e) {
      throw new Error(`The main for dependency ${dep} does not exist.`);
    }
    if (e.isDirectory()) {
      const newMain = join$$module$node_modules$path$index(main, "index.js");
      p.main = newMain;
      console.warn("Updating %s to point to a file.", dep);
      await module$node_modules$$wrote$wrote$src$index.write(dep, JSON.stringify(p, null, 2));
    }
  }));
};
var module$src$lib$closure = {};
module$src$lib$closure.makeError = makeError$$module$src$lib$closure;
module$src$lib$closure.prepareCoreModules = prepareCoreModules$$module$src$lib$closure;
module$src$lib$closure.fixDependencies = fixDependencies$$module$src$lib$closure;
const processFile$$module$src$lib$index = async(entry, config, cache) => {
  const {cachedNodeModules, cachedFiles} = cache;
  const {tempDir} = config;
  const source = await module$node_modules$$wrote$wrote$src$index.read(entry);
  const transpiled = entry.endsWith(".jsx") ? $jscompDefaultExport$$module$node_modules$$a_la$jsx$src$index(source, {quoteProps:true}) : source;
  const dir = relative$$module$node_modules$path$index("", dirname$$module$node_modules$path$index(entry));
  const to = join$$module$node_modules$path$index(tempDir, dir);
  const data = {path:entry, deps:[], nodeModules:[], to};
  const rs = new module$node_modules$restream$build$index.Replaceable([{re:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, replacement:replacement$$module$src$lib$index}]);
  Object.assign(rs, data);
  rs.end(transpiled);
  const transformed = await collect$$module$node_modules$catchment$src$index(rs);
  const tto = join$$module$node_modules$path$index(tempDir, entry);
  await module$node_modules$$wrote$wrote$src$index.ensurePath(tto);
  await module$node_modules$$wrote$wrote$src$index.write(tto, transformed);
  const depPaths = data.deps.map((d) => join$$module$node_modules$path$index(dir, d)).filter((d) => !(d in cachedFiles));
  const nodeModules = data.nodeModules.map((d) => relative$$module$node_modules$path$index("", d)).filter((d) => !(d in cachedNodeModules));
  nodeModules.forEach((nm) => {
    cachedNodeModules[nm] = 1;
  });
  depPaths.forEach((dp) => {
    cachedFiles[dp] = 1;
  });
  await depPaths.reduce(async(acc, depPath) => {
    await acc;
    await processFile$$module$src$lib$index(depPath, config, cache);
  }, {});
};
const generateTemp$$module$src$lib$index = async(entry, config = {}) => {
  const {tempDir = "depack-temp"} = config;
  const cache = {cachedFiles:{[relative$$module$node_modules$path$index("", entry)]:1}, cachedNodeModules:{}};
  await processFile$$module$src$lib$index(entry, {tempDir}, cache);
  const tempFiles = Object.keys(cache.cachedFiles).map((f) => join$$module$node_modules$path$index(tempDir, f));
  return [...tempFiles, ...Object.keys(cache.cachedNodeModules)];
};
async function replacement$$module$src$lib$index(m, pre, from) {
  if (checkIfLib$$module$src$lib$lib(from)) {
    const dep = await resolveDependency$$module$src$lib$index(this.path, from);
    this.deps.push(dep);
    return `${pre}'${dep}'`;
  }
  const packageJson = `${from}/package.json`;
  const {module:mod, main} = require(packageJson);
  if (!mod) {
    console.warn("[\u219b] Package %s does not specify module in package.json, will use main.", from);
  }
  if (!mod && !main) {
    throw new Error("No main is available.");
  }
  const mm = mod || main;
  const modPath = require.resolve(`${from}/${mm}`);
  this.nodeModules.push(modPath);
  const modRel = relative$$module$node_modules$path$index(this.to, modPath);
  return `${pre}'${modRel}'`;
}
const resolveDependency$$module$src$lib$index = async(path, from) => {
  if (/\.jsx?$/.test(from)) {
    return from;
  }
  const dir = dirname$$module$node_modules$path$index(path);
  const js = `${from}.js`;
  const jse = await exists$$module$src$lib$lib(join$$module$node_modules$path$index(dir, js));
  if (jse) {
    return js;
  }
  const jsx = `${from}.jsx`;
  const jsxe = await exists$$module$src$lib$lib(join$$module$node_modules$path$index(dir, jsx));
  if (!jsxe) {
    throw new Error(`Neither JS nor JSX files are found for ${from} in ${path}`);
  }
  return jsx;
};
var module$src$lib$index = {};
module$src$lib$index.generateTemp = generateTemp$$module$src$lib$index;
module$src$lib$index.resolveDependency = resolveDependency$$module$src$lib$index;
const externsDeps$$module$src$bin$commands$compile = {fs:["events", "stream"], stream:["events"], child_process:["events", "stream"]};
const Compile$$module$src$bin$commands$compile = async(opts, options) => {
  const {src, noWarnings = false, output, noStrict, verbose, compilerVersion} = opts;
  if (!src) {
    throw new Error("Source is not given.");
  }
  const args = [...options, "--module_resolution", "NODE", "--package_json_entry_names", "module,main"];
  const detected = await $jscompDefaultExport$$module$src$lib$detect$index(src);
  const sorted = sort$$module$src$lib$detect$index(detected);
  const {commonJs, commonJsPackageJsons, internals, js, packageJsons} = sorted;
  const internalDeps = await prepareCoreModules$$module$src$lib$closure({internals});
  const externs = await getExterns$$module$src$bin$commands$compile(internals);
  await fixDependencies$$module$src$lib$closure(commonJsPackageJsons);
  const files = [src, ...commonJsPackageJsons, ...packageJsons, ...js, ...commonJs, ...internalDeps].sort((a, b) => {
    if (a.startsWith("node_modules")) {
      return -1;
    }
    if (b.startsWith("node_modules")) {
      return 1;
    }
  });
  const wrapper = getWrapper$$module$src$lib$detect$index(internals);
  const Args = [...args, ...externs, ...commonJs.length ? ["--process_common_js_modules"] : [], ...wrapper ? ["--output_wrapper", wrapper] : [], "--js", ...files];
  verbose ? console.log(Args.join(" ")) : printCommand$$module$src$bin$commands$compile(args, externs, sorted);
  const {promise} = module$node_modules$spawncommand$build$index.default("java", Args);
  const {stdout, stderr, code} = await module$node_modules$indicatrix$build$index.default(`Running Google Closure Compiler ${c$$module$node_modules$erte$src$index(compilerVersion, "grey")}`, promise, {writable:process.stderr});
  if (code) {
    throw new Error(makeError$$module$src$lib$closure(code, stderr));
  }
  if (stdout) {
    console.log(stdout);
  }
  if (output) {
    await addSourceMap$$module$src$lib$lib(output);
  }
  if (noStrict) {
    await removeStrict$$module$src$lib$lib(output);
  }
  if (output) {
    await makePromise$$module$node_modules$makepromise$src$index(chmod$$module$node_modules$fs$index, [output, "755"]);
  }
  if (stderr && !noWarnings) {
    console.warn(c$$module$node_modules$erte$src$index(stderr, "grey"));
  }
};
const printCommand$$module$src$bin$commands$compile = (args, externs, sorted) => {
  const s = [...args, ...externs].join(" ").replace(/--js_output_file (\S+)/g, (m, f) => {
    return `--js_output_file ${c$$module$node_modules$erte$src$index(f, "red")}`;
  }).replace(/--externs (\S+)/g, (m, f) => {
    return `--externs ${c$$module$node_modules$erte$src$index(f, "grey")}`;
  }).replace(/--compilation_level (\S+)/g, (m, f) => {
    return `--compilation_level ${c$$module$node_modules$erte$src$index(f, "green")}`;
  });
  console.log(s);
  const {commonJs, internals, js, deps} = sorted;
  const fjs = js.filter(filterNodeModule$$module$src$bin$commands$compile);
  const cjs = commonJs.filter(filterNodeModule$$module$src$bin$commands$compile);
  if (deps.length) {
    console.log("%s: %s", c$$module$node_modules$erte$src$index("Dependencies", "yellow"), deps.join(" "));
  }
  if (fjs.length) {
    console.log("%s: %s", c$$module$node_modules$erte$src$index("Modules", "yellow"), fjs.join(" "));
  }
  if (cjs.length) {
    console.log("%s: %s", c$$module$node_modules$erte$src$index("CommonJS", "yellow"), cjs.join(" "));
  }
  if (internals.length) {
    console.log("%s: %s", c$$module$node_modules$erte$src$index("Built-ins", "yellow"), internals.join(", "));
  }
};
const filterNodeModule$$module$src$bin$commands$compile = (entry) => {
  return !entry.startsWith("node_modules");
};
const getExterns$$module$src$bin$commands$compile = async(internals) => {
  const depack = relative$$module$node_modules$path$index("", dirname$$module$node_modules$path$index(require.resolve("depack/package.json")));
  const externsDir = join$$module$node_modules$path$index(depack, "externs");
  const allInternals = internals.reduce((acc, i) => {
    const deps = externsDeps$$module$src$bin$commands$compile[i] || [];
    return [...acc, i, ...deps];
  }, []).filter((e, i, a) => a.indexOf(e) == i);
  const p = [...allInternals, "node"].map((i) => join$$module$node_modules$path$index(externsDir, `${i}.js`));
  await Promise.all(p.map(async(pp) => {
    const exist = await exists$$module$src$lib$lib(pp);
    if (!exist) {
      throw new Error(`Externs ${pp} don't exist.`);
    }
  }));
  const externs = p.reduce((acc, e) => {
    return [...acc, "--externs", e];
  }, []);
  return externs;
};
var $jscompDefaultExport$$module$src$bin$commands$compile = Compile$$module$src$bin$commands$compile;
var module$src$bin$commands$compile = {};
module$src$bin$commands$compile.default = $jscompDefaultExport$$module$src$bin$commands$compile;
var module$package_json = {"name":"depack", "version":"0.0.1-alpha", "description":"Front-End Code and Node.js Package Bundler With Google Closure Compiler.", "main":"build", "scripts":{"t":"zoroaster -a -t 60000", "test":"yarn t test/spec test/mask", "spec":"yarn t test/spec", "mask":"yarn t test/mask", "test-build":"ALAMODE_ENV=test-build yarn test", "lint":"eslint .", "dev":"node src/bin", "doc":"NODE_DEBUG=doc doc documentary -o README.md", "b":"alamode src -o build -s", "depack":"yarn dev src/bin/depack.js -c -I 2018 -O 2018 -a -o build/depack.js -w --formatting PRETTY_PRINT", 
"d":"yarn-s d1 d2 d3", "depack2":"DEBUG=1 node depack.js src/bin/depack.js -c -I 2018 -O 2018 -o depack2.js -a --formatting PRETTY_PRINT", "d1":"NODE_DEBUG=doc doc src/index.js -g", "d2":"NODE_DEBUG=doc doc src/lib/closure.js -g", "d3":"NODE_DEBUG=doc doc src/bin/commands/bundle.js -g", "build":"yarn-s d b doc", "rec":"NODE_DEBUG=appshot appshot -T 23 -a Terminal -y 150 -f", "e":"node example", "example/":"yarn e example/example.js"}, "files":["build", "builtin-modules", "externs"], "bin":{"depack":"build/depack.js", 
"depack-dev":"src/bin/index.js"}, "repository":{"type":"git", "url":"git://github.com/artdecocode/depack.git"}, "keywords":["depack", "packager", "bundler", "frontend", "webpack", "rollup", "browserify"], "author":"Anton <anton@adc.sh>", "license":"MIT", "bugs":{"url":"https://github.com/artdecocode/depack/issues"}, "homepage":"https://github.com/artdecocode/depack#readme", "devDependencies":{"@a-la/jsx":"1.1.4", "@wrote/wrote":"1.1.0", "alamode":"1.6.1", "argufy":"1.3.2", "catchment":"3.2.1", "documentary":"1.20.1", 
"erotic":"2.0.2", "erte":"1.1.5", "eslint-config-artdeco":"1.0.1", "indicatrix":"1.0.0", "makepromise":"3.0.2", "mismatch":"1.0.3", "preact":"8.4.2", "preact-richtextarea":"1.2.1", "restream":"3.4.1", "snapshot-context":"2.0.4", "spawncommand":"2.1.0", "temp-context":"2.1.0", "usually":"1.1.0", "yarn-s":"1.1.0", "zoroaster":"3.6.6"}, "peerDependencies":{"google-closure-compiler-java":"*"}};
var $jscompDefaultExport$$module$src$bin$usage = () => {
  const common = module$node_modules$usually$build$index.default({line:"depack SOURCE [-c] [-o output.js] [-IO 2018] [-awVvh] [-l LEVEL] [... --generic-args]", usage:{"SOURCE":"The source file to build.", "--output -o":"Where to save the output. STDOUT by default.", "--language_in -I":"Language Input. Can pass ECMA year.", "--language_out -O":"Language Output. Can pass ECMA year.", "--level -l":`The optimisation level (generic -O).
WHITESPACE, SIMPLE (default), ADVANCED`, "--advanced -a":"Turn on advanced optimisation.", "--no-warnings -w":"Don't print warnings.", "--compile -c":"Set the mode to compilation.", "--verbose -V":"Print all compiler arguments.", "--version -v":"Show version.", "--help -h":"Print help information."}});
  const backend = module$node_modules$usually$build$index.default({line:"depack SOURCE -c [-o output.js] [-s]", example:"depack source.js -c -o bundle.js -n -I 2018 -O 2018", usage:{"--no-strict -s":'Remove "use strict" from the output.'}});
  const usage = `Google Closure Compiler-based packager for front and back-end.
https://github.com/artdecocode/depack
Performs static analysis on the source files to find out all dependencies.
Generic flags: https://github.com/google/closure-compiler/wiki/Flags-and-Options

${common}
${c$$module$node_modules$erte$src$index("BACKEND", "blue")}: Creates a single executable file.
${backend}`;
  return usage;
};
var module$src$bin$usage = {};
module$src$bin$usage.default = $jscompDefaultExport$$module$src$bin$usage;
const Bundle$$module$src$bin$commands$bundle = async(opts, options) => {
  const {src, tempDir = "depack-temp", noWarnings = false, output:path} = opts;
  if (!src) {
    throw new Error("Entry file is not given.");
  }
  if (!path) {
    throw new Error("Destination path is not given.");
  }
  const deps = await generateTemp$$module$src$lib$index(src, {tempDir});
  const Args = [...options, ...deps.reduce((acc, d) => {
    return [...acc, "--js", d];
  }, [])];
  const {promise} = module$node_modules$spawncommand$build$index.default("java", Args);
  const a = getCommand$$module$src$lib$lib(Args, (js) => js.startsWith(tempDir) ? relative$$module$node_modules$path$index(tempDir, js) : js);
  console.log(a);
  const {stdout, stderr, code} = await module$node_modules$indicatrix$build$index.default("Running Google Closure Compiler", promise);
  if (code) {
    throw new Error(makeError$$module$src$lib$closure(code, stderr));
  }
  await addSourceMap$$module$src$lib$lib(path);
  await updateSourceMaps$$module$src$lib$lib(path, tempDir);
  if (stdout) {
    console.log(stdout);
  }
  if (stderr && !noWarnings) {
    console.warn(c$$module$node_modules$erte$src$index(stderr, "grey"));
  }
  await module$node_modules$$wrote$wrote$src$index.rm(tempDir);
};
var $jscompDefaultExport$$module$src$bin$commands$bundle = Bundle$$module$src$bin$commands$bundle;
var module$src$bin$commands$bundle = {};
module$src$bin$commands$bundle.default = $jscompDefaultExport$$module$src$bin$commands$bundle;
const args$$module$src$bin$get_args = argufy$$module$node_modules$argufy$src$index({"src":{command:true}, "advanced":{short:"a", boolean:true}, "help":{short:"h", boolean:true}, "output":{short:"o"}, "compile":{short:"c", boolean:true}, "version":{short:"v", boolean:true}, "no-warnings":{short:"w", boolean:true}, "level":{short:"l"}, "language_in":{short:"I"}, "language_out":{short:"O"}, "node":{short:"n", boolean:true}, "temp":{}, "no-strict":{short:"s", boolean:true}, "verbose":{short:"V", boolean:true}});
const src$$module$src$bin$get_args = args$$module$src$bin$get_args["src"];
const _help$$module$src$bin$get_args = args$$module$src$bin$get_args["help"];
const _noStrict$$module$src$bin$get_args = args$$module$src$bin$get_args["no-strict"];
const _verbose$$module$src$bin$get_args = args$$module$src$bin$get_args["verbose"];
const _temp$$module$src$bin$get_args = args$$module$src$bin$get_args["temp"];
const _node$$module$src$bin$get_args = args$$module$src$bin$get_args["node"];
const _language_in$$module$src$bin$get_args = args$$module$src$bin$get_args["language_in"];
const _language_out$$module$src$bin$get_args = args$$module$src$bin$get_args["language_out"];
const _level$$module$src$bin$get_args = args$$module$src$bin$get_args["level"];
const _argv$$module$src$bin$get_args = args$$module$src$bin$get_args._argv;
const _compile$$module$src$bin$get_args = args$$module$src$bin$get_args["compile"];
const _noWarnings$$module$src$bin$get_args = args$$module$src$bin$get_args["no-warnings"];
const version$$module$src$bin$get_args = args$$module$src$bin$get_args["version"];
const _advanced$$module$src$bin$get_args = args$$module$src$bin$get_args["advanced"];
const output$$module$src$bin$get_args = args$$module$src$bin$get_args["output"];
var module$src$bin$get_args = {};
module$src$bin$get_args._src = src$$module$src$bin$get_args;
module$src$bin$get_args._advanced = _advanced$$module$src$bin$get_args;
module$src$bin$get_args._output = output$$module$src$bin$get_args;
module$src$bin$get_args._version = version$$module$src$bin$get_args;
module$src$bin$get_args._noWarnings = _noWarnings$$module$src$bin$get_args;
module$src$bin$get_args._compile = _compile$$module$src$bin$get_args;
module$src$bin$get_args._argv = _argv$$module$src$bin$get_args;
module$src$bin$get_args._level = _level$$module$src$bin$get_args;
module$src$bin$get_args._language_in = _language_in$$module$src$bin$get_args;
module$src$bin$get_args._language_out = _language_out$$module$src$bin$get_args;
module$src$bin$get_args._node = _node$$module$src$bin$get_args;
module$src$bin$get_args._temp = _temp$$module$src$bin$get_args;
module$src$bin$get_args._noStrict = _noStrict$$module$src$bin$get_args;
module$src$bin$get_args._verbose = _verbose$$module$src$bin$get_args;
module$src$bin$get_args._help = _help$$module$src$bin$get_args;
const compiler$$module$src$bin$depack = require.resolve("google-closure-compiler-java/compiler.jar");
const compilerPackage$$module$src$bin$depack = require.resolve("google-closure-compiler-java/package.json");
if (version$$module$src$bin$get_args) {
  console.log(module$package_json.version);
  process.exit(0);
}
if (_help$$module$src$bin$get_args) {
  console.log($jscompDefaultExport$$module$src$bin$usage());
  process.exit(0);
}
const getLanguage$$module$src$bin$depack = (l) => {
  if (/^\d+$/.test(l)) {
    return `ECMASCRIPT_${l}`;
  }
  return l;
};
const getCompilerOptions$$module$src$bin$depack = ({src, output, level, languageIn, languageOut, sourceMap = true, argv, advanced}) => {
  const options = ["-jar", compiler$$module$src$bin$depack];
  if (level) {
    options.push("--compilation_level", level);
  } else {
    if (advanced) {
      options.push("--compilation_level", "ADVANCED");
    }
  }
  if (languageIn) {
    const lang = getLanguage$$module$src$bin$depack(languageIn);
    options.push("--language_in", lang);
  }
  if (languageOut) {
    const lang = getLanguage$$module$src$bin$depack(languageOut);
    options.push("--language_out", lang);
  }
  if (sourceMap) {
    options.push("--create_source_map", "%outname%.map");
  }
  options.push(...argv);
  if (output$$module$src$bin$get_args) {
    const o = /\.js$/.test(output) ? output : join$$module$node_modules$path$index(output, basename$$module$node_modules$path$index(src));
    options.push("--js_output_file", o);
  }
  return options;
};
(async() => {
  try {
    const compilerPackageJson = await module$node_modules$$wrote$wrote$src$index.read(compilerPackage$$module$src$bin$depack);
    const {"version":cv} = JSON.parse(compilerPackageJson);
    const [compilerVersion] = cv.split(".");
    const options = getCompilerOptions$$module$src$bin$depack({src:src$$module$src$bin$get_args, output:output$$module$src$bin$get_args, level:_level$$module$src$bin$get_args, languageIn:_language_in$$module$src$bin$get_args, languageOut:_language_out$$module$src$bin$get_args, argv:_argv$$module$src$bin$get_args, advanced:_advanced$$module$src$bin$get_args, sourceMap:!!output$$module$src$bin$get_args});
    if (_compile$$module$src$bin$get_args) {
      return await $jscompDefaultExport$$module$src$bin$commands$compile({src:src$$module$src$bin$get_args, noWarnings:_noWarnings$$module$src$bin$get_args, output:output$$module$src$bin$get_args, noStrict:_noStrict$$module$src$bin$get_args, verbose:_verbose$$module$src$bin$get_args, compilerVersion}, options);
    }
    await $jscompDefaultExport$$module$src$bin$commands$bundle({src:src$$module$src$bin$get_args, output:output$$module$src$bin$get_args, tempDir:_temp$$module$src$bin$get_args, noWarnings:_noWarnings$$module$src$bin$get_args, compilerVersion}, options);
  } catch (error) {
    process.env["DEBUG"] ? console.log(error.stack) : console.log(error.message);
  }
})();
var module$src$bin$depack = {};


//# sourceMappingURL=depack.js.map