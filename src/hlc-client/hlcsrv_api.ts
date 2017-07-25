/// <reference path="../../node_modules/protobufjs/stub-long.d.ts" />

import {debug, error, info, warn} from 'logez';

import * as MSG from '../compiled/proto.js';

import {login, logout} from './auth';
import {ServerAPI} from './client';

export class HlcSrvAPI implements ServerAPI {
  constructor(win: Window, urlBase: string, token: string) {
    HlcSrvAPI.TOKEN = token;
    this.m_base = urlBase;
    this.m_get = urlBase + 'pagenote';
    this.m_new = urlBase + 'pagenote/new';
    this.m_del = urlBase + 'pagenote/delete';
  }

  public get(
      uid: number, url: string,
      callback: (pagenote: MSG.hlcmsg.Pagenote) => void): void {
    let req = `${this.m_get}?uid=${uid}&url=${encodeURI(url)}`;
    HlcSrvAPI.get(req, (resp) => {
      if (resp.code == MSG.hlcmsg.HlcResp.RespCode.SUC) {
        if (!resp.pagenoteList || resp.pagenoteList.length < 1) {
          debug('server returned no pagenote');
          return;
        }
        let pagenote = resp.pagenoteList[0];
        callback(MSG.hlcmsg.Pagenote.create(pagenote));
      } else {
        error(resp.msg);
      }
    });
  }

  public save(
      n: MSG.hlcmsg.Pagenote$Properties,
      callback: (savedIdList: MSG.hlcmsg.IdList$Properties) => void): void {
    if (!n.highlights || n.highlights.length < 1) {
      return;
    }
    let data = MSG.hlcmsg.Pagenote.encode(n).finish();
    if (data.length < 1) {
      warn('will not post empty buf');
      return;
    }
    HlcSrvAPI.post(this.m_new, data, (v) => {
      info(`Got response: ${JSON.stringify(v)}`);
      callback(v.idList);
    });
  }

  public delete(
      list: MSG.hlcmsg.IdList$Properties,
      callback: (removedIdList: MSG.hlcmsg.IdList$Properties) => void): void {
    if (!list.arr || list.arr.length < 1) {
      return;
    }
    let payload = MSG.hlcmsg.IdList.encode(list).finish();
    HlcSrvAPI.post(this.m_del, payload, (resp: MSG.hlcmsg.HlcResp) => {
      if (resp.code == MSG.hlcmsg.HlcResp.RespCode.SUC) {
        callback(resp.idList);
      } else {
        error(resp.msg);
      }
    });
  }

  public static setUID(id: number) {
    HlcSrvAPI.UID = id;
  }

  public static setToken(t: string) {
    HlcSrvAPI.TOKEN = t;
  }

  public static getUID(): number {
    return HlcSrvAPI.UID;
  }

  public static getToken(): string {
    return HlcSrvAPI.TOKEN;
  }

  public setPid(id: number) {
    this.m_pid = id;
  }

  private static UID: number;
  private static TOKEN: string;

  private static get(url: string, onsuc: (resp: MSG.hlcmsg.HlcResp) => void) {
    HlcSrvAPI.req('GET', url, null, onsuc);
  }

  private static post(
      url: string, data: any, onsuc: (resp: MSG.hlcmsg.HlcResp) => void) {
    HlcSrvAPI.req('POST', url, data, onsuc);
  }

  private static req(
      method: string, url: string, data: any,
      onsuc: (resp: MSG.hlcmsg.HlcResp) => void,
      onfail?: (reason: string) => void) {
    let req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader('x-hlc-uid', '' + HlcSrvAPI.UID);
    req.setRequestHeader('x-hlc-token', '' + HlcSrvAPI.TOKEN);
    req.onreadystatechange = function() {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status >= 200 && req.status < 305) {
          debug(`response: ${JSON.stringify(req.response)}`);
          let v = req.response;
          let msgBuf =
              Uint8Array.from(atob(v) as any, c => (c as any).charCodeAt(0));
          let r = MSG.hlcmsg.HlcResp.decode(msgBuf);
          debug(`decoded: ${JSON.stringify(r)}`);
          onsuc(r);
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

  private m_base: string;
  private m_get: string;
  private m_new: string;
  private m_del: string;
  private m_pid: number;
}