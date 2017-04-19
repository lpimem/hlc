import * as React from "react";

export interface HlcConfigProps {
  options: [string, string, string][];
  onConfigChange: (opt: string) => void;
}

export const HlcConfig = function (props: HlcConfigProps) {
  const options = props.options;
  console.info(JSON.stringify(props));
  return (<div className="hlc-config-container">
    {options.map((option: [string, string, string], idx:number)=>
      <div key={idx} className={"hlc-cfg-item-holder " + option[2]}> 
        <div className={"hlc-cfg-item "+option[1]}
             onClick={()=>props.onConfigChange(option[0])}></div>
      </div>
    )}
  </div>);
}; 