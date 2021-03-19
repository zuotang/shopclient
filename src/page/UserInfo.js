import React from "react";
import { Box, Heading, Button, IconButton } from "gestalt";
import useUserInfo from "../hooks/useUserInfo";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

function UserInfo({ history }) {
  let { data } = useUserInfo(history.push);
  console.log(dayjs.utc(data.duedate).isUTC());
  return (
    <Box display="flex" justifyContent="center" height="100vh">
      <Box borderStyle="sm" display="flex" margin="auto" marginTop="auto" wrap width="100%" direction="column" maxWidth={500}>
        <Box flex="grow" display="flex" alignItems="center" paddingX={3} paddingY={3}>
          <IconButton
            icon="arrow-back"
            iconColor="red"
            onClick={(e) => {
              history.goBack();
            }}
          />
          <Heading size="sm" accessibilityLevel={2}>
            个人信息
          </Heading>
        </Box>
        <Box column={12} padding={3}>
          用户账号：{data.name}
        </Box>
        <Box column={12} padding={3}>
          到期时间：{dayjs.utc(data.duedate).local().format("YYYY-MM-DD HH:mm:ss")}
        </Box>
        <Box marginStart="auto" padding={5}>
          <Button
            color="red"
            onClick={() => {
              history.push("/setpassword");
            }}
            text="修改密码"
          />
        </Box>
      </Box>
    </Box>
  );
}
export default UserInfo;
