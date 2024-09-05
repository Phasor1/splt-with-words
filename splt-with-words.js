export default function splt({ target = '.splt', reveal = false }) {
  let saveOriginal = [];

  //grab instances
  const inst = document.querySelectorAll(target);

  for (let a = 0; a < inst.length; a++) {
    inst[a].setAttribute('id', 'i' + [a + 1]);
    inst[a].style.display = 'inline'

    let wordsSpans = []

    //saves original text to an array for revert functionality
    saveOriginal.push(inst[a].innerHTML);

    //split instance text
    const instChars = inst[a].innerHTML.split('');
    for (let b = 0; b < instChars.length; b++) {
      //nest child span
      const span = document.createElement('span');
      span.setAttribute('id', 'c' + [b + 1]);

      //check if child = char or whitespace
      if (instChars[b] == ' ') {
        span.classList.add('whtSpc');
      } else {
        span.classList.add('char');
        //add char styles
        const char = document.querySelectorAll('.char');
        for (let c = 0; c < char.length; c++) {
          char[c].style.display = 'inline-flex';
          char[c].style.overflow = 'hidden';
          char[c].style.verticalAlign = 'top';
        }
      }

      //reveal init
      if (reveal == true) {
        //nest grandchild span
        const spanChild = document.createElement('span');
        spanChild.innerHTML = instChars[b]; //set text to grandchild span
        span.style.overflow = 'hidden';
        span.style.display = 'inline-flex';
        span.appendChild(spanChild);
        spanChild.setAttribute('id', 'r');
        spanChild.classList.add('reveal');
        spanChild.style.display = 'inline-flex';
        //add charReveal styles
        const charReveal = document.querySelectorAll('.reveal');
        for (let d = 0; d < charReveal.length; d++) {
          charReveal[d].style.display = 'inherit';
          charReveal[d].style.overflow = 'inherit';
          charReveal[d].style.verticalAlign = 'inherit';
        }
      } else {
        span.innerHTML = instChars[b]; //set text to child span
      }

      if(b == 0) {
      	let wordSpan = document.createElement('span')
      	wordSpan.classList.add('splt-word')
      	wordSpan.style.whiteSpace = 'nowrap'
      	wordsSpans.push(wordSpan)
      	wordsSpans[wordsSpans.length-1].appendChild(span)
      }else if (b < instChars.length-1) {
      	if(instChars[b] !== ' ') {
					wordsSpans[wordsSpans.length-1].appendChild(span)
				}else{
					let wordSpan = document.createElement('span')
					wordSpan.classList.add('splt-word')
					wordSpan.style.whiteSpace = 'nowrap'
					wordsSpans.push(wordSpan)
				}
      }else {
				wordsSpans[wordsSpans.length-1].appendChild(span)
      }

      // append span char element to target
      // inst[a].appendChild(span);
    }

    // words appending

    wordsSpans.forEach(word => {
    	inst[a].appendChild(word)
    	let space = document.createElement('span')
    	space.classList.add('word-space')
    	space.style.position = 'relative'
    	space.innerHTML = ' ';
    	inst[a].appendChild(word)
    	inst[a].appendChild(space)
    })

    inst[a].removeChild(inst[a].childNodes[0]); // remove initial text input
  }

  //undo text splitting
  splt.revert = () => {
    for (let e = 0; e < inst.length; e++) {
      inst[e].removeAttribute('id');
      inst[e].innerHTML = saveOriginal[e]; //sets text to original value
    }
  };
}