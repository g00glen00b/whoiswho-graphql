export function* range(beginInclusive, endInclusive) {
  yield beginInclusive;
  if (beginInclusive >= endInclusive) return;
  yield* range(beginInclusive + 1, endInclusive);
}
