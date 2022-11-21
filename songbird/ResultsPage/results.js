const score = localStorage.getItem('Result');
const results = document.querySelector('.results');
const result = document.createElement('span');

results.append(result);
result.classList.add('result');

const showResults = (score) => {

result.innerText = 'Result : ' + score;
};
showResults(score);

console.log(localStorage.getItem('Result')); 


