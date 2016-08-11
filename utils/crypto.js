
// important that this comes before require('crypto')
if (typeof window === 'object') {
  if (!window.crypto) window.crypto = { getRandomValues: getRandomValues }
}

var crypto = require('crypto')
var randomBytes = crypto.randomBytes
crypto.randomBytes = function (size, cb) {
  if (cb) return randomBytes.apply(crypto, arguments)

  var arr = new Buffer(size)
  getRandomValues(arr)
  return arr
}

crypto.getRandomValues = crypto.getRandomValues || getRandomValues

function getRandomValues (arr) {
  // console.warn('WARNING: generating insecure psuedorandom number')
  for (var i = 0; i < arr.length; i++) {
    arr[i] = Math.random() * 256 | 0
  }

  return arr
}
