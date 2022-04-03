//프로그래머스 코딩테스트 연습 > 완전탐색 > 모의고사
//https://programmers.co.kr/learn/courses/30/lessons/42840
//22.03.31

function solution(answers) {
  var answer = [];
  let student1 = [1, 2, 3, 4, 5];
  let student2 = [2, 1, 2, 3, 2, 4, 2, 5];
  let student3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let score = [0, 0, 0];

  let answersLength = answers.length;

  answers.forEach((v, index) => {
    if (answersLength > student1.length) student1 = [...student1, ...student1];
    if (answersLength > student2.length) student2 = [...student2, ...student2];
    if (answersLength > student3.length) student3 = [...student3, ...student3];
    if (student1[index] === v) score[0]++;
    if (student2[index] === v) score[1]++;
    if (student3[index] === v) score[2]++;
  });

  const maxScore = Math.max(...score);

  answer = score
    .map((v, index) => {
      return { name: index + 1, score: v };
    })
    .filter((v) => v.score === maxScore)
    .map((v) => v.name);

  return answer.sort((a, b) => a - b);
}
