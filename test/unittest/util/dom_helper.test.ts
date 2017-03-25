import {computeUniquePath, getNodeByPath} from '../../../src/util/dom_helper';
import {populateDocument} from '../fixtures';

let doc: Document = populateDocument();

let testPairs: [string, Node][] = [
  ['#dv_1', doc.getElementById('dv_1')],
  ['/2', doc.body.childNodes[2]],
  ['/2', doc.body.children[1]],
  ['#dv_1/1/2/0', doc.getElementsByTagName('p')[2]],
];

test('computeUniquePath', () => {
  testPairs.forEach((p) => {
    expect(computeUniquePath(p[1])).toBe(p[0]);
  });
});

test('getNodeByPath', () => {
  testPairs.forEach((p) => {
    expect(getNodeByPath(doc, p[0])).toBe(p[1]);
  });
});