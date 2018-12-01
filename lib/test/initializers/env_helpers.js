let envBackup

beforeEach(function() {
  const currentEnv = process.env
  envBackup = { ...currentEnv }
})
afterEach(function() {
  process.env = { ...envBackup }
})
