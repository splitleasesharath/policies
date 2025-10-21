# Reservation Price Breakdown - Bubble to React Conversion Guide

## 📋 Table of Contents

1. [Overview](#overview)
2. [Bubble Element Analysis](#bubble-element-analysis)
3. [React Implementation](#react-implementation)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Migration Checklist](#migration-checklist)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This guide documents the conversion of the Bubble.io reusable element **♻️💥reservation price breakdown** into a modern React component. The component displays detailed reservation pricing information including dates, compensation breakdowns, and fees.

### Key Features

- ✅ Full TypeScript support
- ✅ Two styling options: Styled Components and Tailwind CSS
- ✅ Responsive design
- ✅ Accessible (WCAG 2.1 AA compliant)
- ✅ Modern React hooks (useState, useMemo)
- ✅ Comprehensive type safety

---

## Bubble Element Analysis

### Original Bubble Element Details

**Element Type:** Reusable Element (Custom Component)
**Element Name:** ♻️💥reservation price breakdown

### Data Types & Properties

#### Primary Property
- `proposal` - Type: **Proposal** (Custom Data Type)

#### Custom States (Internal State Management)

| State Name | Type | Default Value | Purpose |
|------------|------|---------------|---------|
| NO PROPOSAL | number | empty | Flag for missing proposal |
| NO PROPOSAL | Rental Type | empty | Rental type fallback |
| NO PROPOSAL | Weekly Selection option | empty | Weekly selection fallback |
| OUTPUT 4 weeks | number | empty | Calculated 4-week output |
| price per night | number | empty | Cached price per night |
| price/rent per 4 weeks | number | empty | Cached 4-week price |
| proposal | Proposal | empty | Internal proposal cache |
| total price for reservation | number | empty | Calculated total price |
| user watching | User | empty | Current viewing user |

### Visual Properties

**Container:**
- Background: `#DFDFF6` (Light lavender)
- Border: 1px solid `#68B6B` (Blue-gray)
- Border Radius: 3px
- Width: 100%
- Height: 100px - 750px (responsive)

**Layout Sections:**
1. Header: "Proposal Details"
2. Date Information (Move-in, Check-in, Check-out, Length)
3. House Rules Link
4. Pricing Details (Weekly pattern, rates, nights)
5. 4-Week Breakdown
6. Fees (Damage deposit, Maintenance)
7. Footer Note

### Event Handlers

- **Move in value is clicked** - Triggers date editing
- **House rules clicked** - Shows house rules modal

---

## React Implementation

### Architecture Overview

```
components/
└── ReservationPriceBreakdown/
    ├── ReservationPriceBreakdown.tsx          # Main component (Styled Components)
    ├── ReservationPriceBreakdown.styles.ts    # Styled Components styles
    └── ReservationPriceBreakdown.tailwind.tsx # Alternative (Tailwind CSS)

types/
└── proposal.ts                                 # TypeScript interfaces

examples/
└── ProposalPage.tsx                           # Usage examples
```

### Component Structure

```typescript
ReservationPriceBreakdown
├── Props
│   ├── proposal?: Proposal
│   ├── mode?: 'preview' | 'proposal'
│   ├── onMoveInClick?: () => void
│   └── onHouseRulesClick?: () => void
│
├── Internal State
│   ├── rentalType
│   ├── weeklySelectionOption
│   ├── output4Weeks
│   ├── pricePerNight
│   ├── pricePerFourWeeks
│   ├── totalPriceForReservation
│   └── userWatching
│
└── Computed Values (useMemo)
    ├── formattedMoveInDate
    ├── checkInDayShort
    └── checkOutDayShort
```

---

## Installation

### Prerequisites

```bash
# Required dependencies
npm install react react-dom date-fns

# For Styled Components version
npm install styled-components
npm install -D @types/styled-components

# For Tailwind CSS version
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### TypeScript Configuration

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### File Setup

1. Copy the files to your project:
   ```bash
   # Copy type definitions
   cp types/proposal.ts src/types/

   # Copy component files
   cp -r components/ReservationPriceBreakdown src/components/

   # Copy examples (optional)
   cp examples/ProposalPage.tsx src/pages/
   ```

2. Import in your application:
   ```typescript
   // Using Styled Components version
   import { ReservationPriceBreakdown } from '@/components/ReservationPriceBreakdown/ReservationPriceBreakdown';

   // OR using Tailwind CSS version
   import { ReservationPriceBreakdownTailwind } from '@/components/ReservationPriceBreakdown/ReservationPriceBreakdown.tailwind';
   ```

---

## Usage

### Basic Usage

```typescript
import React from 'react';
import { ReservationPriceBreakdown } from '@/components/ReservationPriceBreakdown';
import { Proposal } from '@/types/proposal';

function MyPage() {
  const proposal: Proposal = {
    id: 'prop-123',
    moveInDate: new Date('2025-11-01'),
    checkInDay: 'Saturday',
    checkOutDay: 'Friday',
    reservationLength: 28,
    weeklyPattern: 'Mon-Thu',
    actualWeeksUsed: 4,
    compensationPerNight: 45.50,
    pricePerNight: 85.00,
    nightsReserved: 16,
    totalCompensation: 728.00,
    totalPrice: 1360.00,
    compensationPer4Weeks: 728.00,
    pricePer4Weeks: 1360.00,
    damageDeposit: 500.00,
    maintenanceFee: 150.00,
    host: {
      id: 'host-123',
      name: 'John Doe',
      email: 'john@example.com'
    }
  };

  return (
    <ReservationPriceBreakdown
      proposal={proposal}
      mode="proposal"
      onMoveInClick={() => console.log('Edit move-in date')}
      onHouseRulesClick={() => console.log('Show house rules')}
    />
  );
}
```

### Preview Mode

```typescript
<ReservationPriceBreakdown
  mode="preview"
  onMoveInClick={handleDateConfig}
  onHouseRulesClick={handleRulesConfig}
/>
```

### With API Integration

```typescript
import { useState, useEffect } from 'react';

function ProposalPage({ proposalId }: { proposalId: string }) {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/proposals/${proposalId}`)
      .then(res => res.json())
      .then(data => {
        setProposal(data);
        setLoading(false);
      });
  }, [proposalId]);

  if (loading) return <div>Loading...</div>;

  return (
    <ReservationPriceBreakdown
      proposal={proposal}
      onMoveInClick={() => {/* handle click */}}
      onHouseRulesClick={() => {/* handle click */}}
    />
  );
}
```

---

## Migration Checklist

### Data Migration

- [ ] **Map Bubble data types to TypeScript interfaces**
  - Convert Proposal custom type to TypeScript interface
  - Convert User custom type to TypeScript interface
  - Define enums for RentalType and WeeklySelectionOption

- [ ] **Update API endpoints**
  - Ensure date fields are serialized/deserialized correctly
  - Verify numeric precision for pricing fields
  - Test data transformation from Bubble format to React format

### State Management Migration

- [ ] **Custom States → React State**
  - Map each Bubble custom state to useState hook
  - Identify which states are truly needed (some may be derivable)
  - Set up proper initial values

- [ ] **Dynamic Expressions → Computed Values**
  - Convert Bubble's dynamic text to useMemo hooks
  - Implement date formatting with date-fns
  - Add number formatting for currency

### Event Handler Migration

- [ ] **Workflows → Event Handlers**
  - Map "Move in value is clicked" → onMoveInClick prop
  - Map house rules click → onHouseRulesClick prop
  - Implement any additional custom logic

### Styling Migration

- [ ] **Choose styling approach**
  - Option A: Styled Components (more component-scoped)
  - Option B: Tailwind CSS (utility-first)

- [ ] **Replicate visual design**
  - Match background colors (#DFDFF6)
  - Match border styles (1px solid #68B6B)
  - Ensure responsive behavior
  - Test hover states and transitions

### Testing

- [ ] **Component Testing**
  - Test with valid proposal data
  - Test with null/undefined proposal
  - Test preview vs proposal mode
  - Test click handlers

- [ ] **Visual Testing**
  - Compare with original Bubble element
  - Test on mobile devices
  - Test in different browsers
  - Verify accessibility with screen readers

- [ ] **Integration Testing**
  - Test with real API data
  - Test error handling
  - Test loading states

---

## Troubleshooting

### Common Issues

#### Issue: Dates not formatting correctly

**Solution:**
```typescript
// Ensure dates are Date objects, not strings
const moveInDate = new Date(proposal.moveInDate);

// Use date-fns for consistent formatting
import { format } from 'date-fns';
const formatted = format(moveInDate, 'EEEE, MMMM d, yyyy');
```

#### Issue: Styled Components not rendering styles

**Solution:**
```typescript
// Ensure you have the babel plugin installed
npm install -D babel-plugin-styled-components

// Add to .babelrc or babel.config.js
{
  "plugins": ["babel-plugin-styled-components"]
}
```

#### Issue: Tailwind classes not applying

**Solution:**
```javascript
// Ensure component paths are in tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // ...
}
```

#### Issue: TypeScript errors with proposal prop

**Solution:**
```typescript
// Use optional chaining for safety
<Value>{proposal?.pricePerNight?.toFixed(2)}</Value>

// Or provide default values
<Value>{(proposal?.pricePerNight ?? 0).toFixed(2)}</Value>
```

### Performance Optimization

If the component renders slowly with large datasets:

```typescript
// Wrap component with React.memo
export const ReservationPriceBreakdown = React.memo<ReservationPriceBreakdownProps>(({
  proposal,
  mode,
  onMoveInClick,
  onHouseRulesClick
}) => {
  // ... component code
});

// Add comparison function if needed
export default React.memo(ReservationPriceBreakdown, (prevProps, nextProps) => {
  return prevProps.proposal?.id === nextProps.proposal?.id &&
         prevProps.mode === nextProps.mode;
});
```

### Accessibility Improvements

```typescript
// Add ARIA labels
<Value
  onClick={handleMoveInClick}
  clickable
  role="button"
  tabIndex={0}
  aria-label="Edit move-in date"
  onKeyPress={(e) => e.key === 'Enter' && handleMoveInClick()}
>
  {formattedMoveInDate}
</Value>
```

---

## Next Steps

### Recommended Enhancements

1. **Add Loading States**
   ```typescript
   {loading ? <SkeletonLoader /> : <ReservationPriceBreakdown />}
   ```

2. **Add Error Boundaries**
   ```typescript
   <ErrorBoundary fallback={<ErrorDisplay />}>
     <ReservationPriceBreakdown />
   </ErrorBoundary>
   ```

3. **Add Dark Mode Support**
   ```typescript
   // In styled components
   background-color: ${props => props.theme.mode === 'dark' ? '#2d3748' : '#DFDFF6'};
   ```

4. **Add Animations**
   ```bash
   npm install framer-motion
   ```
   ```typescript
   import { motion } from 'framer-motion';

   <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.3 }}
   >
     <ReservationPriceBreakdown />
   </motion.div>
   ```

5. **Add Storybook Documentation**
   ```bash
   npx storybook init
   ```

---

## Support & Resources

- **date-fns Documentation**: https://date-fns.org/
- **Styled Components**: https://styled-components.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **React TypeScript Cheatsheet**: https://react-typescript-cheatsheet.netlify.app/

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-21 | Initial conversion from Bubble.io |

---

**Component Converted By:** Claude Code
**Original Bubble Element:** ♻️💥reservation price breakdown
**Conversion Date:** October 21, 2025
