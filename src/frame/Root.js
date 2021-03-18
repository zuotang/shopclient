import Frame from "./Frame";
import Signin from "../page/Signin";
import Signup from "../page/Signup";
import UseCode from "../page/UseCode";
import Message from "../page/Message";
import { Route, Switch } from "react-router-dom";

function Root(props) {
  return (
    <Switch>
      <Route path="/usecode" component={UseCode} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/message" component={Message} />
      <Route path="/" component={Frame} />
      {/* <Route path="/" component={Frame} /> */}
    </Switch>
  );
}

export default Root;
