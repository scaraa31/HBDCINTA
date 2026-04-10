// pindah section
function nextSection(id) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

// show detail (things i love)
function showDetail(id) {
    document.querySelectorAll('.detail').forEach(d => {
        d.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}

// tiup lilin
function blowCandle() {
    const cake = document.querySelector('#cake img');
    const text = document.getElementById('finalText');

    cake.style.opacity = '0.5';
    text.style.display = 'block';

    launchConfetti();
}

// confetti sederhana
function launchConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        confetti.style.position = 'fixed';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.top = '0px';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.opacity = '1';
        confetti.style.zIndex = '999';

        document.body.appendChild(confetti);

        let fall = setInterval(() => {
            let top = parseFloat(confetti.style.top);
            confetti.style.top = top + 5 + 'px';

            if (top > window.innerHeight) {
                clearInterval(fall);
                confetti.remove();
            }
        }, 20);
    }
}

// =========================
// 🧩 PUZZLE SEDERHANA
// =========================

const puzzleContainer = document.getElementById('puzzle');
const size = 3; // 3x3
let tiles = [];

function initPuzzle() {
    puzzleContainer.innerHTML = '';
    puzzleContainer.style.display = 'grid';
    puzzleContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    puzzleContainer.style.gap = '2px';

    tiles = [];

    for (let i = 0; i < size * size; i++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.width = '100px';
        tile.style.height = '100px';
        tile.style.backgroundImage = "url('img/foto1.jpg')";
        tile.style.backgroundSize = `${size * 100}px ${size * 100}px`;

        let x = i % size;
        let y = Math.floor(i / size);

        tile.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;

        tile.dataset.index = i;
        tile.onclick = () => swapTile(tile);

        tiles.push(tile);
        puzzleContainer.appendChild(tile);
    }

    shuffle();
}

let selected = null;

function swapTile(tile) {
    if (!selected) {
        selected = tile;
        tile.style.opacity = '0.5';
    } else {
        let temp = selected.style.backgroundPosition;
        selected.style.backgroundPosition = tile.style.backgroundPosition;
        tile.style.backgroundPosition = temp;

        selected.style.opacity = '1';
        selected = null;

        checkWin();
    }
}

function shuffle() {
    for (let i = tiles.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = tiles[i].style.backgroundPosition;
        tiles[i].style.backgroundPosition = tiles[j].style.backgroundPosition;
        tiles[j].style.backgroundPosition = temp;
    }
}

function checkWin() {
    let correct = true;

    tiles.forEach((tile, i) => {
        let x = i % size;
        let y = Math.floor(i / size);
        let correctPos = `-${x * 100}px -${y * 100}px`;

        if (tile.style.backgroundPosition !== correctPos) {
            correct = false;
        }
    });

    if (correct) {
        setTimeout(() => {
            alert("Kamu berhasil 😊❤️");
        }, 200);
    }
}

// jalanin puzzle saat halaman load
window.onload = () => {
    initPuzzle();
};