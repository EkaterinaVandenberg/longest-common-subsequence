# longest-common-subsequence

Calculates the longest sequence of characters that appear in the same relative order in two strings.

```js
import { longestCommonSubsequence } from './src/index.js';

const result = longestCommonSubsequence('AGGTAB', 'GXTXAYB');
console.log(result); // "GTAB"
```

## Why

This library exists for code that needs to compare two short-to-medium strings and reason about their shared structure — diff highlights, similarity heuristics, duplicate detection. The implementation is the textbook dynamic programming algorithm: O(m*n) time, O(m*n) space, with a full backtracking pass to reconstruct the subsequence itself rather than just its length.

## Edge cases

When several subsequences tie for the longest length, only one is returned. The backtrack favours the first string, so the choice is deterministic rather than arbitrary. Inputs are required to be strings; any other type throws a `TypeError`.
