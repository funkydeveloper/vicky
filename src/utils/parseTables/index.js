import _ from 'lodash';

/*
REQUIREMENT : name, Titel, Ort, Adresse, Telefon, website, email, Spezialisierung

table class="vip"
  tbody
    tr class="vip"
      td class="vip-left"
        a class="vip-firmen-name" // CONTAINS NAME
      td class="vip-right"
        a class="vip" href="WEBSITE" // CONTAINS WEBSITE (AMBIGUOUS!!!!!!)
    tr class="vip"
      td class="vip-left"
        span class="vip-left-titel" // CONTAINS TITLE
        span class="vip-left-fachbezeichnung" // CONTAINS SPEZIALISIERUNG
        span class="vip-left-addresszusatz" // CONTAINS ADDRESS PT1
        Street // CONTAINS ADDRESS PT2
        Tel // CONTAINS TEL
        a class="vip-left-make_appointment-button-${active/inactive}" href="MAILTO" // CONTAINS EMAIL

table class="novip"
  tbody
    tr class="novip"
      td class="novip-left"
        a class="novip-firmen-name" // CONTAINS NAME
      td class="novip-right"
        a class="novip" href="WEBSITE" // CONTAINS WEBSITE
    tr class="novip"
      td class="novip-left"
        span class="novip-left-titel" // CONTAINS TITLE
        span class="novip-left-fachbezeichnung" // CONTAINS SPEZIALISIERUNG
        span class="vip-left-adresszusatz" // CONTAINS ADDRESS PT1
        Street // CONTAINS ADDRESS PT2
        Tel // CONTAINS TEL
        a class="novip-left-make_appointment-button-${active/inactive}" href="MAILTO" // CONTAINS EMAIL
*/

export default function parseTables(tables, vip) {
  const tablesToParse = tables.filter((table) =>
    table.attributes[0].key === 'class' &&
    table.attributes[0].value === vip
  );

  return tablesToParse.map((table) => {
    const tableBody = table.children.filter((tc) => tc.type === 'element' && tc.tagName === 'tbody');
    const tableRows = tableBody[0].children.filter((tc) => tc.type = 'element' && tc.tagName === 'tr');
    const tableData = _.flatten(tableRows.map((tr) => {
      return tr.children.filter((c) => c.type === 'element' && c.tagName === 'td');
    }));

    const tableDataElements = _.flatten(tableData.map((td) => td.children.filter((c) => c.type === 'element')));
    const spans = tableDataElements.filter((tde) => tde.type === 'element' && tde.tagName === 'span');
    const links = tableDataElements.filter((tde) => tde.type === 'element' && tde.tagName === 'a');

    const titleSpans = spans.filter((s) => _.some(s.attributes, { value: `${vip}-left-titel` }));
    const title = titleSpans.length > 0
      ? titleSpans[0].children[0].content.trim()
      : null;
    const specializationSpans = spans.filter((s) => _.some(s.attributes, { value: `${vip}-left-fachbezeichnung` }));
    const specialization = specializationSpans.length > 0
      ? specializationSpans[0].children[0].content.trim()
      : null;
    const addressAddendumSpans = spans.filter((s) => _.some(s.attributes, { value: `${vip}-left-adresszusatz` }));
    const addressAddendum = addressAddendumSpans.length > 0
      ? addressAddendumSpans[0].children[0].content.trim()
      : null;

    const companyLinks = links.filter((l) => _.some(l.attributes, { value: `${vip}-firmen-name` }));
    const companyLink = companyLinks.length > 0
      ? companyLinks[0].attributes.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}).href
      : null;
    const companyName = companyLinks.length > 0
      ? companyLinks[0].children[0].content.trim()
      : null;
    const companyLinkss = links.filter((l) => _.some(l.attributes, { value: vip }));
    const companyLinkk = companyLinkss.length > 0
      ? companyLinkss[0].attributes.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}).href
      : null;

    const mailToLinks = links.filter((l) => _.some(l.attributes, { value: `${vip}-left-make_appointment-button-active` }));
    const mailToLink = mailToLinks.length > 0
      ? mailToLinks[0].attributes.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}).href
      : null;

    const email = mailToLink ? mailToLink.substring(mailToLink.lastIndexOf('mailto:') + 7, mailToLink.lastIndexOf('?')) : null;

    // RAW ADDRESS AND PHONE DATA
    const tableDataTexts = _.flatten(tableData.map((td) => td.children.filter((c) => c.type === 'text')));
    const text = tableDataTexts.filter((tdt) => tdt.content.trim())[0].content.trim();
    const address = text.substring(0, text.lastIndexOf('Tel:')).trim();
    const phone = text.substring(text.lastIndexOf('Tel:') + 4, text.length).trim();

    const parsedData = {
      Name: companyName,
      Titel: title,
      Addresse: `${addressAddendum ? `${addressAddendum} ` : ''}${address}`,
      Telefon: phone,
      DoktorCHWebsite: companyLink,
      Website: companyLinkk,
      Email: email,
      Spezialisierung: specialization,
    };

    return parsedData;
  });
}
