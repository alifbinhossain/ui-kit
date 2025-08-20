import { useState } from 'react';

import type { IResponse } from '@/types';
import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import TooltipWrapper from '@/components/ui/tooltip-wrapper';

import { cn } from '@/lib/utils';

interface TableRefreshProps {
  handleRefetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IResponse<unknown>, Error>>;
  isSmallScreen?: boolean;
}
const TableRefresh: React.FC<TableRefreshProps> = ({
  handleRefetch,
  isSmallScreen,
}) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleClick = async () => {
    setIsFetching(true);

    try {
      const result = await handleRefetch();

      if (result.error?.message) {
        throw new Error(result.error?.message);
      }
      toast.success('Data refreshed successfully');
    } catch (error: any) {
      toast.error(error?.message as string);
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <TooltipWrapper message='Refresh data'>
      <Button
        aria-label='Refresh Data'
        disabled={isFetching}
        variant={'gradient'}
        size={isSmallScreen ? 'icon' : 'sm'}
        onClick={handleClick}
      >
        <RefreshCw className={cn('size-4', isFetching && 'animate-spin')} />

        <span className='hidden lg:inline'>Refresh</span>
      </Button>
    </TooltipWrapper>
  );
};

export default TableRefresh;
