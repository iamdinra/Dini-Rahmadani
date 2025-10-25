import React from 'react';
import { UniformStatus, AssessmentStatus, FeeStatus, PaymentStatus } from '../types';

type BadgeStatus = UniformStatus | AssessmentStatus | FeeStatus | PaymentStatus;
type BadgeType = 'uniform' | 'assessment' | 'fee' | 'payment';

interface StatusBadgeProps {
  status: BadgeStatus;
  type: BadgeType;
}

const getBadgeStyle = (status: BadgeStatus, type: BadgeType): string => {
  let baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const colorMapping: { [key: string]: { [key: string]: string } } = {
    uniform: {
      [UniformStatus.DONE]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      [UniformStatus.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    },
    assessment: {
      [AssessmentStatus.REQUIRED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      [AssessmentStatus.NOT_REQUIRED]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    },
    fee: {
      [FeeStatus.APPROVED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      [FeeStatus.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    },
    payment: {
      [PaymentStatus.FULL]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      [PaymentStatus.BOOKING_FEE]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      [PaymentStatus.PENDING]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    },
  };

  return `${baseStyle} ${colorMapping[type]?.[status] || 'bg-gray-100 text-gray-800'}`;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type }) => {
  return (
    <span className={getBadgeStyle(status, type)}>
      {status}
    </span>
  );
};

export default StatusBadge;
