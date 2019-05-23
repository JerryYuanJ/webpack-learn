module.exports = function(source) {
  console.info('loader-1: ', source)
  source = source.replace(/kobe/g, "KOBE")
  return `export default ${JSON.stringify(source)}`
}