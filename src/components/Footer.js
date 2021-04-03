import React, { useContext } from "react";
import { Text, Box, Link } from "gestalt";

import { WebCtx } from "./WebContext";

function Footer() {
  let web = useContext(WebCtx);
  return (
    <Link href={web.recordlink} target="blank">
      <Box padding={2}>
        <Text align="center" size="sm" color="gray">
          {web.recordnumber}
        </Text>
      </Box>
    </Link>
  );
}
export default Footer;
