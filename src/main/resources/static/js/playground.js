// Client-side site search for the shared header. Results only point at routes that already exist.
(function () {
    const pages = [
        { en: "SELECT Room", ko: "SELECT 룸", hintEn: "Rows, columns and tables", hintKo: "행, 열, 테이블", href: "/prison#prisons", terms: "select column row table 조회 컬럼 열 행 테이블" },
        { en: "WHERE Filter", ko: "WHERE 필터", hintEn: "Conditions and the NULL trap", hintKo: "조건과 NULL 함정", href: "/prison#monsters", terms: "where filter null condition 조건 필터 널" },
        { en: "JOIN Zone", ko: "JOIN 존", hintEn: "Connected tables, duplicate rows", hintKo: "테이블 연결과 중복 행", href: "/prison#incidents", terms: "join inner outer relationship duplicate 조인 연결 중복" },
        { en: "ORDER BY Shelf", ko: "ORDER BY 선반", hintEn: "Start your own sorting note", hintKo: "정렬 노트 시작하기", href: "/knowledge?concept=ORDER%20BY", terms: "order by sort asc desc 정렬 오름차순 내림차순" },
        { en: "GROUP BY Corner", ko: "GROUP BY 코너", hintEn: "Quest 01: totals per customer", hintKo: "퀘스트 01: 고객별 합계", href: "/quests/first", terms: "group by sum aggregate having 그룹 집계 합계" },
        { en: "Quest 01: The Missing Sales Report", ko: "퀘스트 01: 사라진 매출 보고서", hintEn: "SQL Detective", hintKo: "SQL 탐정", href: "/quests/first", terms: "quest detective mission sales report 퀘스트 미션 탐정 매출" },
        { en: "My Knowledge Base", ko: "내 지식 베이스", hintEn: "Your saved notes", hintKo: "저장한 노트", href: "/knowledge", terms: "notes knowledge account brain 노트 지식 계정" },
        { en: "Study Canvas", ko: "스터디 캔버스", hintEn: "Questions for the AI Tutor", hintKo: "AI 튜터에게 할 질문", href: "/study-canvas", terms: "study canvas ai tutor question 공부 캔버스 튜터 질문" },
        { en: "SQL Prison", ko: "SQL 감옥", hintEn: "Side stories", hintKo: "사이드 스토리", href: "/prison", terms: "prison monster curator escape incident side story 감옥 몬스터 탈출" },
        { en: "About", ko: "소개", hintEn: "Why this playground exists", hintKo: "이 공간을 만든 이유", href: "/about", terms: "about mission story sqld certification 소개 자격증" }
    ];

    const form = document.getElementById("siteSearchForm");
    const input = document.getElementById("siteSearch");
    const results = document.getElementById("siteSearchResults");

    if (!form || !input || !results) {
        return;
    }

    function isKorean() {
        return window.pgLanguage === "ko";
    }

    function findMatches(query) {
        const words = query.toLowerCase().split(/\s+/).filter(Boolean);

        return pages.filter(function (page) {
            const haystack = (page.en + " " + page.ko + " " + page.terms).toLowerCase();
            return words.every(function (word) {
                return haystack.includes(word);
            });
        });
    }

    function close() {
        results.hidden = true;
    }

    function render() {
        const query = input.value.trim();
        results.replaceChildren();

        if (!query) {
            close();
            return;
        }

        const matches = findMatches(query);

        matches.forEach(function (page) {
            const item = document.createElement("li");
            const link = document.createElement("a");
            const title = document.createElement("strong");
            const hint = document.createElement("small");

            link.href = page.href;
            title.textContent = isKorean() ? page.ko : page.en;
            hint.textContent = isKorean() ? page.hintKo : page.hintEn;

            link.append(title, hint);
            item.appendChild(link);
            results.appendChild(item);
        });

        if (matches.length === 0) {
            const empty = document.createElement("li");
            empty.className = "pg-search-empty";
            empty.textContent = isKorean() ? "찾는 내용이 없어." : "Nothing matches that yet.";
            results.appendChild(empty);
        }

        results.hidden = false;
    }

    function moveFocus(step) {
        const links = Array.from(results.querySelectorAll("a"));

        if (results.hidden || links.length === 0) {
            return;
        }

        const current = links.indexOf(document.activeElement);
        const next = current + step;

        if (next < 0) {
            input.focus();
        } else if (next < links.length) {
            links[next].focus();
        }
    }

    input.addEventListener("input", render);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        render();

        const firstResult = results.querySelector("a");

        if (firstResult) {
            location.href = firstResult.href;
        }
    });

    form.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            moveFocus(event.key === "ArrowDown" ? 1 : -1);
        } else if (event.key === "Escape") {
            close();
            input.focus();
        }
    });

    form.addEventListener("focusout", function (event) {
        if (!form.contains(event.relatedTarget)) {
            close();
        }
    });

    input.addEventListener("focus", render);
})();
