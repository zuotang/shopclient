import React, { useState, useEffect, useRef, useContext } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Header from "../components/Header";
import System from "../page/system/System";
import ShopDetail from "../page/ShopDetail";
import Home from "../page/Home";
import Transition from "../components/Transition";
import { useAutoQuery } from "../utils/query";
import { WebCtx } from "../components/WebContext";
import { getWebConfig } from "../api";
import { Helmet } from "react-helmet";
import { getImgSrc } from "../utils/tools";

function IndexPage(props) {
  let { data, loading } = useAutoQuery(getWebConfig);
  return (
    <WebCtx.Provider value={data}>
      <Helmet>
        <title>{data.title}</title>
        <link rel="icon" href={getImgSrc(data.icon)} />
        <link rel="apple-touch-icon" href={getImgSrc(data.logo)} />
      </Helmet>
      <Switch location={props.location}>
        <Route path="/shop/:id" component={ShopDetail} />
        <Route path="/" component={Home} />
      </Switch>
    </WebCtx.Provider>
  );
}

export default IndexPage;
