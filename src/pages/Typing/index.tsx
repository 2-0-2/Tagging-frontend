import React from 'react';
import * as s from "./style";
import logo from "../../assets/로고.svg";


const index = () => {
  return (
    <s.Typing_container>
    <s.Typing_layout>
      <img src={logo} style={{ width: "150px", height: "auto"}}/>
      <s.Typing_box_layout>
      <s.Typing_box>


      </s.Typing_box>
      </s.Typing_box_layout>
    </s.Typing_layout>
    </s.Typing_container>
  );
};

export default index;