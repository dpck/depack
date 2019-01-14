/**
 * @constructor
 */
var Buffer = function() {}
Buffer.concat


// interface Buffer extends Uint8Array {
//   constructor: typeof Buffer;
//   write(string: string, offset?: number, length?: number, encoding?: string): number;
//   toString(encoding?: string, start?: number, end?: number): string;
//   toJSON(): { type: 'Buffer', data: any[] };
//   equals(otherBuffer: Uint8Array): boolean;
//   compare(otherBuffer: Uint8Array, targetStart?: number, targetEnd?: number, sourceStart?: number, sourceEnd?: number): number;
//   copy(targetBuffer: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
//   slice(start?: number, end?: number): Buffer;
//   writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
//   writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
//   writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
//   writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
//   readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
//   readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
//   readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
//   readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
//   readUInt8(offset: number, noAssert?: boolean): number;
//   readUInt16LE(offset: number, noAssert?: boolean): number;
//   readUInt16BE(offset: number, noAssert?: boolean): number;
//   readUInt32LE(offset: number, noAssert?: boolean): number;
//   readUInt32BE(offset: number, noAssert?: boolean): number;
//   readInt8(offset: number, noAssert?: boolean): number;
//   readInt16LE(offset: number, noAssert?: boolean): number;
//   readInt16BE(offset: number, noAssert?: boolean): number;
//   readInt32LE(offset: number, noAssert?: boolean): number;
//   readInt32BE(offset: number, noAssert?: boolean): number;
//   readFloatLE(offset: number, noAssert?: boolean): number;
//   readFloatBE(offset: number, noAssert?: boolean): number;
//   readDoubleLE(offset: number, noAssert?: boolean): number;
//   readDoubleBE(offset: number, noAssert?: boolean): number;
//   swap16(): Buffer;
//   swap32(): Buffer;
//   swap64(): Buffer;
//   writeUInt8(value: number, offset: number, noAssert?: boolean): number;
//   writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
//   writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
//   writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
//   writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
//   writeInt8(value: number, offset: number, noAssert?: boolean): number;
//   writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
//   writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
//   writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
//   writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
//   writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
//   writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
//   writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
//   writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;
//   fill(value: any, offset?: number, end?: number): this;
//   indexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: string): number;
//   lastIndexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: string): number;
//   entries(): IterableIterator<[number, number]>;
//   includes(value: string | number | Buffer, byteOffset?: number, encoding?: string): boolean;
//   keys(): IterableIterator<number>;
//   values(): IterableIterator<number>;
// }