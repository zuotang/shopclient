import { useEffect, useState, useContext } from "react";
import { Box, Spinner, Modal, Heading, TextField, Button, Column } from "gestalt";
import Header from "../components/Header";
import { WebCtx } from "../components/WebContext";
import useUserInfo from "../hooks/useUserInfo";
import banner from "../banner.png";
import { useQuery } from "../utils/query";
import { getPhoto, sendCode } from "../api";

function DownloadFile({ onDismiss, url }) {
  return (
    <Modal accessibilityModalLabel="View default padding and styling" heading="文件下载" onDismiss={onDismiss} size="sm">
      <Box padding={8}>
        <Button
          text="下载"
          color="red"
          onClick={(e) => {
            window.open(url);
            onDismiss();
          }}
        />
      </Box>
    </Modal>
  );
}

function SendCode({ onDismiss, onDownload, codeImg }) {
  let [value, setValue] = useState("");
  let { fetch, loading, error } = useQuery(
    sendCode,
    { code: value },
    {
      onSuccess: (msg, data) => {
        onDismiss();
        if (data.status == 0 && data.url) {
          onDownload(data.url);
        }
      },
    }
  );

  return (
    <Modal accessibilityModalLabel="View default padding and styling" heading="文件下载" onDismiss={onDismiss} size="sm">
      <Box padding={8}>
        <TextField id="code" onChange={({ value }) => setValue(value)} placeholder="输入验证码" errorMessage={error} value={value} autoComplete="off" />
        <img src={codeImg} />
        <Button
          text="提交"
          color="red"
          disabled={loading}
          onClick={(e) => {
            // window.open(data.url);
            // onDismiss();
            fetch();
          }}
        />
      </Box>
    </Modal>
  );
}

function Home({ location, history }) {
  let params = new URLSearchParams(location.search);
  let web = useContext(WebCtx);
  useUserInfo(history.push);
  let [value, setValue] = useState("");
  let [show, setShow] = useState(false);

  let [showCode, setShowCode] = useState(false);
  let [downloadUrl, setDownloadUrl] = useState();
  let { fetch, data, loading, error } = useQuery(getPhoto, { url: value });

  useEffect(() => {
    let res = data.data;
    if (res) {
      if (res.status == 0) {
        setShow(true);
        setDownloadUrl(res.url);
      } else if (res.status == 1) {
        setShowCode(true);
      }
    }
  }, [data]);
  console.log(data);
  return (
    <Box minHeight="100vh" color="lightGray">
      <Header history={history} />
      <Box padding={1} display="flex" direction="column" alignItems="center" justifyContent="center" minHeight="85vh">
        <Box maxWidth="800px" width="100%" display="flex">
          <Column span={10}>
            <TextField id="email" onChange={({ value }) => setValue(value)} placeholder="输入素材链接" errorMessage={error} value={value} type="url" autoComplete="off" />
          </Column>
          <Column span={2}>
            <Box marginStart={1}>
              <Button
                disabled={loading}
                text="解 析"
                onClick={(e) => {
                  fetch();
                }}
                color="red"
              />
            </Box>
          </Column>
          <Column span={1}>
            <Spinner loading={loading} />
          </Column>

          {show && (
            <DownloadFile
              onDismiss={() => {
                setShow(false);
              }}
              url={downloadUrl}
            />
          )}

          {showCode && (
            <SendCode
              onDismiss={() => {
                setShowCode(false);
              }}
              codeImg={data.data.img}
              onDownload={(url) => {
                setDownloadUrl(url);
                setShow(true);
              }}
            />
          )}
        </Box>
        <Box>
          <Box height="168px"></Box>
          <Box maxWidth="368px" width="100%" marginStart="auto" marginEnd="auto">
            <img src={banner} width="100%" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
