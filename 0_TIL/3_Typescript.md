## TypeScript란??

JavaScript를 기반으로 한 프로그래밍 언어

-> JS 에 새로운 기능만 추가한 정도

strongly-type언어이다 = 프로그래밍 언어가 작동하기 전에 type을 확인한 다는 것.

데이터 타입이 뭔지 소통을 해야함

javascript는

```js
const plus = (a, b) => a + b;

console.log(plus(a, "hi"));
```

문제가 일어나지 않음!!!

하지만 Typescript는 위와 같이 작성시 문제가 생김 -> 데이터 타입을 명시해주어야 함

```ts
const plus = (a: number, b: number) => a + b;

//오류 남
console.log(plus(a, "hi"));
```

## create-react-app에서 typescript 사용하기!

```bash
$ npx create-react-app my-app --template typescript
```

를 이용하여 새로운 리액트 앱 만들기

타입스크립트는 파일 확장자가 .js가 아닌 .ts를 사용한다!!

But, react에서는 .tsx를 사용

만약 javascript로 이루어진 (즉, typescript가 못알아채는) 라이브러리를 사용하면 오류가 뜰 것이다. (예를 들어 style components)

이걸 없애기 위해서는

```bash
$ npm install @types/styled-components
```

를 설치해주어야 한다.

## prop types를 TypeScript로 나타내보기

JS를 사용할 때 component가 가져가야 하는 prop을 사용할 때에는 prop type을 사용했었다.

이는 콘솔창에 경고 표시를 해준다. -> 즉, 코드를 실행한 후에 브라우저에서 확인하게 됨

typescript는 코드가 실행되기'전' 오류 확인

-> interface를 사용한다!

### interface

객체 모양을 typescript에게 설명해주는 것

사용 예 )

```ts
interface PlayerShape {
  name: string;
  age: number;
}

// playerObj에 들어있는 요소들의 객체 모양을 PlayerShape에 저장해줌
const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name}, you are ${playerObj.age} years old.`;

sayHello({ name: "izodam", age: 24 });
```

```ts
// Circle.tsx
interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}
```

다음과 같이 코드를 줄일 수 있다.

```ts
interface CircleProps {
  bgColor: string;
}

const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}
```

### optional props

만약 require이 아닌 props를 주고싶으면 어떻게 할까?

props 선언시 : 앞에 ?만 붙여주면 된다

```ts
interface CircleProps {
  bgColor: string;
  // borderColor를 optional하게 만듦
  borderColor?: string;
}
```

만약 default 값을 주고 싶다면

```ts
interface CircleProps {
  bgColor: string;
  // borderColor를 optional하게 만듦
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}
```

## state

state를 초기 선언하면 TS가 추론하여 type을 설정함

```ts
const [counter, setCounter] = useState(1);
```

초기값이 1임을 확인하고 counter와 setCounter가 number를 사용한다는 것을 설정한다.

하지만 내가 counter라는 변수를 number로도 사용하고 싶고, string으로도 사용하고 싶다면?

```ts
const [counter, setCounter] = useState<number | string>(1);
```

## forms

### form 안에 사용하는 event의 타입 정해주기

```ts
function App() {
  const [value, setValue] = useState("");
  const onChange = (event) => {};

  return (
    <div>
      <form>
        <input
          value={value}
          onChange={onchange}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}
```

위의 코드는 오류가 난다 -> onChange의 event의 타입이 정해져 있지 않기 때문

event의 타입은 React.FormEvent를 사용

```ts
const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  console.log(event.currentTarget.value);
};
```

여기서 event의 currentTarget과 target의 차이점이 뭘까??
target을 TypeScript에서는 currentTarget으로 사용함!

### 그렇다면 form을 완성해보자!!

```ts
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
  <div>
    {/* <Circle borderColor="black" bgColor="teal" />
    <Circle bgColor="tomato" text="Hello" /> */}
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="username"
      />
      <button>Log in</button>
    </form>
  </div>
);
```

#### 객체 구조 분해

여기서 이해가 안됬던 코드가

```ts
const {
  currentTarget: { value },
} = event;
```

이 부분인데, 이는 ES6 문법으로 객체 구조 분해를 하는 것이라고 한다.

내가 아는 코드로 고치자면 `const value = event.currentTarget.value` 와 같은 문장이지만, 사용하는 이유는

만약 currentTarget안에 있는 value, tagName, width, id 4개를 가져오고 싶다라고 하면

```js
// 기존 사용하는 문법
const value = event.currentTarget.value;
const tagName = event.currentTarget.tagName;
const width = event.currentTarget.width;
const id = event.currentTarget.id;

// 구조분해
const {
  currentTarget: { value, tagName, width, id },
} = event;
```

예를 들자면

```js
// 1)
var a = { p: 42, q: true };
var { p, q } = a;

console.log(p); // 42
console.log(q); // true

// 2)
var metadata = {
  title: "Scratchpad",
  translations: [
    {
      locale: "de",
      localization_tags: [],
      last_edit: "2014-04-14T08:43:37",
      url: "/de/docs/Tools/Scratchpad",
      title: "JavaScript-Umgebung",
    },
  ],
  url: "/en-US/docs/Tools/Scratchpad",
};

var {
  title: englishTitle,
  translations: [{ title: localeTitle }],
} = metadata;
console.log(englishTitle); // "Scratchpad"
console.log(localeTitle); // "JavaScript-Umgebung"
```

## Theme

1. styled.d.ts 를 만든다. (참고: d.ts 는 declaration file 이라는 뜻이다.)

DefaultTheme는 기본적으로 props.theme의 인터페이스로 사용됩니다.
기본적으로 DefaultTheme 인터페이스는 비어 있으므로 확장해야 합니다.
[DefaultTheme](https://styled-components.com/docs/api#typescript)

```ts
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
```

2. theme.ts (테마) 를 만든다.

```ts
import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  btnColor: "tomato",
};

export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
  btnColor: "teal",
};
```

3. index.tsx 에 2에서 만든 테마를 주입한다.

```ts
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

4. app.tsx 에서 props 로 받아 사용한다.

```ts
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
return (
  <Container>
    <H1>Hello</H1>
  </Container>
);
```
