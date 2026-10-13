import { test } from 'node:test';
import assert from 'node:assert/strict';
import { longestCommonSubsequence } from '../src/core.js';

test('identical strings return the whole string', () => {
  assert.equal(longestCommonSubsequence('abc', 'abc'), 'abc');
});

test('disjoint strings return empty string', () => {
  assert.equal(longestCommonSubsequence('abc', 'xyz'), '');
});

test('both empty return empty string', () => {
  assert.equal(longestCommonSubsequence('', ''), '');
});

test('first empty returns empty string', () => {
  assert.equal(longestCommonSubsequence('', 'abc'), '');
});

test('second empty returns empty string', () => {
  assert.equal(longestCommonSubsequence('abc', ''), '');
});

test('subsequence need not be contiguous', () => {
  assert.equal(longestCommonSubsequence('abcde', 'ace'), 'ace');
});

test('order is preserved, reversed input gives empty', () => {
  assert.equal(longestCommonSubsequence('abc', 'cba'), 'a');
});

test('repeated characters are handled correctly', () => {
  assert.equal(longestCommonSubsequence('aab', 'aba'), 'aa');
});

test('single character shared returns that character', () => {
  assert.equal(longestCommonSubsequence('x', 'x'), 'x');
});

test('single character not shared returns empty', () => {
  assert.equal(longestCommonSubsequence('x', 'y'), '');
});

test('result length matches the DP table length for classic example', () => {
  assert.equal(longestCommonSubsequence('AGGTAB', 'GXTXAYB').length, 4);
});

test('the returned string is a valid subsequence of both inputs', () => {
  const a = 'programming';
  const b = 'compound';
  const lcs = longestCommonSubsequence(a, b);
  function isSubsequence(seq, source) {
    let idx = 0;
    for (const ch of source) {
      if (idx < seq.length && seq[idx] === ch) idx++;
    }
    return idx === seq.length;
  }
  assert.ok(isSubsequence(lcs, a));
  assert.ok(isSubsequence(lcs, b));
});

test('non-string first argument throws TypeError', () => {
  assert.throws(() => longestCommonSubsequence(123, 'abc'), TypeError);
});

test('non-string second argument throws TypeError', () => {
  assert.throws(() => longestCommonSubsequence('abc', null), TypeError);
});
