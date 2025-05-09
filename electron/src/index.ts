import { app, BrowserWindow, ipcMain } from "electron";
import path from 'path';
import logger from "./logger";
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}


let mainWindow: BrowserWindow | null;

const createWindow = (): void => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        }
    });


    console.log(`file://${path.join(__dirname, 'li-kiosk','browser','index.html')}`)
    const startURL = app.isPackaged ? `file://${path.join(__dirname, 'li-kiosk','browser','index.html')}` : `http://localhost:4200`;
    mainWindow.webContents.openDevTools();

    mainWindow.loadURL(startURL);

    // Lắng nghe sự kiện log từ renderer process
    ipcMain.on('log-message', (event, level,message) => {
        if(logger[level]){
            logger[level](message);
        } else {
            logger.info(message);
        }
    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    createWindow();

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.