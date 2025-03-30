function GenRandomNumbers(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1))+min;
}

let Numbers = new Set();
let count=0;

while (Numbers.size<6){
    let randomNumber = GenRandomNumbers(1,45);
    console.log(randomNumber);
    Numbers.add(randomNumber)
    count++;
}

