import { menuPral } from "./src/utils/menu";
import { nuevoCli, nuevoEmp, guardar, guardar2, mostrarCli, mostrarEmp, dropDatabases, login,}
from "./src/utils/funciones";
import { Cliente } from "./src/classes/personal/cliente";
import { Empleado } from "./src/classes/personal/empleado";
import { db } from "./src/database/database";
import { Producto } from "./src/classes/producto/producto";
import { Dispositivo } from "./src/classes/producto/dispositivo";
import { Liquido } from "./src/classes/producto/liquido";
import { Persona } from "./src/classes/personal/persona";

// Datos de las personas y productos por defecto/predefinidos
let productos: Array<Producto> = new Array<Producto>();
productos[0] = new Dispositivo("001", "Vinci", "Voopoo", 50, 1500, 35);
productos[1] = new Dispositivo("002", "Drag 3", "Voopoo", 177, 6000, 70);
productos[2] = new Dispositivo("003", "Luxe", "Vaporesso", 80, 3000, 50);
productos[3] = new Dispositivo("004", "XROS", "Vaporesso", 18, 800, 22);
productos[4] = new Dispositivo("005", "Caliburn", "Uwell", 16, 520, 19);
productos[5] = new Liquido("101","Requiem I","Bombo","Tarta de zanahoria", 10, 5);
productos[6] = new Liquido("102",  "Requiem II",  "Bombo",  "Tarta de calabaza",  10, 5);
productos[7] = new Liquido("103", "RelaX", "Eliquid France", "Café", 10, 5);
productos[8] = new Liquido("104", "Blue Burst", "Riot", "Frambuesa", 5, 5);
productos[9] = new Liquido("105", "Iced Mango", "Mondo", "Mango", 10, 5);

let personas: Array<Persona> = new Array<Persona>();
personas[0] = new Cliente("42901738S", "Juan", { calle: "Girasol", numero: 3 }, 631467927, "juan.01@gmail.com", new Date(1993 - 10 - 3), true, []);
personas[1] = new Cliente("78092182E", "Alberto", { calle: "Tulipan", numero: 12 }, 639368118, "alberto12@gmail.com", new Date(1993 - 10 - 3), false, []);
personas[2] = new Cliente("94562716P", "Jose", { calle: "Rosa", numero: 5 }, 621347928, "jose12@gmail.com", new Date(1993 - 10 - 3), true, []);
personas[3] = new Empleado("22109223L", "Maria", { calle: "Codorniz", numero: 2 }, 684677926, "maria@empresa.com", new Date(1993 - 10 - 3), "Vendedor", false);
personas[4] = new Empleado("22193804E", "Pedro", { calle: "Ninfa", numero: 22 }, 678679993, "pedro22@empresa.com", new Date(1993 - 10 - 3), "Comercial", false);
personas[5] = new Empleado("26732783R", "Paco", { calle: "Cotorra", numero: 7 }, 602930180, "paco.7@empresa.com", new Date(1993 - 10 - 3), "Transporte", true);
personas[6] = new Empleado("42013894F",  "Luis", { calle: "Loro", numero: 9 }, 633325845, "9luis@empresa.com", new Date(1993 - 10 - 3), "Vendedor", false);

//menu
const main = async () => {
  let n: number;
  //mientras no asigne valor será undefined
  do {
    n = await menuPral();
    switch (n) {
      case 1:
        // crea empleado
        await nuevoEmp();
        break;
      case 2:
        // crea cliente
        await nuevoCli();
        break;
      case 3:
        //muestra los empleados
        await mostrarEmp();
        break;
      case 4:
        //muestra los clientes
        await mostrarCli();
        break;
      case 5:
        // guarda los datos predefinidoss
        await guardar(personas);
        await guardar2(productos);
        break;
      case 6:
        // elimina colecciones
        await dropDatabases();
        console.clear();
        break;
      case 7:
        // login del cliente
        await login();
        break;
      case 0:
        // sale del menú y desconecta de la base de datos
        db.desconectarBD();
        console.log("\nAdios");
    }
  } while (n != 0);
};
main();
