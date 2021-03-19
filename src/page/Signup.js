import React from "react";
import { Box, Heading, TextField, Callout, Button, Spinner, Text, IconButton } from "gestalt";
import { useQuery } from "../uitls/query";
import { signup } from "../api";
import { useForm } from "react-hook-form";
import FormItem from "../components/FormItem";

function Signup({ history }) {
  let { fetch, error, loading } = useQuery(signup, null, {
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
            用户注册
          </Heading>
        </Box>
        <Box paddingX={1} paddingY={1}>
          {error && <Callout type="error" iconAccessibilityLabel="Error icon" message={error} />}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box flex="grow" paddingX={3} paddingY={3}>
            <FormItem com={TextField} name="code" label="兑换码" placeholder="输入兑换码" ref={register({ required: true })} />
            {errors.code && <Text color="red">请输入兑换码</Text>}
          </Box>
          <Box flex="grow" paddingX={3} paddingY={3}>
            <FormItem com={TextField} name="name" label="账号" placeholder="请输入账号" ref={register({ required: true, minLength: 2, maxLength: 20 })} />
            {errors.name && <Text color="red">用户名需要在2-20字符内</Text>}
          </Box>
          <Box flex="grow" paddingX={3} paddingY={3}>
            <FormItem com={TextField} name="password" label="密码" type="password" placeholder="请输入密码" ref={register({ required: true, minLength: 6, maxLength: 40 })} />
            {errors.password && <Text color="red">密码需要在6-40字符内</Text>}
          </Box>
          <Box flex="grow" paddingX={3} paddingY={3}>
            <FormItem
              com={TextField}
              name="confirm_password"
              label="确认密码"
              type="password"
              placeholder="确认密码"
              ref={register({ required: true, minLength: 6, maxLength: 40 })}
            />
            {errors.confirm_password && <Text color="red">密码需要在6-40字符内</Text>}
          </Box>

          <Spinner show={loading} accessibilityLabel="登录中" size="sm" />
          <Box flex="grow" paddingX={3} paddingY={3}>
            <Box justifyContent="end" marginStart={-1} marginEnd={-1} marginTop={-1} marginBottom={-1} display="flex" wrap>
              <Box paddingX={1} paddingY={1}>
                <Button text="注册" color="red" size="lg" type="submit" />
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
export default Signup;
