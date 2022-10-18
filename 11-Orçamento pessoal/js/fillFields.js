"use strict";
const anoSelect = document.getElementById('ano');
const mesSelect = document.getElementById('mes');
const diaInput = document.getElementById('dia');
const tipoSelect = document.getElementById('tipo');
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');

const fillField = ()=>{
    //preenche ano
    let strOption = "";
    let arrSelect = [];

    arrSelect = ["2018", "2019", "2020", "2021", "2022"];
    arrSelect.forEach((value)=>{
        strOption += `<option value="${value}">${value}</option>`;
    })
    anoSelect.innerHTML += strOption;

    //preenche mes
    strOption = ""; //esvazia a variavel 
    arrSelect = ["Janeiro", "Feveiro", "Março", "Abril", "Maio", "junho", "julho", "Agosto", "setembro", "outubro", "Novembro", "Dezembro"];
    arrSelect.forEach((value, index)=>{
        strOption += `<option value="${index + 1}">${value}</option>`;
    })
    mesSelect.innerHTML += strOption;

    //preenche dia

    //padrão
    strOption = "";
    arrSelect =[];

    for(let i = 1; i <= 31; i++){
        arrSelect.push(i);
    }
    arrSelect.forEach((value, index)=>{
        strOption += `<option value="${index + 1}">${value}</option>`;
    })

    diaInput.innerHTML += strOption;

    //apos selecionar mes
    mesSelect.onchange = function(){
        diaInput.innerHTML = '<option value="">dia</option>'; //pois o dia refazer o options todos
        strOption = "";
        arrSelect =[];
        let quant_dias = 0;
        switch (parseInt(this.value)) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                quant_dias = 31;
                break;
            case 2:
                quant_dias = 28;
                break;
            default:
                quant_dias = 30;
                break;
        }

        for(let i = 1; i <= quant_dias; i++){
            arrSelect.push(i);
        }
        arrSelect.forEach((value, index)=>{
            strOption += `<option value="${index + 1}">${value}</option>`;
        })

        diaInput.innerHTML += strOption;

    }
   

    //pteenche tipo
    strOption = "";
    arrSelect = ["Alimentação", "Educaçao", "Lazer", "saúde", "transporte"];

    arrSelect.forEach((value, index)=>{
        strOption += `<option value="${index + 1}">${value}</option>`;
    })
    tipoSelect.innerHTML += strOption;


    //controla valor
    function checkInput(value){
        let text = value;
        let pattern = /[^0-9\x2E]/ig; // encontra um caracter nao digito e nao ponto
        if(pattern.test(text)){
            tipShow("Digite apenas numeros!");
            text = text.replace(pattern,"");
        }
        // pattern = /\x2E\b/; //encontra e substitui se iniciar com .
        // if(pattern.test(text)){
        //     tipShow("inicie com um número!");
        //     text = text.replace(pattern,"");
        // }
        
        pattern = text.indexOf('\x2E'); //identifica o primeiro .
        if(pattern === 0){
            tipShow("posição de ponto decimal invalida");
            text = text.split('');
            text[0] = "";
            text = text.join('');
        }else{
            let pattern2 = -1; //de proposito defini como não encontrado
            if (pattern != -1){
                pattern2 = text.indexOf('\x2E', pattern + 1)// aqui verifica se encontra
            }
            
            if(pattern2 != -1){
                tipShow("Apenas um ponto decimal permitido!");
                text = text.split('');
                text[pattern2] = "";
                text = text.join('');
            }
        }

     
        
        
        return text;
    }
     
    valorInput.oninput = function(){
        this.value = checkInput(this.value);
    }
    valorInput.onchange = function(){
        this.value = checkInput(this.value); 
    }
}

fillField();

