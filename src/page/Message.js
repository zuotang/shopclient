import { Box, ActivationCard } from "gestalt";
import { useEffect } from "react";

function Message({ location, history }) {
  const urlParams = new URLSearchParams(location.search);
  let title = decodeURI(urlParams.get("title")) || "提示";
  let content = decodeURI(urlParams.get("content")) || "成功";
  let to = decodeURI(urlParams.get("to")) || "成功";
  useEffect(() => {
    if (to) {
      setTimeout(() => {
        history.replace(to);
      }, 3000);
    }
  }, []);
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
      <ActivationCard status="complete" statusMessage="Completed" title={title} message={content} />
    </Box>
  );
}

export default Message;
