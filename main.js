const { app, BrowserWindow, ipcMain, Notification } = require("electron");

//const { app, BrowserWindow } = require("electron");
const path = require("path");

//var BrowserWindowConsole = require('browser-window');
var BrowserWindowConsole = require('electron').BrowserWindow;
var browserWindow = null;


const loadMainWindow = () => {
    let mainWindow = new BrowserWindow({
        width : 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    }); 

    // browserWindow = new BrowserWindowConsole({width: 800, height: 600}); 
    // browserWindow.loadURL('file://' + __dirname + '/index.html');
    // browserWindow.openDevTools();
    // browserWindow.on('closed', function() {
    //     browserWindow = null;
    // }); 
}

app.on("ready", loadMainWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});

ipcMain.handle('show-notification', (event, ...args) => {
    const notification = {
        title: 'New Task',
        body: `Added: ${args[0]}`
    }

    new Notification(notification).show()
});


