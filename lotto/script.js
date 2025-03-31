function GenRandomNumbers(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1))+min;
}

let Numbers = new Set();

while (Numbers.size<6){
    let randomNumber = GenRandomNumbers(1,45);
    Numbers.add(randomNumber)
    Numbers = new Set([...Numbers].sort((a, b) => a - b));
}

console.log([...Numbers]);  