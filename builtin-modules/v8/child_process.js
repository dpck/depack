export default child_process
export const {
  'ChildProcess': ChildProcess,
  'exec': exec,
  'execFile': execFile,
  'execFileSync': execFileSync,
  'execSync': execSync,
  'fork': fork,
  'spawn': spawn,
  'spawnSync': spawnSync,
} = child_process