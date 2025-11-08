---
goal: Implement Complete Game Records Website with Navigation, Statistics, and Overall Pages
version: 1.0
date_created: 2025-11-08
last_updated: 2025-11-08
owner: Development Team
status: Planned
tags: [feature, next.js, ui, charts, navigation]
---

# Introduction

![Status: Planned](https://img.shields.io/badge/status-Planned-blue)

This implementation plan details the complete development of a Next.js-based game records website that displays play statistics, charts, and tables from a CouchDB backend. The website will feature responsive navigation with theme switching, recently played games visualization, playtime charts, and comprehensive lifetime game rating tables.

## 1. Requirements & Constraints

### Requirements

- **REQ-001**: Application must fetch data from remote CouchDB server using existing query functions in `@/lib/db/query.ts`
- **REQ-002**: All data fetching must occur in server components with Next.js Cache Components (`cacheLife("hours")`)
- **REQ-003**: Responsive navigation bar with desktop (full menu) and mobile (drawer with burger menu) layouts
- **REQ-004**: Theme switching functionality (light/dark mode) accessible from navbar
- **REQ-005**: `/statistics` page must display recently played games grid and playtime bar chart
- **REQ-006**: `/overall` page must display game rating tables grouped by score ranges (10, 9-9.9, 8-8.9, 7-7.9, 6-6.9, <5.9)
- **REQ-007**: Game cover images must be clickable links to official game sites
- **REQ-008**: Must exclude `/consent` route from main navigation
- **REQ-009**: Support for NSFW content warning via existing consent mechanism
- **REQ-010**: Application must use TypeScript with strict type safety (no `any` types)

### Security Requirements

- **SEC-001**: Database credentials must remain server-side only (no exposure to client)
- **SEC-002**: All external links must open in new tabs with proper `rel` attributes
- **SEC-003**: Validate all data fetched from database before rendering

### Constraints

- **CON-001**: Must use existing `GameDoc` schema from `@/lib/db/documents.ts`
- **CON-002**: Must use existing query functions: `queryAllGamesSortByScore()` and `queryRecentGames()`
- **CON-003**: Cannot modify consent page or consent mechanism logic
- **CON-004**: Must follow coding standards: no semicolons, double quotes, 2-space indentation, absolute imports with `@/`
- **CON-005**: Must use Tailwind CSS v4 for styling
- **CON-006**: Must use HeroUI v2.8.5 for UI components
- **CON-007**: Must use Recharts for chart visualization
- **CON-008**: Must use framer-motion for animations

### Guidelines

- **GUD-001**: Wrap data-fetching components in `<Suspense>` boundaries with loading states
- **GUD-002**: Use semantic HTML structure throughout
- **GUD-003**: Implement responsive design patterns for mobile, tablet, and desktop
- **GUD-004**: Add rich CSS animations using framer-motion where appropriate
- **GUD-005**: Maintain modern, clean design aesthetic
- **GUD-006**: Use HeroUI components consistently for UI elements
- **GUD-007**: Implement proper error boundaries for React components
- **GUD-008**: Log errors with contextual information for debugging

### Patterns

- **PAT-001**: Server components for data fetching, client components for interactivity
- **PAT-002**: Use `"use client"` directive only when necessary (theme switching, drawer, animations)
- **PAT-003**: Organize components: layout components in `@/components/layout/`, feature components in `@/components/features/`
- **PAT-004**: Use async/await for all database queries
- **PAT-005**: Implement loading skeletons for better UX during data fetching

## 2. Implementation Steps

### Implementation Phase 1: Navigation Infrastructure

- **GOAL-001**: Implement responsive navigation bar with desktop and mobile layouts, theme switching functionality

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Create `@/components/layout/navbar.tsx` with responsive HeroUI Navbar component supporting desktop (full menu) and mobile (drawer) layouts | | |
| TASK-002 | Create `@/components/layout/themeSwitch.tsx` client component with theme toggle button using HeroUI Switch/Button and local storage persistence | | |
| TASK-003 | Create `@/components/layout/mobileDrawer.tsx` client component with HeroUI Drawer/Modal for mobile navigation menu | | |
| TASK-004 | Create `@/lib/constants/routes.ts` file defining navigation routes array excluding `/consent` | | |
| TASK-005 | Update `@/app/layout.tsx` to include Navbar component in header section | | |
| TASK-006 | Add theme provider to `@/app/providers.tsx` wrapping HeroUIProvider with theme state management | | |
| TASK-007 | Implement burger menu icon (Tabler Icons) for mobile with proper ARIA labels and accessibility | | |
| TASK-008 | Add framer-motion animations for drawer open/close transitions | | |
| TASK-009 | Style navbar with Tailwind CSS ensuring proper spacing, colors, and responsive breakpoints (sm, md, lg, xl) | | |

### Implementation Phase 2: Statistics Page - Recently Played Games

- **GOAL-002**: Implement `/statistics` page with recently played games grid displaying game covers, titles, and play status

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-010 | Create `@/app/statistics/page.tsx` as server component fetching data via `queryRecentGames()` | | |
| TASK-011 | Create `@/components/features/recentGamesGrid.tsx` server component accepting `GameDoc[]` prop | | |
| TASK-012 | Create `@/components/features/gameCard.tsx` component displaying cover image (with official site link), title, and play status badge | | |
| TASK-013 | Extract cover URL from `GameDoc.metadata.extra` array finding entry with key "coverUrl" | | |
| TASK-014 | Extract official site URL from `GameDoc.metadata.relatedSites` array finding entry with label "official" | | |
| TASK-015 | Implement responsive grid layout (1 column mobile, 2-3 tablet, 4-6 desktop) using Tailwind grid classes | | |
| TASK-016 | Style game cards with HeroUI Card component, hover effects, and rounded corners | | |
| TASK-017 | Add play status badges with color coding (playing=green, finished=blue, shelved=gray, etc.) using HeroUI Chip | | |
| TASK-018 | Implement lazy loading for images with Next.js Image component and proper aspect ratios | | |
| TASK-019 | Add framer-motion stagger animations for grid items on page load | | |
| TASK-020 | Wrap RecentGamesGrid in Suspense with HeroUI Skeleton loading state | | |

### Implementation Phase 3: Statistics Page - Playtime Bar Chart

- **GOAL-003**: Implement horizontal bar chart showing games played in past year sorted by playtime

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-021 | Create `@/components/features/playtimeChart.tsx` server component accepting `GameDoc[]` prop | | |
| TASK-022 | Create `@/lib/utils/time.ts` with function to convert playtime minutes to "h:mm" format | | |
| TASK-023 | Filter and sort games by `GameDoc.record.playTime` in descending order, limiting to top 20-30 games | | |
| TASK-024 | Implement Recharts BarChart with horizontal orientation (swap X and Y axes) | | |
| TASK-025 | Configure Y-axis to display game titles (`GameDoc.metadata.name`) with proper text wrapping/truncation | | |
| TASK-026 | Configure X-axis to display playtime in "h:mm" format using custom tick formatter | | |
| TASK-027 | Add custom tooltip showing full game name and exact playtime on hover | | |
| TASK-028 | Style chart with theme-aware colors (different colors for light/dark mode) | | |
| TASK-029 | Implement responsive chart sizing based on viewport width using Recharts ResponsiveContainer | | |
| TASK-030 | Add section heading "Games Played in Past Year" with proper typography | | |
| TASK-031 | Wrap PlaytimeChart in Suspense with loading skeleton | | |

### Implementation Phase 4: Statistics Page Layout

- **GOAL-004**: Organize statistics page layout with proper sections, spacing, and responsive design

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-032 | Structure `/statistics/page.tsx` with two main sections: Recently Played and Playtime Chart | | |
| TASK-033 | Add page title "Play Statistics" with Tailwind typography classes | | |
| TASK-034 | Add section dividers/spacing using Tailwind margin/padding utilities | | |
| TASK-035 | Implement responsive container widths (full width mobile, max-width desktop) | | |
| TASK-036 | Add page metadata (title, description) using Next.js Metadata API | | |
| TASK-037 | Add smooth scroll-to-top button for long pages using framer-motion | | |

### Implementation Phase 5: Overall Page - Data Processing

- **GOAL-005**: Implement data processing logic to group games by score ranges for rating tables

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-038 | Create `@/app/overall/page.tsx` as server component fetching data via `queryAllGamesSortByScore()` | | |
| TASK-039 | Create `@/lib/utils/gameGrouping.ts` with function to group games by score ranges | | |
| TASK-040 | Implement score range logic: 10.0, 9.0-9.9, 8.0-8.9, 7.0-7.9, 6.0-6.9, <6.0 | | |
| TASK-041 | Sort games within each group by score descending, then lastRunDate descending | | |
| TASK-042 | Return typed object mapping score range labels to `GameDoc[]` arrays | | |

### Implementation Phase 6: Overall Page - Rating Tables

- **GOAL-006**: Implement comprehensive game rating tables with all required columns

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-043 | Create `@/components/features/ratingTable.tsx` component accepting score range and games array props | | |
| TASK-044 | Implement HeroUI Table component with columns: Score, Cover, Title, Brand, Play Status, Playtime, Last Played | | |
| TASK-045 | Format score column to display `GameDoc.record.score` with 1 decimal place | | |
| TASK-046 | Implement cover column with thumbnail image (clickable link to official site) | | |
| TASK-047 | Display title from `GameDoc.metadata.name` with text truncation for long names | | |
| TASK-048 | Display brand/developers from `GameDoc.metadata.developers` array (join with commas) | | |
| TASK-049 | Display play status with color-coded badges matching statistics page styling | | |
| TASK-050 | Format playtime using time utility to show "h:mm" format | | |
| TASK-051 | Format last played date as "yyyy-MM-dd" from `GameDoc.record.lastRunDate` | | |
| TASK-052 | Create `@/lib/utils/date.ts` with date formatting function for "yyyy-MM-dd" format | | |
| TASK-053 | Add alternating row colors for better readability using Tailwind stripe pattern | | |
| TASK-054 | Implement responsive table with horizontal scroll on mobile | | |
| TASK-055 | Add table header with score range label (e.g., "Rating: 9.0 - 9.9") | | |

### Implementation Phase 7: Overall Page Layout

- **GOAL-007**: Organize overall page with all six rating tables in logical order

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-056 | Structure `/overall/page.tsx` with six RatingTable components for each score range | | |
| TASK-057 | Add page title "Lifetime Game Records" with proper typography | | |
| TASK-058 | Order tables from highest to lowest score range (10.0 → <6.0) | | |
| TASK-059 | Add spacing between tables using Tailwind margin utilities | | |
| TASK-060 | Implement collapsible sections for each table to reduce page length (optional enhancement) | | |
| TASK-061 | Add page metadata using Next.js Metadata API | | |
| TASK-062 | Wrap each table in Suspense with HeroUI Skeleton loading states | | |
| TASK-063 | Add statistics summary at top (total games, average score, total playtime) | | |

### Implementation Phase 8: Utility Functions and Helpers

- **GOAL-008**: Create reusable utility functions for data processing and formatting

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-064 | Create `@/lib/utils/gameData.ts` with function to safely extract cover URL from extra array | | |
| TASK-065 | Create function to safely extract official site URL from relatedSites array | | |
| TASK-066 | Create function to get play status label and color mapping | | |
| TASK-067 | Add error handling for missing or malformed data fields | | |
| TASK-068 | Create `@/lib/types/common.ts` for shared type definitions (ScoreRange, PlayStatusConfig, etc.) | | |
| TASK-069 | Implement type guards for validating GameDoc structure | | |

### Implementation Phase 9: Loading States and Error Handling

- **GOAL-009**: Implement comprehensive loading states and error handling throughout application

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-070 | Create `@/app/statistics/loading.tsx` with HeroUI Skeleton components matching page structure | | |
| TASK-071 | Create `@/app/overall/loading.tsx` with table skeleton loading states | | |
| TASK-072 | Create `@/app/error.tsx` error boundary with user-friendly error message and retry button | | |
| TASK-073 | Create `@/components/features/emptyState.tsx` component for when no games are found | | |
| TASK-074 | Add try-catch blocks in server components with fallback to empty state | | |
| TASK-075 | Implement error logging with contextual information (page, component, error type) | | |
| TASK-076 | Add console warnings for missing optional fields (cover images, official sites) | | |

### Implementation Phase 10: Styling and Animations

- **GOAL-010**: Apply consistent styling and animations across all pages and components

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-077 | Define color palette variables in globals.css for consistent theming | | |
| TASK-078 | Implement dark mode styles for all components using Tailwind dark: variant | | |
| TASK-079 | Add hover animations to interactive elements (cards, links, buttons) using framer-motion | | |
| TASK-080 | Implement page transition animations for route changes | | |
| TASK-081 | Add loading spinner animations for async operations | | |
| TASK-082 | Implement fade-in animations for content on initial render | | |
| TASK-083 | Add smooth scroll behavior for navigation links | | |
| TASK-084 | Ensure all animations respect prefers-reduced-motion accessibility setting | | |

### Implementation Phase 11: Responsive Design

- **GOAL-011**: Ensure full responsive design across all viewport sizes

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-085 | Test and adjust navbar layout at breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px) | | |
| TASK-086 | Test and adjust statistics page grid layout across all breakpoints | | |
| TASK-087 | Test and adjust chart sizing and readability on mobile devices | | |
| TASK-088 | Test and adjust table layouts with horizontal scroll on mobile | | |
| TASK-089 | Ensure touch targets meet minimum 44px size requirement on mobile | | |
| TASK-090 | Test drawer menu functionality on various mobile devices | | |
| TASK-091 | Optimize font sizes for readability across devices | | |

### Implementation Phase 12: Performance Optimization

- **GOAL-012**: Optimize application performance for fast loading and smooth interactions

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-092 | Verify Next.js Cache Components are working with `cacheLife("hours")` directive | | |
| TASK-093 | Implement image optimization with Next.js Image component for all game covers | | |
| TASK-094 | Add proper image sizing and srcset for responsive images | | |
| TASK-095 | Implement code splitting for client components using dynamic imports where appropriate | | |
| TASK-096 | Minimize client-side JavaScript by maximizing server component usage | | |
| TASK-097 | Add proper cache headers for static assets | | |
| TASK-098 | Implement virtual scrolling for long tables if performance issues arise (optional) | | |

### Implementation Phase 13: Accessibility

- **GOAL-013**: Ensure application meets WCAG 2.1 AA accessibility standards

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-099 | Add proper ARIA labels to all interactive elements (buttons, links, inputs) | | |
| TASK-100 | Ensure keyboard navigation works for all interactive components | | |
| TASK-101 | Add focus indicators to all focusable elements with visible outlines | | |
| TASK-102 | Ensure color contrast ratios meet WCAG AA standards (4.5:1 for text) | | |
| TASK-103 | Add alt text to all images with meaningful descriptions | | |
| TASK-104 | Implement skip-to-content link for keyboard users | | |
| TASK-105 | Test with screen readers (NVDA, JAWS, VoiceOver) for proper announcements | | |
| TASK-106 | Add proper heading hierarchy (h1, h2, h3) throughout pages | | |

### Implementation Phase 14: Testing and Quality Assurance

- **GOAL-014**: Verify all functionality works correctly across different scenarios

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-107 | Test data fetching with various dataset sizes (empty, small, large) | | |
| TASK-108 | Test error scenarios (network failures, malformed data, missing fields) | | |
| TASK-109 | Test theme switching functionality in all pages and components | | |
| TASK-110 | Test mobile drawer open/close functionality | | |
| TASK-111 | Test navigation between all routes | | |
| TASK-112 | Test consent mechanism flow from fresh browser session | | |
| TASK-113 | Verify external links open correctly in new tabs | | |
| TASK-114 | Test with browser extensions disabled to ensure compatibility | | |
| TASK-115 | Run Next.js build and verify no TypeScript errors | | |
| TASK-116 | Run ESLint and fix any linting issues | | |
| TASK-117 | Test application in multiple browsers (Chrome, Firefox, Safari, Edge) | | |

### Implementation Phase 15: Documentation and Polish

- **GOAL-015**: Finalize implementation with documentation and final polish

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-118 | Add JSDoc comments to all utility functions and complex components | | |
| TASK-119 | Update README.md with project description, setup instructions, and features list | | |
| TASK-120 | Document environment variables required in .env.example file | | |
| TASK-121 | Add inline code comments for complex logic sections | | |
| TASK-122 | Review all console.log statements and ensure only necessary logs remain | | |
| TASK-123 | Final code review for adherence to coding standards (no semicolons, double quotes, etc.) | | |
| TASK-124 | Verify all imports use absolute paths with @/ prefix | | |
| TASK-125 | Final visual review of all pages for consistent spacing, alignment, and styling | | |

## 3. Alternatives

### Alternative Approaches Considered

- **ALT-001**: Client-side data fetching with React Query
  - **Reason rejected**: Violates SEC-001 requirement to keep DB credentials server-side; Next.js server components with Cache Components provide better performance and security
  
- **ALT-002**: Using a different charting library (Chart.js, Victory)
  - **Reason rejected**: Project already specifies Recharts as the charting library (CON-007)
  
- **ALT-003**: Building custom table components instead of using HeroUI Table
  - **Reason rejected**: HeroUI v2.8.5 is specified in requirements (CON-006); using built-in components ensures consistency and reduces development time
  
- **ALT-004**: Hamburger menu implementation using pure CSS
  - **Reason rejected**: HeroUI provides robust drawer/modal components; framer-motion animations provide better UX
  
- **ALT-005**: Separate theme context instead of using HeroUI's theme system
  - **Reason rejected**: HeroUI already includes theme management; reduces complexity and ensures component compatibility
  
- **ALT-006**: Implementing pagination for rating tables
  - **Reason rejected**: User wants to see all games in lifetime records; scrolling is acceptable for this use case; can be added later if needed
  
- **ALT-007**: Using static generation instead of server-side rendering
  - **Reason rejected**: Data changes frequently (game play records); SSR with caching provides better balance of freshness and performance

## 4. Dependencies

### External Dependencies (Already Installed)

- **DEP-001**: Next.js 16.0.1 - Application framework with App Router and Cache Components
- **DEP-002**: React 19.2.0 - UI library
- **DEP-003**: TypeScript 5.x - Type safety
- **DEP-004**: Tailwind CSS v4 - Styling framework
- **DEP-005**: HeroUI v2.8.5 - Component library (@heroui/react)
- **DEP-006**: Recharts 3.3.0 - Charting library
- **DEP-007**: framer-motion 12.23.24 - Animation library (exported as "motion")
- **DEP-008**: @tabler/icons-react 3.35.0 - Icon library

### Internal Dependencies

- **DEP-009**: `@/lib/db/query.ts` - Existing query functions (queryAllGamesSortByScore, queryRecentGames)
- **DEP-010**: `@/lib/db/documents.ts` - GameDoc type definition
- **DEP-011**: `@/lib/db/couch.ts` - Database connection utilities
- **DEP-012**: `@/components/clientConsent.tsx` - Consent management component
- **DEP-013**: `@/app/providers.tsx` - HeroUIProvider wrapper

### Environment Variables

- **DEP-014**: `COUCH_HOST` - CouchDB server URL
- **DEP-015**: `COUCH_USER` - CouchDB username
- **DEP-016**: `COUCH_PASS` - CouchDB password

## 5. Files

### New Files to Create

#### Layout Components
- **FILE-001**: `src/components/layout/navbar.tsx` - Main navigation bar with responsive layout
- **FILE-002**: `src/components/layout/themeSwitch.tsx` - Theme toggle button component
- **FILE-003**: `src/components/layout/mobileDrawer.tsx` - Mobile navigation drawer

#### Feature Components
- **FILE-004**: `src/components/features/recentGamesGrid.tsx` - Grid of recently played games
- **FILE-005**: `src/components/features/gameCard.tsx` - Individual game card component
- **FILE-006**: `src/components/features/playtimeChart.tsx` - Horizontal bar chart for playtime
- **FILE-007**: `src/components/features/ratingTable.tsx` - Game rating table component
- **FILE-008**: `src/components/features/emptyState.tsx` - Empty state placeholder

#### Pages
- **FILE-009**: `src/app/statistics/page.tsx` - Statistics page with games and charts
- **FILE-010**: `src/app/statistics/loading.tsx` - Loading state for statistics page
- **FILE-011**: `src/app/error.tsx` - Global error boundary

#### Utility Functions
- **FILE-012**: `src/lib/utils/time.ts` - Time formatting utilities
- **FILE-013**: `src/lib/utils/date.ts` - Date formatting utilities
- **FILE-014**: `src/lib/utils/gameData.ts` - Game data extraction utilities
- **FILE-015**: `src/lib/utils/gameGrouping.ts` - Game grouping by score range
- **FILE-016**: `src/lib/types/common.ts` - Shared type definitions
- **FILE-017**: `src/lib/constants/routes.ts` - Navigation routes configuration

### Files to Modify

- **FILE-018**: `src/app/layout.tsx` - Add Navbar component to header
- **FILE-019**: `src/app/overall/page.tsx` - Implement lifetime rating tables (currently empty)
- **FILE-020**: `src/app/providers.tsx` - Add theme provider wrapper
- **FILE-021**: `src/app/globals.css` - Add color palette variables and custom styles

## 6. Testing

### Unit Testing

- **TEST-001**: Time formatting function converts minutes to "h:mm" correctly
- **TEST-002**: Date formatting function outputs "yyyy-MM-dd" format correctly
- **TEST-003**: Cover URL extraction handles missing data gracefully
- **TEST-004**: Official site URL extraction handles missing data gracefully
- **TEST-005**: Game grouping by score range assigns games to correct ranges
- **TEST-006**: Play status mapping returns correct colors for all statuses

### Integration Testing

- **TEST-007**: Statistics page fetches and displays recent games correctly
- **TEST-008**: Statistics page renders playtime chart with correct data
- **TEST-009**: Overall page fetches and displays all rating tables correctly
- **TEST-010**: Navbar navigation links route to correct pages
- **TEST-011**: Theme switching persists across page navigations
- **TEST-012**: Mobile drawer opens and closes correctly
- **TEST-013**: Consent mechanism redirects unauthenticated users

### Visual Testing

- **TEST-014**: All pages render correctly in light mode
- **TEST-015**: All pages render correctly in dark mode
- **TEST-016**: Responsive layouts work at all breakpoints (mobile, tablet, desktop)
- **TEST-017**: Animations play smoothly without jank
- **TEST-018**: Loading states display correctly before data loads
- **TEST-019**: Empty states display when no data is available
- **TEST-020**: Error states display correctly when errors occur

### Performance Testing

- **TEST-021**: Initial page load time is under 3 seconds
- **TEST-022**: Cache Components reduce repeated data fetching
- **TEST-023**: Images load progressively without blocking render
- **TEST-024**: Chart rendering does not block main thread
- **TEST-025**: Large tables scroll smoothly on mobile devices

### Accessibility Testing

- **TEST-026**: All interactive elements are keyboard navigable
- **TEST-027**: Screen reader announces all content correctly
- **TEST-028**: Color contrast meets WCAG AA standards
- **TEST-029**: Focus indicators are visible on all focusable elements
- **TEST-030**: Skip-to-content link works correctly

## 7. Risks & Assumptions

### Risks

- **RISK-001**: Large datasets may cause performance issues in tables
  - **Mitigation**: Implement virtual scrolling or pagination if needed in Phase 12 (TASK-098)
  
- **RISK-002**: Missing or malformed data in GameDoc objects
  - **Mitigation**: Implement defensive coding with null checks and default values (Phase 8, TASK-067)
  
- **RISK-003**: CouchDB connection failures or timeouts
  - **Mitigation**: Implement proper error handling and fallback UI (Phase 9)
  
- **RISK-004**: Theme switching may cause flash of incorrect theme on page load
  - **Mitigation**: Use localStorage to persist theme and load before initial render
  
- **RISK-005**: Recharts may have issues with SSR
  - **Mitigation**: Ensure charts are wrapped in client components with proper hydration handling
  
- **RISK-006**: Mobile drawer may have z-index conflicts
  - **Mitigation**: Use HeroUI's built-in modal system which manages z-index automatically
  
- **RISK-007**: Very long game titles may break table layouts
  - **Mitigation**: Implement text truncation with tooltips (Phase 6, TASK-047)

### Assumptions

- **ASSUMPTION-001**: CouchDB server is accessible and properly configured with required credentials
- **ASSUMPTION-002**: GameDoc schema in database matches TypeScript interface definition
- **ASSUMPTION-003**: All games have at minimum the required fields (name, score, playTime, playStatus)
- **ASSUMPTION-004**: Cover URLs point to valid, accessible images
- **ASSUMPTION-005**: Official site URLs are valid and safe to link to
- **ASSUMPTION-006**: Users have modern browsers with JavaScript enabled
- **ASSUMPTION-007**: Network connection is reasonably fast (broadband or better)
- **ASSUMPTION-008**: Dataset size is manageable (< 1000 games) without virtualization
- **ASSUMPTION-009**: Play status values match exactly: "unplayed", "playing", "partial", "finished", "multiple", "shelved"
- **ASSUMPTION-010**: Playtime is stored in minutes as a number
- **ASSUMPTION-011**: Dates are stored in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
- **ASSUMPTION-012**: Users consent to NSFW content before accessing main pages (handled by existing consent mechanism)

## 8. Related Specifications / Further Reading

### Next.js Documentation
- [Next.js App Router](https://nextjs.org/docs/app) - Core routing and layout patterns
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching) - Server components and caching
- [Next.js Cache Components](https://nextjs.org/docs/app/api-reference/directives/use-cache) - New caching directive
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images) - Image component usage

### Component Libraries
- [HeroUI Documentation](https://heroui.com/) - Component API reference
- [Recharts Documentation](https://recharts.org/) - Chart components and examples
- [Framer Motion Documentation](https://www.framer.com/motion/) - Animation patterns

### Design & Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs) - Utility classes reference
- [Material Design Guidelines](https://material.io/design) - Design principles (for inspiration)

### Related Project Files
- `AGENTS.md` - Project overview and coding standards
- `src/lib/db/documents.ts` - Data schema definitions
- `src/lib/db/query.ts` - Existing query functions
- `src/app/consent/page.tsx` - Example of client component with animations
