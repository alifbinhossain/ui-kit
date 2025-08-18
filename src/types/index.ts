export type IToast = {
  status: number;
  type:
    | 'create'
    | 'insert'
    | 'delete'
    | 'error'
    | 'warning'
    | 'update'
    | string;
  message: string;
};

export type IStartEndDateProps = {
  start_date: Date | undefined;
  end_date: Date | undefined;
};

export interface IFormSelectOption {
  label: string | number;
  value: string | number;
  unit?: string;
}

export type ITableAdvanceFilter = {
  state: boolean | undefined;
  options?: IFormSelectOption[];
  label: string;
  onStateChange: (type?: string) => void;
  clear: () => void;
};

export type ITableFacetedFilter = {
  id: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};

export type IToolbarOptions =
  | 'all'
  | 'all-filter'
  | 'view'
  | 'date-range'
  | 'faceted-filter'
  | 'advance-filter'
  | 'export-csv'
  | 'export-pdf'
  | 'refresh'
  | 'new-entry'
  | 'other';

export type IPaginationQuery = {
  page: string;
  limit: string;
  orderby: 'asc' | 'desc';
  sort: string;
  q: string;
  start_date: string | undefined;
  end_date: string | undefined;
  is_pagination?: string;
  [key: string]: string | number | undefined;
};

export type IPagination = {
  total_record: number;
  current_page: number;
  total_page: number;
  next_page: number | null;
  prev_page: number | null;
};

export type IResponse<T> = {
  toast: IToast;
  data: T;
  pagination: IPagination;
};

interface ITableFilterOptionSSRDefault<T> {
  accessor: keyof T;
  label: string;
  isPinned?: boolean;
}

export type ITableFilterOptionSSRSelectStatic = {
  type: 'select';
  mode: 'static';
  options: IFormSelectOption[];
};

export type ITableFilterOptionSSRSelectDynamic = {
  type: 'select';
  mode: 'dynamic';
  apiUrl: string;
};

export type ITableFilterOptionSSRSelect =
  | ITableFilterOptionSSRSelectStatic
  | ITableFilterOptionSSRSelectDynamic;

type ITableFilterOptionSSROthers = {
  type: 'checkbox' | 'radio' | 'date-range' | 'date' | 'text';
};

// type: 'select' | 'checkbox' | 'radio' | 'date-range' | 'date' | 'text';
export type ITableFilterOptionSSR<T> = ITableFilterOptionSSRDefault<T> &
  (ITableFilterOptionSSRSelect | ITableFilterOptionSSROthers);
