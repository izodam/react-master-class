import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

// const BoxOne = styled.div`
//   background-color: teal;
//   width: 100px;
//   height: 100px;
// `;

// const BoxTwo = styled.div`
//   background-color: tomato;
//   width: 100px;
//   height: 100px;
// `;

// const Box = styled.div`
//   background-color: ${(props) => props.bgColor};
//   width: 100px;
//   height: 100px;
// `;

const Text = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

// const Circle = styled(Box)`
//   border-radius: 50px;
// `;

// const Btn = styled.button`
//   color: white;
//   background-color: tomato;
//   border: 0;
//   border-radius: 15px;
// `;

// const Input = styled.input.attrs({ required: true, minLength: "10" })`
//   background-color: tomato;
// `;

const ratationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    /* transform: rotate(360deg); */
    border-radius: 100px;
  }
  100%{
    transform: rotate(360deg);
    border-radius: 0px;
  }

`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${ratationAnimation} 1s linear infinite;
  ${Emoji} {
    &:hover {
      font-size: 60px;
    }
    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <Wrapper as="header">
      {/* <BoxOne>
        <Text>Hello</Text>
      </BoxOne>
      <BoxTwo /> */}
      {/* <Box bgColor="teal" />
      <Circle bgColor="tomato" />
      <Btn>Log in</Btn>
      <Btn as="a" href="/">
        Log in
      </Btn> */}
      {/* <Input /> */}

      {/* <Box>
        <Emoji as="p">😀</Emoji>
      </Box> */}
      {/* 박스 밖에 있는 이모지는 hover이 적용되지 않는다! */}
      {/* <Emoji>😀</Emoji> */}

      <Text>Hello</Text>
    </Wrapper>
  );
}

export default App;
