import { useEffect, useState, useContext } from "react";
import { Box, Spinner, Button } from "gestalt";
import Header from "../components/Header";
import { WebCtx } from "../components/WebContext";

function Home({ location, history }) {
  let params = new URLSearchParams(location.search);
  let web = useContext(WebCtx);
  return (
    <Box minHeight="105vh" color="lightGray">
      <Header />
      <Box padding={1} display="flex" direction="column" alignItems="center" minHeight="85vh">
        <Box maxWidth="800px" marginTop={6}>
          <Button
            text="新用户注册"
            onClick={(e) => {
              history.push("/signup");
            }}
            color="red"
          />
          {web["googlelink"] && (
            <Box marginTop={2}>
              <Button text={"Google浏览器插件下载"} href={web["googlelink"]} target="blank" role={"link"} />
            </Box>
          )}
          {web["360link"] && (
            <Box marginTop={2}>
              <Button text="360浏览器插件下载" href={web["360link"]} target="blank" role={"link"} />
            </Box>
          )}

          <Box marginTop={2}>
            <Button
              text="用户信息"
              onClick={(e) => {
                history.push("/userinfo");
              }}
            />
          </Box>
          <Box marginTop={2}>
            <Button
              text="修改密码"
              onClick={(e) => {
                history.push("/setpassword");
              }}
            />
          </Box>

          <Box marginTop={2}>
            <Button
              text="续期激活"
              onClick={(e) => {
                history.push("/usecode");
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
