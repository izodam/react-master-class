import styled from "styled-components";
import Circle from "./Circle";
import { useState } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };

  return (
    // <div>
    //   {/* <Circle borderColor="black" bgColor="teal" />
    //   <Circle bgColor="tomato" text="Hello" /> */}
    //   <form onSubmit={onSubmit}>
    //     <input
    //       value={value}
    //       onChange={onChange}
    //       type="text"
    //       placeholder="username"
    //     />
    //     <button>Log in</button>
    //   </form>
    // </div>
    <Container>
      <H1>Hello</H1>
    </Container>
  );
}

export default App;
