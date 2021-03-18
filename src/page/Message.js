import { Box, ActivationCard } from "gestalt";

function Message({ location }) {
  const urlParams = new URLSearchParams(location.search);
  let title = urlParams.get("title") || "提示";
  let content = urlParams.get("content") || "成功";
  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
      <ActivationCard status="complete" statusMessage="Completed" title={title} message={content} />
    </Box>
  );
}

export default Message;
