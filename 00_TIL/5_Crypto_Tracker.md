# 코인트래킹을 만들어봅시다!

API는 coinpaprika를 사용합니다. 해당 API는 암호화페에 대한 정보를 제공합니다.

새로 react-router-dom과 react-query를 설치해 줍니다.

react-router-dom은 6버전과 5버전과 많이 다르므로 5.3버전을 설치해 줄 것입니다

```bash
$ npm i react-router-dom@5.3.0 react-query
```

얘도 마찬가지로 typescript 없음 -> `npm i --save-dev @types/react-router-dom` 진행해주었습니다.

- react router dom은 어플리케이션에 URL을 가질 수 있도록 하는 아이
  - 즉 vue에서 vue router과 같은거겠죠?????

해당 어플리케이션의 화면은

1. Home화면 (/)
   - 모든 코인들이 보여지게 됨
2. 코인 디테일 화면 (/:id)
   - 해당 코인의 디테일을 보여줌

이걸 구현하기 위해 Nested router을 사용할 거임!

= 한 스크린 내에 또다른 라우터

### CSS

모든 HTML태그의 기본 CSS를 없애기 위해서 Reset CSS를 사용할 것입니다.

전체 document에 대해 특정 태그에 해당하는 모든 CSS를 정하고 싶다면 createGlobalStyle을 적용합니다.

```ts
// App.tsx

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    color: red;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}
```

Reset CSS를 이와 같은 방법으로 적용합니다.

### API의 인터페이스 정의

API에서 받아오는 Object의 interface를 정의해야함!!!!

이를 자동으로 작성해주는 것도 있지만 지금은 하나하나 입력해보겠다.

코인의 정보에 대한 API 요청을 fetch로 보내고 이를 json으로 변환한 것을 console창에 출력해보았다.

```ts
useEffect(() => {
  (async () => {
    const infoData = await (
      await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    ).json();
    console.log(infoData);
  })();
}, []);
```

그 후, 콘솔창에 출력된 결과를 오른쪽 마우스를 누르고 'store as global variable'이라는 메뉴를 선택한다.

그러면 temp1에 해당 결과가 저장되게 된다.

우선 key들을 뽑아내자면, `Object.keys(temp1).join()` 로 ,형태로 구분된 key들을 받아서 복사 / 붙여넣기 해준다.

그 후, 해당 key들의 타입을 입력하기 위해 `Object.values(temp1).map(v => typeof v).join()`로 복사 / 붙여넣기 해준다.

그리고 만약, 이렇게 받아온 key가 object 타입이라면,

```ts
interface IInfoData {
  ...;
  tags: ITag[];
  ...
}

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}
```

이런식으로 직접 따로 interface를 또 정의하는 방법이 있다.

### Nested Routes

coin detail 페이지에서 나는 두개의 탭이 필요.

1. price 데이터를 확인할 수 있는 탭
2. 그래픽을 볼 수 있는 탭

useRouteMatch는 내가 특정 URL에 있는지의 여부를 알려줌.

```ts
import { useRouteMatch } from "react-router-dom";

const priceMatch = useRouteMatch("/:coinId/price");
```

priceMatch는 해당 URL에 있는게 맞으면 object를 반환 -> key중에 isExact를 확인하면 true인 것을 확인할 수 있음

맞지 않으면 null 반환

### React Query

```bash
$ npm i react-query
```

```ts
// index.tsx

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
```

1. fetcher 함수 만들기

fetch promise를 꼭 return 해주어야 함

```ts
// api.ts
export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
```

2. useQuery 사용

2가지 argument -> 첫번째로는 query의 고유 식별자

-> 두번째로는 fetcher 함수

```ts
// coins.tsx

const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
```

이렇게 react query를 사용하면 다른 페이지를 갔다가 다시 전체 코인을 확인하는 페이지에 돌아와도 다시 loading을 하지 않음~!~~~~!!!!

만약 isLoading, data를 다른 변수명을 사용하고 싶다면

```ts
const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
  ["info", coinId],
  () => fetchCoinInfo(coinId)
);
```

만약 주기적으로 fetch하고 싶다면

```ts
const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
  ["info", coinId],
  () => fetchCoinInfo(coinId),
  {
    // 5초에 한번씩 fetch
    refetchInterval: 5000,
  }
);
```

#### React Query Devtools

React Query의 모든 내부 작동을 시각화하는 데 도움이 되며 문제가 발생하면 디버깅 시간을 절약할 수 있음

```ts
// App.tsx

import { ReactQueryDevtools } from "react-query/devtools";

<ReactQueryDevtools initialIsOpen={false} />;
```

### chart 나타내기!

ApexCharts.js를 이용할 것입니다.

## 참고 링크

Reset CSS
https://meyerweb.com/eric/tools/css/reset/

Google Fonts
https://fonts.google.com

Flat UI Color
https://flatuicolors.com/palette/gb

ApexCharts.js
https://apexcharts.com/

CoinGecko API로 진행
https://www.coingecko.com/en/api/documentation

- Market Cap순으로 50개 뽑아오기
  https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1

- 코인 정보 불러오기
  https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false

- ohlcv 불러오기
  https://api.coingecko.com/api/v3/coins/${cryptoId}/ohlc?vs_currency=usd&days=${days}
