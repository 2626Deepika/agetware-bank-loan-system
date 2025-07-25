function mergeLists(list1, list2) {
  const result = [];

  const combined = [...list1, ...list2].sort(
    (a, b) => a.positions[0] - b.positions[0]
  );

  for (let i = 0; i < combined.length; i++) {
    let current = combined[i];
    let merged = false;

    for (let j = 0; j < result.length; j++) {
      let existing = result[j];
      const overlap =
        Math.min(existing.positions[1], current.positions[1]) -
        Math.max(existing.positions[0], current.positions[0]);

      const currentLength =
        current.positions[1] - current.positions[0];

      if (overlap > currentLength / 2) {
        existing.values.push(...current.values);
        merged = true;
        break;
      }
    }

    if (!merged) result.push({ ...current });
  }

  return result;
}

// Example usage:
const list1 = [
  { positions: [0, 5], values: ['a'] },
  { positions: [6, 10], values: ['b'] }
];
const list2 = [
  { positions: [4, 8], values: ['c'] }
];

console.log(mergeLists(list1, list2));
