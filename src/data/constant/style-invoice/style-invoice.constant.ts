import { StyleDictionary } from 'pdfmake/interfaces';

export const StyleInvoice: StyleDictionary = {
  h1: {
    fontSize: 20,
    bold: true,
    margin: [0, 5],
  },
  h2: {
    fontSize: 16,
    bold: true,
  },
  h3: {
    fontSize: 14,
    bold: true,
  },
};

export const ConfigStyle = {
  colSpan: 4,
  alignment: 'right',
};

export const FontStyle = {
  bold: true,
  alignment: 'right',
};
