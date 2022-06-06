/* global describe it */

const chai = require('chai')
const chaiBytes = require('chai-bytes')
const ed25519 = require('../')

chai.use(chaiBytes)

const expect = chai.expect

describe('create seed', function () {
  it('generate', function () {
    /* const seed = ed25519.createSeed()
     * console.log(seed.toString('hex'))
     * expect(seed.length).to.equal(32)
     * const keypair = ed25519.createKeyPair(seed)
     * expect(keypair.publicKey.length).to.equal(32)
     * expect(keypair.secretKey.length).to.equal(32)

     * const msg = 'whatever'
     * const sig = ed25519.sign(msg, keypair.publicKey, seed)
     * expect(sig.length).to.equal(64)
     * console.log(keypair.secretKey.toString('hex'))
     * console.log(keypair.publicKey.toString('hex'))
     * console.log(sig.toString('hex'))

     * const isValid = ed25519.verify(sig, msg, keypair.publicKey)
     * expect(isValid).to.equal(true) */

    const privateKey = '68BB5E12200DD9E2565A66CC5C049AAD35801B5DDDED5CC8BF83C93CB7DEB268'
    const publicKey = Buffer.from('E80B5A3FB99AAA6067AC1486038CD51BF6B595699F8CCD08D190E50482117895', 'hex')
    expect(ed25519.publicKey(privateKey)).to.equalBytes(publicKey)

    const msg = 'whatever'
    const signature = ed25519.sign(msg, privateKey, publicKey)
    console.log(signature.toString('hex'))

    const isValid = ed25519.verify(signature, msg, publicKey)
    expect(isValid).to.equal(true)
  })

  it('public key', function () {
    const privateKey = '68BB5E12200DD9E2565A66CC5C049AAD35801B5DDDED5CC8BF83C93CB7DEB268'
    const publicKey = 'E80B5A3FB99AAA6067AC1486038CD51BF6B595699F8CCD08D190E50482117895'

  })
})
