var electron = require('electron')
var {app, BrowserWindow} = require('electron')

var mainWindow = null

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', function() {
  mainWindow = new BrowserWindow()
  mainWindow.loadURL(`file://${__dirname}/page/index.html`)

  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
