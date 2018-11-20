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
 * @fileoverview Definitions for node's stream module. Depends on the events module.
 * @see http://nodejs.org/api/stream.html
 * @see https://github.com/joyent/node/blob/master/lib/stream.js
 */

/** @const */
var DEPACK$stream = {}

/**
 * @constructor
 * @param {Object=} options
 * @extends events.EventEmitter
 */
DEPACK$stream.Stream = function(options) {}

/**
 * @param {stream.Writable} dest
 * @param {{end: boolean}=} pipeOpts
 * @return {stream.Writable}
 */
DEPACK$stream.Stream.prototype.pipe

/**
 * @constructor
 * @param {Object=} options
 * @extends stream.Stream
 */
DEPACK$stream.Readable = function(options) {}

/**
 * @type {boolean}
 * @deprecated
 */
DEPACK$stream.Readable.prototype.readable

/**
 * @protected
 * @param {string|Buffer|null} chunk
 * @return {boolean}
 */
DEPACK$stream.Readable.prototype.push

/**
 * @param {string|Buffer|null} chunk
 * @return {boolean}
 */
DEPACK$stream.Readable.prototype.unshift

/**
 * @param {string} enc
 * @return {void}
 */
DEPACK$stream.Readable.prototype.setEncoding

/**
 * @param {number=} n
 * @return {Buffer|string|null}
 */
DEPACK$stream.Readable.prototype.read

/**
 * @protected
 * @param {number} n
 * @return {void}
 */
DEPACK$stream.Readable.prototype._read

/**
 * @param {stream.Writable=} dest
 * @return {stream.Readable}
 */
DEPACK$stream.Readable.prototype.unpipe

/**
 * @return {void}
 */
DEPACK$stream.Readable.prototype.resume

/**
 * @return {void}
 */
DEPACK$stream.Readable.prototype.pause

/**
 * @param {stream.Stream} stream
 * @return {stream.Readable}
 */
DEPACK$stream.Readable.prototype.wrap

/**
 * @constructor
 * @extends stream.Readable
 */
DEPACK$stream.ReadableStream = function() {}

/**
 * @type {boolean}
 */
DEPACK$stream.ReadableStream.prototype.readable

/**
 * @param {string=} encoding
 * @return {void}
 */
DEPACK$stream.ReadableStream.prototype.setEncoding

/**
 * @return {void}
 */
DEPACK$stream.ReadableStream.prototype.destroy

/**
 * @constructor
 * @param {Object=} options
 * @extends stream.Stream
 */
DEPACK$stream.Writable = function(options) {}

/**
 * @deprecated
 * @type {boolean}
 */
DEPACK$stream.Writable.prototype.writable

/**
 * @param {string|Buffer} chunk
 * @param {string=} encoding
 * @param {function(*=)=} cb
 * @return {boolean}
 */
DEPACK$stream.Writable.prototype.write

/**
 * @protected
 * @param {string|Buffer} chunk
 * @param {string} encoding
 * @param {function(*=)} cb
 * @return {void}
 */
DEPACK$stream.Writable.prototype._write

/**
 * @param {string|Buffer=} chunk
 * @param {string=} encoding
 * @param {function(*=)=} cb
 * @return {void}
 */
DEPACK$stream.Writable.prototype.end

/**
 * @constructor
 * @extends stream.Writable
 */
DEPACK$stream.WritableStream = function() {}

/**
 * @return {void}
 */
DEPACK$stream.WritableStream.prototype.drain

/**
 * @type {boolean}
 */
DEPACK$stream.WritableStream.prototype.writable

/**
 * @param {string|Buffer} buffer
 * @param {string=} encoding
 * @return {void}
 */
DEPACK$stream.WritableStream.prototype.write

/**
 * @param {string|Buffer=} buffer
 * @param {string=} encoding
 * @param {function(*=)=} cb
 * @return {void}
 */
DEPACK$stream.WritableStream.prototype.end

/**
 * @return {void}
 */
DEPACK$stream.WritableStream.prototype.destroy

/**
 * @return {void}
 */
DEPACK$stream.WritableStream.prototype.destroySoon

/**
 * @constructor
 * @param {Object=} options
 * @extends stream.Readable
 * Xextends stream.Writable
 */
DEPACK$stream.Duplex = function(options) {}

/**
 * @type {boolean}
 */
DEPACK$stream.Duplex.prototype.allowHalfOpen


/**
 * @param {Object=} options
 * @constructor
 * @extends stream.Duplex
 */
DEPACK$stream.Transform = function(options) {}

/**
 * @protected
 * @param {string|Buffer} chunk
 * @param {string} encoding
 * @param {function(*=)} cb
 * @return {void}
 */
DEPACK$stream.Transform._transform

/**
 * @protected
 * @param {function(*=)} cb
 * @return {void}
 */
DEPACK$stream.Transform._flush

/**
 * @param {Object=} options
 * @constructor
 * @extends stream.Transform
 */
DEPACK$stream.PassThrough = function(options) {}