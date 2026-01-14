export function mostrarMensaje(texto, tipo = "info", duracion = 3000) {
    const div = document.getElementById("mensajeCarga");

    // Estilo según tipo
    let color = "bg-blue-100 text-blue-800";
    if (tipo === "error") color = "bg-red-100 text-red-800";
    if (tipo === "exito") color = "bg-green-100 text-green-800";

    div.innerHTML = texto;
    div.className = `fixed top-4 right-4 z-50 p-4 rounded shadow ${color}`;

    // Desaparece después de X ms
    setTimeout(() => {
        div.innerHTML = "";
        div.className = "";
    }, duracion);
}