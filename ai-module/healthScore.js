function calculateHealthScore(risks) {
  let score = 100;
  score -= risks.length * 10; // each risk reduces 10 points
  return Math.max(score, 0);
}
module.exports = { calculateHealthScore };