# Open Issues — LumeoKids (for Chapter 6)

> Derived from user feedback (interview + written). These issues will be fixed in Chapter 6.

---

## Issue #1 — Edit Child Profile

| Field | Value |
|-------|-------|
| Priority | 🔴 High |
| Source | Interview (Thuta), Written Feedback |
| Type | Feature |

**Description:**
Once a child profile is created, there is no way to edit it. Parents should be able to update name, age, interests, and learning level.

**Acceptance Criteria:**
- [ ] Edit button on child detail page
- [ ] Pre-filled form with current values
- [ ] PUT route `/api/children/[id]` with ownership check
- [ ] Success message after update

---

## Issue #2 — Delete Child Profile

| Field | Value |
|-------|-------|
| Priority | 🔴 High |
| Source | Interview (Thuta), Written Feedback |
| Type | Feature |

**Description:**
No way to delete a child profile. Parents need to remove profiles they no longer need.

**Acceptance Criteria:**
- [ ] Delete button on child detail page
- [ ] Confirmation dialog before deletion
- [ ] DELETE route `/api/children/[id]` with ownership check
- [ ] Redirect to dashboard after deletion

---

## Issue #3 — Improve UI Attractiveness

| Field | Value |
|-------|-------|
| Priority | 🟡 Medium |
| Source | Written Feedback |
| Type | UX |

**Description:**
UI feels simple and not attractive enough for a kids' app. Needs more visual polish.

**Acceptance Criteria:**
- [ ] Add more icons and illustrations
- [ ] Improve color consistency across pages
- [ ] Add micro-interactions (hover effects, transitions)
- [ ] Better empty states

---

## Issue #4 — Add More Assessment Test Types

| Field | Value |
|-------|-------|
| Priority | 🟡 Medium |
| Source | Written Feedback |
| Type | Feature |

**Description:**
Current assessment covers strengths/hobbies but lacks specific test types for logic, creativity, memory, etc.

**Acceptance Criteria:**
- [ ] Add logic/reasoning section
- [ ] Add creativity/artistic section
- [ ] Add memory/attention section
- [ ] Update archetype scoring to include new sections

---

## Issue #5 — Download Assessment Results as PDF ✅ DONE

| Field | Value |
|-------|-------|
| Priority | 🟡 Medium |
| Source | Written Feedback |
| Type | Feature |
| Resolved | 2026-07-04 |

**Description:**
Parents need a printable PDF to share with teachers or keep as a record.

**What was built:**
- `DownloadResultsButton.tsx` rewritten to screenshot the rendered page via `html2canvas` + `jsPDF`
- Captures the actual DOM (`#pdf-content` div) — no manual layout, pixel-perfect output
- Multi-page support: long content is sliced across A4 pages automatically
- One-click download: `{child-name}-assessment-results.pdf`
- Works on both PC and mobile (client-side, no server needed)

**Acceptance Criteria:**
- [x] "Download PDF" button on results page
- [x] PDF includes: child name, assessment date, overall score
- [x] PDF includes: section scores with zone labels
- [x] PDF includes: top archetype (name, match %, strengths, activities, learning style)
- [x] PDF includes: interest tags
- [x] PDF matches webpage layout exactly (screenshot-based, not manual)
- [x] Works on PC and mobile (client-side, no server needed)
- [x] Multi-page support for long content

---

## Issue #6 — Assessment History & Progress Tracking

| Field | Value |
|-------|-------|
| Priority | 🟢 Low |
| Source | Written Feedback |
| Type | Feature |

**Description:**
If a child retakes the assessment, previous results are overwritten. No way to track progress over time.

**Acceptance Criteria:**
- [ ] Store each assessment as a separate record (with timestamp)
- [ ] Show assessment history on child detail page
- [ ] Compare latest vs previous results
- [ ] Progress chart (if time permits)
