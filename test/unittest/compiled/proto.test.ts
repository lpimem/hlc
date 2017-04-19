import { info } from 'logez';

import { hlcmsg } from '../../../src/compiled/proto.js';


test("wiring RangeMeta", () => {
  let meta = hlcmsg.RangeMeta.create({
    anchor: "/1",
    start: "/1/2",
    startOffset: 0,
    end: "/1/3",
    endOffset: 10
  });
  expect(meta.anchor).toBe("/1");
  let metaBuf = hlcmsg.RangeMeta.encode(meta).finish();
  info(`range meta buf: ${Array.prototype.toString.call(metaBuf)}`)
  expect(metaBuf.length).toBeGreaterThan(0);
});

function testPn(pn){
  expect(pn.uid).toBe(1);
  expect(pn.highlights).toHaveLength(1);
  let pnBuf = hlcmsg.Pagenote.encode(pn).finish();
  info(`pnBuf: ${Array.prototype.toString.call(pnBuf)}`)
  expect(pnBuf.length).toBeGreaterThan(0);
}

test("wiring Pagenote", () => {
  let meta = hlcmsg.RangeMeta.create({
    anchor: "/1",
    start: "/1/2",
    startOffset: 0,
    end: "/1/3",
    endOffset: 10
  });
  let pn = hlcmsg.Pagenote.create({
    uid: 1,
    url: "https://example.com/abc/?hello&p=2",
    highlights: [meta]
  });
  testPn(pn);

  let pnprop = {
    "uid": 1,
    "highlights": [{
      "anchor": "/",
      "start": "//0/0",
      "startOffset": 212,
      "end": "//0/0",
      "endOffset": 393
    }],
    "url": "http://localhost:23333/static"
  };
  pn = hlcmsg.Pagenote.create(pnprop);
  testPn(pn);

  pn = JSON.parse(`{"uid":1,"highlights":[{"anchor":"/","start":"//0/0","startOffset":1051,"end":"//0/0","endOffset":1145}],"url":"http://localhost:23333/static"}`);
  testPn(pn);


}); 


