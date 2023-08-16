import React, { useEffect, useState } from "react";
import Action from "./Action";
import { Provider } from "react-redux";
import STore from "./Store";
import Routing from "./routes";

const App = () => {
  return (
    <Provider store={STore}>
      <Routing />
    </Provider>
    // <div>
    //   {data.map((i, j) => {
    //     return <div onClick={()=>set([...data,data[j].one=data[j].one+1])}>{i.one}</div>;
    //   })}
    // </div>
  );
};
export default App;
