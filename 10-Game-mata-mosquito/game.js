"use strict"

let heigthWindow = window.innerHeight;
let widthWindow = window.innerWidth;
let posX = 0;
let posY = 0;


const winBody = document.body;

const alvoImg = document.getElementById('alvoMosquido'); //é o elemento img com do mosquito
alvoImg.style.display = "none";//estado inicial

let hitCount = 0; // controla os pontos de vida

/*cronometro*/
let cronometerValue = 30; // valor inicial do cronometro
document.getElementById('cronometro').innerHTML = cronometerValue;
//obtem o nivel
let levelInterval = 1500; // intervalo em ms
let level = document.location.search; // pega a strig vinda da pagina start pelo form
level = level.replace("?level=", "");

if(level === "normal"){
    levelInterval = 1500;
}else if(level ==="Hard"){
    levelInterval = 1000;
}else if(level ==="Hard"){
    levelInterval = 750;
}

//obtem os valores do janela
const getSizeCurrentWindow = function(){
    heigthWindow = window.innerHeight;
    widthWindow = window.innerWidth;
}

//atualiza os valores conforme o tamanho da janela
winBody.onresize = function(){ // evento
    getSizeCurrentWindow();
}

//retorna 3 tamanhos de largura do mosquito
const setSizeRandowMosquito = function(){
    let sizerandom = Math.floor(Math.random() * 3);
    if (sizerandom === 0){
        return 50;
    }
    if(sizerandom === 1){
        return 100;
    }
    if(sizerandom === 2){
        return 150;
    }

}

//gera o imagem invertida do mosquito
const setSideMosquito = function(){
    let sideRandom = Math.floor(Math.random() * 2);
    if (sideRandom === 0){
        return 1;
    }else{
        return -1;
    }
}

const setRandonPosMosquito = function(){
    let sizePx = setSizeRandowMosquito(); // tamanho randomico
    let side = setSideMosquito(); // lado randomico
    let display = alvoImg.style.display;

    
    const hitPointsCollection = document.getElementById('vidas').children; // coleta as três imagens da vida

    posX = Math.floor(Math.random() * (widthWindow - sizePx));
    posY = Math.floor(Math.random() * (heigthWindow - sizePx));

    if(display !== "none"){
        hitPointsCollection[hitCount].setAttribute('src', "./imgs/coracao_vazio.png");
        hitCount++;
        if(hitCount > 2){
            clearInterval(startMosquito);
            clearInterval(cronometer);
            window.location.href = "./over.html";
        }
    }
   
    alvoImg.style.display = "block";
    alvoImg.style.width = sizePx + "px";
    alvoImg.style.transform = "scaleX(" + side + ")";
    alvoImg.style.left = posX + "px";
    alvoImg.style.top = posY + "px";

    // console.log(widthWindow, heigthWindow);
    // console.log(posX, posY);
    // console.log(alvoImg);
   
}

alvoImg.onclick = function(){
    this.style.display = "none";
}

/* chama a função  setRandonPosMosquito() e intervalos definos pelo
    na pagina inicial
*/
const startMosquito = setInterval(setRandonPosMosquito, levelInterval);

const cronometer = setInterval(function(){
    document.getElementById('cronometro').innerHTML = cronometerValue;
    if(cronometerValue > 0){
        cronometerValue -= 1;
    }else{
        clearInterval(cronometer);
        clearInterval(setRandonPosMosquito);
        window.location.href = "./winner.html";
    }  
}, 1000)



