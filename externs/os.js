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
 * @fileoverview Definitions for node's os module.
 * @see http://nodejs.org/api/os.html
 * @externs
 */

/** @const */
var DEPACK$os = {}

/**
 * @return {string}
 * @nosideeffects
 */
DEPACK$os.homedir

/**
 * @return {string}
 * @nosideeffects
 */
DEPACK$os.tmpdir

/**
 * @return {string}
 * @nosideeffects
 */
DEPACK$os.hostname

/**
 * @return {string}
 * @nosideeffects
 */
DEPACK$os.type

/**
 * @return {string}
 * @nosideeffects
 */
DEPACK$os.platform

/**
 * @return {string}
 * @nosideeffects
 */
DEPACK$os.arch

/**
 * @return {string}
 * @nosideeffects
 */
DEPACK$os.release

/**
 * @return {number}
 * @nosideeffects
 */
DEPACK$os.uptime

/**
 * @return {Array.<number>}
 * @nosideeffects
 */
DEPACK$os.loadavg

/**
 * @return {number}
 * @nosideeffects
 */
DEPACK$os.totalmem

/**
 * @return {number}
 * @nosideeffects
 */
DEPACK$os.freemem

/**
 * @typedef {{model: string, speed: number, times: {user: number, nice: number, sys: number, idle: number, irg: number}}}
 */
var osCpusInfo

/**
 * @return {Array.<osCpusInfo>}
 * @nosideeffects
 */
DEPACK$os.cpus

/**
 * @typedef {{address: string, family: string, internal: boolean}}
 */
var osNetworkInterfacesInfo

/**
 * @return {Object.<string,osNetworkInterfacesInfo>}
 * @nosideeffects
 */
DEPACK$os.networkInterfaces

/**
 * @type {string}
 */
DEPACK$os.EOL