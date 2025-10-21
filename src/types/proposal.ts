/**
 * Type Definitions for Reservation Price Breakdown Component
 * Converted from Bubble.io custom data types
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  // Add other user properties as needed
}

export interface Proposal {
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

export enum RentalType {
  MONTHLY = 'monthly',
  WEEKLY = 'weekly',
  NIGHTLY = 'nightly'
}

export enum WeeklySelectionOption {
  OPTION_1 = 'option_1',
  OPTION_2 = 'option_2',
  OPTION_3 = 'option_3'
}

export interface ReservationPriceBreakdownProps {
  /** The proposal data to display */
  proposal?: Proposal;
  /** Display mode: 'preview' for showing placeholder/demo data, 'proposal' for actual data */
  mode?: 'preview' | 'proposal';
  /** Callback when move-in date is clicked */
  onMoveInClick?: () => void;
  /** Callback when house rules link is clicked */
  onHouseRulesClick?: () => void;
}

/**
 * Internal state management for the component
 * Maps to Bubble's custom states
 */
export interface ReservationPriceBreakdownState {
  rentalType: RentalType | null;
  weeklySelectionOption: WeeklySelectionOption | null;
  output4Weeks: number | null;
  pricePerNight: number | null;
  pricePerFourWeeks: number | null;
  totalPriceForReservation: number | null;
  userWatching: User | null;
}
