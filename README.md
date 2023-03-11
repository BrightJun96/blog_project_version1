# blog_project_version1

## Concept
로그인 및 회원가입 기능과 블로그 포스팅 기능(CRUD)을 구현

## Used Library
- react(CRA)
- react-router-dom(version6)
- axios
- React-quill(text-editor library)
- immer
- redux
- redux-thunk
- styeld-components

## Folder Structure




- components/containers
  - 컴포넌트측 파일을 components와 containers라는 2개의 디렉터리로 구분
  - components에는 사용자에게 보여줄 UI Component로 구성하였고 containers에는 redux state 및 기능 구현을 위한 함수 등 비즈니스 로직을 작성
  - 비즈니스 로직을 구현한 컴포넌트와 유저에게 보여줄 UI 컴포넌트를 구분함으로써 관심사 분리
  - 관심사 분리를 함으로써 관심사에에 따른 세부적 업데이트가 가능하다. 비즈니스 로직을 업데이트하고 싶다면 container의 컴포넌트만, UI의 업데이트를 하고 싶다면 components의 컴포넌트만 수정하면 된다.
  
- lib
  - 서버로 네트워크 요청을 하기 위한 API 함수를 모아둔 API 폴더
  - 프로젝트에 사용될 주요 색상 모아둔 styles 폴더
  - 그 외 프로젝트에서 본인이 편리하게 사용하기 위해 만든 함수 정의

- modules
  - 페이지 및 세부 컴포넌트 등 관심사에 따라 프로젝트에서 사용할 redux state를 구분하여 정의한 폴더
  
- pages
  - 프로젝트에서 각 주소별로 사용할 페이지를 구분하여 정의한 폴더
    - LoginPage : 로그인을 할 수 있는 페이지
  - RegisterPage : 회원가입을 할 수 있는 페이지
  - PostListPage : 전체포스팅 및 유저별 포스팅을 볼 수 있는 페이지
  - PostPage : 포스팅 상세 페이지
  - WritePage : 포스팅을 작성할 수 있는 페이지

## Back-end
- api
  - 로그인 및 회원가입에 대한 api와 posting에 대한 api가 있는 폴더

- lib
  - 로그인 상태를 검증하는 미들웨어와 token 조회 및 jwt 검증 등 기능을 하는 미들웨어가 있는 폴더

- models
  - mongoDB 데이터에 대한 스키마 설정과 스키마 메서드 설정을 한 폴더

## Description
- 스타일링을 Styled-Components 라이브러리를 사용하였는데 따로 styles라는 디렉터리를 생성하여 스타일링 컴포넌트로 스타일에 사용할 컴포넌트를 구분

- 포스팅 작성은 회원가입을 한뒤 로그인을 해야 작성 가능

- 로그인과 회원가입은 비슷한 구조를 가지고 있어 같은 컴포넌트를 사용하고 차이가 있는 부분은 props를 사용해 변화를 주었다.

- 여러 개의 input state를 관리하기 위해 객체 프로퍼티를 대괄호 접근법으로 접근

- redux reducer안에서 불변성을 유지를 간편하게 하기 위해  immer 라이브러리를 사용

- 여러 상태값이 필요하며 이를 각 페이지 및 컴포넌트별로 구분하기 위하여 redux로 상태관리를 하였다.

- 로그인 및 회원가입에 대한 validation 및 Error Message를 백엔드와 프론트에서 둘 다 구현하였다.

- 포스팅은 로그인을 하지않아도 볼 수 있지만 포스팅 작성은 로그인을 한 유저만 작성할 수 있다.

- 비동기 처리를 위하여 redux-thunk를 사용하였다.

- Text-editor 기능을 사용하기 위해 React-quill library를 사용하였다.

- CORS 오류를 해결하기 위해 client측 package.json에서 proxy(localhost:4000)를 설정했다.
(client:localhost3000 \ server:localhost:4000)

- koa-static을 이용하여 서버에서 프론트측 정적 파일을 사용할 수 있도록 하였다.

- 프론트에서 로그인 버튼을 누르면 서버측에서 아이디와 비밀번호를 데이터베이스에서 확인한 뒤 검증하고 토큰을 만들어준다.
그 뒤 서버측에서는 해당 토큰을 가지고 있는 유저가 맞는지 확인한다.

## Exprience

### 간단한 비동기 처리는 saga보단 thunk
- 비동기 처리를 위한 라이브러리인 redux-saga와 redux-thunk를 사용해본 결과,리덕스 미들웨어를 사용할 시 간단한 비동기 처리시에는 redux-thunk를 사용하는 것이 더 낫다.
- saga는 초기 설계 코드가 복잡할 뿐만 아니라 길어진다. 때문에 간단한 비동기 처리를 할 시에는 코드 설계가 비교적 간편한 thunk를 사용하는 것이 낫다는 것을 경험했다.

### 디자인 패턴
- components 라는 하나의 디렉터리에 모든 로직을 구성하는 것보다는 각 역할에 맞게 디렉터리를 구성하여 관심사를 분리하는 것이 유지보수측면과 효율성이 더 좋다는 것을 경험했다.
- 컴포넌트를 컨테이너 컴포넌트(containers)와 프레젠테이셔널 컴포넌트(components)로 구분하여 비즈니스 로직을 구현(Controller 역할)하는 컴포넌트는 컨테이너 컴포넌트로
View의 역할은 프레젠테이셔널 컴포넌트로 구분하여서 역할을 구분하였다.
- state와 관련된 로직은 modules라는 디렉터리로 구분하고 api를 불러오는 로직은 api 디렉터리로 구분하였다.

### 백엔드 프레임워크 express or koa?
1. 미들웨어 처리 방식
- koa :  **미들웨어의 콜백함수들이 프로미스를 반환**하기 때문에 async/await문법을 사용하여 처리 가능
- express : 기본적으로 **미들웨어의 콜백함수들이 프로미스를 반환하지 않는다.**  따라서 미들웨어 함수들을 async/await 문법과 사용하기 위해서는 콜백 함수를 promise 변환해주는 함수를 구현하여 사용해야한다.

2. Context Object
- express: request, response 객체를 개별적으로 다룬다.
- koa: Context 객체를 사용하여 request, response, 미들웨어, 데이터 등을 포함

3. Routing
- express: 라우터 객체를 사용하여 URL 경로를 설정
- koa: koa-router 모듈을 사용하여 URL 경로를 설정

4. Middlewares
- express: 생태계가 광범위하고, 큰 커뮤니티를 가지고 있어 다양한 미들웨어들이 존재
- koa: Middlewares 자체가 코어부에 최소화 되어있고, 개발자가 직접 구현하는 경우가 많다.


**정리**
- koa의 가장 큰 장점은 미들웨어의 콜백함수들에 대하여 따로 프로미스 반환함수를 구현하지 않고 async/await를 사용할 수 있기 때문에 편하다는 장점이 있다.
- express 기본적으로 내장되어있는 미들웨어가 많다.
- koa의 경우에는 라우터,템플릿 등과 같은 기능을 별도로 라이브러리를 설치하여 사용하거나 필요한 기능이 있다면 개발자가 별도로 구현하여 사용해야한다.
- 개인적으로는 개발시 koa보다는 express 선호 
  - express가 사용자가 더 많으며 관련 정보량이 더 많아 구글링하여 정보를 찾기가 더 쉽다는 장점도 있다.
  - koa는 라우팅이나 템플릿 등을 사용할 때 별도로 설치하고 필요에 따라 내가 직접 구현해야함. 필요에 따른 기능이 대부분 구현되어있는 express가 더 사용하기 좋았음.
  
### 회원인증 로직 JWT와 COOKIE
- 로그인 혹은 회원가입한 유저가 서버로부터 검증받은 유저인지 확인하기 위해서 로그인이나 회원가입을 하게 되면 서버에서 토큰을 생성하여 쿠키에 저장해주는데 이 때 서버에서는 jwt 미들웨어 로직을 통해 토큰값을 조회하고 토큰에 담긴 유저 정보를 서버 state에 저장한다.

- 서버 state에는 토큰으로 조회한 해당 유저의 정보가 담겨져있고 프론트단의 check API는 이를 서버로부터 조회하여 해당 유저에 대한 정보를 응닶값으로 보내준다.

### 전체적인 개발 흐름
- 프론트엔드, 백엔드, 데이터베이스을 설계해봄으로써 전체적인 개발 흐름을 알게 되었고 프론트엔드와 백엔드의 cors를 해결하기 위해서
proxy나 백엔드에서 access-control-allow-origin에 프론트엔드 url을 허용해주어여하는 등 해결방법을 알게 되었다.

- 또한 프론트단에서 여러 서버와 통신하기위해서는 호출할 각 API서버마다 axios.client를 생성하는 것이 체계적으로 역할을 분류하기 적절하다고 생각하였다.

