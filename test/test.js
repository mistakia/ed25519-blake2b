/* global describe it */

const crypto = require('crypto')
const chai = require('chai')
const chaiBytes = require('chai-bytes')
const ed25519 = require('../')

chai.use(chaiBytes)

const expect = chai.expect

describe('create seed', function () {
  it('public key 0x01', function () {
    const privateKey = Buffer.from(
      '0100000000000000000000000000000000000000000000000000000000000000',
      'hex'
    )
    const publicKey = Buffer.from(
      'C6EB8DB0B120DC5BE0074E2ED7E3003153DB9844BC8F0B5D732EF76E6BE604F4',
      'hex'
    )
    expect(ed25519.publicKey(privateKey)).to.equalBytes(publicKey)
  })

  it('public key 0x00', function () {
    const privateKey = Buffer.from(
      '0000000000000000000000000000000000000000000000000000000000000000',
      'hex'
    )
    const publicKey = Buffer.from(
      '19D3D919475DEED4696B5D13018151D1AF88B2BD3BCFF048B45031C1F36D1858',
      'hex'
    )
    expect(ed25519.publicKey(privateKey)).to.equalBytes(publicKey)
  })

  it('hash', function () {
    const hash = Buffer.from(
      '28fa333689183c30bc5e2cfd24499ffd714f6b7813fa4433df11106ba8733ab9',
      'hex'
    )
    expect(ed25519.hash('kitties')).to.equalBytes(hash)
  })

  it('hash checksum', function () {
    const hash = Buffer.from(
      'EED86BF2609795DD06F34A6AF55D0A734A844E08D99351166DFDC7EEC8721CCC',
      'hex'
    )
    const checksum = Buffer.from('87edbb8d3b', 'hex')
    expect(ed25519.hash(hash, 5)).to.equalBytes(checksum)
  })

  it('sign and verify', function () {
    const privateKey = crypto.randomBytes(32)
    const publicKey = ed25519.publicKey(privateKey)
    const msg = crypto.randomBytes(32)
    const signature = ed25519.sign(msg, privateKey, publicKey)

    const isValid = ed25519.verify(signature, msg, publicKey)
    expect(isValid).to.equal(true)
  })

  it('telemetry signature', function () {
    const msg = Buffer.from(
      'e38a52e5976fde4262d3062835e7c6b6f496df3571f8c4b38607d673dc3d0dfb00000000094a3a0a00000000093cd3f400000000000000070000000001b0c18e0000000000000000000000e61200000000001042f7991cf190094c00f0b68e2e5f75f6bee95a2e0bd93ceaa4a6734db9f19b72894817010000000000018137273667fffffff800000000',
      'hex'
    )
    const publicKey = Buffer.from(
      'E38A52E5976FDE4262D3062835E7C6B6F496DF3571F8C4B38607D673DC3D0DFB',
      'hex'
    )
    const signature = Buffer.from(
      'F15D5F8EA91FC1D9CA8CE04E70E4933FBF432BE97E1F467003D67839884CE80C14AA5465C34F57EADC06145BA9593400DF6C0D5571E85EA5F410AB7AE904FF0C',
      'hex'
    )
    const isValid = ed25519.verify(signature, msg, publicKey)
    expect(isValid).to.equal(true)
  })

  it('vote signature', function () {
    const signature = Buffer.from(
      'D27F3042065EB56E66A4D2CD0A30DBA516338A3189DC352E90524355A2D1A01326765D40B6E72E54654C531B375DF5986873E83C794DC01AFC83124237F1A902',
      'hex'
    )
    const publicKey = Buffer.from(
      '98A00F4E3FFA39BFFA4A4C0BCD6608CE6421ABC9312738028E928D7440347C34',
      'hex'
    )
    const prefix = Buffer.from('vote ', 'ascii')
    const hash = Buffer.from(
      '991CF190094C00F0B68E2E5F75F6BEE95A2E0BD93CEAA4A6734DB9F19B728948',
      'hex'
    )
    const seq = Buffer.from('ffffffffffffffff', 'hex')
    const msg = Buffer.concat([prefix, hash, seq])

    const isValid = ed25519.verify(signature, ed25519.hash(msg), publicKey)
    expect(isValid).to.equal(true)
  })

  it('node id signature', function () {
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

    const isValid = ed25519.verify(signature, msg, publicKey)
    expect(isValid).to.equal(true)
  })

  it('bad signature', function () {
    const signature = Buffer.from(
      'D93708A7D9C42610DD6E76D0530EC99495685FE13BBB3A0372D63F5C8305FDF44D74FD4B4F3E0A02D75FD2529771DAFF0A551A7970F037796E7E976E723BCD08',
      'hex'
    )
    const publicKey = Buffer.from(
      '23AC909C86579462B601858A7FA7FE774C6348FD422B7D85D2C02E418CC85226',
      'hex'
    )
    const prefix = Buffer.from('vote ', 'ascii')
    const hash = Buffer.from(
      '991CF190094C00F0B68E2E5F75F6BEE95A2E0BD93CEAA4A6734DB9F19B728948',
      'hex'
    )
    const seq = Buffer.from('ffffffffffffffff', 'hex')
    const msg = Buffer.concat([prefix, hash, seq])

    const isValid = ed25519.verify(signature, ed25519.hash(msg), publicKey)
    expect(isValid).to.equal(false)
  })
})
