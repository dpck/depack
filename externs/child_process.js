// import { ForkOptions } from 'child_process'
/*
 * Copyright 2012 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Definitions for node's child_process module. Depends on the
 *     events module.
 * @externs
 * @see http://nodejs.org/api/child_process.html
 * @see https://github.com/joyent/node/blob/master/lib/child_process.js
 */

// those need require programmatically
// var events = require('events')
// var stream = require('stream')

/**
 * @const
 */
var DEPACK$child_process = {}

/**
 * @constructor
 * @param {...*} var_args
 * @extends events.EventEmitter
 */
DEPACK$child_process.ChildProcess = function(var_args) {} // eslint-disable-line
// Private?

/**
 * @type {stream.ReadableStream}
 */
DEPACK$child_process.ChildProcess.prototype.stdin

/**
 * @type {stream.WritableStream}
 */
DEPACK$child_process.ChildProcess.prototype.stdout

/**
 * @type {stream.WritableStream}
 */
DEPACK$child_process.ChildProcess.prototype.stderr

/**
 * @type {number}
 */
DEPACK$child_process.ChildProcess.prototype.pid

/**
 * @param {string=} signal
 * @return {void}
 */
DEPACK$child_process.ChildProcess.prototype.kill

/**
 * @param {Object.<string,*>} message
 * @param {*} sendHandle
 * @return {void}
 */
DEPACK$child_process.ChildProcess.prototype.send

/**
 * @return {void}
 */
DEPACK$child_process.ChildProcess.prototype.disconnect

/**
 * @typedef {{cwd: string, stdio: (Array|string), customFds: Array, env: Object.<string,*>, detached: boolean, uid: number, gid: number, encoding: string, timeout: number, maxBuffer: number, killSignal: string}}
 */
DEPACK$child_process.Options

/**
 * @typedef {{cwd: string, env: Object.<string,*>, execPath: string, execArgv: Array<string>, silent: boolean, stdio: (Array|string), windowsVerbatimArguments: boolean, uid: number, gid: number}}
 */
DEPACK$child_process.ForkOptions

/**
 * @param {string} command
 * @param {Array.<string>=} args
 * @param {child_process.Options=} options
 * @return {child_process.ChildProcess}
 */
DEPACK$child_process.ChildProcess.spawn

/**
 * @param {string} command
 * @param {child_process.Options|function(Error, Buffer, Buffer)=} options
 * @param {function(Error, Buffer, Buffer)=} callback
 * @return {child_process.ChildProcess}
 */
DEPACK$child_process.exec

/**
 * @param {string} command
 * @param {child_process.Options} options
 * @return {!Buffer|string}
 */
DEPACK$child_process.execSync

/**
 * @param {string} file
 * @param {Array.<string>} args
 * @param {child_process.Options} options
 * @param {function(Error, Buffer, Buffer)} callback
 * @return {child_process.ChildProcess}
 */
DEPACK$child_process.execFile

/**
 * @param {string} file
 * @param {Array.<string>} args
 * @param {child_process.Options} options
 * @return {!Buffer|string}
 */
DEPACK$child_process.execFileSync

/**
 * @param {string} modulePath
 * @param {Array.<string>=} args
 * @param {child_process.ForkOptions=} options
 * @return {child_process.ChildProcess}
 */
DEPACK$child_process.fork