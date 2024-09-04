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
