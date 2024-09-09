## Recoil

React에서 사용하는 state management library

### recoil을 사용하지 않고 dark 모드를 만들어보자

기존 index.tsx에 있던 ThemeProvider을 App.tsx로 옮겨왔음

```ts
// App.tsx

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((current) => !current);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <HelmetComponent />
        <button onClick={toggleDark}>Toggle Mode</button>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}
```

### state management가 필요한 이유!

많은 component가 해당 state가 필요한 경우

-> 일일이 하위 컴포넌트에 각각에게 전달해주어야 함

-> 이 불편함을 해결하기 위해 global state가 있었으면 좋겠다!

### Recoil 시작

```bash
$ npm i recoil
```

1. index.tsx를 recoil로 감싸기

```ts
// index.tsx

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);
```

2. atom 만들기

```ts
// atom.ts

import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
```

3. app.tsx에 atom 정의

```ts
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <HelmetComponent />

        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}
```

---

useRecoilValue = value를 가져옴

setter function = value를 설정하는 function -> react의 setState와 같은 방식으로 작동

useSetRecoilState = 매개변수로 atom을 받고, atom을 변경하는 함수를 반환 (atom의 값 변환)

# Todo app

기본 세팅

```ts
// ToDoList.tsx

import { useState } from "react";

function ToDoList() {
  const [todo, setTodo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setTodo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={todo} onChange={onChange} placeholder="Write a to do" />
        <button>Add

```

## React Hook Form

사용하기 쉬운 유효성 검사를 통해 성능이 뛰어나고 유연하며 확장 가능한 form

### register

name, onBlur, onChange, onClick, ref를 return하는 함수

```ts
function ToDoList() {
  const { register } = useForm();
  return (
    <div>
      <form>
        <input {...register("toDo")} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}
```

### watch

form의 입력값을 추적할 수 있음

```ts
function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("toDo")} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}
```

### handleSubmit

validation & submit 담당

```ts
function ToDoList() {
  const { register, handleSubmit } = useForm();
  // 데이터 유효할 때 실행할 함수
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo")} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}
```

### error 나타내기

todo input이 비어있으면 안되고, 10자 이상이여야 하는 조건이 있다면,

```ts
return (
  <form onSubmit={handleSubmit(onValid)}>
    <input
      {...register("toDo", {
        required: "Todo is required",
        minLength: { value: 10, message: "too short." },
      })}
      placeholder="Write a to do"
    />
  </form>
);
```

이런식으로 required와 minLength 설정을 설정하여 validation을 확인할 수 있다.

required 값은 boolean 혹은 message를 설정할 수 있는데, message를 설정하게 되면 해당 폼이 비어있을 때 오류 메세지로 설정한 메세지가 나타나게 된다.

```
toDo:
  message: "Todo is required"
  ref: input
  type: "required"
```

해당 메세지를 html로 띄워주고 싶다면

```ts
interface IFormData {
  toDo: string;
  email: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}
```

추가 ) pattern

`/^[A-Za-z0-9._%+-]+@naver.com$/` 는 해당 값이 @naver.com의 패턴을 가지는지 확인하는 용도

### defaultValues

form 선언 시

```ts
const {} = useForm<IFormData>({
  defaultValues: {
    email: "@naver.com",
  },
});
```

으로 선언하게 된다면 email이라는 이름을 가진 input의 기본 값이 @naver.com을 가지게 된다.

### 사용자 정의 validate

#### password 확인

password와 password1이 같은 값인지 확인한 후 다르면 error를 띄워야 한다

```ts
function ToDoList() {
  const onValid = (data: IFormData) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    console.log(data);
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="Password"
        />
        <input
          {...register("password1", { required: "write here", minLength: 5 })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}
```

shouldFocus를 사용하여 제출 후 에러가 뜬 input에 focus를 보내준다.

#### 문자열 포함 확인

Todo에 nico와 nick이라는 단어가 들어가면 error를 띄우고 싶다면

```ts
function ToDoList() {
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("toDo", {
            required: "Todo is required",
            minLength: { value: 5, message: "too short." },
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nico allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder="Write a to do"
        />
        <span>{errors?.toDo?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}
```

validate 속성을 이용하여 설정해주면 된다.

`validate: (value) => true` 면 제출 시 항상 validate를 통과하고

`validate: (value) => false` 면 제출 시 항상 error가 뜬다.

또 true, false 대신 문자열을 적으면 false로 받아들임과 동시에 에러 메세지를 해당 문자열로 출력하게 된다.

그러므로 nico라는 단어가 포함되어 있으면 error를 띄우기 위해서는
`(value) => value.includes("nico") ? "no nico allowed" : true,` 방식으로 사용하게 되는 것이다.

또 검사해야 하는 것들이 많아질 수 있음 -> noNico로 선언 가능!
