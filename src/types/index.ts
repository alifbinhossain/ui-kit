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
