import { input } from "./lecturaTeclado";

export const menuPral = async () => {
  let n: number;
  console.log("\n");
  console.log("1.- Crear empleado");
  console.log("2.- Crear cliente");
  console.log("3.- Mostrar empleados");
  console.log("4.- Mostrar clientes");
  console.log("5.- Subir objetos predefinidos");
  console.log("6.- Eliminar coleccion");
  console.log("7.- Login cliente")
  console.log("0.- SALIR");
  n = parseInt(await input("--OPCIÓN--"));
  return n;
};
