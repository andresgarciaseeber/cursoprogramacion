/* DOM 

1) Acceder a un elemento del DOM
2) Acceder a los hijos de un elemento del DOM
3) Acceder al padre de un elemento del DOM
4) Acceder al hermano anterior de un elemento del DOM
5) Acceder al hermano siguiente de un elemento del DOM
6) Acceder a los ancestros de un elemento del DOM
7) Acceder a los descendientes de un elemento del DOM   

*/

//console.dir(document);

//console.dir(document.body);

const titulo = document.getElementById('titulo') // Acceder a un elemento del DOM

//console.log(titulo);

//titulo.innerText = 'Nueva pagina'; // Cambiar el texto de un elemento del DOM

/* DESAFIO
Dado dos variables hay que sumar a + b y mostrar el resultado en el HTML
*/
/*
let a = 10;
let b = 20;

const resultado = document.getElementById('resultado');

resultado.innerText = `El resultado es: ${a + b}`; // a + b;


let mensaje = document.querySelector('.mensaje')

mensaje.innerHTML = `<div class="mensaje__detalle"><h2>Titulo del mensaje</h2><p>Esto es un mensaje</p></div>`

let mensajes = [
{ autor: 'Luis', texto: 'Esto es un mensaje 1' },
{ autor: 'Pepe', texto: 'Esto es un mensaje 2' },
{ autor: 'Kid', texto: 'Esto es un mensaje 3' },
{ autor: 'Hugo', texto: 'Esto es un mensaje 4' },
{ autor: 'Boss', texto: 'Esto es un mensaje 5' },
]

function mostrarMensajes() {
    let mensajesHtml = '';
    for (let i = 0; i < mensajes.length; i++) {
        mensajesHtml += `<div class="mensaje__detalle"><h2>${mensajes[i].autor}</h2><p>${mensajes[i].texto}</p></div>`
    }
    mensaje.innerHTML = mensajesHtml
}

mostrarMensajes()
*/

/*
let mensajesHtml = '';
for (let i = 0; i < mensajes.length; i++) {
    mensajesHtml += `<div class="mensaje__detalle"><h2>${mensajes[i].autor}</h2><p>${mensajes[i].texto}</p></div>`
}

mensaje.innerHTML = mensajesHtml
*/


/* 
- Renderizar la lista de tweets
- Un tweet tiene este formato: 
    div>
        p>content
        div> lista de imagenes 
        div> 
            button> nro_likes like
            button> nro_retweets retweet
        OPCIONAL:
        div>
            div> LISTA DE Threads
                h3> Author
                p> content
                div> 
                    button> nro_likes like
                    button> nro_retweets retweet

        así quedó el html 
        <div class="tweet">
                    <p>content</p>
                    <div class="attachments">
                    </div>
                    <div>
                        <button class="like">nro_likes like</button>
                        <button class="retweet">nro_retweets retweet</button>
                    </div>
                    <div class="threads">
                        <h3>Author</h3>
                        <p>content</p>
                    </div>
                </div>

- Un tweet puede tener attachments o no, por ahora todos los attachments seran imagenes.
    - Si no los tiene NO deberan renderizar nada.
    - TIP: if(tweet.attachments.length === 0) te dice si esta vacio

- Un tweet puede tener thread o no, siempre sera un array
    - Si no los tiene NO deberan renderizar nada.
*/


let tweets = [
    {
        id: 1,
        content: 'Hoy comi un alfajor',
        attachments: [
            'https://www.farmaciassanchezantoniolli.com.ar/13210-thickbox_default/terrabusi-alfajor-triple-cl%C3%A1sico-x-70g.jpg',
            'https://atomoconviene.com/atomo-ecommerce/56032-pdt_540/alfajor-terrabusi-torta-70-grs-1-unid--.jpg'
        ],
        likes: 30,
        retweets: 3,
        thread: [
            {
                id: 2, 
                content: 'Igual prefiero el guaymallen',
                author: 'Agustin',
                author_id: 1,
                likes: 40,
                retweets: 3
            },
            {
                id: 3, 
                content: 'Aguante el capitan espacio!',
                author: 'Ivan',
                author_id: 2,
                likes: 40,
                retweets: 3
            }
        ]
    },
    {
        id: 2,
        content: 'Hoy comi un alfajor',
        likes: 30,
        retweets: 3,
        thread: []
    }
]

let tweetsHtml = '';

for (let i = 0; i < tweets.length; i++) {
    tweetsHtml += `
        <div class="tweet">
            <p>${tweets[i].content}</p>
            <div class="attachments">
    `;
    
    // Agregar imágenes si existen
    if (tweets[i].attachments && tweets[i].attachments.length > 0) {
        for (let j = 0; j < tweets[i].attachments.length; j++) {
            tweetsHtml += `<img src="${tweets[i].attachments[j]}" width="100" height="auto">`;
        }
    }
    
    tweetsHtml += `
            </div>
            <div>
                <button class="like">${tweets[i].likes} likes</button>
                <button class="retweet">${tweets[i].retweets} retweets</button>
            </div>
    `;
    
    // Agregar threads si existen
    if (tweets[i].thread && tweets[i].thread.length > 0) {
        tweetsHtml += `<div class="threads">`;
        
        for (let j = 0; j < tweets[i].thread.length; j++) {
            tweetsHtml += `
                <h3>${tweets[i].thread[j].author}</h3>
                <p>${tweets[i].thread[j].content}</p>
                <div>
                    <button class="like">${tweets[i].thread[j].likes} likes</button>
                    <button class="retweet">${tweets[i].thread[j].retweets} retweets</button>
                </div>
            `;
        }
        
        tweetsHtml += `</div>`;
    }
    
    tweetsHtml += `</div>`; // Cierra el div.tweet
}

// Insertarlo en el HTML
document.body.innerHTML = tweetsHtml;