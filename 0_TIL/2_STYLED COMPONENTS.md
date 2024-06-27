### style components 기초

처음 create-react-app을 한 이후,
불필요한 파일이나, 코드를 삭제해준다.

그 이후, 터미널에 `npm i styled-components` 로 설치

우선 style-component를 적용하기 전 화면을 보자면,

```react
function App() {

  return (

    <div style={{ display: "flex" }}>
      <div style={{ backgroundColor: "teal", width: 100, height: 100 }}></div>
      <div style={{ backgroundColor: "tomato", width: 100, height: 100 }}></div>
    </div>
  );
}

export default App;
```

이러면 직관적이지 않고, js 코드로 작성해야 한다.

또, 모두 div이기 때문에 CSS를 살펴 봐야 컴포넌트가 맡은 일이 무엇인지 파악 가능하다

그렇다면 style components를 적용해보자!

기본 틀은

`const {변수명} = styled.{html 태그}<backtick>css 코드<backtick>`

위의 teal 색의 박스와 tomato 색의 박스 코드에 style components를 적용하면

```react
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <Father>
      <BoxOne />
      <BoxTwo />
    </Father>
  );
}

export default App;
```

브라우저에서 개발자 도구를 확인해보면

```html
<div class="sc-fqkwJk cDKTEr">
  <div class="sc-dcJtft iuLqOU"></div>
  <div class="sc-iGgVNO kOYuRV"></div>
</div>
```

class명을 알아서 만들어서 적어주고 있음!!

### props 응용

하지만... 현재 코드에서 BoxOne과 BoxTwo를 보면 background-color만 다르고 나머지는 다 같다! -> 중복하고 싶지 않은데요?

그러면 props를 이용할 것이다!

```react
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal" />
      <Box bgColor="tomato" />
    </Father>
  );
}
```

#### props 확장

만약 원을 그리고 싶다 하면,

```react
const Circle = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
```

하지만 이 조차도 Box와 중복된다 -> 중복을 없애고 싶음

-> styled 뒤에 html 요소를 없애고 괄호안에 확장하고 싶은 컴포넌트를 넣어주면 된다!

```react
const Circle = styled(Box)`
  border-radius: 50px;
`;
```

### as

같은 스타일을 사용하는데 html 요소만 바꾸고 싶다면
as를 사용하면 된다!

```react
const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

const Link = styled(Btn)``;

function App() {
  return (
    <Father>
      <Btn>Log in</Btn>
      <Btn as="a" href="/">Log in</Btn>
    </Father>
  );
}
```

브라우저의 개발자 도구를 확인해보면

```html
<button class="sc-fBdQPP eGCfhj">Log in</button>
<a class="sc-fBdQPP eGCfhj">Log in</a>
```

a 태그로 바뀌어 있는 것을 확인 할 수 있다.

### attrs

attrs를 사용해서 해당 컴포넌트의 속성값을 한번만 적어도 모든 컴포넌트에 해당 속성값이 적용되게 된다.

```react
const Input = styled.input.attrs({ required: true, minLength: "10" })`
  background-color: tomato;
`;

function App() {
  return (
    <Father as="header">
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}
```

모든 input이 required과 minlength 속성을 가지게 된다.

### animation

애니메이션을 주는 방법은 helper function을 import 해주는 것!

```react
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const ratationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100%{
    transform: rotate(0deg);
    border-radius: 0px;
  }

`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${ratationAnimation} 1s linear infinite;
`;

function App() {
  return (
    <Wrapper as="header">
      <Box />
    </Wrapper>
  );
}
```

### pseudo selectors

```react
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${ratationAnimation} 1s linear infinite;
`;


function App() {
  return (
    <Wrapper as="header">
      <Box>
        <span>😀</span>
      </Box>
    </Wrapper>
  );
}
```

여기서 box 안에 있는 이모지의 크기를 키우고 싶다면

근데 지금 이모지는 Box라는 스타일 컴포넌트 안에 있지 않음

어떻게 찾아서 키우지???

그냥 Box 코드 안에 span을 넣으면 된다!!

```js
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${ratationAnimation} 1s linear infinite;
  span {
    font-size: 36px;
  }
`;
```

`span:hover` 을 처리하고 싶으면 span 안에 & 를 사용하여 적용해 줄 수 있음

```
span {
	font-size: 36px;
	&:hover {
		font-size: 60px;
	}
}
```

#### 또 다른 방법으로는~

tag name에 의존하지 않고 컴포넌트를 찾는 방법

-> 새로운 컴포넌트 생성 후, Box에서는 해당 컴포넌트를 적어주기

```react
const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  ...;
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
      <Box>
        <Emoji>😀</Emoji>
      </Box>
    </Wrapper>
  );
}
```

이제 Emoji가 span이 아닌 다른 태그여도 적용이 된다. (예를들어 as p로 p태그로 바꿔도 잘 작동함을 확인할 수 있음)

### theme

모든 생삭들을 가지고 있는 object

index.js에 import 해주기

```js
import { ThemeProvider } from "styled-components";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

이제 App.js에서 props로 각각의 요소를 접근할 수 있음

```js
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Text = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
```
