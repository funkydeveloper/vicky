export default function sanitizeJson(json) {
  return json.filter((entry) =>
    entry.type === 'element' &&
    entry.tagName === 'table'
  );
}
