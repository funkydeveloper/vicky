export default function cleanHtml(html) {
  return html.replace(/<br>/g, '').replace(/&nbsp;/g, ' ');
}
