# Project Context: Tea Shop Dashboard

## Overview
This is a React-based single-page dashboard for a Tea Shop business plan ("Hồng Trà Ngô Gia"). The application presents business data, timelines, locations, and budget estimates to investors or team members.

## Core Features & Modes
- **Dual Modes:** The app supports two distinct modes controlled by a toggle switch:
  - **Serious Mode:** Professional language and presentation for formal business contexts.
  - **Fun Mode (Chế độ Báo Thủ):** Humorous, slang-heavy language (e.g., "Bảng Kê Hóa Kiếp", "Cống nạp môn phái") for a more relaxed, internal team presentation.
- **Dark/Light Theme:** The app supports both light and dark themes using CSS variables.
- **Glassmorphism Design:** The UI heavily relies on a "liquid glass" aesthetic (similar to iOS), utilizing semi-transparent backgrounds, heavy blur (`backdrop-filter`), and soft shadows.

## Tech Stack
- **Framework:** React
- **Styling:** Vanilla CSS (`App.css`, `index.css`). **Tailwind CSS is NOT used.**
- **Animations:** `framer-motion`
- **Charts:** `recharts` (PieChart for investment breakdown)
- **Icons:** `lucide-react`

## Project Structure
- `src/App.jsx`: Main application component. Contains all the layout structure (Hero, Chart, Team grid, Timeline, Budget table, Map).
- `src/data.js`: The central data store. It exports an object containing `serious` and `fun` configurations. All content text, budget items, team members, and timeline steps are driven by this file.
- `src/index.css`: Contains CSS variables for theming (colors, glassmorphism tokens for all mode combinations) and global styles.
- `src/App.css`: Contains component-specific styles (e.g., `.glass-card`, `.team-grid`, timeline layouts).

## Important Implementation Details
- **No 3D Tilt:** The project originally used `react-parallax-tilt` for 3D card effects, but this was removed in favor of static `<div className="glass-card">` elements with CSS hover effects (translateY and box-shadow) for better UX and performance.
- **Data Driven:** To update content, modify `src/data.js` rather than hardcoding text into `App.jsx`. Ensure both `serious` and `fun` objects in `data.js` are updated synchronously to keep modes consistent.
