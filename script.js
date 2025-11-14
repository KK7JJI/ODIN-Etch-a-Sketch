
const etchASketch = function() {

    bodyHTML = document.querySelector("body");
    resetButton = document.querySelector(".etch-a-sketch-reset");
    etchASketchContainer = document.querySelector(".etch-a-sketch-container");

    const removeOldEtchASketch = function () {
        while (etchASketchContainer.firstChild) {
            etchASketchContainer.removeChild(etchASketchContainer.firstChild);
        }
    }

    const insertNewEtchASketch = function (sketchSize) {
        etchASketchContainer.style.width = 500;
        etchASketchContainer.style.height = 500;

        for (let i=0; i < (+sketchSize) ** 2; i++) {
            etchASketchContainer.appendChild(createUnitBoxDiv(sketchSize));
        }
    }

    const createUnitBoxDiv = function (sketchSize) {

        let myWidth = etchASketchContainer.scrollWidth / +sketchSize;
        let myHeight = etchASketchContainer.scrollHeight / +sketchSize;

        newDiv = document.createElement('div');
        newDiv.classList.add("etch-a-sketch-unit-box");
        newDiv.appendChild(document.createTextNode("10"));

        newDiv.style.width = myWidth + "px";
        newDiv.style.height = myHeight + "px";

        return newDiv;
    }

    const makeANewEtchASketchArray = function (e) {
        let userInput = "";

        let notsquare = true;
        while ( isNaN(+userInput) || +userInput < 1 || +userInput > 100 || notsquare ) {
            userInput = +prompt("How many squares? (enter a square, 2x2=4, 8x8=64, etc.");
            if (Math.sqrt(+userInput) == Math.floor(Math.sqrt(+userInput))) {
                notsquare = false;
            }
        }

        removeOldEtchASketch();
        insertNewEtchASketch(Math.sqrt(+userInput));
    }
   
    const updateUnitBoxColor = function (e) {

        if (!(e.target === etchASketchContainer)) {
            if (+e.target.innerText > 0) {
                transparency = +(--e.target.innerText) / 10;
            } else {
                transparency = 0;
            }

            let r = randomInt(0,255);
            let g = randomInt(0,255);
            let b = randomInt(0,255);

            e.target.style.backgroundColor = 
                `rgba(${r},${g},${b},${transparency})`;
        }
    }

    const randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;        
    }


    resetButton.addEventListener('click',makeANewEtchASketchArray);
    etchASketchContainer.addEventListener('mouseover',updateUnitBoxColor);

}

etchASketch();
