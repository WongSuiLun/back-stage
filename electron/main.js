const { app, BrowserWindow, ipcMain } = require('electron')

// 引入自动更新模块
const { autoUpdater } = require('electron-updater')
// 更新包位置
const feedUrl = `http://127.0.0.1/updatePackage/`

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win, webContents

function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({
      width: 800,
      height: 600
  })

  win.loadURL(`file://${__dirname}/../dist-web/index.html`);

  webContents = win.webContents

  // 打开开发者工具
  // win.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

// 主进程监听渲染进程传来的信息
ipcMain.on('update', (e, arg) => {
  console.log('update')
  checkForUpdates()
})

let checkForUpdates = () => {
  let tips = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新'
  }
  // 配置安装包远端服务器
  autoUpdater.setFeedURL(feedUrl)

  // 下面是自动更新的整个生命周期所发生的事件
  autoUpdater.on('error', function (message) {
    sendUpdateMessage('error', tips.error)
  })
  autoUpdater.on('checking-for-update', function (message) {
    sendUpdateMessage('checking-for-update', tips.checking)
  })
  autoUpdater.on('update-available', function (message) {
    sendUpdateMessage('update-available', tips.updateAva)
  })
  autoUpdater.on('update-not-available', function (message) {
    sendUpdateMessage('update-not-available', tips.updateNotAva)
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    sendUpdateMessage('downloadProgress', progressObj)
  })
  // 更新下载完成事件
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    sendUpdateMessage('isUpdateNow')
    ipcMain.on('updateNow', (e, arg) => {
      autoUpdater.quitAndInstall()
    })
  })

  // 执行自动更新检查
  autoUpdater.checkForUpdates()
}

// 主进程主动发送消息给渲染进程函数
function sendUpdateMessage (message, data) {
  console.log({ message, data })
  webContents.send('message', { message, data })
}
