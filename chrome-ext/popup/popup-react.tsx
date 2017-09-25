import * as React from "react";
import * as ReactDOM from "react-dom";
import * as decorators from "../../src/app/decorators";
import * as DefaultStyles from "../../src/decorator/default_styles";
import * as popup from "./popup";
import * as logger from "logez";


import { PopPanel } from "../components/panel";

function logIn(onSuc: (profile: any) => void, onFail: (msg: string) => void): void {
  popup.openLogInWindow();
}

function logout(onSuc: () => void) {
  popup.logout(onSuc);
}

function checkLogin(onLoggedIn: () => void,
  onLoggedOut: () => void) {
  popup.checkLoggedIn(onLoggedIn, onLoggedOut);
}

function profile() {
  return {
    name: "dummy user",
  };
}

function configs(): [string, string][] {
  let cfgs: [string, string][] = [];
  let names = decorators.getAllDecoratorNames();
  for (let n of names) {
    cfgs.push([n, decorators.getCssClassName(n)]);
  }
  return cfgs;
}

function changeCfg(opt: string, onSuc: (option: string) => {}) {
  popup.changeCSConfig(opt, onSuc, (reason: string) => { logger.error(`Cannot change config: ${reason}`); });
}

DefaultStyles.addDefaultStyles(document);

window.requestAnimationFrame(() => {
  ReactDOM.render(
    <PopPanel
      logIn={logIn}
      logout={logout}
      isLoggedIn={checkLogin}
      profile={profile}
      blockConfigs={configs}
      changeCfg={changeCfg} />,
    document.getElementById("container"));
});