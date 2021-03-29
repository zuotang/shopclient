import React from "react";
import { Box, Heading, TextField, Callout, Button, Spinner, IconButton } from "gestalt";
import { useQuery } from "../uitls/query";
import { signin } from "../api";
import { useForm } from "react-hook-form";
import FormItem from "../components/FormItem";

function Signin({ history }) {
  let { fetch, error, loading } = useQuery(signin, null, {
    onSuccess: () => {
      history.goBack();
    },
  });
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    fetch(data);
  };

  return (
    <Box display="flex" justifyContent="center" height="100vh">
      <Box borderStyle="sm" display="flex" margin="auto" marginTop="auto" wrap width="100%" direction="column" maxWidth={800}>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <Box flex="grow" display="flex" alignItems="center" paddingX={3} paddingY={3}>
            <IconButton
              icon="arrow-back"
              iconColor="red"
              onClick={(e) => {
                history.goBack();
              }}
            />
            <Heading size="sm" accessibilityLevel={2}>
              用户登录
            </Heading>
          </Box>
        </Box>
        <Box paddingX={1} paddingY={1}>
          {error && <Callout type="error" iconAccessibilityLabel="Error icon" message={error} />}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box flex="grow" paddingX={3} paddingY={3}>
            <FormItem com={TextField} name="name" label="账号" placeholder="请输入账号" ref={register} />
          </Box>

          <Box flex="grow" paddingX={3} paddingY={3}>
            <FormItem com={TextField} name="password" label="密码" type="password" placeholder="请输入密码" ref={register} />
          </Box>

          <Spinner show={loading} accessibilityLabel="登录中" size="sm" />
          <Box flex="grow" paddingX={3} paddingY={3}>
            <Box justifyContent="end" marginStart={-1} marginEnd={-1} marginTop={-1} marginBottom={-1} display="flex" wrap>
              <Box paddingX={1} paddingY={1}>
                <Button
                  text="没有账号去注册"
                  size="lg"
                  color="transparent"
                  onClick={(e) => {
                    history.replace("/signup");
                  }}
                />
              </Box>
              <Box paddingX={1} paddingY={1}>
                <Button text="登录" color="red" size="lg" type="submit" />
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
export default Signin;
