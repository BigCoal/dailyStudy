// 给定3个参数，N，M，K
// 怪兽有N滴血，等着英雄来砍自己
// 英雄每一次打击，都会让怪兽流失[0-M]的血量
// 到底流失多少?每一次在[0~M]上等概率的获得一个值
// 求K次打击之后，英雄把怪兽砍死的概率

export function process(M: number, curBlood: number, rest: number): number {
  if (curBlood <= 0) {
    return Math.pow(M + 1, rest);
  }
  if (rest == 0) {
    return curBlood <= 0 ? 1 : 0;
  }
  let ans = 0;
  for (let i = 0; i <= M; i++) {
    ans += process(M, curBlood - i, rest - 1);
  }
  return ans;
}

//reset:0~K curBlood:0~N
export function DP(M: number, N: number, K: number) {
  const dp = Array.from(new Array(K + 1), () => new Array(N + 1).fill(0));

  //当前血量等于0的时候已经死掉了，返回还有reset刀怪兽死的次数
  for (let times = 0; times < K + 1; times++) {
    dp[times][0] = Math.pow(M + 1, times);
  }

  for (let times = 1; times < K + 1; times++) {
    for (let hp = 1; hp < N + 1; hp++) {
      let ans = 0;
      for (let x = 0; x <= M; x++) {
        if (hp - x >= 0) {
          ans += dp[times - 1][hp - x];
        } else {
          ans += Math.pow(M + 1, times - 1);
        }
      }
      dp[times][hp] = ans;
    }
  }

  return dp[K][N];
}
export function DP1(M: number, N: number, K: number) {
  const dp = Array.from(new Array(K + 1), () => new Array(N + 1).fill(0));

  //当前血量等于0的时候已经死掉了，返回还有reset刀怪兽死的次数
  for (let times = 0; times < K + 1; times++) {
    dp[times][0] = Math.pow(M + 1, times);
  }

  for (let times = 1; times < K + 1; times++) {
    for (let hp = 1; hp < N + 1; hp++) {
      dp[times][hp] =
        dp[times - 1][hp] +
        dp[times][hp - 1] -
        (hp - M - 1 >= 0
          ? dp[times - 1][hp - M - 1]
          : Math.pow(M + 1, times - 1));
    }
  }

  return dp[K][N];
}
function monsterDeadProbability() {
  const N = 4;
  const M = 2;
  const K = 7;
  console.log(process(M, N, K) / Math.pow(M + 1, K));
  console.log(DP(M, N, K) / Math.pow(M + 1, K));
  console.log(DP1(M, N, K) / Math.pow(M + 1, K));
}

monsterDeadProbability();
