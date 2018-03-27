import React          from 'react';

import {
  Row,
  Col,
  Tag,
}                     from 'antd';

import './App.css';

import { parseToCsv } from './utils';

import {
  ag, ai, ar,
  bs, bl, be, be_city,
  fr,
  ge, ge_city, gl, gr,
  ju,
  lu,
  nu, nw,
  ow,
  sg, sh, so, sz,
  tg, ti,
  ur,
  vd, vs,
  zg, zh, zh_city,
  fl,
}                     from './kantone';

const kantone = [
  {
    title: 'Kanton Aargau',
    csv: parseToCsv(ag),
  },
  {
    title: 'Kanton Appenz.Inn.',
    csv: parseToCsv(ai),
  },
  {
    title: 'Kanton Appenz.Aus.',
    csv: parseToCsv(ar),
  },
  {
    title: 'Kanton Basel-Stadt',
    csv: parseToCsv(bs),
  },
  {
    title: 'Kanton Basel-Landschaft',
    csv: parseToCsv(bl),
  },
  {
    title: 'Kanton Bern / Berne',
    csv: parseToCsv(be),
  },
  {
    title: 'Stadt Bern',
    csv: parseToCsv(be_city),
  },
  {
    title: 'Kanton Fribourg / Freiburg',
    csv: parseToCsv(fr),
  },
  {
    title: 'Kanton Genf',
    csv: parseToCsv(ge),
  },
  {
    title: 'Stadt Genf',
    csv: parseToCsv(ge_city),
  },
  {
    title: 'Kanton Glarus',
    csv: parseToCsv(gl),
  },
  {
    title: 'Kanton Graubünden / Grigioni / Grischun',
    csv: parseToCsv(gr),
  },
  {
    title: 'Kanton Jura',
    csv: parseToCsv(ju),
  },
  {
    title: 'Kanton Luzern',
    csv: parseToCsv(lu),
  },
  {
    title: 'Kanton Neuchâtel',
    csv: parseToCsv(nu),
  },
  {
    title: 'Kanton Nidwalden',
    csv: parseToCsv(nw),
  },
  {
    title: 'Kanton Obwalden',
    csv: parseToCsv(ow),
  },
  {
    title: 'Kanton St. Gallen',
    csv: parseToCsv(sg),
  },
  {
    title: 'Kanton Schaffhausen',
    csv: parseToCsv(sh),
  },
  {
    title: 'Kanton Solothurn',
    csv: parseToCsv(so),
  },
  {
    title: 'Kanton Schwyz',
    csv: parseToCsv(sz),
  },
  {
    title: 'Kanton Thurgau',
    csv: parseToCsv(tg),
  },
  {
    title: 'Kanton Ticino',
    csv: parseToCsv(ti),
  },
  {
    title: 'Kanton Uri',
    csv: parseToCsv(ur),
  },
  {
    title: 'Kanton Vaud',
    csv: parseToCsv(vd),
  },
  {
    title: 'Kanton Valais / Wallis',
    csv: parseToCsv(vs),
  },
  {
    title: 'Kanton Zug',
    csv: parseToCsv(zg),
  },
  {
    title: 'Kanton Zürich',
    csv: parseToCsv(zh),
  },
  {
    title: 'Stadt Zürich',
    csv: parseToCsv(zh_city),
  },
  {
    title: 'Fürstentum Liechtenstein',
    csv: parseToCsv(fl),
  },
];

class App extends React.Component {
  downloadCsv = (csvData, fileName = 'data') => {
    if (csvData) {
      const parsedFileName = fileName
        .toLowerCase()
        .replace(/ /g, '_')
        .trim();

      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
      hiddenElement.target = '_blank';
      hiddenElement.download = `${parsedFileName}.csv`;
      hiddenElement.click();
    }
  }

  render() {
    const containerStyle = {
      padding: '20px',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
    };

    const rowStyle = {
      padding: '5px',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
    };

    return (
      <div style={containerStyle}>
        {kantone.map((kanton) => (
          <Row key={kanton.title} style={rowStyle}>
            <Col span={12}>{kanton.title}</Col>
            <Col span={12}>
              <Tag
                color="blue"
                onClick={() => this.downloadCsv(kanton.csv, kanton.title)}>
                Download CSV
              </Tag>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
}

export default App;
