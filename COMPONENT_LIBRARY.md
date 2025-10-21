# Split Lease Component Library

This repository contains production-ready React components converted from Bubble.io.

## Available Components

### 1. ✅ ReservationPriceBreakdown
**Location:** `src/components/ReservationPriceBreakdown/`

Displays detailed price breakdowns for reservations including rent, fees, and discounts.

**Status:** Complete
**Documentation:** See component README

---

### 2. ✅ SearchScheduleSelector
**Location:** `components/SearchScheduleSelector/`

Calendar-based schedule selector for searching availability with drag-to-select functionality.

**Status:** Complete ✨
**Documentation:** See component README

**Recent Updates:**
- Fixed error timeout handling (alerts now properly dismiss after 6 seconds)
- Improved TypeScript compatibility
- Enhanced contiguity validation with real-time feedback

---

### 3. ✅ **SignUpLoginModal** (NEW!)
**Location:** `src/components/SignUpLoginModal/`

Comprehensive authentication modal with login, signup, password reset, and passwordless auth.

**Status:** Complete ✨
**Quick Start:** `src/components/SignUpLoginModal/QUICK_START.md`
**Documentation:**
- `README.md` - Full documentation
- `INTEGRATION_GUIDE.md` - Step-by-step integration
- `CONVERSION_SUMMARY.md` - Conversion details
- `Example.tsx` - Live examples

**Features:**
- 🔐 Email/Password Login
- 📝 User Registration
- 🔑 Password Reset
- ✨ Passwordless Login
- 🎁 Referral Code Support
- ✅ Form Validation
- 📱 Responsive Design
- ♿ Accessibility (ARIA)
- 🎨 Modern Animations
- 📦 TypeScript Support

**Files Created:** 30 files
- 9 Components (Login, Signup, Reset, Welcome, + 5 shared)
- 3 Custom Hooks (State, Validation, Auth Flow)
- 12 Style Files
- 5 Documentation Files
- 1 Types Definition

**Usage:**
```tsx
import { SignUpLoginModal } from './components/SignUpLoginModal';

<SignUpLoginModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onAuthSuccess={(user) => console.log(user)}
/>
```

---

## Component Architecture

All components follow the same structure:

```
ComponentName/
├── ComponentName.tsx           # Main component
├── ComponentName.styles.ts     # Styled-components
├── types.ts                    # TypeScript definitions
├── hooks/                      # Custom hooks (if needed)
│   └── useComponentLogic.ts
├── components/                 # Sub-components (if needed)
│   └── SubComponent.tsx
├── Example.tsx                 # Usage examples
├── README.md                   # Documentation
└── index.ts                    # Exports
```

## Technology Stack

- **React:** 18.3.1
- **TypeScript:** 5.6.3
- **Styled-Components:** 6.1.13
- **Vite:** 6.0.1 (Build tool)
- **Date-fns:** 4.1.0 (Date utilities)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Type Checking

```bash
npm run type-check
```

## Linting

```bash
npm run lint
```

## Adding New Components

When converting a new Bubble component:

1. Create directory: `src/components/NewComponent/`
2. Follow the architecture pattern above
3. Add TypeScript types
4. Implement component with styled-components
5. Create usage examples
6. Write documentation
7. Add to this library list

## Best Practices

### Code Style
- Use TypeScript for all components
- Follow existing naming conventions
- Separate styles into `.styles.ts` files
- Create reusable hooks for complex logic

### Documentation
- Include README.md for each component
- Provide usage examples
- Document all props with TSDoc comments
- Add integration guides for complex components

### Testing
- Write unit tests for hooks
- Test component rendering
- Validate prop types
- Check accessibility

### Performance
- Use React.memo for expensive components
- Implement lazy loading where appropriate
- Optimize re-renders with proper dependencies
- Use useMemo/useCallback for expensive operations

## Component Status

| Component | Status | Documentation | Tests | Accessibility |
|-----------|--------|--------------|-------|---------------|
| ReservationPriceBreakdown | ✅ Complete | ✅ | ⚠️ Partial | ✅ |
| SearchScheduleSelector | ✅ Complete | ✅ | ⚠️ Partial | ✅ |
| SignUpLoginModal | ✅ Complete | ✅ Complete | ❌ Planned | ✅ Complete |

## Roadmap

### Next Components to Convert
- [ ] Host Dashboard Menu
- [ ] Footer Component
- [ ] Message Host Component
- [ ] Informational Text Component

### Improvements
- [ ] Add comprehensive test suite
- [ ] Set up Storybook for component preview
- [ ] Create design system documentation
- [ ] Add E2E tests with Playwright
- [ ] Set up CI/CD pipeline

## Contributing

1. Convert component from Bubble
2. Follow architecture patterns
3. Add documentation
4. Create examples
5. Update this library document

## Support

For questions or issues with any component:
- Check the component's README.md
- Review the Example.tsx file
- Contact the development team

---

**Last Updated:** October 21, 2025
**Components:** 3
**Total Files:** 100+
**Conversion Rate:** 3/8 (37.5%)
