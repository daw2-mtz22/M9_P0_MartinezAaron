import {DOMParser} from "@xmldom/xmldom";


const createFichaBody = (title, portadaPath, puntuacion) =>{
    return `
        <div class="ficha">
            <div class="col-fichas">
                <h3 class="ficha-title">${title}</h3>
                <div class="ficha-img-wrapper">
                    <img src="./assets/${portadaPath}" alt="${title}">
                </div>
                <div>${createPuntuacionBody(puntuacion)}</div>
            </div>
        </div>
    `;
}
const createPuntuacionBody = (puntuacion = 0) =>{
    return puntuacion
}
const writeFichas = fichas =>{
    if (typeof document !== 'undefined') {
        let containerDiv = document.getElementsByClassName('fila col-fichas')[0]
        containerDiv.innerHTML = fichas
    }
}
const createXmlRequest = filePath=> {
    let fichasHTML = '';
     fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data,'text/xml');
            const elements = xmlDoc.getElementsByTagName('pelicula');
            for(let i = 0;i<elements.length; i++){
                const title = elements[i].getElementsByTagName('titulo')[0].textContent;
                const imagePath = elements[i].getElementsByTagName('imagenPortada')[0].textContent;
                const rating = elements[i].getElementsByTagName('estrellas')[0].textContent;
                fichasHTML += createFichaBody(title, imagePath, rating)
                console.log(i)
            }
            writeFichas(fichasHTML)
        })
        .catch(error => {
            console.error('Error loading the XML file', error);
        });
}
createXmlRequest('http://localhost:5173/assets/peliculas.xml')