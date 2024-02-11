/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let d = {};
    let le = this.words.length;
    let lst;
    for (let i = 0; i < le; i++) {
      if (this.words[i] in d) {
        lst = d[this.words[i]];
        lst.push(this.words[i + 1] || null);
        d[this.words[i]] = lst;
      } else {
        d[this.words[i]] = [this.words[i + 1] || null];
      }
    }
    this.d = d;
  }

  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const result = [];
    let word = MarkovMachine.choice(Object.keys(this.d));
    result.push(word);
    for (let i = 0; i < numWords - 1; i++) {
      let newWord = MarkovMachine.choice(this.d[word]);
      if (!newWord) {
        return result.join(" ");
      }
      result.push(newWord);
      word = newWord;
    }
    return result.join(" ");
  }
}
module.exports = { MarkovMachine };
