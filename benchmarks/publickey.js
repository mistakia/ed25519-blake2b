const ed25519 = require('../')

const privateKey = Buffer.from(
  '0100000000000000000000000000000000000000000000000000000000000000',
  'hex'
)

const start = process.hrtime.bigint()

let count = 0
for (; count < 100000; count++) {
  ed25519.publicKey(privateKey)
}

const end = process.hrtime.bigint()

const seconds = Number((end - start) / BigInt(1e9))
console.log(
  `Generated ${count} publickeys in ${seconds} secs (${Math.round(
    count / seconds
  )} ops/sec)`
)
