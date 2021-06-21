import React from "react";
import { Box, Heading, Button, IconButton } from "gestalt";
import useUserInfo from "../hooks/useUserInfo";
import dayjs from "dayjs";
import { goBack } from "../utils/tools";
import "dayjs/locale/zh-cn";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

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
              goBack(history);
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
          到期时间：{data.duedate && dayjs.utc(data.duedate).local().fromNow().replace("100 年内", "终身")}
        </Box>

        <Box flex="grow" paddingX={3} paddingY={3}>
          <Box justifyContent="end" marginStart={-1} marginEnd={-1} marginTop={-1} marginBottom={-1} display="flex" wrap>
            <Box paddingX={1} paddingY={1}>
              <Button
                color="red"
                onClick={() => {
                  history.push("/setpassword");
                }}
                text="修改密码"
              />
            </Box>

            <Box paddingX={1} paddingY={1}>
              <Button
                color="red"
                onClick={() => {
                  history.push("/signin");
                }}
                text="退出登录"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default UserInfo;
