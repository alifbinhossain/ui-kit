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
