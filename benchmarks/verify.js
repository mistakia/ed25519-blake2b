const ed25519 = require('../')

const signature = Buffer.from(
  'cd2cedb3ad6d3d5e275379a1b57649ce865eaaecd1a0eff57e10649db040bfa9106435e5d0e56dfcb0912b79353e2fc4eb3e20a22dffa750f9cbcdc88cac860f',
  'hex'
)
const publicKey = Buffer.from(
  '8aebb51441bb9f19098d07aee0430e9475b416b96afd634b9862abf1c3bbb827',
  'hex'
)
const msg = Buffer.from(
  '1fc580c91da94bbf593c7acf9d2c79c4f30ff1d43ca9788e8309d31865da6d6e',
  'hex'
)

const start = process.hrtime.bigint()

let count = 0
for (; count < 100000; count++) {
  ed25519.verify(signature, msg, publicKey)
}

const end = process.hrtime.bigint()

const seconds = Number((end - start) / BigInt(1e9))
console.log(
  `Verified ${count} signatures in ${seconds} secs (${Math.round(
    count / seconds
  )} ops/sec)`
)
