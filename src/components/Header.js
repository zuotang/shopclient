import React, { useContext } from "react";
import { Box, Icon, Heading, IconButton } from "gestalt";
import styled from "styled-components";
import { WebCtx } from "./WebContext";
import usePortal from "../hooks/usePortal";
import { clearAllCookie, getImgSrc } from "../uitls/tools";

const HeaderBox = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 999;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

function Header({ history }) {
  const [value, setValue] = React.useState("");
  let web = useContext(WebCtx);
  let { Portal } = usePortal();
  return (
    <Box height={80}>
      <Portal>
        <HeaderBox color="white" width={"100%"}>
          <Box display="flex" alignItems="center">
            <Box padding={3}>
              <img src={getImgSrc(web.logo)} width={35} height={35} />
            </Box>
            <Box padding={2}>
              <Heading color="red" size="sm">
                {web.title}
              </Heading>
            </Box>
          </Box>

          <Box paddingX={2} display="flex">
            <IconButton
              accessibilityLabel="用户信息"
              icon="person"
              size="md"
              onClick={(e) => {
                clearAllCookie();
                history.push("/userinfo");
              }}
            />
            <IconButton
              accessibilityLabel="退出"
              icon="logout"
              size="md"
              onClick={(e) => {
                clearAllCookie();
                history.push("/signin");
              }}
            />
          </Box>
        </HeaderBox>
      </Portal>
    </Box>
  );
}

export default Header;
