const tls = require('tls')

export default tls
export const {
  'CLIENT_RENEG_LIMIT': CLIENT_RENEG_LIMIT,
  'CLIENT_RENEG_WINDOW': CLIENT_RENEG_WINDOW,
  'DEFAULT_CIPHERS': DEFAULT_CIPHERS,
  'DEFAULT_ECDH_CURVE': DEFAULT_ECDH_CURVE,
  'SLAB_BUFFER_SIZE': SLAB_BUFFER_SIZE,
  'SecureContext': SecureContext,
  'Server': Server,
  'TLSSocket': TLSSocket,
  'checkServerIdentity': checkServerIdentity,
  'connect': connect,
  'convertALPNProtocols': convertALPNProtocols,
  'convertNPNProtocols': convertNPNProtocols,
  'createSecureContext': createSecureContext,
  'createSecurePair': createSecurePair,
  'createServer': createServer,
  'getCiphers': getCiphers,
  'parseCertString': parseCertString,
} = tls