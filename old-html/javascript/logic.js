// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB

// Lachlan Moore
// 30030228, SENG 513

function getStats(txt) {
    let lines
    let linesAr
    // use regex to select newline, whitespace or anynumber of digits to space then get length or array
    // it is confusing in the assignment description but it does say that the only seperators of a 'word'
    // are space, number and a new line. So this regex selects only those stated characters.
    let words = txt.toLowerCase().match(/\d+|[^\d\s!@#$%^&*()-=_+~`,.;:\"{}|\\/\[\]<>?]+/gm)
    // remove whitespace, /n and undefined
    for (let i = 0; i < words.length; i++) {
        if (words[i] == null || words[i] == "" || words[i].includes(" ") || words[i].includes("\\n") || words[i].includes("\\t") || words[i].includes("\n") || words[i].includes("\t")) {
            words.splice(i, 1)
        }
    }
    console.log(words)

    // check to see if input string is empty then nLines is 0
    if (txt == null) {
        lines = 0
    } else {
        // split by newline
        linesAr = txt.split(/\r\n|\n\r|\n|\r/)
        lines = linesAr.length
    }

    let nonEmpty = lines
    // loop through linesAr to see which lies are empty
    let curMax = 0
    for (let i = 0; i < lines; i++) {
        // check if empty
        if (linesAr[i] == "") {
            nonEmpty--
        }
        // also caluclate the longest line
        if (linesAr[i].length > curMax) {
            curMax = linesAr[i].length // update curMax
        }
    }

    // calculate the average word length
    let sum = 0
    for (let i = 0; i < words.length; i++) {
        sum = sum + words[i].length
    }
    let avgLength = (sum / words.length)

    // sort by the longest words
    words.sort(function (a, b) {
        return b.length - a.length ||   // sort by length, if equal
            a.localeCompare(b)              // sort by alphabetical
    })
    let tenLongWords = words.slice(0, 10)

    // function to find the most common words and put into a hashmap
    function getMostFrequent(arr) {
        // turn into a hashmap
        const hashmap = arr.reduce((temp, i) => {
            temp[i] = (temp[i] || 0) + 1
            return temp
        }, {})
        return hashmap
    }
    let freqMap = getMostFrequent(words)
    // convert back to array
    let freqArray = []
    for (var key in freqMap) {
        freqArray.push(key + " (" + freqMap[key] + ")");
    }
    // sort array by value between brakets
    freqArray.sort(function (a, b) {
        var a1 = a.match(/\(([^)]+)\)/)
        var b1 = b.match(/\(([^)]+)\)/)
        return b1[1] - a1[1]
    })
    let tenFreqWords = freqArray.slice(0, 10)

    return {
        nChars: txt.length, // return length of total string                                                     
        nWords: words.length,
        nLines: lines,
        nNonEmptyLines: nonEmpty,
        averageWordLength: avgLength,
        maxLineLength: curMax,
        tenLongestWords: tenLongWords,
        tenMostFrequentWords: tenFreqWords
    };

}
