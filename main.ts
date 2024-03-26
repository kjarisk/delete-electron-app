import { app, BrowserWindow, ipcMain, dialog } from 'electron'

let mainWindow: BrowserWindow | null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready',() => {
    createWindow();
    ipcMain.handle('dialog', (event, method, params) => {       
        dialog[method](params);
      });
} )

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
