const path = require('path')

async function runInitializers(app, container) {
  const dirs = [path.join(app.quadroDir, 'lib'), 'app', 'plugins', __dirname]
  const files = app.glob('test/initializers/*.js', { dirs })
  return Promise.map(files, _ => container.create(require(_)))
}

before(async function() {
  const container = Q.container

  const chai = require('chai')
  global.expect = chai.expect
  chai.use(require('sinon-chai'))
  chai.use(require('chai-as-promised'))
  chai.use(require('chai-subset'))

  QT.chai = chai

  global.nock = require('nock')

  await container.create(runInitializers)
})
