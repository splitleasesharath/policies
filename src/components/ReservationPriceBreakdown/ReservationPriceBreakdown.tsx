/**
 * Reservation Price Breakdown Component
 * Converted from Bubble.io reusable element: ♻️💥reservation price breakdown
 *
 * This component displays a detailed breakdown of reservation pricing,
 * including dates, compensation details, and fees.
 */

import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import {
  ReservationPriceBreakdownProps,
  ReservationPriceBreakdownState
} from '../../types/proposal';
import {
  Container,
  Header,
  Section,
  Row,
  Label,
  Value,
  FooterNote
} from './ReservationPriceBreakdown.styles';

export const ReservationPriceBreakdown: React.FC<ReservationPriceBreakdownProps> = ({
  proposal,
  mode = 'proposal',
  onMoveInClick,
  onHouseRulesClick
}) => {
  // Internal state management (mirrors Bubble custom states)
  const [state, setState] = useState<ReservationPriceBreakdownState>({
    rentalType: null,
    weeklySelectionOption: null,
    output4Weeks: null,
    pricePerNight: null,
    pricePerFourWeeks: null,
    totalPriceForReservation: null,
    userWatching: null
  });

  // Computed values (mirrors Bubble's dynamic expressions)
  const formattedMoveInDate = useMemo(() => {
    if (!proposal?.moveInDate) return '';
    return format(new Date(proposal.moveInDate), 'EEEE, MMMM d, yyyy');
  }, [proposal?.moveInDate]);

  const checkInDayShort = useMemo(() => {
    if (!proposal?.checkInDay) return '';
    return proposal.checkInDay.substring(0, 3);
  }, [proposal?.checkInDay]);

  const checkOutDayShort = useMemo(() => {
    if (!proposal?.checkOutDay) return '';
    return proposal.checkOutDay.substring(0, 3);
  }, [proposal?.checkOutDay]);

  // Show/hide logic based on mode
  const isPreviewMode = mode === 'preview';
  const hasProposal = Boolean(proposal);

  // Handlers
  const handleMoveInClick = () => {
    if (onMoveInClick) {
      onMoveInClick();
    }
  };

  const handleHouseRulesClick = () => {
    if (onHouseRulesClick) {
      onHouseRulesClick();
    }
  };

  // State updaters (mirrors Bubble's custom state updates)
  const updatePricePerNight = (value: number) => {
    setState(prev => ({ ...prev, pricePerNight: value }));
  };

  const updateTotalPrice = (value: number) => {
    setState(prev => ({ ...prev, totalPriceForReservation: value }));
  };

  if (!proposal && !isPreviewMode) {
    return null; // Don't render if no data in proposal mode
  }

  return (
    <Container>
      <Header>Proposal Details</Header>

      {/* Date Information Section */}
      <Section>
        <Row>
          <Label>Move-in</Label>
          <Value onClick={handleMoveInClick} clickable>
            {formattedMoveInDate}
          </Value>
        </Row>

        <Row>
          <Label>Check-in</Label>
          <Value>{checkInDayShort}</Value>
        </Row>

        <Row>
          <Label>Check-out</Label>
          <Value>{checkOutDayShort}</Value>
        </Row>

        <Row>
          <Label>Reservation Length</Label>
          <Value>{proposal?.reservationLength} days</Value>
        </Row>
      </Section>

      {/* House Rules Section */}
      <Section>
        <Row>
          <Label>Your House Rules</Label>
          <Value onClick={handleHouseRulesClick} clickable>
            (click to see)
          </Value>
        </Row>
      </Section>

      {/* Pricing Details Section */}
      <Section>
        <Row>
          <Label>Weekly Pattern</Label>
          <Value>{proposal?.weeklyPattern}</Value>
        </Row>

        <Row>
          <Label>Actual Weeks Used</Label>
          <Value>{proposal?.actualWeeksUsed}</Value>
        </Row>

        <Row>
          <Label>Compensation /night</Label>
          <Value>${proposal?.compensationPerNight?.toFixed(2)}</Value>
        </Row>

        <Row>
          <Label>Price per night</Label>
          <Value>${proposal?.pricePerNight?.toFixed(2)}</Value>
        </Row>

        <Row>
          <Label>Nights reserved</Label>
          <Value>{proposal?.nightsReserved}</Value>
        </Row>

        <Row>
          <Label>Total Compensation</Label>
          <Value highlighted>
            ${proposal?.totalCompensation?.toFixed(2)}
          </Value>
        </Row>

        <Row>
          <Label>
            Total Price<br />
            <small>(excluding Damage Deposit & Maintenance Fee)</small>
          </Label>
          <Value highlighted>
            ${proposal?.totalPrice?.toFixed(2)}
          </Value>
        </Row>
      </Section>

      {/* 4-Week Breakdown Section */}
      <Section>
        <Row>
          <Label>Compensation / 4 weeks</Label>
          <Value>${proposal?.compensationPer4Weeks?.toFixed(2)}</Value>
        </Row>

        <Row>
          <Label>Price per 4 weeks</Label>
          <Value>${proposal?.pricePer4Weeks?.toFixed(2)}</Value>
        </Row>

        <Row>
          <Label>Refundable Damage Deposit*</Label>
          <Value>${proposal?.damageDeposit?.toFixed(2)}</Value>
        </Row>

        <Row>
          <Label>Maintenance Fee*</Label>
          <Value>${proposal?.maintenanceFee?.toFixed(2)}</Value>
        </Row>
      </Section>

      <FooterNote>
        *Refundable Damage Deposit is held with Split Lease
      </FooterNote>
    </Container>
  );
};

export default ReservationPriceBreakdown;
