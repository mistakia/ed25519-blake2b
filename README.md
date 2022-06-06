# ed25519-blake2b

Node.js bindings for C++/C implementations of ed25519 using BLAKE2b instead of SHA512 as the hash algorithm. The [ed25519-donna](https://github.com/floodyberry/ed25519-donna) and [blake2](https://github.com/BLAKE2/BLAKE2) implementations are used with [a change](https://github.com/nanocurrency/nano-node/pull/1368/files) made to signing by [plasmapower](https://github.com/plasmaPower) to protect the generation of the random scalar from [side channel power attacks](https://eprint.iacr.org/2017/985.pdf).

# Installation

```
yarn add @trashman/ed25519-blake2b
```

```
npm install @trashman/ed25519-blake2b
```

# Usage

```js
const ed25519 = require('@trashman/ed25519-blake2b')

const privateKey = crypto.randomBytes(32)
const publicKey = ed25519.publicKey(privateKey)

const msg = ed25519.hash('kitties')
const signature = ed25519.sign(msg, privateKey, publicKey)
const isValid = ed25519.verify(signature, msg, publicKey)
```
