import React, { useEffect } from "react";
import { useAutoQuery } from "../utils/query";
import { userInfo } from "../api";

function useUserInfo(push) {
  let res = useAutoQuery(userInfo, null, {
    onError(msg, e) {
      if (push) push("/signin");
    },
    onSuccess(msg, data) {
      if (!data.name) {
        if (push) push("/signin");
      }
    },
  });

  return res;
}

export default useUserInfo;
