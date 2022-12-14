"use strict";

module.exports = {
  compareTwoStrings: compareTwoStrings,
  findBestMatch: findBestMatch
};

function compareTwoStrings(first, second) {
  first = first.replace(/\s+/g, '');
  second = second.replace(/\s+/g, '');
  if (first === second) return 1;
  if (first.length < 2 || second.length < 2) return 0;
  var firstBigrams = new Map();

  for (var i = 0; i < first.length - 1; i++) {
    var bigram = first.substring(i, i + 2);
    var count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
    firstBigrams.set(bigram, count);
  }

  ;
  var intersectionSize = 0;

  for (var _i = 0; _i < second.length - 1; _i++) {
    var _bigram = second.substring(_i, _i + 2);

    var _count = firstBigrams.has(_bigram) ? firstBigrams.get(_bigram) : 0;

    if (_count > 0) {
      firstBigrams.set(_bigram, _count - 1);
      intersectionSize++;
    }
  }

  return 2.0 * intersectionSize / (first.length + second.length - 2);
}

function findBestMatch(mainString, targetStrings) {
  if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
  var ratings = [];
  var bestMatchIndex = 0;

  for (var i = 0; i < targetStrings.length; i++) {
    var currentTargetString = targetStrings[i];
    var currentRating = compareTwoStrings(mainString, currentTargetString);

    if (currentRating >= 0.334) {
      ratings.push({
        target: currentTargetString,
        rating: currentRating
      });
    } else {
      ratings.push({
        target: '',
        rating: ''
      });
    }

    if (currentRating > ratings[bestMatchIndex].rating) {
      bestMatchIndex = i;
    }
  }

  var bestMatch = ratings[bestMatchIndex];
  return {
    ratings: ratings,
    bestMatch: bestMatch,
    bestMatchIndex: bestMatchIndex
  };
}

function areArgsValid(mainString, targetStrings) {
  if (typeof mainString !== 'string') return false;
  if (!Array.isArray(targetStrings)) return false;
  if (!targetStrings.length) return false;
  if (targetStrings.find(function (s) {
    return typeof s !== 'string';
  })) return false;
  return true;
}