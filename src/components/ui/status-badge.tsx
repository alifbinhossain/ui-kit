import React from 'react';

import { type IStatus } from '@/types';

import { Badge } from './badge';

const StatusBadge: React.FC<{ status: IStatus }> = ({ status }) => {
  return (
    <Badge
      className='py-0.5 font-medium capitalize'
      variant={
        status === 'approved'
          ? 'success'
          : status === 'pending'
            ? 'warning'
            : 'destructive'
      }
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
