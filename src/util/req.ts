import {error} from 'logez/dist';

export function req(
    method: string, url: string, data: any, onsuc: (resp: any) => void,
    onfail?: (reason: string) => void) {
  let req = new XMLHttpRequest();
  req.open(method, url, true);
  req.onreadystatechange = function() {
    if (req.readyState == XMLHttpRequest.DONE) {
      if (req.status >= 200 && req.status < 305) {
        let v = req.response;
        onsuc(v);
      } else {
        error(`${method}: ${url} | ${req.status}, ${req.statusText}`);
        if (onfail) {
          onfail(req.statusText);
        }
      }
    }
  };
  req.send(data);
}