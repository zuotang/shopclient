import Frame from "./Frame";
import Signin from "../page/Signin";
import Signup from "../page/Signup";
import UseCode from "../page/UseCode";
import Message from "../page/Message";
import UserInfo from "../page/UserInfo";
import SetPassword from "../page/SetPassword";
import SearchCode from "../page/SearchCode";
import { Route, Switch } from "react-router-dom";

function Root(props) {
  return (
    <Switch>
      <Route path="/usecode" component={UseCode} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/userinfo" component={UserInfo} />
      <Route path="/setpassword" component={SetPassword} />
      <Route path="/Message" component={Message} />
      <Route path="/codeinfo" component={SearchCode} />
      <Route path="/" component={Frame} />
      {/* <Route path="/" component={Frame} /> */}
    </Switch>
  );
}

export default Root;
