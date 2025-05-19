## 📑 정보 구조(IA) 문서 — **우선순위 기반 할 일 관리 데스크톱 앱 (통합 리스트·매트릭스 뷰)**

> Electron · TypeScript / 로컬-퍼스트 저장
> ‘할 일’과 ‘아이젠하워 매트릭스’는 **동일 페이지**에서 `뷰 토글`로 전환

---

### 1. 사이트 맵 (Site Map)

```
/
├─ 대시보드          (/dashboard)
├─ 할 일             (/tasks?view=list|matrix)
├─ 포커스 모드       (/focus/:taskId?)
├─ 목표 관리         (/goals/:goalId?)
├─ 주간 회고         (/review/:week?)
└─ 설정             (/settings)
```

> `view` 쿼리 파라미터로 리스트·매트릭스 뷰 전환 → 같은 데이터·URL 컨텍스트 유지

---

### 2. 사용자 흐름 (User Flow)

| #     | 시나리오              | 단계                                                                                                                                                                                                                       |
| ----- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A** | 새 할 일 추가 후 집중 | 1) `할 일` 페이지 이동 → **리스트 뷰**<br>2) `+` 버튼 → 제목·태그 입력 → 저장<br>3) 상단 **뷰 토글**로 매트릭스 전환 → 드래그로 사분면 배치<br>4) 할 일 클릭 → **포커스 모드** 진입<br>5) 타이머 종료 → 대시보드 통계 반영 |
| **B** | 일주일 계획 수립      | 1) `할 일`-리스트 뷰에서 기간 필터 ‘주간’ 선택<br>2) 우선순위 낮은 작업은 매트릭스 ‘미루기’ 사분면에 배치<br>3) 금요일 → `주간 회고` 진입, 통계·메모 작성                                                                  |
| **C** | 목표 연동             | 1) `목표 관리`에서 북극성 목표 생성<br>2) `할 일` 상세에서 목표 연결(드롭다운)<br>3) 대시보드 목표 진행률 확인                                                                                                             |

---

### 3. 내비게이션 구조 (Navigation Structure)

| 위치         | 요소                                                                                              | 설명                                         |
| ------------ | ------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **사이드바** | • 대시보드<br>• **할 일** (통합 뷰)<br>• 포커스 모드<br>• 목표 관리<br>• 주간 회고<br>• 설정      | 접힘/펼침 가능, `role="navigation"`          |
| **탑바**     | • 오늘 날짜·기간 필터<br>• 뷰 토글(리스트 ⇄ 매트릭스)<br>• 글로벌 `+` 버튼<br>• 검색 (⌘/Ctrl + K) | 뷰 토글은 라디오 그룹(ARIA `role="tablist"`) |

---

### 4. 페이지 계층 (Page Hierarchy)

| 깊이 | 페이지      | 섹션                                                                                          |
| ---- | ----------- | --------------------------------------------------------------------------------------------- |
| 1    | 대시보드    | KPI 카드, 차트                                                                                |
| 1    | **할 일**   | 기간·태그 필터, 뷰 토글<br>└ **리스트 뷰**: 가상화 리스트<br>└ **매트릭스 뷰**: 4-사분면 보드 |
| 1    | 포커스 모드 | 타이머, 진행률                                                                                |
| 1    | 목표 관리   | 목표 트리                                                                                     |
| 1    | 주간 회고   | 통계 요약, 에디터                                                                             |
| 1    | 설정        | 테마·단축키·백업                                                                              |

---

### 5. 콘텐츠 조직 (Content Organization)

**할 일 페이지 레이아웃**

| 영역 | 구성                                                                 | 설명                     |
| ---- | -------------------------------------------------------------------- | ------------------------ |
| 헤더 | 기간 필터 · 태그 필터 · 뷰 토글                                      | 반응형(모바일 2행)       |
| 본문 | • 리스트 뷰: `<VirtualizedList>`<br>• 매트릭스 뷰: `<QuadrantBoard>` | 드래그&드롭, 키보드 이동 |
| 푸터 | 완료 개수 · 집중 시간 요약                                           | 실시간 업데이트          |

---

### 6. 인터랙션 패턴 (Interaction Patterns)

| 패턴              | 적용                 | 접근성                         |
| ----------------- | -------------------- | ------------------------------ |
| **뷰 토글**       | Segmented Control    | `role="tab"`, 방향키 전환      |
| **Drag & Drop**   | 리스트→매트릭스 이동 | 키보드 지원(스페이스 픽업)     |
| **모달**          | 새 할 일·목표 편집   | ESC 닫기, ARIA `dialog`        |
| **타이머**        | 포커스 모드          | Background Worker, 시스템 알림 |
| **리스트 가상화** | 대량 데이터          | 스크린리더 ARIA Live           |

---

### 7. URL 구조 (URL Structure)

| 경로                               | 설명                                          | 파라미터 예시       |
| ---------------------------------- | --------------------------------------------- | ------------------- |
| `/tasks`                           | 기본 리스트 뷰                                | `?view=list` (기본) |
| `/tasks?view=matrix`               | 매트릭스 뷰                                   | —                   |
| `/tasks?view=list&date=2025-05-19` | 특정 날짜 필터                                | —                   |
| 기타                               | `/focus/abc123`, `/goals`, `/review/2025-W21` | —                   |

> SPA이지만 `rel="canonical"`로 기본 경로(`/tasks`)를 명시해 중복 URL 방지 ([Google for Developers][1])

---

### 8. 컴포넌트 계층 (Component Hierarchy)

```
<AppShell>
├─ <SidebarNav>
├─ <Topbar>
│   ├─ <DateFilter/>
│   ├─ <ViewToggle/>   ← 리스트·매트릭스 전환
│   ├─ <GlobalAdd/>
│   └─ <GlobalSearch/>
└─ <RouterOutlet>
    ├─ <TasksPage>
    │   ├─ <TasksHeader/>   ← 기간·태그 필터
    │   ├─ <TaskList virtualized/> (if view=list)
    │   └─ <MatrixBoard/> (if view=matrix)
    ├─ <DashboardPage> …
```

---

### 9. 반응형·접근성·SEO

| 고려사항          | 구현 포인트                                   | 레퍼런스                                               |
| ----------------- | --------------------------------------------- | ------------------------------------------------------ |
| **접근성**        | WCAG 2.2: 포커스 링·명도 대비·키보드 순서     | ([W3C][2], [W3C][3])                                   |
| **오프라인 저장** | `electron-json-storage`로 JSON 보존           | ([npm][4])                                             |
| **성과 피드백**   | 매트릭스 기반 우선순위 = Todoist 모범 사례    | ([Todoist][5], [Todoist][6])                           |
| **집중 통계**     | TickTick 포커스 통계 UX 벤치마킹              | ([TickTick 도움말 센터][7], [TickTick 도움말 센터][8]) |
| **반응형**        | >960 px: 고정 사이드바 / ≤960 px: 아이콘 모드 |                                                        |
| **SEO**           | 내부 SPA 타이틀·메타 업데이트 + Canonical     | ([Webmasters Stack Exchange][9])                       |

---

**끝.**

[1]: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?utm_source=chatgpt.com "How to Specify a Canonical with rel=\"canonical\" and Other Methods"
[2]: https://www.w3.org/TR/WCAG22/?utm_source=chatgpt.com "Web Content Accessibility Guidelines (WCAG) 2.2 - W3C"
[3]: https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html?utm_source=chatgpt.com "Understanding Success Criterion 2.4.13: Focus Appearance | WAI"
[4]: https://www.npmjs.com/package/electron-json-storage?utm_source=chatgpt.com "electron-json-storage - NPM"
[5]: https://www.todoist.com/help/articles/eisenhower-matrix-with-todoist-kj0Eru?utm_source=chatgpt.com "Eisenhower Matrix with Todoist"
[6]: https://www.todoist.com/productivity-methods/eisenhower-matrix?utm_source=chatgpt.com "Avoid the \"Urgency Trap\" with the Eisenhower Matrix - Todoist"
[7]: https://help.ticktick.com/articles/7055781966800486400?utm_source=chatgpt.com "Focus Statistics - TickTick"
[8]: https://help.ticktick.com/articles/7055782010496745472?utm_source=chatgpt.com "How to Start Focus? - TickTick"
[9]: https://webmasters.stackexchange.com/questions/103005/canonical-link-element-on-single-page-app?utm_source=chatgpt.com "Canonical link element on single page app"
