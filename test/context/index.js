export default class Context {
  static get BIN() {
    return process.env.ALAMODE_ENV == 'test-build' ? 'build/bin/depack' : 'src/bin'
  }
}