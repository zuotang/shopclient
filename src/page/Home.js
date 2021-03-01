import { useEffect, useState } from "react";
import { Box, Spinner } from "gestalt";
import ShopCard from "../components/ShopCard";

import { useAutoQuery, useQuery } from "../uitls/query";
import { shops } from "../api";

import { useScrollBottom, useResetScroll } from "../hooks/usePage";

import Header from '../components/Header'

//存入pageList
let pData = null;
function Home(props) {
  let params = new URLSearchParams(props.location.search);
  let [keyword, setKeyword] = useState("");
  let { data, update, loading, fetchMore } = useAutoQuery(
    shops,
    { status: params.get("status") || 0, keyword, page_size: 20 },
    {
      updateQuery: (pData, cData, params) => {
        let pList = pData.list || [];
        return { ...cData, list: [...pList, ...cData.list] };
      },
      defaultData: pData,
    }
  );
  pData = data;
  let { list, page, total_page, page_size } = data;
  useScrollBottom(() => {
    if (!loading && page < total_page) {
      fetchMore({ page: page ? page + 1 : 1 });
    }
  }, [page, total_page, loading]);
  useResetScroll("home");
  return (
    <Box minHeight="110vh"  color="lightGray">
      <Header />
      <Box padding={1}   display="flex" direction="column" alignItems="center">
        <Box display="flex" wrap maxWidth="100%" width="1200px">
          {list?.map((item) => (
            <Box key={item.id} column={6} smColumn={6} mdColumn={3} mdColumn={2}>
              <Box margin={1}>
                <ShopCard data={item} proxy={params.get("proxy") == 1} />
              </Box>
            </Box>
          ))}
        </Box>
        <Spinner show={loading} accessibilityLabel="加载中" size="sm" />
      </Box>
    </Box>
  );
}

export default Home;
