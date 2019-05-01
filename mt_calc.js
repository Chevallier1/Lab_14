"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Nicolas Catlin
   Date: 04/30/2019
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/






/* ===================================================================== */
window.addEventListener("load", init); // Run init function on load
// Provided function
function eraseChar(textStr) { 
   return textStr.substr(0, textStr.length - 1);
}
// Provided function
function evalEq(textStr, decimals) {
   var lines = textStr.split(/\r?\n/);
   var lastLine = lines[lines.length-1];
   var eqValue = eval(lastLine);
   return eqValue.toFixed(decimals);
}  
// Provided function (edited to work) - had issues with it
var prevLineIndex = 2;
function lastEq(textStr) {
   var lines = textStr.split(/\r?\n/);
   if(lines.length<prevLineIndex) prevLineIndex--;
   var lastExp = lines[lines.length-prevLineIndex];
   console.log("lastExp:"+lastExp);
   
   return lastExp.substr(0, lastExp.indexOf("=")).trim();
}

function init() { // init function to set up event handlers
    var calcButtons = document.getElementsByClassName("calcButton"); // Commits page elements to calcButton variable
    for (var i = 0; i < calcButtons.length; i++) { // loop through buttons for event listener for clicks
        calcButtons[i].addEventListener("click",function(){buttonClick(this.getAttribute("value"))});
    }
    document.getElementById("calcWindow").onkeydown = calcKeys; // event listener for key presses
}

function buttonClick(buttonValue) { // ButtonClick function to allow input to be commit in calculator
    var calcValue = document.getElementById("calcWindow").value; 
    var calcDecimal = document.getElementById("decimals").value; 
    switch (buttonValue){ // Switch-Case for buttonValue to set up delete, backspace, enter and previous commands for calculator
        case "del": // Clears all entries and leaves an empty text window in calculator
            calcValue = "";
            prevLineIndex = 2;
            break;
        
        case "bksp": // Removes one character from the calculator
            calcValue = eraseChar(calcValue);
            break;
        
        case "enter": // Evaluates the expression to produce a solution
        calcValue += " = "+evalEq(calcValue, calcDecimal) + "\r\n";
        prevLineIndex = 2;
        break;
        
        case "prev": // Retrieves the last line evaluated
            if(prevLineIndex > 2){
                //remove current line and find line on the prev index
                var lines = calcValue.split(/\r?\n/);
                var lastLine = lines[lines.length - 1];
                calcValue = calcValue.substring( 0, calcValue.length-lastLine.length );
            }            
            var lastEquation = lastEq(calcValue);
            prevLineIndex++;            
            
            calcValue += lastEquation;            
            break;
        
        default: // if none else are true, run default
            calcValue += buttonValue;
            break;
    }
    
    document.getElementById("calcWindow").value = calcValue; // Sets value of calcWindow to calcValue
    document.getElementById("calcWindow").focus(); // Leaves focus on window for keyboard presses
}

function calcKeys(e) { // calcKeys function for keypresses
	var calcValue = document.getElementById("calcWindow").value;
	var calcDecimal = document.getElementById("decimals").value;
	switch (e.key) { // Switch-Case for key presses
		case "Delete": // Clears entries
		calcValue = "";
		break;

		case "Enter": // Computes
		calcValue += " = " + evalEq(calcValue, calcDecimal);
		break;
		
		case "ArrowUp": // Retrieves previous entries
		e.preventDefault();
		calcValue += lastEq(calcWindow.value);
		break;
	}
	document.getElementById("calcWindow").value = calcValue;
}


