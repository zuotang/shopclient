import React from "react";
import { Box, Heading, TextField, Callout, Button, Spinner, IconButton } from "gestalt";
import { useQuery } from "../uitls/query";
import { setPassword } from "../api";
import { useForm } from "react-hook-form";
import FormItem from "../components/FormItem";

function SetPassword({ history }) {
  let { fetch, error, loading } = useQuery(setPassword, null, {
    onSuccess: (msg, res) => {
      let data = res;
      if (data.status != 0) {
        alert(data.message);
        return;
      }
      history.push(`/message?title=${encodeURI(data.message)}&content=${encodeURI("请到插件登录...")}`);
    },
  });
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    fetch(data);
  };

  return (
    <Box display="flex" justifyContent="center" height="100vh">
      <Box borderStyle="sm" display="flex" margin="auto" marginTop="auto" wrap width="100%" direction="column" maxWidth={800}>
        <Box flex="grow" display="flex" alignItems="center" paddingX={3} paddingY={3}>
          <IconButton
            icon="arrow-back"
            iconColor="red"
            onClick={(e) => {
              history.goBack();
            }}
          />
          <Heading size="sm" accessibilityLevel={2}>
            修改密码
          </Heading>
        </Box>
        <Box paddingX={1} paddingY={1}>
          {error && <Callout type="error" iconAccessibilityLabel="Error icon" message={error} />}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box flex="grow" paddingX={3} paddingY={3}>
            <FormItem com={TextField} name="code" label="邀请码" placeholder="请输入邀请码" ref={register} />
          </Box>
          <Box flex="grow" paddingX={3} paddingY={3}>
            <FormItem com={TextField} name="name" label="账号" placeholder="请输入账号" ref={register} />
          </Box>

          <Box flex="grow" paddingX={3} paddingY={3}>
            <FormItem com={TextField} name="password" label="新密码" type="password" placeholder="请输入新密码" ref={register} />
          </Box>

          <Spinner show={loading} accessibilityLabel="修改密码中" size="sm" />
          <Box flex="grow" paddingX={3} paddingY={3}>
            <Box justifyContent="end" marginStart={-1} marginEnd={-1} marginTop={-1} marginBottom={-1} display="flex" wrap>
              <Box paddingX={1} paddingY={1}>
                <Button text="确认" color="red" size="lg" type="submit" />
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
export default SetPassword;
