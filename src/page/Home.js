import { useEffect, useState } from "react";
import { Box, Spinner, Button } from "gestalt";
import ShopCard from "../components/ShopCard";

import { useAutoQuery, useQuery } from "../utils/query";
import { shops } from "../api";

import { useScrollBottom, useResetScroll } from "../hooks/usePage";

import Header from "../components/Header";
import Footer from "../components/Footer";
import wxIcon from "../style/wx.png";
import styled from "styled-components";
import WxCodeModal from "../components/WxCodeModal";

const ImgIcon = styled.img`
  width: 28px;
  height: 28px;
  margin: -8px 0;
`;

//存入pageList
let pData = null;
function Home({ location, history }) {
  let params = new URLSearchParams(location.search);
  let [keyword, setKeyword] = useState("");
  let [showCode, setShowCode] = useState(false);
  let { data, update, loading, fetchMore } = useAutoQuery(shops, { status: params.get("status") || 0, keyword, page_size: 20 }, { defaultData: pData });
  pData = data;
  let { list, page, total_page, page_size } = data;
  useScrollBottom(() => {
    if (!loading && page < total_page) {
      fetchMore({ page: page ? page + 1 : 1 }, {}, (pData, cData, pParams, cParams) => {
        let pList = pData.list || [];
        return { ...cData, list: [...pList, ...cData.list] };
      });
    }
  }, [page, total_page, loading]);
  useResetScroll(location.pathname, history.action);

  return (
    <Box minHeight="105vh" color="lightGray">
      <Box height={80}></Box>
      <Box padding={1} display="flex" direction="column" alignItems="center" minHeight="85vh">
        <Box display="flex" wrap maxWidth="100%" width="1200px">
          {list?.map((item, key) => (
            <Box key={item.id} column={6} smColumn={6} mdColumn={3} mdColumn={2}>
              <Box margin={1}>
                <ShopCard data={item} proxy={params.get("proxy") == 1} />
              </Box>
            </Box>
          ))}
        </Box>
        <Spinner show={loading} accessibilityLabel="加载中" size="sm" />
      </Box>
      <Header onSearch={setKeyword} />
      <Footer />

      {showCode && (
        <WxCodeModal
          onDismiss={(e) => {
            setShowCode(false);
          }}
        />
      )}
      <Box position="fixed" color="white" bottom left right display="flex" alignItems="center" justifyContent="center" height={80}>
        <Button
          size="lg"
          onClick={(e) => {
            setShowCode(true);
          }}
          text={
            <>
              <ImgIcon src={wxIcon} /> 下单客服
            </>
          }
          color="blue"
          inline
        />
      </Box>

      <Box height={80}></Box>
    </Box>
  );
}

export default Home;
