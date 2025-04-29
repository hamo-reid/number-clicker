/**
 * 生成1-100d的乱序数组，顺序由种子控制
 * 基于Fisher-Yates洗牌算法
 * @param seed 随机数种子
 */
export function generateShuffledArray(seed: number) {
  const array = Array.from({ length: 100 }, (_, i) => i + 1);

  for (let i = array.length - 1; i > 0; i--) {
      // 使用种子生成伪随机数
      seed = (seed * 9301 + 49297) % 233280;
      const random = seed / 233280;
      
      const j = Math.floor(random * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 二维化数组
export function array2d<T>(array: T[], width: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += width) {
      result.push(array.slice(i, i + width));
  }
  return result;
}