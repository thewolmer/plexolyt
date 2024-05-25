import React from 'react';

import { Badge } from '@/components/ui/badge';

export const OrderStatusBadge = ({ order_status }: { order_status: string }) => {
  switch (order_status) {
    case 'PENDING':
      return (
        <Badge variant="secondary" className="bg-gray-500/50">
          PENDING
        </Badge>
      );
    case 'CONFIRMED':
      return (
        <Badge variant="secondary" className="bg-green-500/50">
          CONFIRMED
        </Badge>
      );
    case 'PREPARING':
      return (
        <Badge variant="secondary" className="bg-yellow-500/50">
          PREPARING
        </Badge>
      );
    case 'SHIPPED':
      return (
        <Badge variant="secondary" className="bg-yellow-500/50">
          SHIPPED
        </Badge>
      );
    case 'DELIVERED':
      return (
        <Badge variant="secondary" className="bg-green-500/50">
          DELIVERED
        </Badge>
      );
    case 'CANCELLED':
      return (
        <Badge variant="secondary" className="bg-destructive/50">
          CANCELLED
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="bg-gray-400/50">
          UNKNOWN
        </Badge>
      );
  }
};
