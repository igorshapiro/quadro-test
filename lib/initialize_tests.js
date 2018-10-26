const path = require('path')

async function runInitializers(app, container) {
  let dirs = [path.join(app.quadroDir, 'lib'), app.appDir, __dirname]
  let files = app.glob('test/initializers/*.js', { dirs })
  return Promise.map(files, _ => container.create(require(_)))
}

before(async function() {
  let container = Q.container

  let chai = require('chai')
  global.expect = chai.expect
  chai.use(require('sinon-chai'))
  chai.use(require('chai-as-promised'))
  chai.use(require('chai-subset'))

  QT.chai = chai

  global.nock = require('nock')
  global.pubsub = await container.getAsync('pubsub')

  await container.create(runInitializers)
})
