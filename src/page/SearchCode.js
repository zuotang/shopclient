import React, { useState } from "react";
import { Box, Heading, Table, TextField, Callout, Button, Spinner, Text, IconButton, Layer, Modal } from "gestalt";
import { useQuery } from "../utils/query";
import { userStatus } from "../utils/tools";
import { searchcode } from "../api";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import FormItem from "../components/FormItem";

import "dayjs/locale/zh-cn";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

function SearchCode({ history }) {
  const [showModal, setShowModal] = useState(false);

  let { data, fetch, error, loading } = useQuery(searchcode, null, {
    onSuccess: (msg, res) => {
      let data = res;
      if (data.status != 0) {
        alert(data.message);
        return;
      }

      setShowModal(true);
      //history.push(`/message?title=${encodeURI(data.message)}&content=${encodeURI("请到插件登录...")}`);
    },
  });
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    fetch(data);
  };
  let typeName = ["用户", "代理"];

  function showTime(time, fromNow) {
    console.log(time);
    if (!time) return "--";
    return dayjs.utc(time).local().fromNow(fromNow);
  }
  console.log(data);
  let item = data.code_info || {};

  function handleConcel() {
    setShowModal(false);
  }
  let dayName = {
    7: "7天",
    30: "一个月",
    92: "一季度",
    365: "一年",
    36500: "终身",
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
            兑换码查询
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
                <Button text="查询" color="red" size="lg" type="submit" />
              </Box>
            </Box>
          </Box>
        </form>

        {showModal && item && (
          <Layer>
            <Modal
              accessibilityModalLabel={"兑换码查询结果"}
              heading={item.name ? "兑换码已使用" : "兑换码未使用"}
              onDismiss={() => {
                handleConcel();
              }}
              footer={
                <Box display="flex" justifyContent="center">
                  <Button
                    size="lg"
                    color="red"
                    text="确 定"
                    onClick={() => {
                      setShowModal(!showModal);
                    }}
                  />
                </Box>
              }
              role="alertdialog"
              size="lg"
            >
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Text weight="bold">用户</Text>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Text weight="bold">兑换码</Text>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Text weight="bold">类型</Text>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Text weight="bold">销售</Text>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Text weight="bold">备注</Text>
                    </Table.HeaderCell>
                    {/* <Table.HeaderCell>
                      <Text weight="bold">兑换码生成时间</Text>
                    </Table.HeaderCell> */}
                    <Table.HeaderCell>
                      <Text weight="bold">兑换码使用时间</Text>
                    </Table.HeaderCell>

                    <Table.HeaderCell>
                      <Text weight="bold">兑换码状态</Text>
                    </Table.HeaderCell>

                    <Table.HeaderCell>
                      <Text weight="bold">用户状态</Text>
                    </Table.HeaderCell>

                    <Table.HeaderCell>
                      <Text weight="bold">用户到期时间</Text>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Text>{item.name}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text>{item.code}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text>{dayName[item.day] || item.day}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text color={item.type == 0 ? "darkGray" : "red"}>{typeName[item.type]}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text>{item.remarks}</Text>
                    </Table.Cell>

                    {/* <Table.Cell>
                      <Text>{showTime(item.c_add_time)}</Text>
                    </Table.Cell> */}

                    <Table.Cell>
                      <Text>{showTime(item.c_use_time)}</Text>
                    </Table.Cell>
                    <Table.Cell>{userStatus(item.c_status)}</Table.Cell>
                    <Table.Cell>{userStatus(item.u_status)}</Table.Cell>

                    <Table.Cell>
                      <Text>{showTime(item.u_duedate, true)}</Text>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Modal>
          </Layer>
        )}
      </Box>
    </Box>
  );
}
export default SearchCode;
