/* eslint no-unused-expressions: 0 */
describe('Env helpers', function() {
  let firstTestExecuted = false

  it('sets the env', function() {
    process.env.HELLO = 'world'
    firstTestExecuted = true
  })

  it('resets the env', function() {
    expect(firstTestExecuted).to.be.true
    expect(process.env.HELLO).to.be.undefined
  })
})
