"use strict";
const anoSelect = document.getElementById('ano');
const mesSelect = document.getElementById('mes');
const tipoSelect = document.getElementById('tipo');
const add = document.getElementById('add');

const fillField = ()=>{
    //preenche ano
    let strOption = "";
    let arrSelect = ["2018", "2019", "2020", "2021", "2022"];

    arrSelect.forEach((value, index)=>{
    strOption += `<option value="${index + 1}">${value}</option>`;
    })
    anoSelect.innerHTML += strOption;

    //pteenche mes
    strOption = ""; //esvazia a variavel 
    arrSelect = ["Janeiro", "Feveiro", "Março", "Abril", "Maio", "junho", "julho", "Agosto", "setembro", "outubro", "Novembro", "Dezembro"];

    arrSelect.forEach((value, index)=>{
    strOption += `<option value="${index + 1}">${value}</option>`;
    })
    mesSelect.innerHTML += strOption;

    //pteenche alimentação
    strOption = "";
    arrSelect = ["Alimentação", "Educaçao", "Lazer", "saúde", "transporte"];

    arrSelect.forEach((value, index)=>{
    strOption += `<option value="${index + 1}">${value}</option>`;
    })
    tipoSelect.innerHTML += strOption;
}

fillField();
add.onclick = ()=>{
    alert("OK");
}