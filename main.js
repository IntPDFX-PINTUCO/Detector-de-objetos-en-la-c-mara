foto = ""
lista = []
function setup() {
    canvas = createCanvas(foto.width, foto.height)
    background("blue")
    ia = ml5.objectDetector("cocossd", ia_cargada)
}
function preload() {
    foto = loadImage("dog_cat.jpeg")
}
function draw() {
    image(foto, 0, 0, width, height)
    if(lista.length>0){
        textSize(17)
        lista.forEach(element => {
            noFill()
            stroke("#0099f9")
            strokeWeight(5)
            rect(element.x, element.y, element.width, element.height)
                        strokeWeight(3)
            fetch("https://api.mymemory.translated.net/get?q=" + element.label + "&langpair=en|es")
            .then(response => response.json())
            .then(data => {
                traduccion = data.responseData.translatedText; console.log(traduccion)
                fill("black")
                text(traduccion, element.x, element.y)
            });
        });
        noLoop()
    }
}
function resultado(error, respuesta) {
    if (error) {
        console.error(error)
    }
    else {
        console.log(respuesta)
        lista = respuesta
    }
}
function ia_cargada() {
    console.log("Ia cargada");
    document.getElementById("detectar").disabled = false
}
function detectar() {
    ia.detect(foto, resultado)
}
function c() {
    imagen=document.getElementById("subir").files[0]
    if(imagen){
        foto = loadImage(URL.createObjectURL(imagen))
        foto.resize(width,height)
        lista=[]
        detectar()
        loop()
    }
}