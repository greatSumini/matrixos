## PRD — 개인용 **우선순위 기반 할 일 관리** 데스크톱 앱

> Electron · TypeScript 기반 / Local-first 저장
> 대상: 20–30대 직장인 · 프리랜서

---

### 목차

1. [제품 개요](#제품-개요)
2. [참고 서비스 및 근거](#참고-서비스-및-근거)
3. [핵심 기능 & 사양](#핵심-기능--사양)
4. [사용자 페르소나 & 시나리오](#사용자-페르소나--시나리오)
5. [기술 스택 권장사항](#기술-스택-권장사항)

---

### 제품 개요

- **문제**
  직장인·프리랜서는 다양한 업무·사이드 프로젝트를 동시에 처리하며 “긴급/중요” 판단에 늘 시간을 소비한다.
- **해결**

  - 하루·주·월·커스텀 기간으로 **우선순위가 즉시 보이는 할 일 뷰** 제공
  - **Eisenhower Matrix**·리스트 등 가시적인 다중 뷰로 맥락 전환 최소화
  - **오프라인-퍼스트** 저장(Local-only)으로 개인정보·회사 내부 정보 유출 우려 제거

- **차별점**

  1. 로컬 전용이면서도 통계·회고 기능까지 포함해 “프라이버시” + “성장 피드백” 동시 충족
  2. 집중 업무를 한눈에 보여주는 **포커스 모드** → 빠른 몰입
  3. 하위 태스크 및 태그를 통한 **다층적 분류** → 복잡한 프로젝트도 단일 앱으로 관리

---

### 참고 서비스 및 근거

| 서비스                   | 참고 기능/전략                          | 시사점                             | 근거                                                   |
| ------------------------ | --------------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| **Todoist**              | Eisenhower Matrix 템플릿, 필터/라벨     | 4-사분면 시각화 UX·필터링 규칙     | ([Todoist][1], [Todoist][2])                           |
| **TickTick**             | 포모도로 기반 Focus & Focus 통계        | 집중시간 그래프, 주간 회고 UX      | ([TickTick 도움말 센터][3], [TickTick 도움말 센터][4]) |
| **Things 3**             | 깔끔한 Today/Anytime 구조·리뷰 워크플로 | 최소 UI에서 주·일 단위 리뷰 설계   | ([Reddit][5], [chrisheisel.com][6])                    |
| **Eisenhower (전용 앱)** | 웹·모바일 Eisenhower Matrix             | ‘긴급/중요’만 강조한 단순 인터랙션 | ([Eisenhower -][7], [Apple][8])                        |
| **Microsoft To Do**      | “My Day” 제안·가벼운 AI 추천            | 오늘 집중할 태스크 자동 추천 UX    | ([Microsoft 지원][9], [Microsoft 지원][10])            |

> **적용 요약**:
>
> - Todoist·Eisenhower → 4분면 UI 레이아웃·필터 로직
> - TickTick → 포커스 타이머 + 집중 통계 화면
> - Things 3 → “오늘/이번 주” 미리보기로 리뷰 흐름
> - Microsoft To Do → AI 기반 ‘오늘 할 일 추천’(추가 개선 여지)

---

### 핵심 기능 & 사양

| 분류       | 기능                                                                                                                                                         | 주요 사양(데스크톱)                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| **Must**   | - 기간별 목록(일·주·월·커스텀)<br>- 다중 뷰(리스트·Eisenhower Matrix)                                                                                        | 단축키 & 드래그로 기간·뷰 전환            |
| **Should** | - 태그 분류<br>- 하위 태스크(체크리스트)<br>- **포커스 모드**: 선택 태스크만 화면 집중 표시·타이머 동작<br>- **대시보드**: 처리 개수·집중 시간·완료률 시각화 | 포커스 종료 시 자동 로그 기록 / 통계 차트 |
| **Could**  | - **목표 관리**: 북극성(Why) ↔ 세부 목표(What) 트리<br>- **주간 회고**: 집중 시간, 완료 작업, 목표 달성도, 자유 메모                                         | 회고 작성 시 자동으로 대시보드와 연동     |

> **국내화 고려**: 기본 UI 언어 한국어, 주(월) 시작 요일·공휴일 캘린더 옵션 제공

---

### 사용자 페르소나 & 시나리오

| 페르소나                            | 상황                       | 문제점                                 | 서비스 사용 흐름                                                                                                                                                                    |
| ----------------------------------- | -------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **김현우 (29) / 스타트업 기획자**   | 회의·기획·개발 태스크 병행 | 우선순위 혼동, 잦은 맥락 전환          | 1) 아침 출근 → **기간: 오늘** 설정<br>2) Inbox 태스크 → Eisenhower Matrix로 드래그 분류<br>3) **포커스 모드**로 ‘긴급·중요’ 1개 실행<br>4) 퇴근 전 **대시보드** 확인·주간 회고 작성 |
| **박지은 (34) / 프리랜서 디자이너** | 프로젝트 3건 + 개인 브랜딩 | 클라이언트별 기한·우선순위 관리 어려움 | 1) 프로젝트별 태그 생성<br>2) 세부 작업을 하위 태스크로 분할<br>3) 주간 목표와 연결 → ‘북극성 목표’ 달성률 확인<br>4) 금요일 저녁 **주간 회고**로 다음 주 계획 수립                 |

---

### 기술 스택 권장사항

| 레이어              | 선택 스택                                               | 이유                                                                             |
| ------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Shell**           | **Electron (v29+)**                                     | 크로스플랫폼(Win/macOS/Linux)·오프라인 데스크톱 실행                             |
| **언어/프레임워크** | TypeScript + React(Vite)                                | 타입 안정성·컴포넌트화·HMR                                                       |
| **상태 관리**       | Zustand or Redux‐Toolkit                                | 직관적 스토어·Middleware로 포커스 타이머 로깅                                    |
| **로컬 저장**       | `electron-store`(JSON 기반) or `localForage`(IndexedDB) | DB 불필요, 키‐값·비동기 저장 지원, 스키마 검증 가능 ([GitHub][11], [GitHub][12]) |
| **차트/통계**       | Recharts or Chart.js                                    | 대시보드 시각화(집중 시간, 완료률)                                               |
| **타이머**          | Web Worker + Notification API                           | 포커스 모드 백그라운드 유지·알림                                                 |
| **배포**            | Electron Forge + autoUpdater                            | 코드 서명·자동 업데이트                                                          |

> **보안/프라이버시**: 모든 데이터는 OS userData 디렉터리에 암호화 저장(선택적 AES-256), 클라우드 동기화 옵션은 후순위 로드맵으로 분리

---

#### 부록 — 향후 고려 로드맵(요약)

- 모바일 companion 앱 (React Native or Expo)
- AI 추천(대시보드 기반 “다음 집중 작업” 제안)
- Cal-DAV 연동으로 캘린더와 투-웨이 싱크

---

**끝.**

[1]: https://www.todoist.com/productivity-methods/eisenhower-matrix?utm_source=chatgpt.com "Avoid the \"Urgency Trap\" with the Eisenhower Matrix - Todoist"
[2]: https://www.todoist.com/help/articles/eisenhower-matrix-with-todoist-kj0Eru?utm_source=chatgpt.com "Eisenhower Matrix with Todoist"
[3]: https://help.ticktick.com/articles/7055781966800486400?utm_source=chatgpt.com "Focus Statistics - TickTick"
[4]: https://help.ticktick.com/articles/7055782010496745472?utm_source=chatgpt.com "How to Start Focus? - TickTick"
[5]: https://www.reddit.com/r/thingsapp/comments/z25lcd/thing_3_eisenhower_matrix/?utm_source=chatgpt.com "Thing 3 + Eisenhower Matrix : r/thingsapp - Reddit"
[6]: https://www.chrisheisel.com/2018/03/25/things-app-eisenhower-matrix-made-easy/?utm_source=chatgpt.com "Things.app Eisenhower-matrix made easy | Chris Heisel"
[7]: https://www.eisenhower.me/eisenhower-matrix-apps/?utm_source=chatgpt.com "Official Eisenhower Matrix Apps"
[8]: https://apps.apple.com/us/app/eisenhower/id547099449?utm_source=chatgpt.com "Eisenhower on the App Store"
[9]: https://support.microsoft.com/en-us/office/my-day-and-suggestions-fc09a1b9-0854-4906-b166-f480ee97a139?utm_source=chatgpt.com "My Day and suggestions - Microsoft Support"
[10]: https://support.microsoft.com/en-us/office/productivity-and-microsoft-to-do-cfbb0816-fccf-4eb6-b3bb-06c926e562ab?utm_source=chatgpt.com "Productivity and Microsoft To Do"
[11]: https://github.com/sindresorhus/electron-store?utm_source=chatgpt.com "sindresorhus/electron-store: Simple data persistence for ... - GitHub"
[12]: https://github.com/localForage/localForage?utm_source=chatgpt.com "localForage/localForage: Offline storage, improved. Wraps ... - GitHub"
