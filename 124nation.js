// 프로그래머스 > 코딩 테스트 연습 > 연습문제 > 124 나라의 숫자
// https://programmers.co.kr/learn/courses/30/lessons/12899
// 22.03.24

function solution(n) {
  if (n <= 500000000) {
    let answer = '';
    for (let i = n; i > 0; i = parseInt(i / 3)) {
      let result = i % 3;
      if (result === 0) {
        result = 4;
        i--;
      }
      answer = result + answer;
    }
    return answer;
  }
}
