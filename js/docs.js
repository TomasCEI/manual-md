// Configuración:
const capFolder = "capitulos";                                          // directorio de capitulos del manual
const urlIndexManual = `${capFolder}/index.json`;                       // archivo JSON de indice del manual
const manualGitHub = "https://github.com/TomasCEI/manual-md";           // URL del repositorio del manual en GitHub


const contentDiv = document.getElementById("content");




// ------------------  INI OBTENER CAPITULOS DE UN ARRAY (TEMPORAL) ------------------ //

// ESTA PORCIÓN DE CÓDIGO ES TEMPORAL, SE VA A QUITAR Y OBTENER TODA LA INFOMRACION DESDE EL INDEX.JSON
// Lista de capitulos con carpetas

const A_capitulos2 = [
    "css/introduccion.md", "css/contenido.html", "css/contenido.md",
    "html-basico/intro.md", "html-basico/capitulo2.md", "html-basico/capitulo3.md","html-basico/capitulo4.html",

    "java-script/introduccion.md", "java-script/final.md"
];
// según la estructura de archivos y carpetas, organiza los archivos en un objeto con los capítulos como propiedades y las secciones como valores de cada propiedad.
function organizeChapters(filesArray) {
    const chapters = {};

    filesArray.forEach(file => {
        const [chapter, section] = file.split('/');
        if (!chapters[chapter]) {
            chapters[chapter] = [];
        }
        chapters[chapter].push({ section, file });
    });
    return chapters;
}
const A_ListaCapitulosTemp = organizeChapters(A_capitulos);
console.log(A_ListaCapitulosTemp);

// ------------------  FIN OBTENER CAPITULOS DE UN ARRAY (TEMPORAL) ------------------ //



// ------------------  MENU DE CAPITULOS  ------------------ //

// Llamada a la función con tu estructura JSON
//const urlJson = 'ruta/del/manual.json';

let A_ListaCapitulos = {};

function crearMenuCapitulos(manual) {
    const menuCapitulos = document.getElementById('menuCapitulos');
    manual.capitulos.forEach((capitulo, index) => {
        const capituloItem = document.createElement('li');
        capituloItem.classList.add('Nav-capitulo');
        capituloItem.innerHTML = `<a href="?cap=${capitulo.slug}">${capitulo.titulo}</a>`;

        if (capitulo.ficheros.length > 0) {
            const subMenu = document.createElement('ul');
            subMenu.classList.add('Nav-articulos');
            capitulo.ficheros.forEach((fichero) => {
                const ficheroItem = document.createElement('li');
                ficheroItem.classList.add('Nav-articulo');
                ficheroItem.innerHTML = `<a href="?cap=${capitulo.slug}#${fichero.slug}">${fichero.titulo}</a>`;
                subMenu.appendChild(ficheroItem);
            });
            capituloItem.appendChild(subMenu);
        }
        menuCapitulos.appendChild(capituloItem);
    });
}

fetch(urlIndexManual)
    .then(response => response.json())
    .then(datosJson => {

        // almaceno únicamente los capitulos dentro de A_listaCapitulos
        A_ListaCapitulos = datosJson.capitulos;

        // Llamada a la función con tu estructura JSON
        crearMenuCapitulos(datosJson);
    }).then(() => {
        imprimirTarjetas();
    })
    .catch(error => console.error('Error al obtener el archivo JSON:', error));

// ------------------  FIN MENU DE CAPITULOS  ------------------ //




// ------------------ NAVEGACION POR URL ------------------ //

// Supongamos que la URL es algo así: "index.html?cap=capitulo1#seccion-25"
const urlParams = new URLSearchParams(window.location.search);
const capituloSeleccionado = urlParams.get('cap') || 'Bienvenida';

function mostrarCapitulo(capitulo) {
    // Lógica para mostrar el capítulo en la interfaz de usuario
    console.log(`Mostrando el capítulo: ${capitulo}`);
}

// Escuchar cambios en la URL
window.addEventListener('popstate', function () {
    console.log("hice popstate cambie de página");
    const capituloSeleccionado = urlParams.get('cap') || 'Bienvenida';
    mostrarCapitulo(capituloSeleccionado);
});

// Mostrar el capítulo inicial al cargar la página
mostrarCapitulo(capituloSeleccionado);

// ------------------ FIN NAVEGACION POR URL ------------------ //





// Función para realizar una solicitud de archivo Markdown
const fetchMarkdown = async (archivo) => {
    console.log("fetching: " + capituloSeleccionado + archivo.fichero);
    return fetch(`${capFolder}/${capituloSeleccionado}/${archivo.fichero}`)

        // respuesta standard
        //.then(response => response.text())

        // respuesta con catch de error
        .then(response => {
            if (!response.ok) {
                //throw new Error("Fileeeee not found or fetch failed");
                return "<span class='text-danger'>Fichero: <b>" + archivo + "</b> no encontrado</span>";
            }
            return response.text();
        })

        // markdown standard
        //.then(textoMarkdown => marked.parse(textoMarkdown))

        // markdown con syntax highlighting
        .then(textoMarkdown => {
            const htmlWithSyntaxHighlighting = marked.parse(textoMarkdown, { langPrefix: 'language-' });
            // Use Prism to apply syntax highlighting based on the language
            const container = document.createElement('div');
            container.innerHTML = htmlWithSyntaxHighlighting;

            container.querySelectorAll('pre code').forEach((codeBlock) => {
                const language = codeBlock.className.replace(/language-/, '');
                //Prism.highlightElement(codeBlock, false, () => language);
                Prism.highlightElement(codeBlock);
            });
            return {
                slug: archivo.slug,
                title: archivo.titulo,
                content: container.innerHTML
            };
        })

};

// Function to add content before the pre element
function addContentBeforePre() {
    //const preElement = document.querySelectorAll('pre[class^="language-"]');
    const preElement = document.querySelectorAll('pre[class*="language-"]'); // es un vector vacío o con items
    //console.log("PRE es: ", preElement);
    //if (!preElement) return console.log("no hay preee");

    preElement.forEach(element => {

        // Get the class name(s) of the current element [language-html o language-css etc]
        const classNames = Array.from(element.classList);

        // Log or use the class name(s) as needed
        // console.log("Class name(s):", classNames[0]);
        const txtClassName = classNames[0].replace(/language-/, '');

        //const content = document.createTextNode("Titleeee to be inserted before the element!");
        const beforeElement = document.createElement('div');
        beforeElement.classList.add("code-title");
        //beforeElement.appendChild(content);
        beforeElement.innerHTML = `<span class="bloque-title">Bloque <strong>${txtClassName}</strong></span> <button class="bloque-copy" title="Copiar código al portapapeles">Copiar</button>`;

        //console.log("encontre un pre", element, beforeElement);
        element.parentNode.insertBefore(beforeElement, element);
    });
    //preElement.parentNode.insertBefore(beforeElement, preElement);
}




function imprimirTarjetas() {

    console.log("Lista capis es:", A_ListaCapitulos);

    // Realizar todas las solicitudes manteniendo el orden del fetch
    //Promise.all(A_capitulos.map(fetchMarkdown))
    //Promise.all(A_ListaCapitulos["css"].map(fetchMarkdown))
    //Promise.all(A_ListaCapitulos[capituloSeleccionado].map(fetchMarkdown))
    //Promise.all(A_ListaCapitulosTemp[capituloSeleccionado].map(fetchMarkdown))

    let A_articulos = A_ListaCapitulos.find(chapter => chapter.slug === capituloSeleccionado);
    A_articulos = A_articulos.ficheros;

    console.log("A_articuslo es:", A_articulos);

    Promise.all(A_articulos.map(fetchMarkdown))


        // Procesar los resultados de las solicitudes
        .then((A_HtmlArticulos) => {
            console.log("card es: ", A_HtmlArticulos);

            // aquí se puede agregar tanto el Nombre de la sección, como el id para los href!
            // const articuloTitle = "title";//A_articulos.titulo;
            // const articuloSlug = "Capítulo " + capituloSeleccionado;

            // Concatenar y mostrar el HTML generado en orden
            //contentDiv.innerHTML = A_HtmlGenerado.join("");

            //Crear divs con HTML generado y mostrar en orden

            A_HtmlArticulos.forEach(htmlArticulo => {
                const htmlGenerado = htmlArticulo.content;
                const articuloTitle = htmlArticulo.title;
                const articuloSlug = htmlArticulo.slug;
                const articuloPrevSlug = articuloSlug; // proximamente
                const articuloNextSlug = articuloSlug; // proximamente
                const readTime = Math.round(htmlGenerado.length / 1000);
                const customHTML = `<div class="Card" id="${articuloSlug}">
                                    <div class="Card-reading-time">Lectura: ${readTime}min<div>
                                    <h1>${articuloTitle}</h1>
                                    ${htmlGenerado}
                                    <form><label><input id="check_leido_${articuloSlug}" class="tf_leido" type="checkbox"> Marcar como leído</label></form>
                                    <a href="#${articuloPrevSlug}" class="Card-btn Card-btn--primary">Anterior</a>
                                    <a href="#${articuloNextSlug}" class="Card-btn Card-btn--secondary">Siguiente</a>
                                </div>`;
                contentDiv.innerHTML += customHTML;
            });
            addContentBeforePre();
        })
        .catch(error => {
            console.error("Error fetching or processing Markdown:", error);
        });
}





// versión simplificada de obtener documentos con fetch.
// Lista de capitulos Markdown
// const A_capitulos = ["capitulo1.md", "capitulo2.md", "capitulo32.md", "capitulo4.html"];
// document.addEventListener("DOMContentLoaded", function () {
//     // ejemplo de uso de markedJs
//     //document.getElementById('content').innerHTML = marked.parse('# Marked in browser\n\nRendered by **marked**.');
//     // Cargar y mostrar archivos Markdown
//     A_capitulos.forEach((archivo) => {
//         fetch("secciones/" + archivo)
//             .then(response => response.text())
//             .then(textoMarkdown => {
//                 const htmlGenerado = marked.parse(textoMarkdown);
//                 contentDiv.innerHTML += htmlGenerado;
//             });
//     });
// });



// Obtener lista de Capitulos (html o md) y mostrarlos en orden
document.addEventListener("DOMContentLoaded", function () {






});