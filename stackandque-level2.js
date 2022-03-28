//프로그래머스 코딩테스트 연습 > 스택 / 큐 > 기능개발
//https://programmers.co.kr/learn/courses/30/lessons/42586
//22.03.28

function solution(progresses, speeds) {
  let answer = [];
  //배포할 수 있는 소요 날짜의 배열
  let processDate = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index]),
  );

  let firstDate = processDate[0];
  let count = 1;

  for (i = 0; i < processDate.length; i++) {
    if (firstDate >= processDate[i + 1]) {
      count++;
    } else {
      answer.push(count);
      firstDate = processDate[i + 1];
      count = 1;
    }
  }

  return answer;
}
