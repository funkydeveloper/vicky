import { parse as parseHtml } from 'himalaya';
import { parse as json2csv }  from 'json2csv';

import {
  cleanHtml,
  parseTables,
  sanitizeJson,
}                             from '../../utils';

export default function parseToCsv(dirtyHtml, vip) {
  const cleanedHtml = cleanHtml(dirtyHtml);
  const parsedJson = parseHtml(cleanedHtml);
  const sanitizedJson = sanitizeJson(parsedJson);

  // I KNOW IT'S INEFFICIENT, BUT MAAAN...
  const vipTables = parseTables(sanitizedJson, 'vip');
  const nonVipTables = parseTables(sanitizedJson, 'novip');

  // SEE utils/parseTables
  const fields = ['Name', 'Titel', 'Addresse', 'Telefon', 'DoktorCHWebsite', 'Website', 'Email', 'Spezialisierung'];
  const opts = { fields };

  if (vip === 'vip') {
    try {
      return json2csv(vipTables, opts);
    } catch (err) {
      console.error(err);
    }
  }

  if (vip === 'novip') {
    try {
      return json2csv(nonVipTables, opts);
    } catch (err) {
      console.error(err);
    }
  }

  try {
    return json2csv([...vipTables, ...nonVipTables], opts);
  } catch (err) {
    console.error(err);
  }
}
