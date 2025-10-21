import React, { useState } from 'react';
import { ReservationPriceBreakdown } from './components/ReservationPriceBreakdown/ReservationPriceBreakdown';
import { Proposal } from './types/proposal';
import './App.css';

// Sample proposal data for demonstration
const sampleProposal: Proposal = {
  id: 'proposal-demo-001',
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
  houseRules: 'No smoking\nNo pets allowed\nQuiet hours: 10 PM - 8 AM\nMaximum 4 guests\nClean up after yourself',
  host: {
    id: 'host-123',
    name: 'John Doe',
    email: 'john.doe@example.com'
  }
};

// Alternative proposal for testing
const winterProposal: Proposal = {
  id: 'proposal-demo-002',
  moveInDate: new Date('2025-12-15'),
  checkInDay: 'Monday',
  checkOutDay: 'Sunday',
  reservationLength: 56,
  weeklyPattern: 'Sun-Wed',
  actualWeeksUsed: 8,
  compensationPerNight: 52.00,
  pricePerNight: 95.00,
  nightsReserved: 32,
  totalCompensation: 1664.00,
  totalPrice: 3040.00,
  compensationPer4Weeks: 832.00,
  pricePer4Weeks: 1520.00,
  damageDeposit: 750.00,
  maintenanceFee: 200.00,
  houseRules: 'No smoking\nPets allowed with $50 fee\nQuiet hours: 9 PM - 7 AM\nWeekly cleaning included',
  host: {
    id: 'host-456',
    name: 'Jane Smith',
    email: 'jane.smith@example.com'
  },
  cleaningFee: 75.00
};

function App() {
  const [currentProposal, setCurrentProposal] = useState<Proposal>(sampleProposal);
  const [showHouseRules, setShowHouseRules] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState('proposal-demo-001');

  const handleMoveInClick = () => {
    alert(`Move-in date: ${currentProposal.moveInDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}`);
  };

  const handleHouseRulesClick = () => {
    setShowHouseRules(true);
  };

  const handleProposalSwitch = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    setCurrentProposal(proposalId === 'proposal-demo-001' ? sampleProposal : winterProposal);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏠 Reservation Price Breakdown Demo</h1>
        <p className="subtitle">
          Interactive preview of the React component converted from Bubble.io
        </p>
      </header>

      <div className="container">
        {/* Proposal Selector */}
        <div className="proposal-selector">
          <h3>Select a Proposal to Preview:</h3>
          <div className="button-group">
            <button
              className={`selector-btn ${selectedProposalId === 'proposal-demo-001' ? 'active' : ''}`}
              onClick={() => handleProposalSwitch('proposal-demo-001')}
            >
              📅 Fall Reservation (28 days)
            </button>
            <button
              className={`selector-btn ${selectedProposalId === 'proposal-demo-002' ? 'active' : ''}`}
              onClick={() => handleProposalSwitch('proposal-demo-002')}
            >
              ❄️ Winter Reservation (56 days)
            </button>
          </div>
        </div>

        {/* Component Demo */}
        <div className="component-wrapper">
          <ReservationPriceBreakdown
            proposal={currentProposal}
            mode="proposal"
            onMoveInClick={handleMoveInClick}
            onHouseRulesClick={handleHouseRulesClick}
          />
        </div>

        {/* Feature Highlights */}
        <div className="features">
          <h3>✨ Component Features</h3>
          <div className="feature-grid">
            <div className="feature-card">
              <span className="feature-icon">📱</span>
              <h4>Responsive Design</h4>
              <p>Works perfectly on all screen sizes</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🎨</span>
              <h4>Styled Components</h4>
              <p>Modern CSS-in-JS approach</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h4>TypeScript</h4>
              <p>Full type safety and IntelliSense</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔄</span>
              <h4>React Hooks</h4>
              <p>Modern React patterns (useState, useMemo)</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="instructions">
          <h3>🎯 Try These Interactions</h3>
          <ul>
            <li>Click on the <strong>Move-in date</strong> to see the formatted date</li>
            <li>Click on <strong>"(click to see)"</strong> next to House Rules to view them</li>
            <li>Switch between different proposals using the buttons above</li>
            <li>Resize your browser window to see the responsive design</li>
          </ul>
        </div>
      </div>

      {/* House Rules Modal */}
      {showHouseRules && (
        <div className="modal-overlay" onClick={() => setShowHouseRules(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📋 House Rules</h2>
              <button
                className="close-button"
                onClick={() => setShowHouseRules(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <pre className="house-rules-text">{currentProposal.houseRules}</pre>
            </div>
            <div className="modal-footer">
              <button
                className="primary-button"
                onClick={() => setShowHouseRules(false)}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>
          Converted from Bubble.io element: <strong>♻️💥reservation price breakdown</strong>
        </p>
        <p>
          <a
            href="https://github.com/splitleasesharath/reservation-price-breakdown"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
