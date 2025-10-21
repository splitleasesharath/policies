/**
 * Reservation Price Breakdown Component - Tailwind CSS Version
 * Converted from Bubble.io reusable element: ♻️💥reservation price breakdown
 *
 * This is an alternative implementation using Tailwind CSS instead of styled-components.
 * Use this version if your project uses Tailwind CSS.
 */

import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import {
  ReservationPriceBreakdownProps,
  ReservationPriceBreakdownState
} from '../../types/proposal';

export const ReservationPriceBreakdownTailwind: React.FC<ReservationPriceBreakdownProps> = ({
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

  if (!proposal && !isPreviewMode) {
    return null; // Don't render if no data in proposal mode
  }

  return (
    <div className="bg-[#DFDFF6] border border-[#68B6B] rounded-sm p-5 w-full min-h-[100px] max-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-3 border-b-2 border-gray-300">
        Proposal Details
      </h2>

      {/* Date Information Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Move-in</div>
          <div
            className="flex-1 text-sm text-blue-700 sm:text-right cursor-pointer underline hover:text-blue-900 transition-colors"
            onClick={handleMoveInClick}
          >
            {formattedMoveInDate}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Check-in</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            {checkInDayShort}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Check-out</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            {checkOutDayShort}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 hover:bg-white/30 transition-colors gap-2 sm:gap-4">
          <div className="flex-1 text-sm font-medium text-gray-600">Reservation Length</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            {proposal?.reservationLength} days
          </div>
        </div>
      </div>

      {/* House Rules Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 hover:bg-white/30 transition-colors gap-2 sm:gap-4">
          <div className="flex-1 text-sm font-medium text-gray-600">Your House Rules</div>
          <div
            className="flex-1 text-sm text-blue-700 sm:text-right cursor-pointer underline hover:text-blue-900 transition-colors"
            onClick={handleHouseRulesClick}
          >
            (click to see)
          </div>
        </div>
      </div>

      {/* Pricing Details Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Weekly Pattern</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            {proposal?.weeklyPattern}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Actual Weeks Used</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            {proposal?.actualWeeksUsed}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Compensation /night</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            ${proposal?.compensationPerNight?.toFixed(2)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Price per night</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            ${proposal?.pricePerNight?.toFixed(2)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Nights reserved</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            {proposal?.nightsReserved}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Total Compensation</div>
          <div className="flex-1 text-base font-semibold text-gray-900 sm:text-right">
            ${proposal?.totalCompensation?.toFixed(2)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 hover:bg-white/30 transition-colors gap-2 sm:gap-4">
          <div className="flex-1 text-sm font-medium text-gray-600">
            Total Price
            <span className="block text-xs italic text-gray-500 mt-1">
              (excluding Damage Deposit & Maintenance Fee)
            </span>
          </div>
          <div className="flex-1 text-base font-semibold text-gray-900 sm:text-right">
            ${proposal?.totalPrice?.toFixed(2)}
          </div>
        </div>
      </div>

      {/* 4-Week Breakdown Section */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Compensation / 4 weeks</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            ${proposal?.compensationPer4Weeks?.toFixed(2)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Price per 4 weeks</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            ${proposal?.pricePer4Weeks?.toFixed(2)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 border-b border-dotted border-gray-200 gap-2 sm:gap-4 hover:bg-white/30 transition-colors">
          <div className="flex-1 text-sm font-medium text-gray-600">Refundable Damage Deposit*</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            ${proposal?.damageDeposit?.toFixed(2)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start py-2.5 hover:bg-white/30 transition-colors gap-2 sm:gap-4">
          <div className="flex-1 text-sm font-medium text-gray-600">Maintenance Fee*</div>
          <div className="flex-1 text-sm text-blue-800 sm:text-right">
            ${proposal?.maintenanceFee?.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="text-xs italic text-gray-500 text-center sm:text-center pt-3 border-t border-gray-300">
        *Refundable Damage Deposit is held with Split Lease
      </div>
    </div>
  );
};

export default ReservationPriceBreakdownTailwind;
