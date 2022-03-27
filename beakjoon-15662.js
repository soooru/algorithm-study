//백준-톱니바퀴(#15662), https://www.acmicpc.net/problem/15662

// 입력
// 첫째 줄에 톱니바퀴의 개수 T (1 ≤ T ≤ 1,000)가 주어진다.
// 둘째 줄부터 T개의 줄에 톱니바퀴의 상태가 가장 왼쪽 톱니바퀴부터 순서대로 주어진다. 상태는 8개의 정수로 이루어져 있고, 12시방향부터 시계방향 순서대로 주어진다. N극은 0, S극은 1로 나타나있다.
// 다음 줄에는 회전 횟수 K(1 ≤ K ≤ 1,000)가 주어진다. 다음 K개 줄에는 회전시킨 방법이 순서대로 주어진다. 각 방법은 두 개의 정수로 이루어져 있고, 첫 번째 정수는 회전시킨 톱니바퀴의 번호, 두 번째 정수는 방향이다. 방향이 1인 경우는 시계 방향이고, -1인 경우는 반시계 방향이다.

// 출력
// 총 K번 회전시킨 이후에 12시방향이 S극인 톱니바퀴의 개수를 출력한다.

let example1 = `4
10101111
01111101
11001110
00000010
2
3 -1
1 1`;
let example2 = `4
11111111
11111111
11111111
11111111
3
1 1
2 1
3 1`;
let example3 = `4
10001011
10000011
01011011
00111101
5
1 1
2 1
3 1
4 1
1 -1`;
let example4 = `4
10010011
01010011
11100011
01010101
8
1 1
2 1
3 1
4 1
1 -1
2 -1
3 -1
4 -1`;
let example5 = `5
10010011
01010011
11100011
01010101
01010011
10
1 1
2 1
3 1
4 1
1 -1
2 -1
3 -1
4 -1
5 1
5 -1`;
//변수 선언
function getVars(val) {
  let dataArray = Array();
  dataArray = val.split('\n');
  //t:톱니바퀴 개수, firstVal:처음 톱니바퀴 상태
  const t = parseInt(dataArray[0]);
  let firstVal = [];
  for (i = 0; i < t; i++) {
    let temp = dataArray[i + 1].split('').map((v) => parseInt(v));
    firstVal[i] = temp;
  }
  //n:회전한 개수 , setVal:움직임
  const setVal = [];
  for (i = t + 2; i < dataArray.length; i++) {
    let temp2 = dataArray[i].split(' ');
    obj = {
      target: parseInt(temp2[0]),
      direction: parseInt(temp2[1]),
    };
    setVal.push(obj);
  }
  return { t, firstVal, setVal };
}
//타겟을 돌려서 반환시키는 함수
function change(direction, target) {
  //direction 1 시계방향, direction -1 반시계방향
  let tempArr = JSON.parse(JSON.stringify(target));
  if (direction === 1) {
    const last = tempArr.pop();
    tempArr.unshift(last);
  } else {
    const first = tempArr.shift();
    tempArr.push(first);
  }
  return tempArr;
}
//해결 함수
function solution(getValue) {
  let { t, firstVal, setVal } = getVars(getValue);
  //시작하는 배열
  setVal.forEach((el) => {
    //console.log('---setval---');
    // el.target 처음에 돌릴 번호, el.direction 방향
    let leftDirection = el.direction;
    let rightDirection = el.direction;
    changeList = [];
    //처음에 돌리는 것을 체인지 리스트에 넣어줌
    changeList.push({ index: el.target - 1, direction: el.direction });
    // 왼쪽 탐색 : 처음에 돌릴 번호의 왼쪽의 극이 같을 때까지 or 끝날 때까지 비교하기
    for (i = el.target - 1; i > 0; i--) {
      //console.log('왼쪽 루프 시작:', i, firstVal[i], firstVal[i - 1])
      if (!firstVal[i - 1] || firstVal[i][6] === firstVal[i - 1][2]) {
        //console.log('왼쪽 루프 끝')
        break;
      } else {
        //    console.log('왼쪽 루프에서 변경할 사항', i - 1, leftDirection)
        leftDirection === 1 ? (leftDirection = -1) : (leftDirection = 1);
        changeList.push({
          index: i - 1,
          direction: leftDirection,
        });
      }
    }
    // 오른쪽 탐색 : 처음에 돌릴 번호의 오른쪽 극이 같을 때까지 비교하기 or 끝날 때까지 비교하기
    for (i = el.target - 1; i < t; i++) {
      //   console.log('오른쪽 루프 시작:', i, firstVal[i], firstVal[i + 1])
      if (!firstVal[i + 1] || firstVal[i][2] === firstVal[i + 1][6]) {
        //  console.log('오른쪽 루프 끝')
        break;
      } else {
        //     console.log('오른쪽 루프에서 변경할 사항', i + 1, rightDirection)
        rightDirection === 1 ? (rightDirection = -1) : (rightDirection = 1);

        changeList.push({
          index: i + 1,
          direction: rightDirection,
        });
      }
    }
    //나머지 돌려주기
    changeList.forEach((v) => {
      let changeVal = change(v.direction, firstVal[v.index]);
      firstVal[v.index] = changeVal;
      //object 내부 직접참조시 값이 변하지 않으므로 재할당
      let newArray = Object.keys(firstVal).map((i) => {
        return firstVal[i];
      });
      firstVal = new Object();
      for (let i = 0; i < newArray.length; i++) {
        firstVal[i] = newArray[i];
      }
    });
  });
  let changedArr = Object.values(firstVal);
  changedArr = changedArr.filter((v) => v[0] === 1);
  const answer = changedArr.length;
  return answer;
}
//테스트!
console.log('result:', solution(example1));
console.log('result:', solution(example2));
console.log('result:', solution(example3));
console.log('result:', solution(example4));
console.log('result:', solution(example5));
