import React,{useContext} from "react";
import { Box, Icon,  Heading, } from "gestalt";
import styled from 'styled-components'
import {webCtx} from './WebContext';
import usePortal from '../hooks/usePortal'
const HeaderBox=styled.div`
  position:fixed;
  top:0;
  width:100%;
  background-color:white;
  z-index:999;
`
  
function Header({ history }) {
  const [value, setValue] = React.useState("");
  let web=useContext(webCtx);
 
  return  <Box height={80}>
    <HeaderBox color="white"  width={"100%"} >
      <Box padding={3} display="flex" alignItems="center" >
      <Box padding={3}>
        <Icon icon="pinterest" color="red" size={20} accessibilityLabel="Pinterest" />
        {/* <Heading color="red" size="sm">
          后台管理系统
        </Heading> */}
      </Box>
      <Box  padding={2}>
      <Heading color="red" size="sm">
          {web.title}
        </Heading> 
      </Box>
  
      <Box flex="grow" paddingX={2}>
        {/* <SearchField accessibilityLabel="Demo Search Field" id="searchField" onChange={({ value }) => setValue(value)} placeholder="Search and explore" value={value} /> */}
      </Box>
  
      </Box>
    </HeaderBox>
    </Box>
  
}

export default Header;
