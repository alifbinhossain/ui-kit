import React, { useCallback } from 'react';

import type { IToolbarOptions } from '@/types';
import { useMediaQuery } from '@uidotdev/usehooks';
import { isValid } from 'date-fns';
import {
  ChevronDown,
  CirclePlus,
  Filter as Funnel,
  SearchIcon,
  X,
} from 'lucide-react';

import usePage from '@/hooks/usePage';
import useTable from '@/hooks/useTable';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import DebouncedInput from '@/components/ui/debounce-input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import TableDateRange from './date-range';
import TableExportCSV from './export-csv';
import TableAllFilter from './filter';
import TableAdvanceFilters from './filter/advance';
import { TableFacetedFilter } from './filter/faceted';
import TableRefresh from './refresh';
import { TableRowDelete } from './row/delete';
import TableTitle from './title';
import { TableViewOptions } from './view-options';

// Interface for ToolbarComponent props
interface ToolbarComponentProps {
  option: IToolbarOptions;
  render: () => React.ReactNode;
}

/**
 * ToolbarComponent - Renders a toolbar item based on the provided option
 * @param option - The toolbar option to check
 * @param render - Function to render the toolbar item
 */
export const ToolbarComponent: React.FC<ToolbarComponentProps> = React.memo(
  ({ option, render }) => {
    const { toolbarOptions } = useTable();

    if (toolbarOptions?.includes(option) || toolbarOptions?.includes('all')) {
      return render();
    }
    return null;
  }
);

ToolbarComponent.displayName = 'ToolbarComponent';

/**
 * TableToolbar - Main component for rendering the table toolbar
 */
export function TableToolbar() {
  const { createAccess } = usePage();
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');

  const {
    title,
    subtitle,
    table,
    toolbarOptions,
    handleCreate,
    handleRefetch,
    globalFilterValue,
    facetedFilters,
    advanceFilters,
    isEntry,
    start_date,
    end_date,
    onUpdate,
    onClear,
    isClear,
    initialDateRange,
    otherToolBarComponents,
  } = useTable();

  const column = table.getColumn('created_at');
  const columnFilterValue = column?.getFilterValue() as [Date, Date];

  const startDate = start_date || columnFilterValue?.[0] || initialDateRange[0];
  const endDate = end_date || columnFilterValue?.[1] || initialDateRange[1];

  const isFiltered = table.getState().columnFilters.length > 0;

  // Memoize the callback for resetting column filters
  const resetColumnFilters = useCallback(
    () => table.resetColumnFilters(),
    [table]
  );

  // Memoize the callback for setting global filter
  const setGlobalFilter = useCallback(
    (value: string | number) => table.setGlobalFilter(value),
    [table]
  );

  // Check if the date range is valid
  const validDateRange = isValid(startDate) && isValid(endDate);

  /**
   * Renders the left section of the toolbar
   */
  const renderLeftSection = useCallback(
    () =>
      isSmallDevice ? (
        <div className='flex flex-1 items-center gap-2'>
          <ToolbarComponent
            option='all-filter'
            render={() =>
              table.getAllColumns().filter((column) => column.getCanFilter())
                .length > 0 && <TableAllFilter />
            }
          />

          {isFiltered && (
            <Button
              aria-label='Reset filters'
              variant='outline-destructive'
              onClick={resetColumnFilters}
              size={'icon'}
            >
              <X className='size-4' />
            </Button>
          )}

          <Popover>
            <PopoverTrigger>
              <Button aria-label='More options' variant='gradient' size='icon'>
                <ChevronDown className='size-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-2'>
              <ToolbarComponent
                option='date-range'
                render={() =>
                  validDateRange && (
                    <TableDateRange
                      table={table}
                      start_date={startDate}
                      end_date={endDate}
                      onUpdate={onUpdate}
                      onClear={onClear}
                      isClear={isClear}
                    />
                  )
                }
              />
              <ToolbarComponent
                option='view'
                render={() => (
                  <TableViewOptions className='w-full' table={table} />
                )}
              />

              {otherToolBarComponents}
              <ToolbarComponent
                option='faceted-filter'
                render={() =>
                  facetedFilters?.map((filter) => {
                    const column = table.getColumn(filter.id);
                    return column ? (
                      <TableFacetedFilter
                        key={filter.id}
                        column={column}
                        title={filter.title}
                        options={filter.options}
                      />
                    ) : null;
                  })
                }
              />
              <ToolbarComponent
                option='advance-filter'
                render={() =>
                  advanceFilters && advanceFilters?.length > 0 ? (
                    <TableAdvanceFilters filters={advanceFilters} />
                  ) : null
                }
              />
            </PopoverContent>
          </Popover>

          {validDateRange && (
            <Separator orientation='vertical' className='h-6' />
          )}
          <ToolbarComponent
            option='export-csv'
            render={() =>
              validDateRange && (
                <TableExportCSV
                  table={table}
                  title={title}
                  isEntry={isEntry}
                  start_date={startDate}
                  end_date={endDate}
                />
              )
            }
          />
        </div>
      ) : (
        <div className='flex flex-1 items-center gap-2'>
          <ToolbarComponent
            option='all-filter'
            render={() =>
              table.getAllColumns().filter((column) => column.getCanFilter())
                .length > 0 && <TableAllFilter />
            }
          />
          <ToolbarComponent
            option='view'
            render={() => <TableViewOptions table={table} />}
          />
          <ToolbarComponent
            option='date-range'
            render={() =>
              validDateRange && (
                <TableDateRange
                  table={table}
                  start_date={startDate}
                  end_date={endDate}
                  onUpdate={onUpdate}
                  onClear={onClear}
                  isClear={isClear}
                />
              )
            }
          />
          {otherToolBarComponents}
          <ToolbarComponent
            option='faceted-filter'
            render={() =>
              facetedFilters?.map((filter) => {
                const column = table.getColumn(filter.id);
                return column ? (
                  <TableFacetedFilter
                    key={filter.id}
                    column={column}
                    title={filter.title}
                    options={filter.options}
                  />
                ) : null;
              })
            }
          />
          <ToolbarComponent
            option='advance-filter'
            render={() =>
              advanceFilters && advanceFilters?.length > 0 ? (
                <TableAdvanceFilters filters={advanceFilters} />
              ) : null
            }
          />
          {isFiltered && (
            <Button
              aria-label='Reset filters'
              variant='outline-destructive'
              onClick={resetColumnFilters}
              className='h-8'
            >
              Reset
              <X className='size-4' />
            </Button>
          )}
          {validDateRange && (
            <Separator orientation='vertical' className='h-6' />
          )}

          <ToolbarComponent
            option='export-csv'
            render={() =>
              validDateRange && (
                <TableExportCSV
                  table={table}
                  title={title}
                  isEntry={isEntry}
                  start_date={startDate}
                  end_date={endDate}
                />
              )
            }
          />
        </div>
      ),

    [
      table,
      facetedFilters,
      advanceFilters,
      isFiltered,
      resetColumnFilters,
      onUpdate,
      startDate,
      endDate,
      onClear,
      isClear,
      isEntry,
      title,
      otherToolBarComponents,
      isSmallDevice,
      validDateRange,
    ]
  );

  /**
   * Renders the right section of the toolbar
   */
  const renderRightSection = useCallback(
    () => (
      <div className='flex gap-2 lg:gap-4'>
        <TableRowDelete />
        <ToolbarComponent
          option='refresh'
          render={() =>
            handleRefetch && <TableRefresh handleRefetch={handleRefetch} />
          }
        />
        {handleCreate && (
          <ToolbarComponent
            option='new-entry'
            render={() =>
              createAccess && (
                <Button
                  aria-label='Create new entry'
                  onClick={handleCreate}
                  variant='accent'
                  size='sm'
                >
                  <CirclePlus className='size-4' />
                  New
                </Button>
              )
            }
          />
        )}
      </div>
    ),
    [handleRefetch, createAccess, handleCreate]
  );

  if (isEntry) {
    return (
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem
          value='item-1'
          className='rounded-t-md bg-gradient-to-r from-secondary to-primary'
        >
          <AccordionTrigger
            Icon={Funnel}
            iconClassName='size-5'
            className='border-b border-border/20 px-4 py-2 text-lg font-semibold capitalize leading-none text-primary-foreground md:text-xl [&[data-state=open]>svg]:rotate-0'
          >
            {title}
          </AccordionTrigger>
          <AccordionContent className='flex items-center justify-between gap-4 px-4 py-2.5'>
            {toolbarOptions === 'none' ? null : (
              <div className={cn('flex items-center justify-between')}>
                {renderLeftSection()}
                {renderRightSection()}
              </div>
            )}

            <DebouncedInput
              icon={<SearchIcon className={cn('size-5 text-white/50')} />}
              value={globalFilterValue ?? ''}
              onChange={setGlobalFilter}
              className={cn(
                'bg-gradient-accent h-10 w-full border-accent/10 lg:max-w-[300px]'
              )}
              placeholder='Search...'
              autoFocus={false}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <div className={cn('mb-4 flex w-full flex-col overflow-hidden')}>
      <div
        className={cn(
          'mb-4 flex w-full flex-col justify-between gap-2 border-b pb-4 lg:flex-row lg:items-end'
        )}
      >
        <TableTitle title={title} subtitle={subtitle} />
        <DebouncedInput
          icon={<SearchIcon className={cn('size-5 text-secondary/50')} />}
          value={globalFilterValue ?? ''}
          onChange={setGlobalFilter}
          className={cn('h-10 w-full lg:max-w-[300px]')}
          placeholder='Search...'
          autoFocus={false}
        />
      </div>
      {toolbarOptions === 'none' ? null : (
        <div className={cn('flex items-center justify-between')}>
          {renderLeftSection()}
          {renderRightSection()}
        </div>
      )}
    </div>
  );
}
