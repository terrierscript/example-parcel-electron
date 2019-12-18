const electron = require("electron")
const waitOn = require("wait-on")
const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require("path")
const isDev = require("electron-is-dev")

let mainWindow

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const url = isDev
    ? "http://localhost:1234"
    : `file://${path.join(__dirname, "../dist/index.html")}`
  if (isDev) {
    await waitOn({
      resources: [url]
    })
  }
  mainWindow.loadURL(url)

  mainWindow.on("closed", () => (mainWindow = null))
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})
