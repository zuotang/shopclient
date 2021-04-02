import React, { useContext } from "react";
import { Layer, Modal, Box, Text, Button, IconButton } from "gestalt";
import QRCodeImg from "../style/qrcode.png";
import styled from "styled-components";
import { WebCtx } from "./WebContext";
import { getImgSrc } from "../uitls/tools";
const QRCode = styled.img`
  width: 280px;
  height: 280px;
`;
function HomeCodeModal({ onDismiss }) {
  let web = useContext(WebCtx);
  return (
    <Box position="relative">
      <Layer>
        <Modal accessibilityModalLabel="View default padding and styling" onDismiss={onDismiss} size="sm">
          <Box padding={6} display="flex" direction="column" alignItems="center">
            <QRCode src={getImgSrc(web.wxqrcode)} />
            <Text color="gray">长按保存二维码 微信扫码加好友下单</Text>
            <Box marginTop={4} width="100%">
              <Button
                color="blue"
                size="lg"
                text={
                  <Box margin={-4}>
                    <Text color="white" align="center" size={"lg"}>
                      {web.wx}
                    </Text>
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
