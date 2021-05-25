import React, { useEffect } from "react";
import { useAutoQuery } from "../utils/query";
import { userInfo } from "../api";

function useUserInfo(push) {
  let res = useAutoQuery(userInfo, null, {
    onError(msg, e) {
      push("/signin");
    },
    onSuccess(msg, data) {
      if (!data.name) {
        push("/signin");
      }
    },
  });

  return res;
}

export default useUserInfo;
