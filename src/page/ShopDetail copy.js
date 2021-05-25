import React, { useState } from "react";
import { Box, Heading } from "gestalt";
import "react-photoswipe/lib/photoswipe.css";
import { PhotoSwipe } from "react-photoswipe";
import { useAutoQuery } from "../utils/query";
import { shop } from "../api";
import { getImgSrc } from "../utils/tools";

function ShopDetail(props) {
  let [items, setItems] = useState([]);
  let {
    data: { photo },
  } = useAutoQuery(
    shop,
    { id: props.match.params.id },
    {
      onSuccess: (msg, data) => {
        console.log(data);
        let list = data.photo.map((item) => ({
          src: getImgSrc(item.url),
          w: 1200,
          h: 900,
          title: "Image 1",
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
    props.history.goBack();
  }

  return (
    <Box color="darkGray" minHeight="100%">
      <PhotoSwipe isOpen={isOpen} items={items} options={options} onClose={handleClose} />
    </Box>
  );
}

export default ShopDetail;
