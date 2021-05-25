import React from "react";
import { Box, Image, Text, Heading } from "gestalt";
import { getThumbSrc } from "../utils/tools";
import { Link } from "react-router-dom";

function ShopCard({ data, proxy }) {
  return (
    <Link to={`/shop/${data.id}?proxy=${proxy ? 1 : 0}`}>
      <Box padding={3} rounding={3} color="white" overflow="hidden">
        <Box margin={-3}>
          <Image alt="example.com" naturalHeight={564} naturalWidth={564} src={getThumbSrc(data.photo[0]?.url)} />
        </Box>
        <Box marginTop={5}>
          <Text weight="bold">{data.brand}</Text>
        </Box>
        <Box>
          <Text truncate>{proxy ? data.proxy_name : data.name}</Text>
        </Box>
        <Box marginTop={2}>
          <Heading size="sm">￥ {proxy ? data.proxy_price : data.price}</Heading>
        </Box>
        <Box marginTop={2}>
          <Text size="md">自营 | 大陆</Text>
        </Box>
      </Box>
    </Link>
  );
}
export default ShopCard;
