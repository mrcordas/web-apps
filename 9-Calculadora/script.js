"use strict";

const btn = document.getElementsByTagName('button');
btn[7].onmousedown = function(){
    calc(this, '7');
}

btn[7].onmouseup = function(){
    removeclass(this);
}

function calc(obj, digit){
    obj.className = "teste";
}

function removeclass(obj){
    obj.className = "";
}