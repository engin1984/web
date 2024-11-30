// ########## vite
import javascriptLogo from './img/javascript.svg'
import viteLogo from '/img/vite.svg'
import { setupCounter } from './counter.js'
import "/my-bulma.scss"


document.querySelector('#app').innerHTML = `
<div>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"><img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" /></a>
<a href="https://vite.dev" target="_blank"><img src="${viteLogo}" class="logo" alt="Vite logo" /></a>
<button class="button" id="counter" type="button"></button>
</div>
`

setupCounter(document.querySelector('#counter'))



// ########## bulma menu burger
  document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });








// ########## modal
  document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeAllModals();
      }
    });
  });

// ##########

import { Chessground } from './node_modules/chessground/dist/chessground.js';

Chessground(document.getElementById('board-1'), {});
Chessground(document.getElementById('board-2'), {
  fen: 'r2q2k1/1p6/p2p4/2pN1rp1/N1Pb2Q1/8/PP1B4/R6K b - - 2 25',
});
Chessground(document.getElementById('board-3'), {
  drawable: {
    autoShapes: [
      {
        orig: 'a2',
        dest: 'a6',
        brush: 'green',
        label: { text: 'A' },
        modifiers: {
          hilite: true,
        },
      },
      {
        orig: 'b2',
        dest: 'b6',
        brush: 'blue',
        label: { text: 'B' },
        modifiers: {
          lineWidth: 6,
        },
      },
      {
        orig: 'c2',
        dest: 'c4',
        brush: 'red',
        label: { text: 'C' },
      },
      {
        orig: 'd2',
        dest: 'd3',
        brush: 'green',
        label: { text: 'D' },
      },
      {
        orig: 'f1',
        dest: 'h3',
        brush: 'blue',
        label: { text: 'F' },
      },
      {
        orig: 'g1',
        dest: 'f3',
        brush: 'yellow',
        label: { text: 'E' },
      },
    ],
  },
});
Chessground(document.getElementById('board-4'), {
  orientation: 'black',
  coordinatesOnSquares: true,
  ranksPosition: 'left',
});
Chessground(document.getElementById('board-5'), {
  orientation: 'white',
  coordinatesOnSquares: true,
});

// ########## 



// ########## 