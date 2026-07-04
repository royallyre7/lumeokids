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

## Issue #5 — Export Assessment Results

| Field | Value |
|-------|-------|
| Priority | 🟢 Low |
| Source | Written Feedback |
| Type | Feature |

**Description:**
No way to download or share assessment results. Parents may want to share with teachers or keep a copy.

**Acceptance Criteria:**
- [ ] "Download PDF" button on results page
- [ ] PDF includes child name, scores, archetype, recommendations
- [ ] "Share" button (copy link or email)

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
