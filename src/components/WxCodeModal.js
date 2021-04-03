import React, { useContext, useState } from "react";
import { Layer, Modal, Box, Text, Button, IconButton } from "gestalt";
import QRCodeImg from "../style/qrcode.png";
import styled from "styled-components";
import { WebCtx } from "./WebContext";
import ShowMessage from "../components/ShowMessage";
import { getImgSrc, copyTranslateResult } from "../uitls/tools";
const TextCopy = styled.div`
  user-select: text;
  color: var(--g-white);
`;
const QRCode = styled.img`
  width: 280px;
  height: 280px;
`;
function HomeCodeModal({ onDismiss }) {
  let [message, setMessage] = useState("");
  let web = useContext(WebCtx);
  return (
    <Box position="relative">
      <ShowMessage message={{ message, setMessage }} />
      <Layer>
        <Modal accessibilityModalLabel="View default padding and styling" onDismiss={onDismiss} size="sm">
          <Box padding={6} display="flex" direction="column" alignItems="center">
            <QRCode src={getImgSrc(web.wxqrcode)} />
            <Text color="gray">长按保存二维码 微信扫码加好友下单</Text>
            <Box marginTop={4} width="100%">
              <Button
                color="blue"
                size="lg"
                onClick={(e) => {
                  copyTranslateResult(document.querySelector("#copy_text"), setMessage);
                }}
                text={
                  <Box margin={-4}>
                    <TextCopy id="copy_text">{web.wx}</TextCopy>
                    <Text color="white" align="center" size={"sm"}>
                      微信账号
                    </Text>
                  </Box>
                }
              />
            </Box>
            <Box height={40}></Box>
          </Box>
          <Box position="fixed" display="flex" marginTop={-10} left right justifyContent="center">
            <Box color="white" rounding="circle" height={65} width={65} padding={2}>
              <IconButton
                icon="cancel"
                bgColor="lightGray"
                size="xl"
                padding={3}
                onClick={(e) => {
                  onDismiss();
                }}
              />
            </Box>
          </Box>
        </Modal>
      </Layer>
    </Box>
  );
}
export default HomeCodeModal;
