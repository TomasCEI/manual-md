// Configuración:
const capFolder = "capitulos";                                          // directorio de capitulos del manual
const urlIndexManual = `${capFolder}/index.json`;                       // archivo JSON de indice del manual
const manualGithub = "https://github.com/TomasCEI/manual-html-js-css";  // URL del repositorio del manual en GitHub


const contentDiv = document.getElementById("content");


// Lista de capitulos Markdown
const A_capitulos = ["capitulo1.md", "capitulo2.md", "capitulo32.md", "capitulo4.html"];

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
const A_ListaCapitulos = organizeChapters(A_capitulos2);
console.log(A_ListaCapitulos);




// ------------------  MENU DE CAPITULOS  ------------------ //

// Llamada a la función con tu estructura JSON
//const urlJson = 'ruta/del/manual.json';
function crearMenuCapitulos(manual) {
    const menuCapitulos = document.getElementById('menuCapitulos');
    manual.capitulos.forEach((capitulo, index) => {
        const capituloItem = document.createElement('li');
        capituloItem.innerHTML = `<a href="?cap=${capitulo.slug}">${capitulo.titulo}</a>`;

        if (capitulo.ficheros.length > 0) {
            const subMenu = document.createElement('ul');
            capitulo.ficheros.forEach((fichero) => {
                const ficheroItem = document.createElement('li');
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
    .then(jsonManual => {
        // Llamada a la función con tu estructura JSON
        crearMenuCapitulos(jsonManual);
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












// versión simplificada de obtener documentos con fetch.
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

    // Función para realizar una solicitud de archivo Markdown
    const fetchMarkdown = async (archivo) => {
        console.log("fetching: " + archivo.file);
        return fetch(`${capFolder}/${archivo.file}`)

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
                return container.innerHTML;
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
            beforeElement.innerHTML = `Bloque de código: **${txtClassName}**`;

            //console.log("encontre un pre", element, beforeElement);
            element.parentNode.insertBefore(beforeElement, element);
        });
        //preElement.parentNode.insertBefore(beforeElement, preElement);
    }


    // Realizar todas las solicitudes manteniendo el orden del fetch
    //Promise.all(A_capitulos.map(fetchMarkdown))
    //Promise.all(A_ListaCapitulos["css"].map(fetchMarkdown))
    Promise.all(A_ListaCapitulos[capituloSeleccionado].map(fetchMarkdown))
        .then(A_HtmlGenerado => {


            // Concatenar y mostrar el HTML generado en orden
            //contentDiv.innerHTML = A_HtmlGenerado.join("");

            //Crear divs con HTML generado y mostrar en orden
            // aquí se puede agregar tanto el Nombre de la sección, como el id para los href!
            const seccionTitle = "Capítulo " + capituloSeleccionado;
            const seccionSlug = capituloSeleccionado;

            A_HtmlGenerado.forEach(htmlGenerado => {
                const customHTML = `
                <div style="margin-bottom:30px; border: 1px solid gray; padding:20px;"  class="card darkModeCard" id="${seccionSlug}">
                <div style="display:flex; width:100%; justify-content:space-between; align-items:center">
                    <h1>${seccionTitle}</h1>
                    <h3 style="padding:10px; border:1px solid gray;">Porcentaje leído: X %</h3>
                </div>
                <div id="keywords">Keyword1 ,Keyword2, Keyword3</div>
                ${htmlGenerado}
                </div>
                <hr  style="margin-bottom:30px" >`;
                contentDiv.innerHTML += customHTML;
            });
            addContentBeforePre();
        })
        .catch(error => {
            console.error("Error fetching or processing Markdown:", error);
        });
});