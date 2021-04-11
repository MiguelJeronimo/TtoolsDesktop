const {app, BrowserWindow,Menu, ipcMain , webContents} = require('electron'); 

const url = require('url');
const path = require('path');

//if (process.env.NODE_ENV !== 'production') {// comparamos si la aplicacion es diferente a producción
  //  require('electron-reload')(__dirname, {
  //      electron: path.join(__dirname, '../node_modules', '.bin', 'electron')// para cuando se modifique algo del condigo de electron
    
    
 //})    

//}

function Ventana_Principal() {
    let win = new BrowserWindow({width: 800, height: 600, maxWidth:800, maxHeight: 600, minHeight:600,minWidth:800,show: false,title: 'Tibia Tools' ,maximizable: false ,icon: 'build/icon.ico'});
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file',
        slashes: true,    
    }));
    
    win.once('ready-to-show', () => {
        win.show()
      })


       //creando menus en la aplicación
    //const Mainmenu = Menu.buildFromTemplate(Arreglo_menus);
    Menu.setApplicationMenu(null);//integrando el menu a la aplicación 
    win.on('closed', function () {//cuando cerremos la aplicacion ejecutara el evento que cerrara todas las ventanas
       app.quit(); //cerrando la aplicacion con las multiples ventanas
    })

 /* win.loadURL('https://www.facebook.com/');*/
}

//const Arreglo_menus = [{label: 'Caja', //arreglo de menus
    //                    submenu: [{label: 'Caja', accelerator: 'Ctrl+C', 
    //                            click(){//evento al dar un click en el sub meno "Producto nuevo."
                                  //  Ventana_Productos();
   //                             }}]},
  //                     {label: 'Cerrar', accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q', //al clickear o usar la combiancion de teclas, cerraremos la ventana
  //                      click(){
  //                          app.quit();//cerramos la ventana
  //                      }},
  //                      {label: 'Panel de control'},
 //                       {label: 'Movimientos'},
//                        {label: 'Reportes'},
//                        {label: 'Ayuda'}
//];

//if (process.env.NODE_ENV !== 'production') {
 //   Arreglo_menus.push({
 //       label: 'Devtools',
   //     submenu: [
    ///    {
    //        label: 'Show/Hide Dev Tools',
     //        accelerator: 'Ctrl+D',
     //       click(item, focusedWindow){focusedWindow.toggleDevTools();
           // }
    
  //  }
        //,{
         //   role: 'reload'
        //}
    //]
    //});
//}



app.on('ready', Ventana_Principal);