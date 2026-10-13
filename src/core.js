/**
 * Computes the longest common subsequence (LCS) of two strings.
 *
 * A subsequence is a sequence that appears in the same relative order but
 * not necessarily contiguously. The LCS is the longest such shared sequence.
 *
 * Uses the classic dynamic programming table: O(m*n) time and O(m*n) space.
 * The full table is kept (rather than rolling two rows) because we must
 * backtrack to reconstruct the actual subsequence, which requires random
 * access to the whole table. Trading memory for clarity and correctness is
 * justified here because the library prioritises correctness of the result
 * over minimising allocation for very large inputs.
 *
 * When multiple subsequences tie for the longest length, exactly one is
 * returned. The backtrack favours moving up (shortening `a`) before moving
 * left, so the result is deterministic and reproducible, not arbitrary.
 *
 * @param {string} a - First input string.
 * @param {string} b - Second input string.
 * @returns {string} A longest common subsequence of `a` and `b`.
 */
export function longestCommonSubsequence(a, b) {
  if (typeof a !== 'string') {
    throw new TypeError('First argument must be a string');
  }
  if (typeof b !== 'string') {
    throw new TypeError('Second argument must be a string');
  }

  const m = a.length;
  const n = b.length;

  // dp[i][j] = length of the LCS of a[0..i-1] and b[0..j-1].
  // Extra row and column of zeros act as sentinels for the base case
  // (empty prefix), so the recurrence never needs an out-of-bounds guard.
  const dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));

  for (let i = 1; i <= m; i++) {
    const aChar = a.charCodeAt(i - 1);
    for (let j = 1; j <= n; j++) {
      if (aChar === b.charCodeAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = dp[i - 1][j] >= dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
      }
    }
  }

  // Backtrack from (m, n) to (0, 0), collecting matched characters.
  // We compare char codes (already cached above for `a`) to avoid re-reading.
  // Order of preference: diagonal (match) > up > left.
  let result = '';
  let i = m;
  let j = n;
  const chars = [];
  while (i > 0 && j > 0) {
    const aChar = a.charCodeAt(i - 1);
    if (aChar === b.charCodeAt(j - 1)) {
      chars.push(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  chars.reverse();
  return chars.join('');
}
