const axios = require("axios");
const _ = require("lodash");
const numWords = require("num-words");

const misinterpretMessage = async (message) => {
  message = replaceNumbersWithWords(message);

  for (const word of _.words(message)) {
    if (word.length > 1 && Math.random() > 0.7) {
      let misinterpretedWord = await getSimilarWord(word);
      message = message.replace(word, misinterpretedWord);
    }
  }

  return message.charAt(0).toUpperCase() + message.slice(1);
};

const replaceNumbersWithWords = (message) => {
  for (const word of _.words(message)) {
    if (!isNaN(word)) {
      let numword = numWords(parseInt(word));
      message = message.replace(word, numword);
    }
  }

  return message;
};

const getSimilarWord = async (word) => {
  try {
    const res = await axios.get(`https://api.datamuse.com/words?rel_rhy=${escape(word)}`);

    if (!res.data.length)
        return word;

    const wordResults = res.data;
    let wordIndex = _.random(0, Math.min(wordResults.length - 1, 3));

    return wordResults[wordIndex].word;
  } catch (err) {
    console.log(`Error while misinterpreting ${word}: ${err}`);
    throw err;
  }
};

exports.misinterpretMessage = misinterpretMessage;
