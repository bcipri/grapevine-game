const axios = require("axios");
const _ = require("lodash");
const numWords = require("num-words");

const misinterpretMessage = async (message) => {
  if (!message) {
    return "";
  }

  message = replaceNumbersWithWords(message);

  const words =  _.filter(_.words(message), (w) => canWordBeReplaced(w));

  const wordToReplace = _.sample(words);
  const misinterpretedWord = await getSimilarWord(wordToReplace);
  
  message = message.replace(wordToReplace, misinterpretedWord);

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
    const res = await axios.get(
      `https://api.datamuse.com/words?rel_rhy=${escape(word)}`
    );

    if (!res.data.length) return word;

    const wordResults = res.data;
    let wordIndex = _.random(0, Math.min(wordResults.length - 1, 3));

    return wordResults[wordIndex].word;
  } catch (err) {
    console.log(`Error while misinterpreting ${word}: ${err}`);
    throw err;
  }
};

const canWordBeReplaced  = (word) => {
  return !['for','and','nor','or','but','yet','so','the','a','an'].includes(word.toLowerCase());
}

exports.misinterpretMessage = misinterpretMessage;
