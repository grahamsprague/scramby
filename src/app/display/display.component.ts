import { Component, OnInit } from '@angular/core';
import {TimelineMax} from 'gsap';
import {Power2} from 'gsap';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  letters = [];
  words = [];
  word = '';
  words_found = [];
  message = '';
  points = 0;
  points_add = 0;
  tl1;

  boom = this.createAudio('boom');
  buzz = this.createAudio('buzz');
  click = this.createAudio('click');
  ding = this.createAudio('ding');
  constructor() { }

  buildLetterGroup() {
    this.letters = [
      { id: 1, name: 'a', used: false },
      { id: 2, name: 'c', used: false },
      { id: 3, name: 't', used: false },
      { id: 4, name: 's', used: false },
      { id: 5, name: 'h', used: false }
    ];
  }

  buildWordGroup() {
    this.words = [
      'a',
      'act',
      'acts',
      'at',
      'ash',
      'cat',
      'cats',
      'cast',
      'cash',
      'sat',
      'sac',
      'shat',
      'has',
      'hat',
      'hats',
      'chat',
      'chats',
      'tach',
      'tachs',
      'hast',
      'scat',
      'ahs',
      'sha',
      'tas',
      'ah',
      'ha',
      'sh',
      'ta',
      'as',

    ];
  }


  useLetter(letter) {
    const index = this.letters.indexOf(letter);
    this.letters[index].used = true;

  }

  useLettersClear() {
    for (let i = 0; i < this.letters.length; i++) {
      this.letters[i].used = false;
      this.word = '';
    }
  }

  letterUsed(letter) {
    const index = this.letters.indexOf(letter);
    return this.letters[index].used;
  }

  letterClicked(letter) {
    this.click.play();
    // check to see if letter has been used

    if ( ! this.letterUsed(letter) ) {
      // mark letter as used
      this.useLetter(letter);

      // add this letter to the current workd string
      this.word = this.word + letter.name;
    }

  }

  checkWord(word) {
    return this.words.indexOf(word);
  }

  checkWordsFound(word) {
    return this.words_found.indexOf(word);
  }

  shuffleLettersClicked() {
    this.shuffle(this.letters);
  }

  submitClicked() {
    console.log('clear clicked');
    // check word

    console.log( this.checkWord(this.word) );

    if ( this.checkWordsFound(this.word) >= 0 ) {
      this.message = '"' + this.word.toUpperCase() + '" already found!';
    } else {

      // word has not been found so lets check if its on the list
      if ( this.checkWord(this.word) >= 0 ) {
        this.ding.play();
        this.points_add = (this.word.length * 100) + this.word.length;
        this.points = this.points + this.points_add;
        this.message = 'You got one!';
        this.words_found.push(this.word);

        // console.log(this.tl1);

          const myscoreitem = document.getElementsByClassName('word-container');
          const mycontainer = document.getElementsByClassName('well');
          this.tl1.to(myscoreitem, 0, { opacity: 1 } )
          .from(myscoreitem, .5, { scale: 300, opacity: 0, ease: Power2.easeOut } )
          .to(mycontainer, .05, {
            y: -3,
            ease: Quad.easeInOut
          })
          .to(mycontainer, .05, {
            repeat: 4,
            y: 3,
            yoyo: true,
            delay: .1,
            ease: Quad.easeInOut
          })
          .to(mycontainer, .1, {
            x: 0,
            delay: .1 * 4
          })
          ;

        // check for winner
        if ( this.words_found.length === this.words.length ) {
          this.boom.play();
          this.message = 'You Win!';

        }

      } else {
        this.buzz.play();
        this.message = '"' + this.word.toUpperCase() + '" is not a word!';
      }

    }
    this.useLettersClear();
  }

  createAudio(name) {
    const audio = new Audio();

    if (name === 'buzz') {
      audio.src = '../../assets/buzz.mp3';
      audio.load();
      return audio;
    }

    if (name === 'boom') {
      audio.src = '../../assets/boom.mp3';
      audio.load();
      return audio;
    }

    if (name === 'click') {
      audio.src = '../../assets/click.mp3';
      audio.load();
      return audio;
    }

    if (name === 'ding') {
      audio.src = '../../assets/ding.mp3';
      audio.load();
      return audio;
    }

  }


  shuffle (array) {
    let i = 0, j = 0, temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  ngOnInit() {
    this.buildLetterGroup();
    this.buildWordGroup();
    this.tl1 = new TimelineMax();

  }

}
