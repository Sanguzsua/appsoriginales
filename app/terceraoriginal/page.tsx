
  let nombre: string = "Santiago";
  let edad: number = 20;
  let activo: boolean = true;
  let cualquiera: any = "texto o número";
  let desconocido: number = 897;

  export default function Variables() {
  return (
    <ul className="space-y-1">
        <li>Nombre: {nombre}</li>
        <li>Edad: {edad}</li>
        <li>Activo: {activo ? "Sí" : "No"}</li>
        <li>Cualquiera: {cualquiera}</li>
        <li>Desconocido: {desconocido}</li>
    </ul>
  );
}