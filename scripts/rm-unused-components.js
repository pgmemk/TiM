#!/usr/bin/env node

const path = require('path')
const fs = require('pify')(require('fs'))
const exists = filePath => new Promise(resolve => require('fs').exists(filePath, resolve))

const REPLACEMENT_MARKER = `// Tradle: replaced as this was not used`
const REPLACEMENT = "module.exports = require('UnimplementedView')"

const unused = [
  "node_modules/react-native/Libraries/Lists/FlatList.js",
  "node_modules/react-native/Libraries/Lists/VirtualizedList.js",
  "node_modules/react-native/Libraries/Lists/VirtualizedSectionList.js",
  "node_modules/react-native/Libraries/Lists/SectionList.js",
  "node_modules/react-native/Libraries/Lists/MetroListView.js",
  "node_modules/react-native/Libraries/Lists/FillRateHelper.js",
  "node_modules/react-native/Libraries/Lists/ViewabilityHelper.js",
  "node_modules/react-native/Libraries/Components/Navigation/NavigatoriOS.ios.js",
  "node_modules/react-native/Libraries/Experimental/WindowedListView.js",
  "node_modules/react-native/Libraries/Experimental/SwipeableRow/*",
  "node_modules/react-native/Libraries/CameraRoll/*",
].map(relPath => path.resolve(__dirname, '../', relPath))

const replaceContents = async (arr) => {
  await Promise.all(arr.map(async file => {
    if (file.endsWith('*')) {
      const dir = file.slice(0, -1)
      const filesRel = await fs.readdir(dir)
      const jsFilesAbs = filesRel
        .filter(file => file.endsWith('.js'))
        .map(name => `${dir}${path.sep}${name}`)

      return replaceContents(jsFilesAbs)
    }

    if ((await fs.lstat(file)).isDirectory()) {
      console.warn('skipping directory', file)
      return
    }

    const contents = await fs.readFile(file, 'utf8')
    if (contents.includes(REPLACEMENT_MARKER)) return

    let replacement = ''
    if (contents.startsWith('/*')) {
      replacement += contents.slice(0, contents.indexOf('*/') + 2) + '\n'
    }

    replacement += `${REPLACEMENT}
${REPLACEMENT_MARKER}`

    console.log('replacing', file)
    return fs.writeFile(file, replacement)
  }))
}

replaceContents(unused)
