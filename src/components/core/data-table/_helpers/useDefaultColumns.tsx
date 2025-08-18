import type { ColumnDef } from '@tanstack/react-table';
import usePage from '@/hooks/usePage';

import TableCellAction from '../_components/cell-action';
import HoverCardWrapper from '@/components/ui/hover-card-wrapper';
import DateTime from '@/components/ui/date-time';

interface IDefaultColumns {
  isSSR?: boolean;
}

const useDefaultColumns = <TData, TValue>({
  isSSR,
}: IDefaultColumns): ColumnDef<TData, TValue>[] => {
  const { deleteAccess, updateAccess } = usePage();

  const columns: ColumnDef<TData, TValue>[] = [
    {
      accessorKey: 'remarks',
      header: 'Remarks',
      cell: (info) => (
        <HoverCardWrapper
          title={info.getValue<string>()}
          content={info.getValue<string>()}
        />
      ),
    },
    {
      accessorKey: 'created_by_name',
      header: 'Created By',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      enablePinning: false,
      cell: (info) => <DateTime date={info.getValue() as Date} />,
      filterFn: 'dateRange',
      meta: {
        filterVariant: 'dateRange',
      },
    },
    {
      accessorKey: 'updated_at',
      header: 'Updated At',
      enablePinning: false,
      cell: (info) => <DateTime date={info.getValue() as Date} />,
      meta: {
        filterVariant: 'dateRange',
      },
    },

    {
      id: 'actions',
      accessorKey: 'actions',
      header: () => <p className='text-center'>Actions</p>,
      enableColumnFilter: false,
      enableSorting: false,
      enableHiding: false,
      cell: (info) => <TableCellAction isSSR={isSSR} info={info} />,
      size: 60,
      meta: {
        hidden: !updateAccess && !deleteAccess,
        disableFullFilter: true,
      },
    },
  ];

  return columns;
};

export default useDefaultColumns;
