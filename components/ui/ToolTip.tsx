import React from 'react';

import { Tooltip as ShadCnTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltipPorvider';

export const ToolTip = ({ children, content }: { children: React.ReactNode; content: React.ReactNode | string }) => (
  <TooltipProvider delayDuration={30}>
    <ShadCnTooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </ShadCnTooltip>
  </TooltipProvider>
);
