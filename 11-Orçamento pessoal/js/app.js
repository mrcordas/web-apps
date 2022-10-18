"use strict";
class Despesa{
    
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.id = "default";
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    dataVality(){
        for(let x in this){
            if(this[x] === "" || this[x] === undefined || this[x] === null){
                return false;
            }
        }
        return true;
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }
}

class Bd{
    #getNextId(){ //private method
        let quantifierLog = localStorage.getItem("quantifierLog");
        if(quantifierLog === null){
            localStorage.setItem("quantifierLog", 0);
            return 0;
        }
        quantifierLog = parseInt(quantifierLog) + 1;
        localStorage.setItem("quantifierLog", quantifierLog)
        return (quantifierLog); 
    }
    writeData(despesaObj){
        let nextId = this.#getNextId();
        despesaObj.setId(nextId);
        localStorage.setItem(nextId, JSON.stringify(despesaObj)); //converte objeto em notação JSON
    }

    deleteData(id){
        localStorage.removeItem(id);
    }

    // função busca no localstorage
    queryData(){
        const arrDespesa = []; // array de objetos despesa
        let item = null; 
        let quantifierLog = localStorage.getItem("quantifierLog");
        
        for(let i = 0; i <= quantifierLog; i++){
            item = JSON.parse(localStorage.getItem(i));//converte notação JSON em objeto
            if(item === null){
                continue;
            }
            arrDespesa.push(item);
        }
        return arrDespesa;
    }

    //função que filtra a busca do localstorage
    queryFilterData(despesaFilterObj){
       
        let arrFilted = this.queryData();
        if(despesaFilterObj.ano !== ""){
            arrFilted = arrFilted.filter(despesaObj => despesaObj.ano === despesaFilterObj.ano);
        }
        if(despesaFilterObj.mes !== ""){
            arrFilted = arrFilted.filter(despesaObj => despesaObj.mes === despesaFilterObj.mes);
        }
        if(despesaFilterObj.dia !== ""){
            arrFilted = arrFilted.filter(despesaObj => despesaObj.dia === despesaFilterObj.dia);
        }
        if(despesaFilterObj.tipo !== ""){
            arrFilted = arrFilted.filter(despesaObj => despesaObj.tipo === despesaFilterObj.tipo);
        }

        return arrFilted;
    }
}

const bd = new Bd(); //objeto banco de dados (global)

function registration(){
    const despesa = new Despesa(
        anoSelect.value,
        mesSelect.value, 
        diaInput.value,
        tipoSelect.value, 
        descricaoInput.value,
        valorInput.value
    );
    if(!despesa.dataVality()){
        dialogShow("Erro de Gravação", "Existem campos obrigatórios que não foram preenchidos!", 0); //erros
        return;
    }
    bd.writeData(despesa);

    //referencia dos forms pra limpar os valores:
    anoSelect.value = "";
    mesSelect.value = "";
    diaInput.value = "";
    tipoSelect.value = ""; 
    descricaoInput.value = "";
    valorInput.value =  "";

    dialogShow("Registro inserido", "Despesa inserida com sucesso!", 1); //sucesso

}

function loadDataTable(arrDespesa){
    //const arrDespesa = bd.queryData();
    const despesaListTbody = document.getElementById("despesaListTbody");
    despesaListTbody.innerHTML = "";
  
    arrDespesa.forEach(function(despesaObj){
        const row = despesaListTbody.insertRow(-1);
        let tempTipo = "";

        row.insertCell(0).innerHTML = `${despesaObj.dia}/${despesaObj.mes}/${despesaObj.ano}`;
        switch (despesaObj.tipo) {
            case "1":
                tempTipo = "Alimentação";
                break;
            case "2":
                tempTipo = "Educação";
                break;
            case "3":
                tempTipo = "Lazer";
                 break;
            case "4":
                tempTipo = "Saúde";
                break;
            case "5":
                tempTipo = "Transporte";
                break;
            default:
                tempTipo = "erroType";
                break;
        }
        row.insertCell(1).innerHTML = `${tempTipo}`;
        row.insertCell(2).innerHTML = `${despesaObj.descricao}`;
        row.insertCell(3).innerHTML = `${despesaObj.valor}`;

        const btnRemove = document.createElement("span");
        btnRemove.innerHTML = '<img src="./imgs/btn-delete.svg">';
        btnRemove.className = "btnDelete";
        btnRemove.onclick = function(){
            bd.deleteData(despesaObj.id);
            window.location.reload();
        }
        
        row.insertCell(4).appendChild(btnRemove);
    });
}

function searchFilterData(){
    const despesaFilterObj = new Despesa( // agora para buscar filtro
        anoSelect.value,
        mesSelect.value, 
        diaInput.value,
        tipoSelect.value, 
        descricaoInput.value,
        valorInput.value
    );
 
    let arrDespesafilted = []

    // for(let x in despesaFilterObj){
    //    if(despesaFilterObj[x] !== "" && despesaFilterObj[x] !== "default"){
    //         arrDespesafilted = bd.queryFilterData(despesaFilterObj); 
    //         break;
    //    }
    // } 
    arrDespesafilted = bd.queryFilterData(despesaFilterObj);
    loadDataTable(arrDespesafilted);
}