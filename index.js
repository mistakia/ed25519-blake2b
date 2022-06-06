const bindings = require('node-gyp-build')(__dirname)

exports.publicKey = function (secretKey) {
  if (typeof secretKey === 'string') secretKey = Buffer.from(secretKey, 'hex')
  else if (!Buffer.isBuffer(secretKey)) {
    throw new Error('secret key must be a buffer or hex string')
  }

  const publicKey = Buffer.alloc(32)
  bindings.node_publickey(secretKey, publicKey)
  return publicKey
}

exports.sign = function (message, secretKey, publicKey) {
  if (typeof message === 'string') message = Buffer.from(message)
  else if (!Buffer.isBuffer(message)) {
    throw new Error('message must be a buffer or a string')
  }

  if (typeof publicKey === 'string') publicKey = Buffer.from(publicKey, 'hex')
  else if (!Buffer.isBuffer(publicKey)) {
    throw new Error('public key must be a buffer or hex string')
  }

  if (typeof secretKey === 'string') secretKey = Buffer.from(secretKey, 'hex')
  else if (!Buffer.isBuffer(secretKey)) {
    throw new Error('secret key must be a buffer or hex string')
  }

  const sig = Buffer.alloc(64)
  bindings.node_sign(message, secretKey, publicKey, sig)
  return sig
}

exports.verify = function (signature, message, publicKey) {
  if (typeof signature === 'string') signature = Buffer.from(signature, 'hex')
  else if (!Buffer.isBuffer(signature)) {
    throw new Error('message must be a buffer or a string')
  }

  if (typeof message === 'string') message = Buffer.from(message)
  else if (!Buffer.isBuffer(message)) {
    throw new Error('message must be a buffer or a string')
  }

  if (typeof publicKey === 'string') publicKey = Buffer.from(publicKey, 'hex')
  else if (!Buffer.isBuffer(publicKey)) {
    throw new Error('public key must be a buffer or hex string')
  }

  return bindings.node_verify(signature, message, publicKey) === 0
}

exports.hash = function (message, length = 32) {
  if (typeof message === 'string') message = Buffer.from(message)
  else if (!Buffer.isBuffer(message)) {
    throw new Error('message must be a buffer or a string')
  }

  const output = Buffer.alloc(length)
  bindings.node_hash(message, output)
  return output
}
