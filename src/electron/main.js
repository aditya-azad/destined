const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");

const TODOS_FILE = "destined-todos.json";

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(`http://localhost:8080`);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("save-todos", (event, todos) => {
  fs.writeFile(TODOS_FILE, JSON.stringify(todos), "utf8", function (err) {
    if (err) {
      throw "cannot save todos!";
    }
  });
})

ipcMain.on("get-todos", (event) => {
  event.returnValue = fs.readFileSync(TODOS_FILE, "utf8");
});