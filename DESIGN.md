---
name: TACN Study Studio
description: A bright paper notebook for focused course revision.
colors:
  bg: "#f6f3ed"
  bg-surface: "#fffefa"
  surface-2: "#f2eee6"
  surface-3: "#e9e3d8"
  text-1: "#262820"
  text-2: "#45483f"
  text-3: "#66685e"
  accent: "#bb401d"
  accent-deep: "#963115"
  accent-muted: "#fce8dc"
  border-subtle: "#e3ddd2"
  border-hover: "#cbc3b4"
  emerald: "#28704d"
  emerald-muted: "#e6f2e8"
  rose: "#b23843"
  rose-muted: "#fbe9e8"
  amber-muted: "#f9efd5"
typography:
  headline:
    fontFamily: "Be Vietnam Pro, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.6rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-.035em"
  body:
    fontFamily: "Be Vietnam Pro, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    lineHeight: 1.6
  label:
    fontSize: ".8125rem"
    fontWeight: 600
rounded:
  badge: "8px"
  quiet: "9px"
  action: "10px"
  navigation: "12px"
  sheet: "16px"
spacing:
  compact: "8px"
  control: "12px"
  mobile-gutter: "18px"
  section: "22px"
  sheet: "30px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg-surface}"
    rounded: "{rounded.action}"
    padding: "12px 26px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
  button-quiet:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-2}"
    rounded: "{rounded.quiet}"
  sheet:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-1}"
    rounded: "{rounded.sheet}"
    padding: "30px"
  keyword:
    backgroundColor: "{colors.accent-muted}"
    textColor: "{colors.accent-deep}"
---

# Design System: TACN Study Studio

## Overview

**Creative North Star: "The Study Studio"**

A study studio organized like a notebook: warm paper surrounds clean work sheets, while burnt orange marks actions and selected modes. Quiet borders and direct Vietnamese typography keep attention on recall and feedback.

The shared system serves all three subjects with compact navigation and minimal repeated copy.

**Key Characteristics:**
- Warm paper and clean work sheets.
- Orange actions with distinct correctness feedback.
- Compact navigation and generous reading surfaces.

## Colors

### Primary
Burnt orange identifies actions, progress and selected modes. Deep orange provides hover emphasis; muted orange holds selections and keywords.

### Neutral
Warm paper surrounds near-white sheets. Three ink levels distinguish content, supporting text and metadata. Warm surface steps and fine borders organize groups without heavy frames.

Emerald and rose distinguish correct and incorrect answers. Amber supports caution. Existing informational colors remain semantic feedback rather than competing brand accents.

**The Feedback Rule.** Keep correctness distinct from orange action and selection states.

## Typography

Be Vietnam Pro is the heading and body family, using the fallback stack in the tokens. Existing numeric and keyboard details may use IBM Plex Mono; it is not a display face. Headings use the headline token, compacting to (1.6rem) on mobile. Prompts use medium emphasis (600) and relaxed leading (1.7). Flashcard questions scale between (1.25rem) and (1.75rem); image questions between (1.15rem) and (1.5rem), becoming (1.125rem) on mobile. Navigation uses the label token. Form fields generally use readable text (16px).

## Layout

The desktop shell caps width (1380px), with side padding (44px), subject column (208px), flexible content and gap (48px). The header spans both columns. The rail is anchored within the shell, left (44px), top (134px), with automatic grid column and row placement so it does not reserve an overlapping content cell.

At the intermediate breakpoint (1100px), gutters become (24px), rail width (178px), and column gap (26px); the project-management reading sidebar hides. At the mobile breakpoint (760px), the shell becomes vertical flow with gutters (18px) and gaps (18px). A native subject dropdown replaces the rail; the desktop-only select is removed from keyboard and accessibility navigation. Flashcards cap reading width (760px).

## Elevation & Depth

Paper tones, borders and spacing provide the main depth. Study sheets have no shadow. Existing low and medium ambient shadows are faint and warm; primary-button hover adds a small orange shadow. Keyboard focus uses orange outlines, while fields add a faint ring.

**The Paper Rule.** Keep study sheets flat; use surface tone and borders to separate content.

## Shapes

Soft rectangles distinguish sheets from controls. Use the sheet, action, quiet, navigation and badge radii in the tokens. Fine warm borders define surfaces. The rotated square brand mark is a small signature rather than a general container shape.

## Components

### Buttons
Primary buttons use orange with near-white text, emphasis (600), and minimum height (46px). Hover deepens the orange; press scales to (.97); disabled controls fade to (.48). Quiet buttons use sheet backgrounds and warm borders, shifting to muted surfaces on hover. Header actions are transparent and become icon-only on mobile. Preserve visible keyboard focus.

### Cards / Containers
Sheets use fine borders and no shadow. Question padding is (28px) or (30px), becoming (22px 18px) on mobile. Flashcards use padding (36px), becoming (26px 22px), with front minimum heights (360px) and (310px).

### Inputs / Fields
Fields use sheet backgrounds, ink text and subtle borders. Focus changes the border to orange and adds a faint ring. Keep native selects available on mobile. Error and correction text use rose and emerald. Answered options retain full opacity; pale correctness surfaces pair with dark semantic text. Clue boxes use paper and ink, and exam submission uses primary orange.

### Navigation
The desktop rail pairs subject-code badges with compact labels. The active subject uses dark ink, near-white text and an orange badge. Fine-pointer inactive rows move right (3px) on hover. Mode tabs sit above a dividing rule and use muted orange active fills. Keyword tags reuse muted orange and deep orange text.

### Study feedback and motion
Answer options combine a letter badge, readable content and semantic feedback. Correct answers use emerald; incorrect answers use rose. Fine-pointer image options move right (4px) on hover.

Complete question surfaces enter over (360ms), rising (12px) from partial opacity. Flashcards enter with perspective (1000px), rotation (-12deg) and scale (.98). Correct image-answer badges confirm over (350ms). Apply one entrance per surface; typed input and progress updates do not trigger entrances. Reduced motion disables these animations and hover translations.

### Study companion

The optional Miku companion uses a transparent three-expression sprite and paper speech bubble. When enabled, it greets silently on arrival; dismissing a message leaves the character visible, while the master toggle hides it. On compact viewports the idle character sits beside the subject heading. Keep it in the spare desktop subject rail; at widths up to (760px) or heights below (800px), place it inline after study feedback so it cannot cover controls. Reactions have one entrance and a brief success hop, disabled under reduced motion. Voice playback is local, independently muted, and replaceable rather than queued; keep explanations visible in text.

## Do's and Don'ts

### Do:
- **Do** use the shared paper, ink and orange tokens across subjects.
- **Do** keep keyboard focus visible and honor reduced motion.
- **Do** keep interface copy short and preserve readable study content.

### Don't:
- **Don't** restore decorative gradients or ambient glows to study sheets.
- **Don't** use orange alone to communicate correct or incorrect answers.
- **Don't** animate typed input or progress updates.
