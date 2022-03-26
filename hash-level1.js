// 프로그래머스 > 코딩 테스트 연습 > 해시 > 완주하지 못한 선수
// https://programmers.co.kr/learn/courses/30/lessons/42576
//
function solution(participant, completion) {
  var answer = '';
  participant = participant.sort();
  completion = completion.sort();
  const answerIndex = participant.findIndex((v, index) => {
    return !completion[index] || v !== completion[index];
  });
  answer = participant[answerIndex];
  return answer;
}
