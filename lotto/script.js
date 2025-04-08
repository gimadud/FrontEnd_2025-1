const purchaseButton = document.querySelector('#purchaseBtn');
const genButton = document.querySelector('#genBtn');
const purchaseCountInput = document.getElementById("purchaseCount");
const purchaseQuantityInput = document.getElementById('purchaseQuantity');
const totalPriceSpan = document.getElementById('totalPrice');
const whole = document.querySelector(".whole");

let correctNumbers = [];  
let userNumbersList = [];      

function genLotto(){
    let numbers = new Set();

    while (numbers.size<6){
        function genRandomNumbers(min, max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random()*(max-min+1))+min;
        }

        let randomNumber = genRandomNumbers(1,45);
        numbers.add(randomNumber)
        numbers = new Set([...numbers].sort((a, b) => a - b));
    }

    return [...numbers];
}

function genLottoes(lottoCount) {
    let lottoList = [];
    for (let i = 0; i < lottoCount; i++) {
        lottoList.push(genLotto());
    }
    return lottoList;
}

purchaseQuantityInput.addEventListener('input', function () {
  const count = parseInt(purchaseQuantityInput.value) || 0;
  const pricePerLotto = 1000;
  const totalPrice = count * pricePerLotto;

  totalPriceSpan.innerText = `${totalPrice.toLocaleString()}원(1장당 1,000원)`;
});

function printResult(userNumbers, correctNumbers, containerElement, showResult = true) {
    const resultDiv = document.createElement("div");
    resultDiv.className = "result-div";
    resultDiv.style.height = showResult ? "106px" : "45px";

    const lottoContainer = document.createElement("div");
    lottoContainer.className = "lotto-numbers-container";

    userNumbers.forEach((num, index) => {
        const numberCircle = document.createElement("span");
        numberCircle.className = `ball ball-${index + 1}`;
        numberCircle.textContent = num;
        lottoContainer.appendChild(numberCircle);
    });

    resultDiv.appendChild(lottoContainer);

    if (showResult) {
        const resultTextDiv = document.createElement("div");
        resultTextDiv.className = "result-text-div";

        const matchCount = userNumbers.filter(num => correctNumbers.includes(num)).length;
        if (matchCount === 6) {
            resultTextDiv.innerHTML = `결과: 6개 일치 - 당첨`;
        } else {
            resultTextDiv.innerHTML = `결과: ${matchCount}개 일치`;
        }

        resultDiv.appendChild(resultTextDiv);
    }

    containerElement.appendChild(resultDiv);
}

function genWinNumbers() {
    return genLotto();
}

let newHeight = 0;

purchaseButton.addEventListener("click", () => {
    const resultSections = document.getElementsByClassName('resultSection');
    whole.style.height = "700px";

    for (let i = 0; i < resultSections.length; i++) {
        resultSections[i].style.display = "block";
    }

    const quantity = parseInt(purchaseQuantityInput.value);

    if (!quantity || quantity <= 0) {  
      alert('로또를 구매해주세요');
      return;
    }

    userNumbersList = genLottoes(quantity);

    const container = document.querySelector('#resultContainer');
    container.innerHTML = '';

    userNumbersList.forEach(userNumber => {
        printResult(userNumber, [], container, false);  
    });

    const baseHeight = 700;  
    const addHeightPerLotto = 68;  
    newHeight = baseHeight + (quantity * addHeightPerLotto);

    whole.style.height = `${newHeight}px`; 
});

const resultSections = document.getElementsByClassName('resultSection');

for (let i = 0; i < resultSections.length; i++) {
    resultSections[i].style.display = "none";
}


genButton.addEventListener("click", () => {
    correctNumbers = genWinNumbers();  
    
    const correctContainer = document.querySelector('.winNumbers');
    correctContainer.innerHTML = '';
    printResult(correctNumbers, correctNumbers, correctContainer, false); 

    const container = document.querySelector('#resultContainer');
    container.innerHTML = '';  

    userNumbersList.forEach(userNumber => {
        printResult(userNumber, correctNumbers, container);  
    });

    const quantity = parseInt(purchaseQuantityInput.value);

    const baseHeight = newHeight;  
    const addHeightPerLotto = 61;  
    newHeight = baseHeight+ 70 + (quantity * addHeightPerLotto);
    whole.style.height = `${newHeight}px`; 

    


});
