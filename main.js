const cloudname = "dba6tn4tf";
const preset = "preset5C";

const inputf = document.getElementById("fileInput");
const imagen = document.getElementById("imagen");
const btnSubir = document.getElementById("btnSubir");
const cargandoText = document.getElementById("cargando");

const subirimgen = () => {
    const foto = inputf.files[0];

    // se valida la seleccion de la fotografia
    if (!foto) return alert("Selecciona una imagen y vuelve a intentarlo");

    if (!foto.type.startsWith("image/")) {
        alert("seleccione un formato de imagen");
        return;
    }

    const formData = new FormData();
    formData.append(`file`, foto);
    formData.append(`upload_preset`, preset);

    // Se desactiva el boton de subida para evitar llamadas inecesarias
    btnSubir.disabled = true;
    cargandoText.classList.remove("hidden");

    fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al subir la imagen");
            return response.json();
        })
        .then(data => {
            alert("Imagen subida con éxito");

            // declaracion para las transformaciones, como filtro, tamaño y el redondeo de bordes
            const misCambios = "e_sepia,w_500,c_fill,r_max";

            // Reemplazo el pedazo de la URL original
            const urlFinal = data.secure_url.replace(
                "/upload/",
                `/upload/${misCambios}/`
            );

            // Muestro el resultado final ya transformado
            imagen.src = urlFinal;
        })
        .catch(error => {
            // captura de errores
            console.error("Mi error:", error);
            alert("Algo salió mal en la subida.");
        })
        .finally(() => {
            //Se vuelve a activar el boton
            btnSubir.disabled = false;
            cargandoText.classList.add("hidden");
        });
}