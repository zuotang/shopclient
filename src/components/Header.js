import React, { useContext } from "react";
import { Box, Icon, Heading, SearchField } from "gestalt";
import styled from "styled-components";
import { WebCtx } from "./WebContext";
import usePortal from "../hooks/usePortal";
import { getImgSrc } from "../uitls/tools";

const HeaderBox = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 0;
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
            <Box padding={3} lgDisplay="block" display="none">
              <img src={getImgSrc(web.logo)} width={35} height={35} />
            </Box>

            <Box padding={2} lgDisplay="block" display="none">
              <Heading color="red" size="sm">
                {web.title}
              </Heading>
            </Box>
            <Box flex="grow" paddingX={2} paddingY={3}>
              <SearchField accessibilityLabel="搜索对应款号" id="searchField" onChange={({ value }) => setValue(value)} placeholder="搜索对应款号" value={value} />
            </Box>
          </Box>
        </HeaderBox>
      </Portal>
    </Box>
  );
}

export default Header;
