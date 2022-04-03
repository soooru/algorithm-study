// 프로그래머스 > 코딩 테스트 연습 > 완전탐색 > 소수 찾기
// 22.04.03
//https://programmers.co.kr/learn/courses/30/lessons/42839

function solution(numbers) {
  var answer = 0;
  let numbersArr = numbers.split('');
  let allResults = [];

  //모든 조합 구하기
  for (i = 0; i < numbersArr.length; i++) {
    let results = getPermutation(numbersArr, i + 1);
    results = results.map((v) => parseInt(v.join('')));
    allResults = allResults.concat(results);
  }

  //중복 제거
  let uniqSet = new Set(allResults);
  let uniqArr = [...uniqSet];

  //소수가 true인 조합에 대한 개수 구하기
  answer = uniqArr.reduce((cnt, el) => {
    console.log(cnt, el);
    return cnt + isPrime(el);
  }, 0);

  return answer;
}
//순열구하기
function getPermutation(arr, length) {
  let result = [];
  if (length === 1) return arr.map((v) => [v]);
  arr.forEach((v, index, arr) => {
    const selected = v;
    const restArr = arr.filter((_, idx) => idx !== index);
    const perArr = getPermutation(restArr, length - 1);
    const combineFixer = perArr.map((v) => [selected, ...v]);

    result.push(...combineFixer);
  });
  return result;
}
//소수인지 구하기
function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  if (num % 2 === 0) {
    return num === 2 ? true : false;
  }
  const sqrt = parseInt(Math.sqrt(num));
  for (let divider = 3; divider <= sqrt; divider += 2) {
    if (num % divider === 0) {
      return false;
    }
  }
  return true;
}
