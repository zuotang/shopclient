import React, { useState } from "react";
import { Layer, Modal, Box, Text, Button, IconButton } from "gestalt";

import styled from "styled-components";
import ShowMessage from "../components/ShowMessage";
import { copyTranslateResult } from "../utils/tools";

const TextCopy = styled.div`
  user-select: text;
  color: var(--g-colorGray300);
`;
function HomeCodeModal({ onDismiss, taobao }) {
  let [message, setMessage] = useState("");

  return (
    <Box position="relative">
      <ShowMessage message={{ message, setMessage }} />
      <Layer>
        <Modal accessibilityModalLabel="View default padding and styling" onDismiss={onDismiss} size="sm">
          <Box padding={6} display="flex" direction="column" alignItems="center">
            <Text color="blue">口令 （复制打开淘宝即可）</Text>
            <Box marginTop={6} marginBottom={6}>
              <TextCopy id="copy_text">{taobao}</TextCopy>
            </Box>
            <Box marginTop={4} width="100%">
              <Button
                color="blue"
                size="lg"
                text={"复制淘口令"}
                onClick={(e) => {
                  copyTranslateResult(document.querySelector("#copy_text"), setMessage);
                }}
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
