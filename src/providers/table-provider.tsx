import { createContext, useLayoutEffect, useMemo, useState } from 'react';

import type {
  ITableAdvanceFilter,
  ITableFacetedFilter,
  IToolbarOptions,
} from '@/types';
import type { RankingInfo } from '@tanstack/match-sorter-utils';
import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type RowData,
  type SortingState,
  type Table,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { max, min } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import DataTable from '@/components/core/data-table';
import { TableRowSelection } from '@/components/core/data-table/_components/row/selection';
import { dateRange } from '@/components/core/data-table/_helpers/dateRange';
import { fuzzyFilter } from '@/components/core/data-table/_helpers/fuzzyFilter';
import useDefaultColumns from '@/components/core/data-table/_helpers/useDefaultColumns';

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'dateRange';
    hidden?: boolean;
    disableFullFilter?: boolean;
  }

  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
    dateRange: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export interface ITableContext<TData> {
  title: string;
  subtitle?: string;
  clientRedirectUrl?: string;
  isEntry?: boolean;
  table: Table<TData>;
  isLoading?: boolean;
  handleCreate?: () => void;
  handleUpdate?: (row: Row<TData>) => void;
  handleDelete?: (row: Row<TData>) => void;
  handleRefetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  handleDeleteAll?: (rows: Row<TData>[]) => void;
  initialDateRange: [Date | string, Date | string];
  globalFilterValue?: string;
  facetedFilters?: ITableFacetedFilter[];
  advanceFilters?: ITableAdvanceFilter[];
  toolbarOptions?: 'none' | IToolbarOptions[];
  enableRowSelection?: boolean;
  enableDefaultColumns?: boolean;
  start_date?: Date | string;
  end_date?: Date | string;
  onUpdate?: ({ range }: { range: DateRange }) => void;
  onClear?: () => void;
  isClear?: boolean;
  otherToolBarComponents?: React.ReactNode;
}

export const TableContext = createContext({} as ITableContext<any>);

export interface ITableProviderProps<TData, TValue> {
  title: string;
  subtitle?: string;
  clientRedirectUrl?: string;
  isEntry?: boolean;
  children?: React.ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultSorting?: SortingState;
  isLoading?: boolean;
  enableRowSelection?: boolean;
  enableDefaultColumns?: boolean;
  handleCreate?: () => void;
  handleUpdate?: (row: Row<TData>) => void;
  handleDelete?: (row: Row<TData>) => void;
  handleRefetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  handleDeleteAll?: (rows: Row<TData>[]) => void;
  facetedFilters?: ITableFacetedFilter[];
  advanceFilters?: ITableAdvanceFilter[];
  toolbarOptions?: 'none' | IToolbarOptions[];
  defaultVisibleColumns?: VisibilityState;
  start_date?: Date | string;
  end_date?: Date | string;
  onUpdate?: ({ range }: { range: DateRange }) => void;
  onClear?: () => void;
  isClear?: boolean;
  otherToolBarComponents?: React.ReactNode;
}

function TableProvider<TData, TValue>({
  title,
  subtitle,
  clientRedirectUrl,
  isEntry = false,
  children,
  columns,
  data,
  defaultSorting = [{ id: 'created_at', desc: true }],
  isLoading,
  enableRowSelection = false,
  enableDefaultColumns = true,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleRefetch,
  handleDeleteAll,
  facetedFilters,
  advanceFilters,
  toolbarOptions = ['all'],
  defaultVisibleColumns = {},
  start_date,
  end_date,
  onUpdate,
  onClear,
  otherToolBarComponents,
  isClear,
}: ITableProviderProps<TData, TValue>) {
  const [isMounted, setIsMounted] = useState(false);

  // react table hook, and other codes...
  const tableData = useMemo(() => data, [data]);
  const tableColumns = useMemo(() => columns, [columns]);
  const defaultColumns = useDefaultColumns<TData, TValue>({ isSSR: false });
  const renderColumns = enableDefaultColumns
    ? tableColumns.concat(defaultColumns)
    : tableColumns;

  const visibleColumns = renderColumns.filter((column) => !column.meta?.hidden);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultVisibleColumns
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);

  const [globalFilter, setGlobalFilter] = useState('');

  // Fix error on react table, when the table is not mounted
  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  const table = useReactTable({
    data: tableData,
    columns: enableRowSelection
      ? [TableRowSelection<TData, TValue>(), ...visibleColumns]
      : visibleColumns,
    initialState: {
      columnPinning: { right: ['actions'] },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,

    filterFns: {
      dateRange: (row, columnId, value) => dateRange(row, columnId, value),
      fuzzy: fuzzyFilter,
    },

    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy',
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const allDates: Date[] = [];
  const createdColumn = table.getColumn('created_at');
  const uniqueCreatedValues = createdColumn?.getFacetedUniqueValues();

  uniqueCreatedValues?.forEach((key, value) => {
    allDates.push(new Date(value));
  });

  const minDate = min(allDates);
  const maxDate = max(allDates);

  const value = useMemo<ITableContext<TData>>(
    () => ({
      title,
      subtitle,
      clientRedirectUrl,
      isEntry,
      isLoading,
      table,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleRefetch,
      handleDeleteAll,
      initialDateRange: [minDate, maxDate],
      globalFilterValue: globalFilter,
      facetedFilters,
      advanceFilters,
      toolbarOptions: toolbarOptions.length > 0 ? toolbarOptions : ['all'],
      enableRowSelection,
      enableDefaultColumns,
      start_date,
      end_date,
      onUpdate,
      onClear,
      isClear,
      otherToolBarComponents,
    }),
    [
      title,
      subtitle,
      clientRedirectUrl,
      isEntry,
      isLoading,
      table,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleRefetch,
      handleDeleteAll,
      minDate,
      maxDate,
      globalFilter,
      facetedFilters,
      advanceFilters,
      toolbarOptions,
      enableRowSelection,
      enableDefaultColumns,
      start_date,
      end_date,
      onUpdate,
      onClear,
      isClear,
      otherToolBarComponents,
    ]
  );

  // Fix error on react table, when the table is not mounted
  if (!isMounted) return null;

  return (
    <TableContext.Provider value={value}>
      <DataTable />
      {children}
    </TableContext.Provider>
  );
}

export default TableProvider;
