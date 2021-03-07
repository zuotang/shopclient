import React, { useState } from "react";
import { Box, Heading, Text } from "gestalt";

import { useAutoQuery } from "../uitls/query";
import { shop } from "../api";
import { getImgSrc } from "../uitls/tools";

import { PhotoSlider, PhotoProvider, PhotoConsumer } from "react-photo-view";
import "../style/photoview.css";

function ShopDetail(props) {
  let params = new URLSearchParams(props.location.search);
  let proxy = params.get("proxy") == 1;
  let [items, setItems] = useState([]);
  let [index, setIndex] = useState(0);
  let { data } = useAutoQuery(
    shop,
    { id: props.match.params.id },
    {
      onSuccess: (msg, data) => {
        console.log(data);
        let list = data.photo.map((item) => ({
          src: getImgSrc(item.url),
          intro: (
            <Box>
              <Box marginTop={2}>
                <Heading color="white" size="sm">
                  ￥ {proxy ? data.proxy_price : data.price}
                </Heading>
              </Box>
              <Box marginTop={5}>
                <Text color="white" weight="bold">
                  {data.brand}
                </Text>
              </Box>
              <Box>
                <Text color="white" truncate>
                  {proxy ? data.proxy_name : data.name}
                </Text>
              </Box>
            </Box>
          ),
        }));
        setItems(list);
        setIsOpen(true);
      },
    }
  );

  let [isOpen, setIsOpen] = useState(false);

  let options = {
    //http://photoswipe.com/documentation/options.html
  };

  function handleClose() {
    setIsOpen(false);
    setTimeout(() => {
      props.history.goBack();
    }, 300);
  }
  //return <Box color="darkGray" minHeight="100%">test</Box>
  return (
    <Box color="darkGray" minHeight="100%">
      <PhotoSlider images={items} visible={isOpen} onClose={handleClose} maskClosable={false} index={index} onIndexChange={setIndex} />
    </Box>
  );
}

export default ShopDetail;
