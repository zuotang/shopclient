import React from "react";
import { Box, Heading, TextField, Callout, Button, Spinner, Text, IconButton } from "gestalt";
import { useQuery } from "../utils/query";
import { usecodeself } from "../api";
import { useForm } from "react-hook-form";
import FormItem from "../components/FormItem";

function Signup({ history }) {
  let { fetch, error, loading } = useQuery(usecodeself, null, {
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
            使用兑换码
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
 

          <Spinner show={loading} accessibilityLabel="请求中" size="sm" />
          <Box flex="grow" paddingX={3} paddingY={3}>
            <Box justifyContent="end" marginStart={-1} marginEnd={-1} marginTop={-1} marginBottom={-1} display="flex" wrap>
              <Box paddingX={1} paddingY={1}>
                <Button text="使用" color="red" size="lg" type="submit" />
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
export default Signup;
