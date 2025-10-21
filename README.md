# Reservation Price Breakdown Component

A modern React component converted from Bubble.io's **♻️💥reservation price breakdown** reusable element.

## 🚀 Quick Start

```typescript
import { ReservationPriceBreakdown } from './components/ReservationPriceBreakdown';

function App() {
  return (
    <ReservationPriceBreakdown
      proposal={proposalData}
      mode="proposal"
      onMoveInClick={() => console.log('Edit date')}
      onHouseRulesClick={() => console.log('View rules')}
    />
  );
}
```

## 📁 Project Structure

```
SL16/
├── components/
│   └── ReservationPriceBreakdown/
│       ├── ReservationPriceBreakdown.tsx          # Main component (Styled Components)
│       ├── ReservationPriceBreakdown.styles.ts    # Styled Components styles
│       ├── ReservationPriceBreakdown.tailwind.tsx # Tailwind CSS alternative
│       └── index.ts                                # Barrel exports
├── types/
│   └── proposal.ts                                 # TypeScript type definitions
├── examples/
│   └── ProposalPage.tsx                           # Usage examples
├── docs/
│   └── CONVERSION_GUIDE.md                        # Comprehensive conversion guide
└── README.md                                       # This file
```

## ✨ Features

- ✅ **Full TypeScript Support** - Comprehensive type definitions
- ✅ **Two Styling Options** - Choose between Styled Components or Tailwind CSS
- ✅ **Responsive Design** - Mobile-first, works on all screen sizes
- ✅ **Accessible** - WCAG 2.1 AA compliant
- ✅ **Modern React** - Built with hooks (useState, useMemo)
- ✅ **Date Formatting** - Uses date-fns for reliable date handling
- ✅ **Customizable** - Easy to extend and customize

## 📦 Installation

### 1. Install Dependencies

```bash
# Required
npm install react react-dom date-fns

# For Styled Components version
npm install styled-components
npm install -D @types/styled-components

# For Tailwind CSS version (if not already installed)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Copy Files

Copy the component files to your project:

```bash
cp -r components/ReservationPriceBreakdown src/components/
cp types/proposal.ts src/types/
```

### 3. Import and Use

```typescript
// Using Styled Components version
import { ReservationPriceBreakdown } from '@/components/ReservationPriceBreakdown';

// OR using Tailwind CSS version
import { ReservationPriceBreakdownTailwind } from '@/components/ReservationPriceBreakdown';
```

## 🎯 Usage Examples

### Basic Example

```typescript
import React from 'react';
import { ReservationPriceBreakdown } from './components/ReservationPriceBreakdown';
import { Proposal } from './types/proposal';

const MyComponent = () => {
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
      onMoveInClick={() => alert('Edit move-in date')}
      onHouseRulesClick={() => alert('View house rules')}
    />
  );
};
```

### With API Data

```typescript
import { useState, useEffect } from 'react';
import { ReservationPriceBreakdown } from './components/ReservationPriceBreakdown';
import { Proposal } from './types/proposal';

const ProposalPage = ({ proposalId }: { proposalId: string }) => {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/proposals/${proposalId}`)
      .then(res => res.json())
      .then(data => {
        setProposal(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load proposal:', err);
        setLoading(false);
      });
  }, [proposalId]);

  if (loading) return <div>Loading...</div>;
  if (!proposal) return <div>Proposal not found</div>;

  return (
    <ReservationPriceBreakdown
      proposal={proposal}
      onMoveInClick={() => {/* handle click */}}
      onHouseRulesClick={() => {/* handle click */}}
    />
  );
};
```

### Preview Mode

```typescript
<ReservationPriceBreakdown
  mode="preview"
  onMoveInClick={() => console.log('Configure move-in date')}
  onHouseRulesClick={() => console.log('Set house rules')}
/>
```

## 🔧 Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `proposal` | `Proposal \| undefined` | `undefined` | The proposal data to display |
| `mode` | `'preview' \| 'proposal'` | `'proposal'` | Display mode |
| `onMoveInClick` | `() => void` | `undefined` | Callback when move-in date is clicked |
| `onHouseRulesClick` | `() => void` | `undefined` | Callback when house rules link is clicked |

### Proposal Interface

```typescript
interface Proposal {
  id: string;
  moveInDate: Date;
  checkInDay: string;
  checkOutDay: string;
  reservationLength: number;
  weeklyPattern: string;
  actualWeeksUsed: number;
  compensationPerNight: number;
  pricePerNight: number;
  nightsReserved: number;
  totalCompensation: number;
  totalPrice: number;
  compensationPer4Weeks: number;
  pricePer4Weeks: number;
  damageDeposit: number;
  maintenanceFee: number;
  houseRules?: string;
  host: User;
  cleaningFee?: number;
}
```

## 🎨 Customization

### Styling with Styled Components

Edit `ReservationPriceBreakdown.styles.ts` to customize the appearance:

```typescript
export const Container = styled.div`
  background-color: #DFDFF6; // Change background color
  border: 1px solid #68B6B;  // Change border
  border-radius: 3px;         // Change border radius
  // ... more styles
`;
```

### Styling with Tailwind CSS

Use the Tailwind version and modify classes directly in the component:

```typescript
<div className="bg-purple-100 border border-blue-300 rounded-lg p-6">
  {/* Component content */}
</div>
```

### Adding Dark Mode

```typescript
// In styled components
background-color: ${props => props.theme.mode === 'dark' ? '#2d3748' : '#DFDFF6'};

// Or in Tailwind
<div className="bg-purple-100 dark:bg-gray-800">
```

## 📚 Documentation

For detailed conversion documentation and migration guide, see:
- **[CONVERSION_GUIDE.md](./docs/CONVERSION_GUIDE.md)** - Comprehensive guide for converting from Bubble.io

## 🧪 Testing

### Component Tests

```bash
# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test
```

Example test:

```typescript
import { render, screen } from '@testing-library/react';
import { ReservationPriceBreakdown } from './ReservationPriceBreakdown';

test('renders proposal details', () => {
  const proposal = { /* ... proposal data */ };

  render(<ReservationPriceBreakdown proposal={proposal} />);

  expect(screen.getByText('Proposal Details')).toBeInTheDocument();
  expect(screen.getByText(/Move-in/i)).toBeInTheDocument();
});
```

## 🐛 Troubleshooting

### Date Formatting Issues

Ensure dates are Date objects:
```typescript
const moveInDate = new Date(proposal.moveInDate);
```

### Styled Components Not Working

Install babel plugin:
```bash
npm install -D babel-plugin-styled-components
```

### Tailwind Classes Not Applying

Update `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
}
```

## 📝 Migration from Bubble.io

### Key Differences

| Bubble | React |
|--------|-------|
| Custom States | useState hooks |
| Dynamic Expressions | useMemo hooks |
| Workflows | Event handlers |
| Data Types | TypeScript interfaces |

### Migration Steps

1. ✅ Map Bubble data types to TypeScript interfaces
2. ✅ Convert custom states to React state
3. ✅ Transform dynamic expressions to computed values
4. ✅ Implement event handlers for workflows
5. ✅ Replicate visual styling
6. ✅ Test with real data

See [CONVERSION_GUIDE.md](./docs/CONVERSION_GUIDE.md) for detailed instructions.

## 🚀 Future Enhancements

- [ ] Add loading skeleton states
- [ ] Implement error boundaries
- [ ] Add dark mode support
- [ ] Add animation with Framer Motion
- [ ] Create Storybook documentation
- [ ] Add comprehensive test coverage
- [ ] Internationalization (i18n) support
- [ ] Print-friendly styling

## 📄 License

This component is part of the Split Lease project.

## 🤝 Contributing

Contributions are welcome! Please ensure:
- TypeScript types are properly defined
- Component is tested
- Documentation is updated
- Code follows project conventions

## 📞 Support

For issues or questions:
- Check the [CONVERSION_GUIDE.md](./docs/CONVERSION_GUIDE.md)
- Review the [examples](./examples/)
- Open an issue in the project repository

---

**Converted from Bubble.io:** ♻️💥reservation price breakdown
**Conversion Date:** October 21, 2025
**React Version:** 18+
**TypeScript Version:** 5+
