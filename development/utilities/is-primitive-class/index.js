export default function isPrimitiveClass($value) {
  return $value === null || (typeof $value !== "object" && typeof $value !== "function");
}