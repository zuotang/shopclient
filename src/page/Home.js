import { useEffect, useState, useContext } from "react";
import { Box, Spinner, Modal, Heading, TextField, Button, Column,Upsell,Icon,RadioButton,Flex,Text,Card } from "gestalt";
import Header from "../components/Header";
import { WebCtx } from "../components/WebContext";
import useUserInfo from "../hooks/useUserInfo";
import banner from "../banner.png";
import { useQuery } from "../utils/query";
import { getPhoto, sendCode } from "../api";
import styled from "styled-components";

const TypeList=styled.div`
background-color: white;
border-radius: 20px;
padding: 10px 10px;
transform: translateY(-30%);
margin: 0 10px;
transition: width 2s;
`
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
      <Box padding={8} >
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
  let { data: userInfo }=useUserInfo(history.push);
  let [value, setValue] = useState("");
  let [show, setShow] = useState(false);
  let [format, setFormat] = useState("jpg");

  let [showCode, setShowCode] = useState(false);
  let [downloadUrl, setDownloadUrl] = useState();
  let { fetch, data, loading, error } = useQuery(getPhoto, { url: value,format:format });

  useEffect(() => {
    let res = data; 
    if (res) {
      if (res.status == 0) {
        setShow(true);
        setDownloadUrl(res.url);
      } else if (res.status == 1) {
        setShowCode(true);
      }
    }
  }, [data]);
  return (
    <Box minHeight="100vh" color="lightGray">
      <Header history={history} />
      <Box padding={1} display="flex" direction="column" alignItems="center" justifyContent="center" minHeight="85vh">
        <Box marginBottom={10} color="white" rounding={3}>
        <Upsell
    message="售后交流福利群" 
    title="797402346" 
    imageData={{
      component: <Icon icon="send" accessibilityLabel="" color="darkGray" size={32} />,
    }}
  />
     
           </Box>
        <Box maxWidth="800px" width="100%" display="flex">
          <Column span={10}>
            <TextField id="email" onChange={({ value }) => setValue(value)} placeholder="输入素材链接" errorMessage={error} value={value} type="url" autoComplete="off" />
          </Column>

          {value.includes('818ps.com') &&  <TypeList>
            <Flex direction="column" gap={2} >
              <RadioButton
                checked={format === 'png'}
                id="favoriteDogA11y"
                label="png"
                name="format"
                onChange={() => setFormat('png')}
                value="png"
              />
              <RadioButton
                checked={format === 'jpg'}
                id="typeCatA11y"
                label="jpg"
                name="format"
                onChange={() => setFormat('jpg')}
                value="jpg"
              />
              <RadioButton
                checked={format === 'pdf'}
                id="typePlantsA11y"
                label="pdf"
                name="format"
                onChange={() => setFormat('pdf')}
                value="pdf"
              />
            </Flex>
          </TypeList>}

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
        <Box marginTop={10} padding={5}>
       
          <Text>为了感谢您的订单全五星【带图 + 带字】好评，这边赠送了您10次下载！</Text>
          <Text>请进福利群797402346 联系群主：小老虎 领取！</Text>
        </Box> 
        <Box marginTop={1}   display="flex" alignItems="center" >
          <Column >
            <Text>支持解析</Text>
          </Column>
          <Column>
            <Button
            
            color="white"
                text="图怪兽"
               
                />
          </Column>

          <Column>
            <Button
                color="white"
                text="南门网"
                href="http://www.dcpsd.com/?s=l"
                role="link"
                target="blank"
                />
          </Column>
        </Box> 
        <Box height="20px"></Box>
        
        <Box marginTop={2}>
          {userInfo.name && (
            <Box marginTop={2}>
            <Box marginTop={2}>
              <Button
              color="red"
              size="lg"
                text="续期激活"
                onClick={(e) => {
                  history.push("/usecodeself");
                }}
              />
            </Box> 
            <Box marginTop={2}>
              <Button
              size="lg"
              color="blue"
                text="前往购买"
                target="blank"
                href="https://www.houfaka.com/links/1D939000BDD7C8F3"
                role="link"
              />
            </Box> 
          </Box>
          )}
           </Box>
{/*           
        <Box>
          <Box height="168px"></Box>
          <Box maxWidth="368px" width="100%" marginStart="auto" marginEnd="auto">
            <img src={banner} width="100%" />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}

export default Home;
