import React, { useState, useEffect, useRef } from "react";
import { Box, Spinner } from "gestalt";
import { Switch, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import System from "../page/system/System";
import ShopDetail from "../page/ShopDetail";
import Home from "../page/Home";
import useUserInfo from "../hooks/useUserInfo";
import { UserContext } from "../components/UserContext";
import Transition from "../components/Transition";

function IndexPage(props) {
  // let userData = useUserInfo(props.history.push);
  // if (!userData.id) {
  //   return (
  //     <Box paddingY={12}>
  //       <Spinner show={true} accessibilityLabel="获取用户数据" />
  //     </Box>
  //   );
  // }
  return (
    <Transition {...props}>
      <Switch location={props.location}>
        <Route path="/shop/:id" component={ShopDetail} />
        <Route path="/" component={Home} />
      </Switch>
    </Transition>
  );
}

export default IndexPage;
