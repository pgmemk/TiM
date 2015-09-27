#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var hostname = process.argv[2] || 'dockerhost'

;[
  path.resolve('./node_modules/react-native/Libraries/WebSocket/RCTWebSocketExecutor.m'),
  path.resolve('./iOS/AppDelegate.m')
].forEach(function (file) {
  fs.readFile(file, { encoding: 'utf8' }, function (err, contents) {
    if (err) {
      if (err.code === 'ENOENT') {
        return console.log('file not found:', file)
      } else {
        throw err
      }
    }

    var hacked = contents.replace(
      /(NSURL\ URLWithString\:\@\"http\:\/\/)[^:]+:(\d+)/,
      '$1' + hostname + ':$2'
    )

    if (hacked !== contents) {
      fs.writeFile(file, hacked, function (err) {
        if (err) throw err
      })
    }
  })
})
