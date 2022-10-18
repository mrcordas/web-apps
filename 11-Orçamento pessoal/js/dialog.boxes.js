"use strict";
function dialogShow(title, description, id){

    //estrutura completa da janela do dialogo
    const contentDialog = '<div id="dialog-background">\
                            <div id="dialog-box">\
                                <div id="header-dialog">\
                                    <span>' + title + '</span>\
                                    <div>\
                                        <img src="./imgs/Picture1.svg" id="close">\
                                    </div>\
                                </div>\
                                <div id="description-dialog">\
                                    <span>' + description + '</span>\
                                </div>\
                                <div class="footer-dialog">\
                                    <input type="button" value="Back" id="btnBack">\
                                </div>\
                            </div>\
                        </div>';
    
    const frameDialog = document.createElement("div"); //só marcação pra inserir o esquema do dialogo fundo e janela
    frameDialog.innerHTML = contentDialog;
    document.body.appendChild(frameDialog);

    const dialogBackground = document.getElementById('dialog-background');
    const dialog = document.getElementById('dialog-box');
    const titleHeader = document.getElementById('header-dialog');
    const btnClose = document.getElementById('close');
    const btnBack = document.getElementById('btnBack');

    dialogBackground.style.display = "block";


    //estilos erro/succeso id 0/1
    if(id === 0){
        titleHeader.style.color = "#c02c07";
        btnBack.style.backgroundColor = "#f14444";
        btnBack.style.borderColor = "#e40606";
        btnBack.value = "Back and fix";
    }
     
    let topPos = getComputedStyle(dialog).getPropertyValue("top");
    topPos = parseInt(topPos);
    const dialogSlider = setInterval(()=>{
        topPos+=30;
        dialog.style.top = topPos + "px";
        if(topPos >= 30){
            clearInterval(dialogSlider);
        }
    }, 5)
    
    btnClose.onclick  = function(){
        frameDialog.remove();
    }
    btnBack.onclick = function(){
        frameDialog.remove();
    }
}

function tipShow(msg){
    const divTipParent = valorInput.parentElement; // div pai
    const divTip = valorInput.previousElementSibling; // div class="tip" anterios adjacente

    divTipParent.style.position = "relative"; 
    divTip.className = "tip";
    divTip.innerHTML = msg;
    setTimeout(function(){
        divTip.innerHTML = "";//para correção
        divTip.className = "";
    }, 1000);
}