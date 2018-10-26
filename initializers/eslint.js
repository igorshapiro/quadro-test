module.exports = async function(app, log, config) {
  const shouldRun = config.get('quadro.test.eslint.force') || app.isTestEnv
  if (!shouldRun) return

  log.trace('Running ESLint')

  require('eslint-plugin-standard')
  require('eslint-plugin-promise')
  require('eslint-config-standard')

  const eslintIgnoreFile = await app.glob('.eslintignore', { dirs: ['app', 'quadro'] })
  const eslintrcFile = await app.glob('.eslintrc', { dirs: ['app', 'quadro'] })

  const CLIEngine = require('eslint').CLIEngine
  const cli = new CLIEngine({
    ignorePath: eslintIgnoreFile[0],
    configFile: eslintrcFile[0]
  })
  const report = cli.executeOnFiles([app.appDir])
  const formatter = cli.getFormatter('compact')
  const { results, errorCount } = report
  console.log(formatter(results))

  const ignoreErrors = config.get('quadro.test.eslint.ignore', false)
  if (errorCount > 0 && !ignoreErrors) process.exit(1)
}
