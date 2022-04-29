import React, { useMemo } from "react";
import styled from "styled-components";
import FlexBox from "../styledComponents/FlexBox";
import Typography from "../styledComponents/Typography";
import ImagesList from "./ImagesList";
import RandomImage from "./RandomImage/RandomImage";
import useImagesData from "./useImagesData";

const SContainer = styled(FlexBox)`
  padding: 0.5rem 2rem;
  width: 45rem;
  max-width: 97vw;
`;

const Content = () => {
  const { acceptedImages, addAcceptedImage, addRejectedImage, omittedImages } =
    useImagesData();

  const subTitle = useMemo(
    () => `APPROVED IMAGES ( ${Object.keys(acceptedImages).length} )`,
    [acceptedImages]
  );
  return (
    <SContainer as="main" flexDirection="column" alignItems="stretch">
      <Typography color="blue" as="h2" m="1.5rem 0" size={1}>
        {subTitle}
      </Typography>
      <ImagesList images={acceptedImages} />
      <RandomImage
        onAcceptImage={addAcceptedImage}
        onRejectImage={addRejectedImage}
        omittedImages={omittedImages}
      />
    </SContainer>
  );
};

export default Content;
