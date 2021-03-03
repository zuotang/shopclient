import React, { useState, useEffect, useRef, useContext } from "react";
import { Box, Spinner } from "gestalt";
import { Switch, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import System from "../page/system/System";
import ShopDetail from "../page/ShopDetail";
import Home from "../page/Home";
import Transition from "../components/Transition";
import { useAutoQuery } from "../uitls/query";
import { WebCtx } from "../components/WebContext";
import { getWebConfig } from "../api";
function IndexPage(props) {
  let { data, loading } = useAutoQuery(getWebConfig);
  return (
    <WebCtx.Provider value={data}>
      <Transition {...props}>
        <Switch location={props.location}>
          <Route path="/shop/:id" component={ShopDetail} />
          <Route path="/" component={Home} />
        </Switch>
      </Transition>
    </WebCtx.Provider>
  );
}

export default IndexPage;
