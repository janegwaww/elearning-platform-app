import React from "react";
import { Router } from "@reach/router";

import Default from "../components/phone/PhoneIndex";
import Hots from "../components/phone/page/Hots";
import Shuxie from "../components/phone/page/Math";
import Ai from "../components/phone/page/Ai";
import Physics from "../components/phone/page/Physics";
import Histroy from "../components/phone/page/History";
import Psychology from "../components/phone/page/Psychology";
import Economy from "../components/phone/page/Economy";
import Software from '../components/phone/page/Software';
import Cs from '../components/phone/page/Cs';
import Management from '../components/phone/page/Management';
import Mechanics from '../components/phone/page/Mechanics';
import Life from '../components/phone/page/Life';
import Law from '../components/phone/page/Law';
import Nature from '../components/phone/page/Nature';
import Health from '../components/phone/page/Health';
import Others from '../components/phone/page/Others'
const Phone = () => {
  return (
    <Router basepath="/phone">
      <Default path="/">
        <Hots path="/" />
        <Shuxie path="/math" />
        <Ai path="/ai" />
        <Physics path="/physics" />
        <Histroy path="/history" />
        <Psychology path="/psychology" />
        <Economy path='/economy' />
        <Software path='/software' />
        <Cs path='/cs' />
        <Management path='/management' />
        <Mechanics path='/mechanics' />
        <Life path='/life'/>
        <Law path='/law' />
        <Nature path='/nature' />
        <Health path='/health' />
        <Others path= '/others' />
      </Default>
    </Router>
  );
};
export default Phone;
