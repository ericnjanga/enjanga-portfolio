
// Checks if an array is empty or contains only null values
export function containsNothingOfValue<T>(
  values: Array<T | null>
): boolean {
  return values.every((value) => value === null);
}

// Checks if an object is empty or contains only null values
export function isEmptyOrContainsOnlyNull(
  value: Record<string, unknown>
): boolean {
  return Object.values(value).every(
    (propertyValue) => propertyValue === null
  );
}