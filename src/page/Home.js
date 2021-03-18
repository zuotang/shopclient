import { useEffect, useState } from "react";
import { Box, Spinner, Button } from "gestalt";
import Header from "../components/Header";

function Home({ location, history }) {
  let params = new URLSearchParams(location.search);
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
          <Box marginTop={2}>
            <Button text="Google浏览器插件下载" href="/static/huke-谷歌插件【下载后解压】.zip" target="blank" role={"link"} />
          </Box>
          <Box marginTop={2}>
            <Button text="360浏览器插件下载" href="/static/360插件.zip" target="blank" role={"link"} />
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
