let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.result')

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    //if (symbol === 'C') {
       // buffer = "0";
       // runningTotal = 0;
    //}

    switch (symbol) {
        case 'C':
          buffer = "0";
          runningTotal = 0;
          break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation (parseInt(buffer));
            previousOperator = '=';
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '-':
        case '×':
        case '÷':
        case '+':
            handleMath(symbol);
            break;
        
    }
}

// If previous operator === '=', buffer = numberstring

function handleMath(symbol) {
    if (buffer === '0') {
        // do nothing 
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = "0";

}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    } 
}
    

function handleNumber(numberString) {
    if (buffer !== '0' || previousOperator === '=') {
        buffer = '0';
    }

    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
    console.log(buffer);
}

function init() {
    document.querySelector('.buttons')
        .addEventListener('click', function(event) {
          buttonClick(event.target.innerText);
        })
}

init();