import Styles from "./Styles";
import styled from "styled-components";
import Header from "./components/Header";
import Content from "./components/Content";
import FlexBox from "./components/styledComponents/FlexBox";

const SAppContainer = styled.div`
  position: relative;
`;

function App() {
  return (
    <Styles>
      <SAppContainer>
        <Header />
        <FlexBox>
          <Content />
        </FlexBox>
      </SAppContainer>
    </Styles>
  );
}

export default App;
