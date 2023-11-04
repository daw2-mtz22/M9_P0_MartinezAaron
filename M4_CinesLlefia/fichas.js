import DomParser from "./no";


const createFichaBody = (title, portadaPath, puntuacion) =>{
    return `
        <div class="ficha">
            <div class="col-fichas">
                <h3 class="ficha-title">${title}</h3>
                <div class="ficha-img-wrapper">
                    <img src="${portadaPath}" alt="${title}">
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
        let containerDiv = document.getElementsByClassName('fila col-fichas')
        containerDiv.innerHTML = fichas
    }
}
const createXmlRequest = filePath=> {
    let fichasHTML = '';
     fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const parser = new DomParser();
            const xmlDoc = parser.parseFromString(data,'text/xml');

            const elements = xmlDoc.getElementsByTagName('pelicula');
            elements.forEach(element =>{

                const title = element.getElementsByTagName('titulo')[0].textContent;
                const imagePath = element.getElementsByTagName('imagenPortada')[0].textContent;
                const rating = element.getElementsByTagName('estrellas')[0].textContent;
                fichasHTML += createFichaBody(title, imagePath, rating)
            })
            writeFichas(fichasHTML)
        })
        .catch(error => {
            console.error('Error loading the XML file', error);
        });
}

createXmlRequest('http://127.0.0.1:8080/assets/peliculas.xml')