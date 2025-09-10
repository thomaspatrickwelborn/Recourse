export default function isObjectClass($value) {
  return $value !== null && typeof $value === "object";
}