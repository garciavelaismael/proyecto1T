// Imports
import { Cliente } from "../classes/personal/cliente";
import { Empleado } from "../classes/personal/empleado";
import { Producto } from "../classes/producto/producto";
import { Dispositivo } from "../classes/producto/dispositivo";
import { Liquido } from "../classes/producto/liquido";
import { db } from "../database/database";
import { tCliente, ClienteDB } from "../schemas/cliente";
import { tEmpleado, EmpleadoDB } from "../schemas/empleado";
import { tLiquido, LiquidoDB } from "../schemas/liquido";
import { tDispositivo, DispositivoDB } from "../schemas/dispositivo";
import { tCompra, CompraDB } from "../schemas/compras";
import { input } from "./lecturaTeclado";

let oSchema: any;

db.conectarBD(); // Conecta a la base de datos


// Esquemas a seguir por los modelos

let dSchemaCliente: tCliente = {
  _id: null,
  _nombre: null,
  _direccion: null,
  _telefono: null,
  _email: null,
  _fechanacimiento: null,
  _socio: null,
  _carrito: [],
};

let dSchemaEmpleado: tEmpleado = {
  _id: null,
  _nombre: null,
  _direccion: null,
  _telefono: null,
  _email: null,
  _fechanacimiento: null,
  _puesto: null,
  _socio: null,
};

let dSchemaDispositivo: tDispositivo = {
  _id: null,
  _nombreProd: null,
  _marca: null,
  _potencia: null,
  _bateria: null,
  _coste: null
};

let dSchemaLiquido: tLiquido = {
  _id: null,
  _nombreProd: null,
  _marca: null,
  _sabor: null,
  _nicotina: null,
  _coste: null
};

let dSchemaCompra: tCompra = {
  _id: null,
  _nombreCliente: null,
  _coste: null,
  _productos: [],
};

// Creación de un Cliente
export const nuevoCli = async () => {
  let cli: Cliente;
  dSchemaCliente._id = await input("\nDNI");  // Introduccion de datos Cliente por teclado
  dSchemaCliente._nombre = await input("Nombre");
  const valueCalle = await input("Calle");
  const valueNumero = parseInt(await input("Número"));
  dSchemaCliente._telefono = parseInt(await input("Tlf"));
  dSchemaCliente._email = await input("Email");
  dSchemaCliente._fechanacimiento = new Date(
    await input("Fecha de nacimiento")
  );
  dSchemaCliente._socio = Boolean(await input("Socio"));
  dSchemaCliente._carrito = [];
  (dSchemaCliente._direccion = {
    calle: valueCalle,
    numero: valueNumero,
  }),
    (oSchema = await new ClienteDB(dSchemaCliente)); // Crea el objeto en la base de datos
  await oSchema.save()
    .then(() => console.log("\nCreado correctamente"))
    .catch((err: any) => console.log("Error: " + err));
};

// Creacion de un Empleado
export const nuevoEmp = async () => {
  let emp: Empleado;
  dSchemaEmpleado._id = await input("\nDNI"); // Introduccion de datos Empleado por teclado
  dSchemaEmpleado._nombre = await input("Nombre");
  const valueCalle = await input("Calle");
  const valueNumero = parseInt(await input("Número"));
  dSchemaEmpleado._telefono = parseInt(await input("Tlf"));
  dSchemaEmpleado._email = await input("Email");
  dSchemaEmpleado._fechanacimiento = new Date(
    await input("Fecha de nacimiento")
  );
  dSchemaEmpleado._puesto = await input("Puesto de trabajo");
  dSchemaEmpleado._socio = Boolean(await input("Socio"));
  (dSchemaEmpleado._direccion = {
    calle: valueCalle,
    numero: valueNumero,
  }),
    (oSchema = await new EmpleadoDB(dSchemaEmpleado)); // Crea el objeto en la base de datos
  await oSchema.save()
    .then(() => console.log("\nCreado correctamente"))
    .catch((err: any) => console.log("Error: " + err));
};

// Mostrar clientes
export const mostrarCli = async () => {
  let query = await ClienteDB.find({});
  for (let a of query) { // Recorremos la base de datos
    let cliente = new Cliente(
      a._id,
      a._nombre,
      a._direccion,
      a._telefono,
      a._email,
      a._fechanacimiento,
      a._socio,
      a._carrito
    );
    console.log(cliente.todo()); // Muestra los clientes
  }
};

// Mostrar empleados
export const mostrarEmp = async () => {
  let query = await EmpleadoDB.find({});
  for (let a of query) { // Recorremos la base de datos
    let empleado = new Empleado(
      a._id,
      a._nombre,
      a._direccion,
      a._telefono,
      a._email,
      a._fechanacimiento,
      a._puesto,
      a._socio
    );
    console.log(empleado.todo()); // Muestra los empleados
  }
};

// Eliminar coleccion
export const dropDatabases = async () => {
  let query = await input(
    "Inserte coleccion a eliminar\nEmpleados\nClientes\nDispositivos\nLiquidos"
  );
  switch (query) {
    case "Empleados":
      console.log("Procediendo con la eliminación de Empleados");
      await EmpleadoDB.remove({});
      break;
    case "Clientes":
      console.log("Procediendo con la eliminación de Clientes");
      await ClienteDB.remove({});
      break;
    case "Dispositivos":
      console.log("Procediendo con la eliminación de Empleados");
      await DispositivoDB.remove({});
      break;
    case "Liquidos":
      console.log("Procediendo con la eliminación de Clientes");
      await LiquidoDB.remove({});
      break;
    default:
      console.log(
        "Lo que has introducido no se corresponde a ninguna colección"
      );
  }
};

// Guarda en la base de datos
export const guardar = async (misPersonas: Array<any>) => {
  let query = await EmpleadoDB.find({});
  if (query.length != 0) {
    console.log("Ya tienes las personas en la BD!"); // Ya hay datos insertados
  } else {
    let oSchema: any;
    for (let a of misPersonas) {
      dSchemaCliente._id = dSchemaEmpleado._id = a.id;
      dSchemaCliente._nombre = dSchemaEmpleado._nombre = a.nombre;
      dSchemaCliente._direccion = dSchemaEmpleado._direccion = a.direccion;
      dSchemaCliente._telefono = dSchemaEmpleado._telefono = a.telefono;
      dSchemaCliente._email = dSchemaEmpleado._email = a.email;
      dSchemaCliente._fechanacimiento = dSchemaEmpleado._fechanacimiento =
        a.fechanacimiento;
      dSchemaCliente._socio = dSchemaEmpleado._socio = a.socio;

      if (a instanceof Empleado) {
        dSchemaEmpleado._puesto = a.puesto;
        oSchema = new EmpleadoDB(dSchemaEmpleado);
      } else if (a instanceof Cliente) {
        dSchemaCliente._carrito = a.carrito;
        oSchema = new ClienteDB(dSchemaCliente);
      }
      await oSchema.save()
        .then(() => console.log("Creado correctamente"))
        .catch((err: any) => console.log("Error: " + err));
    }
  }
};

// Guarda en BD productos
export const guardar2 = async (misProductos: Array<any>) => {
  let query = await DispositivoDB.find({});
  if (query.length != 0) {
    console.log("Ya tienes los productos en la BD!"); // Ya hay datos insertados
  } else {
    let oSchema: any;
    for (let a of misProductos) {
      dSchemaDispositivo._id = dSchemaLiquido._id = a.id;
      dSchemaDispositivo._nombreProd = dSchemaLiquido._nombreProd = a.nombreProd;
      dSchemaDispositivo._marca = dSchemaLiquido._marca = a.marca;
      dSchemaDispositivo._coste = dSchemaLiquido._coste = a.coste;

      if (a instanceof Dispositivo) {
        dSchemaDispositivo._potencia = a.potencia;
        dSchemaDispositivo._bateria = a.bateria;
        oSchema = new DispositivoDB(dSchemaDispositivo);
      } else if (a instanceof Liquido) {
        dSchemaLiquido._sabor = a.sabor;
        dSchemaLiquido._nicotina = a.nicotina;
        oSchema = new LiquidoDB(dSchemaLiquido);
      }
      await oSchema.save()
        .then(() => console.log("Creado correctamente"))
        .catch((err: any) => console.log("Error: " + err));
    }
  }
};

// Login de cliente
export const login = async () => {
  let idCli = (dSchemaCliente._id = await input("\nDNI"));
  let query = await ClienteDB.find({ _id: idCli });
  for (let a of query) {
    let cliente = new Cliente(
      a._id,
      a._nombre,
      a._direccion,
      a._telefono,
      a._email,
      a._fechanacimiento,
      a._socio,
      a._carrito
    );
    console.log(cliente.todo());
    await menuCliente(cliente);
  }
};

// Menú de cliente
export const menuCliente = async (miCliente: Cliente) => {
  let opt: any;
  do {
    console.clear();
    console.log("Menu de cliente\n");
    console.log("1.- Agregar Producto");
    console.log("2.- Eliminar producto");
    console.log("3.- Listar Carrito");
    console.log("4.- Listar Dispositivos");
    console.log("5.- Listar Liquidos");
    console.log("6.- Comprar");
    console.log("0.- Salir");
    opt = await input("Inserte su opcion");

    let query: any;
    let id: string;
    let producto: Producto | undefined;
    let productos: Array<Producto>;

    switch (opt) {
      case "1":
        let tipo = await input("Introduce el tipo de producto que quieres agregar:\n1. Dispositivo\n2. Liquido\n");
        id = await input("\nIntroduce el ID del producto");

        let model;
        switch (tipo) {
          case "1":
            model = await DispositivoDB.findOne({ _id: id });
            if(model == null) {
              console.log("No se ha encontrado el producto");
              break;
            }
            
            producto = new Dispositivo(
              model._id, 
              model._nombreProd, 
              model._marca,
              model._potencia,
              model._bateria,
              model._coste
            );
            break;
          case "2":
            model = await LiquidoDB.findOne({ _id: id });
            if(model == null) {
              console.log("No se ha encontrado el producto");
              break;
            }
            
            producto = new Liquido(
              model._id, 
              model._nombreProd, 
              model._marca,
              model._sabor,
              model._nicotina,
              model._coste
            );
            break;
          default:
            console.log("No se ha encontrado el tipo");
            break;
        }

        if(producto == undefined) {
          console.log("No se ha encontrado el producto");
          break;
        }

        miCliente.agregarProducto(producto);
        console.log("Producto agregado!");
        break;
      case "2":
        id = await input("\nIntroduce el ID del producto");
        producto = miCliente.buscarProducto(id);

        if (producto == undefined) {
          console.log("No se ha encontrado el producto");
          break;
        }

        miCliente.eliminarProducto(producto);
        break;
      case "3":
        productos = miCliente.carrito;
        if (productos.length == 0) {
          console.log("No hay productos en el carrito");
          break;
        }

        for (const producto of productos) {
          console.table(producto);
        }
        break;
      case "4":
        query = await DispositivoDB.find({});
        for (let a of query) {
          let miDispositivos = new Dispositivo(
            a._id,
            a._nombreProd,
            a._marca,
            a._potencia,
            a._bateria,
            a._coste
          );
          console.table(miDispositivos);
          miDispositivos.todoProd();
        }
        break;

      case "5":
        query = await LiquidoDB.find({});
        for (let a of query) {
          let miLiquido = new Liquido(
            a._id,
            a._nombreProd,
            a._marca,
            a._potencia,
            a._bateria,
            a._coste
          );
          console.table(miLiquido);
          miLiquido.todoProd();
        }
        break;
      case "6":
        productos = miCliente.carrito;
        if (productos.length == 0) {
          console.log("No hay productos en el carrito");
          break;
        }
        
        dSchemaCompra._nombreCliente = miCliente.nombre;
        dSchemaCompra._coste = 0;

        for (const producto of productos) {
          dSchemaCompra._coste += producto.coste;
          dSchemaCompra._productos.push(producto);
        }

        miCliente.limpiarCarrito();
        const compraModel = new CompraDB(dSchemaCompra);
        await compraModel.save();
        break;
    }
    console.log("Pulsa cualquier tecla para continuar...");    
    await input("");
  } while (opt != 0);
};