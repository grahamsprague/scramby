import { Component, OnInit } from '@angular/core';

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

    // check to see if letter has been used
    this.click.play();
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


  submitClicked() {
    console.log('clear clicked');
    // check word

    console.log( this.checkWord(this.word) );

    if ( this.checkWordsFound(this.word) >= 0 ) {
      this.message = 'You already found this word!';
    } else {

      // word has not been found so lets check if its on the list
      if ( this.checkWord(this.word) >= 0 ) {
        this.ding.play();
        this.points = this.points + (this.word.length * 100);
        this.message = 'Yeah!';
        this.words_found.push(this.word);
        // check for winner
        if ( this.words_found.length === this.words.length ) {
          this.boom.play();
          this.message = 'You Win!';
        }

      } else {
        this.buzz.play();
        this.message = this.word + ' is not in the list!';
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


  ngOnInit() {
    this.buildLetterGroup();
    this.buildWordGroup();
  }

}
