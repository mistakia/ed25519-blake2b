const ed25519 = require('../')

const msg = Buffer.from(
  '1fc580c91da94bbf593c7acf9d2c79c4f30ff1d43ca9788e8309d31865da6d6e',
  'hex'
)

const start = process.hrtime.bigint()

let count = 0
for (; count < 1000000; count++) {
  ed25519.hash(msg)
}

const end = process.hrtime.bigint()

const seconds = Number((end - start) / BigInt(1e9))
console.log(
  `Generated ${count} hashes in ${seconds} secs (${Math.round(
    count / seconds
  )} ops/sec)`
)
