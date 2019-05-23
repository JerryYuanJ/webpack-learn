const loaderUtils = require('loader-utils')

module.exports = function(source) {
  const option = loaderUtils.getOptions(this)
  console.info(option)
  console.info('loader-2:', source)
  source = source.replace(/mvp/g, "MVP")
  return `export default ${JSON.stringify(source)}`
}