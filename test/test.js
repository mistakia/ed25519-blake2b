/* global describe it */

const chai = require('chai')
const ed25519 = require('../')

const expect = chai.expect

describe('create seed', function () {
  it('generate', function () {
    const seed = ed25519.createSeed()
    expect(seed.length).to.equal(32)
  })
})
