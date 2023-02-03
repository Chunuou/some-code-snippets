/**
 * 通过坐标计算距离。
 * 算法来自美团：https://tech.meituan.com/2014/09/05/lucene-distance.html
 * 业务场景中两点距离不超过百米，且只进行一次计算，故使用 distanceSimplify 方法。
 * @param {number} lng1 - 点一经度
 * @param {number} lat1 - 点一纬度
 * @param {number} lng2 - 点二经度
 * @param {number} lat2 - 点二纬度
 * @returns {number} 两点间距离
 */
function calculateDistanceByCoordinate(lng1, lat1, lng2, lat2) {
  const dx = lng1 - lng2; // 经度差值
  const dy = lat1 - lat2; // 纬度差值
  const b = (lat1 + lat2) / 2; // 平均纬度
  const Lx = toRadians(dx) * 6367000 * Math.cos(toRadians(b)); // 东西距离
  const Ly = 6367000 * toRadians(dy); // 南北距离
  return Math.sqrt(Lx * Lx + Ly * Ly); // 用平面的矩形对角距离公式计算总距离
}

/**
 * 角度转弧度
 * @param {number} degrees - 角度
 * @returns {number} 弧度
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
