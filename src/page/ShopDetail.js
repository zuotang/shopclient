import React, { useState } from "react";
import { Box, Heading, IconButton, Text, Button, Spinner } from "gestalt";

import { useAutoQuery } from "../uitls/query";
import { shop } from "../api";
import { getImgSrc } from "../uitls/tools";

import { PhotoSlider, PhotoProvider, PhotoConsumer } from "react-photo-view";
import "../style/photoview.css";
import styled from "styled-components";
import wxIcon from "../style/wx.png";
import tbIcon from "../style/tb.png";
import WxCodeModal from "../components/WxCodeModal";
import TbModal from "../components/TbModal";

const ImgIcon = styled.img`
  width: 28px;
  height: 28px;
  margin: -8px 0;
`;

const Img = styled.img`
  width: 100%;
`;

function ShopDetail(props) {
  let params = new URLSearchParams(props.location.search);
  let proxy = params.get("proxy") == 1;
  let [items, setItems] = useState([]);
  let [index, setIndex] = useState(0);
  let [wxShowCode, setWxShowCode] = useState(false);
  let [tbShow, setTbShow] = useState(false);

  let { data, loading } = useAutoQuery(
    shop,
    { id: props.match.params.id },
    {
      onSuccess: (msg, data) => {
        console.log(data);
        let list = data.photo.map((item) => ({
          src: getImgSrc(item.url),
        }));
        setItems(list);
      },
    }
  );

  let [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
    // setTimeout(() => {
    //   props.history.goBack();
    // }, 300);
  }
  return (
    <Box minHeight="100%" padding={4} display="flex" direction="column" justifyContent="center">
      <Box position="fixed" top left marginTop={4}>
        <IconButton
          icon="arrow-back"
          onClick={(e) => {
            props.history.goBack();
          }}
        />
      </Box>
      <Box marginTop={2} marginStart={6} marginEnd={6}>
        <Text color="gray" align="center" overflow="normal">
          {proxy ? data.proxy_name : data.name}
        </Text>
      </Box>
      <Spinner show={loading} accessibilityLabel="加载中" size="sm" />
      <Box marginTop={2} display="flex" alignItems="center" justifyContent="center">
        <Text weight="bold">￥</Text> <Heading size="md">{proxy ? data.proxy_price : data.price}</Heading>
      </Box>
      <Box marginTop={8}>
        {data.photo?.map((item, key) => (
          <Img
            src={getImgSrc(item.url)}
            onClick={(e) => {
              setIndex(key);
              setIsOpen(true);
            }}
          />
        ))}
      </Box>
      <PhotoSlider images={items} visible={isOpen} onClose={handleClose} maskClosable={false} index={index} onIndexChange={setIndex} />
      {wxShowCode && (
        <WxCodeModal
          onDismiss={(e) => {
            setWxShowCode(false);
          }}
        />
      )}
      {tbShow && (
        <TbModal
          taobao={data.taobao}
          onDismiss={(e) => {
            setTbShow(false);
          }}
        />
      )}
      <Box position="fixed" color="white" bottom left right display="flex" alignItems="center" justifyContent="center" height={80}>
        <Box>
          <Button
            size="lg"
            onClick={(e) => {
              setWxShowCode(true);
            }}
            text={
              <>
                <ImgIcon src={wxIcon} /> 微信下单
              </>
            }
            color="blue"
            inline
          />
        </Box>
        <Box marginStart={2}>
          <Button
            size="lg"
            onClick={(e) => {
              setTbShow(true);
            }}
            text={
              <>
                <ImgIcon src={tbIcon} /> 淘宝下单入口
              </>
            }
            color="blue"
            inline
          />
        </Box>
      </Box>

      <Box height={80}></Box>
    </Box>
  );
}

export default ShopDetail;
