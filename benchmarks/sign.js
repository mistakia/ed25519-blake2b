const ed25519 = require('../')

const privateKey = Buffer.from(
  '68BB5E12200DD9E2565A66CC5C049AAD35801B5DDDED5CC8BF83C93CB7DEB268',
  'hex'
)
const publicKey = Buffer.from(
  'E80B5A3FB99AAA6067AC1486038CD51BF6B595699F8CCD08D190E50482117895',
  'hex'
)
const msg = 'whatever'

const start = process.hrtime.bigint()

let count = 0
for (; count < 100000; count++) {
  ed25519.sign(msg, privateKey, publicKey)
}

const end = process.hrtime.bigint()

const seconds = Number((end - start) / BigInt(1e9))
console.log(
  `Created ${count} signatures in ${seconds} secs (${Math.round(
    count / seconds
  )} ops/sec)`
)
