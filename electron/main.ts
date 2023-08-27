import { app, BrowserWindow, shell, dialog, ipcMain, Tray, Menu, nativeImage } from 'electron'
import path from 'node:path'
import electronDl from 'electron-dl'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    frame: false,
    height:585,
    width:1040,
    icon: path.join(process.env.PUBLIC, 'electron.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore()
      if (win.isVisible()) {
        win.focus()
      } else {
        win.show()
      }
    }
  })
  app.whenReady().then(() => {
    const tray = new Tray(nativeImage.createFromPath(path.join(process.env.DIST,'electron.png')))
    const contextMenu = Menu.buildFromTemplate([
      {label:'Quit',click:()=>{app.quit()}}
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('electron')
    tray.on('click', () => {win!.show()})
    createWindow()
    if (process.argv.indexOf("--Hidden") >= 0) 
     win!.hide();
  })
}



ipcMain.on('window', (_:Event,event:string) => {
  if (event=="min") {win!.minimize();}
  if (event=="close") {win!.hide()}
})

ipcMain.handle('bootup', (_:Event,event?:boolean) => {
  if (event != undefined) {
    app.setLoginItemSettings({
      openAtLogin: event,
      args: ["--Hidden"],
    })
    return
  }
  else {
    const { openAtLogin } = app.getLoginItemSettings({
    args: ["--Hidden"],
  });
  return openAtLogin;
  }
})
  

ipcMain.handle("getpath", async (_:Event,path?) =>{
  return path == undefined ? app.getPath("userData") : app.getPath(path)
})

ipcMain.handle("choosefolder", async() =>{
  const win = BrowserWindow.getFocusedWindow()!;
  const folder = await dialog.showOpenDialog(win,{properties:['openDirectory']});
  if (folder.canceled) {
    return
  } else {
    return folder.filePaths[0]
  }
})

ipcMain.handle("download", async (_:Event,url:string,path:string) =>{
  path = path == "" ? app.getPath("downloads") : path
  const dl = await electronDl.download(win!,url,{directory:path});
  return dl.getSavePath()
})