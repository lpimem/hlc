import { configure } from 'protobufjs/minimal';
import { HlcConfig } from "./hlc-config";
import { UserInfo } from "./user-info";
import * as popup from "../popup/popup";
import * as React from "react";
import { HLC_SERVICE_BASE } from "../../src/conf";

export interface PanelProps {
  isLoggedIn: (
    onLoggedIn: () => void,
    onLoggedOut: () => void) => void;
  logIn: (onSuc: (profile: any) => void, onFail: (msg: string) => void) => void;
  logout: (onSuc: () => void) => void;
  profile: () => any;
  blockConfigs: () => [string, string][];
  changeCfg: (cfgName: string, onSuccess: (opt: string) => void) => void;
  activeConfig?: string;
}

export interface PanelState {
  loggedIn?: boolean;
  name?: string;
  picture?: string;
  msg?: string;
  configs: [string, string, string][];
  currentOption: string;
}

export class PopPanel extends React.Component<PanelProps, PanelState>{
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      name: undefined,
      picture: undefined,
      msg: "",
      configs: [],
      currentOption: ""
    };
  }

  private updateCfgsState(active: string) {
    let cfgs = this.state.configs;
    if (cfgs.length < 1) {
      cfgs = this.generateConfigs(active);
    }
    this.setState({
      loggedIn: true,
      name: this.props.profile().name,
      configs: cfgs,
      msg: ""
    } as PanelState);
  }

  componentDidMount() {
    this.props.isLoggedIn(
      () => {
        popup.queryCurrentConfig((resp: string) => {
          this.updateCfgsState(resp);
        }, (error: string) => {
          this.updateCfgsState(null);
        });
      },
      () => {
        this.setState({
          loggedIn: false
        });
      });
  }

  onConfigChange(option: string) {
    this.props.changeCfg(option, (opt: string) => {
      this.updateConfigState(opt);
    });
  }

  generateConfigs(option?: string): [string, string, string][] {
    let cfgs = this.props.blockConfigs().slice();
    for (let opt of cfgs) {
      if (opt[0] == option) {
        opt.push("hlc-cfg-active");
      } else {
        opt.push("");
      }
    }
    return cfgs as any;
  }

  updateConfigState(option?: string) {
    let cfgs = this.generateConfigs(option);
    this.setState({
      configs: cfgs
    });
  }

  onLogin() {
    this.props.logIn((profile: any) => {
      this.updateConfigState();
      this.setState({
        loggedIn: true,
        name: profile.name
      });
    }, (msg) => {
      this.setState({
        msg: "Log in failed. Reason: " + msg
      });
    });
  }

  onLogout() {
    this.props.logout(() => {
      this.setState({
        loggedIn: false,
        msg: "logged out successfully"
      });
    });
  }

  onQueryNotes() {
    chrome.tabs.create({
      "url": `${HLC_SERVICE_BASE}q`
    });
  }

  render(): JSX.Element {
    if (this.state.loggedIn) {
      return <div className="panel">
        <UserInfo name={this.state.name} />
        <HlcConfig
          options={this.state.configs}
          onConfigChange={(opt: string) => this.onConfigChange(opt)} />
        <div className="button" onClick={() => this.onQueryNotes()}>Notes</div>
        <div className="button" onClick={() => this.onLogout()}>Log out</div>
      </div>;
    } else {
      return <div className="panel">
        <div className="button" onClick={() => this.onLogin()}>Log in</div>
      </div>;
    }
  }
}

