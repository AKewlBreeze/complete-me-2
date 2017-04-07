import Node from '../scripts/node'
export default class Trie  {
  constructor() {
    this.head = new Node('')
    this.count = 0;
  }

  wordCount() {
    return this.count;
  }


  insert (word) {
    word = word.split('')
    let currentNode = this.head;

    while (word.length) {
      let firstLetter = word.splice(0, 1);

      firstLetter = firstLetter[0];

      if (!currentNode.children[firstLetter]) {
        currentNode.children[firstLetter] = new Node(firstLetter)
      }

      currentNode = currentNode.children[firstLetter]
    }

    currentNode.isWord = 1;
    this.count++
  }

  populate(dictionary) {
    dictionary.forEach((word) => {
      this.insert(word);

    });

  }

  find (word) {
    let currentNode = this.head;

    word = word.split('')

    while (word.length) {
      currentNode = currentNode.children[word.shift()]
    }

    return currentNode
  }


  lookDown (currentNode, prefix, array) {
    let suggest = array || []

    if (currentNode.isWord) {
      let wordAndCount = {count: currentNode.timesSelected, prefix}

      suggest.push(wordAndCount)
    }
    Object.keys(currentNode.children).forEach((val) => {
      let tempPrefix = prefix + val

      this.lookDown(currentNode.children[val], tempPrefix, suggest)
    })
    let sortedWordCountArray = suggest.sort((a, b) => {
      return b.count - a.count
    })

    let finalWordArray = sortedWordCountArray.map(i => {
      return i.prefix
    })
    
    return finalWordArray
  }

  suggest (word) {
    let prefix = word
    let currentNode = this.find(word)

    let suggestResults = this.lookDown(currentNode, prefix)

    return suggestResults
  }

  select(userWord) {
    let currentLetter  = this.head;
    let letters        = userWord.split('');

    letters.forEach( letter => {
      if (currentLetter.children[letter]) {
        currentLetter = currentLetter.children[letter];
      }
      return currentLetter;
    })
    currentLetter.timesSelected++

  }
}
