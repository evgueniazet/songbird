let wrapper = document.createElement('div');
let header = document.createElement('header');
let headerMenu = document.createElement('div');
let headerInfo = document.createElement('div');
let headerInfoMoves = document.createElement('span');
let headerInfoTime = document.createElement('span');

let info = document.createElement('div');



let buttonLeft = document.createElement('button');
buttonLeft.classList.add('header__menu_button-left');
buttonLeft.innerText = 'Shuffle and start';
headerMenu.appendChild(buttonLeft);


let buttonLeftCenter = document.createElement('button');
let buttonRightCenter = document.createElement('button');
let buttonRight = document.createElement('button');
let buttonLeftText = document.createElement('p');
let buttonLeftCenterText = document.createElement('p');
let buttonRightCenterText = document.createElement('p');
let buttonRightText = document.createElement('p');





let footer = document.createElement('footer');
let footerSelectedSize = document.createElement('div');
let footerSettings = document.createElement('div');
let footerSettingsSignature = document.createElement('span');
let footerSettingsSize = document.createElement('span');
const game = document.createElement('div');

const rightCellMatrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

let cellMatrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];
const emptyCell = 16;

let sec = 0;
let min = 0;
let t;








document.body.append(wrapper);

wrapper.appendChild(header);

header.appendChild(headerMenu);
header.appendChild(headerInfo);
headerInfo.appendChild(headerInfoMoves);
headerInfoMoves.append('Moves : 0');
headerInfo.appendChild(headerInfoTime);
headerInfoTime.append('Time : 0');

headerMenu.appendChild(buttonLeftCenter);
buttonLeftCenter.appendChild(buttonLeftCenterText);
buttonLeftCenterText.append('Stop');
headerMenu.appendChild(buttonRightCenter);
buttonRightCenter.appendChild(buttonRightCenterText);
buttonRightCenterText.append('Save');
headerMenu.appendChild(buttonRight);
buttonRight.appendChild(buttonRightText);
buttonRightText.append('Results');

wrapper.appendChild(game);

wrapper.appendChild(footer);
footer.appendChild(footerSelectedSize);
footerSelectedSize.append('Frame size: 4*4')
footer.appendChild(footerSettings);
footerSettings.appendChild(footerSettingsSignature);
footerSettingsSignature.append('Other sizes: ');
footer.appendChild(footerSettingsSize);


wrapper.classList.add('wrapper');
header.classList.add('header');
headerMenu.classList.add('header__menu');
// buttonLeft.classList.add('header__menu_button-left');
buttonLeftCenter.classList.add('header__menu_button-left-center');
buttonRightCenter.classList.add('header__menu_button-right-center');
buttonRight.classList.add('header__menu_button-right');
headerInfo.classList.add('header__info');
headerInfoTime.classList.add('header__info_time');
headerInfoMoves.classList.add('header__info_moves');
game.classList.add('game');
footer.classList.add('footer');
footerSelectedSize.classList.add('footer__selected-size')
footerSettings.classList.add('footer__settings');
footerSettingsSignature.classList.add('footer__settings_signature');
footerSettingsSize.classList.add('footer__settings_size');
let counterMoves = 0;

shuffleMatrix(cellMatrix);


const renderMatrix = (matrix, targetElement) => {
    targetElement.innerHTML = '';

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const cell = createCell(matrix[y][x]);
            targetElement.appendChild(cell);
        }
    }
};

renderMatrix(cellMatrix, game);



function createCell(id) {
    const cell = document.createElement('div');
    cell.id = id;
    cell.classList.add('game__cell');

    if (id == 16) {
        cell.classList.add('game__cell_empty');
    } else {
        cell.innerHTML = id;
    }
    return cell;
};

const renderCell = (event) => {
    const cellClick = event.target.closest('div');
    const cellNumberClick = event.target.id;

    if (!cellClick) {
        return;
    }
    const cellCoords = findCoordinatesByNumber(cellNumberClick, cellMatrix);
    const emptycellCoords = findCoordinatesByNumber(emptyCell, cellMatrix);
    const isValid = isValidForSwap(cellCoords, emptycellCoords);

    if (isValid) {
        swap(cellCoords, emptycellCoords, cellMatrix);
        renderMatrix(cellMatrix, game);
        counterMoves = counterMoves + 1;
        headerInfoMoves.innerHTML = `Moves: ${counterMoves}`;

        setTimeout(() => {
            if (isWon(cellMatrix)) {
                alert(`Hooray! You solved the puzzle in ##:## and ${counterMoves} moves!`);
            }
        }, 300);
    }
};



renderMatrix(cellMatrix, game);
game.addEventListener('click', renderCell);

buttonLeft.addEventListener('click', () => {
    counterMoves = 0;
    headerInfoMoves.innerHTML = `Moves: ${counterMoves}`;
    shuffleMatrix(cellMatrix);
    renderMatrix(cellMatrix, game);
})

function findCoordinatesByNumber(number, cellMatrix) {
    for (let y = 0; y < cellMatrix.length; y++) {
        for (let x = 0; x < cellMatrix[y].length; x++) {
            if (cellMatrix[y][x] == number) {
                return { x, y };
            }
        }
    }
};

function isValidForSwap(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x);
    const diffY = Math.abs(coords1.y - coords2.y);
    return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y)
};

function swap(cellCoords, emptycellCoords, cellMatrix) {
    const coords1Number = cellMatrix[cellCoords.y][cellCoords.x]; //4
    cellMatrix[cellCoords.y][cellCoords.x] = cellMatrix[emptycellCoords.y][emptycellCoords.x];
    cellMatrix[emptycellCoords.y][emptycellCoords.x] = coords1Number;
};

function getMatrix(shuffleArray) {
    const matrix = [[], [], [], []];
    let y = 0;
    let x = 0;
    for (let k = 0; k < shuffleArray.length; k++) {
        if (x >= 4) {
            y++;
            x = 0;
        }

        matrix[y][x] = shuffleArray[k];
        x++;
    }
    return matrix;
};

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;

};



function shuffleMatrix(matrix) {
    const cellArray = matrix.flat();
    const shuffledArray = shuffleArray(cellArray);
    cellMatrix = getMatrix(shuffledArray);
};




const isWon = (matrix) => {
    const winArray = rightCellMatrix.flat();
    const flatMatrix = matrix.flat();

    for (let i = 0; i < winArray.length; i++) {
        if (flatMatrix[i] !== winArray[i]) {
            return false;
        }
    }

    return true;
}


function tick() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;      
    }
}
function add() {
    tick();
    headerInfoTime.textContent ='Time : ' + (min > 9 ? min : "0" + min)
        + ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

timer();
start.onclick = timer;
stop.onclick = function () {
    clearTimeout(t);

    
}
reset.onclick = function () {
    headerInfoTime.textContent ='Time:' + '00:00';
    seconds = 0; minutes = 0;
}
