import { RotateCw } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import type { IDeleteModalProps } from './types';

const DeleteModal: React.FC<IDeleteModalProps> = ({
  deleteItem,
  setDeleteItem,
  url,
  deleteData,
  onClose,
  needRefresh = false,
  invalidateQueries,
}) => {
  const handleConfirm = async () => {
    await deleteData
      .mutateAsync({
        url: `${url}/${deleteItem?.id}`,
        onClose: () => {
          onClose?.();
          setDeleteItem(null);
          if (needRefresh) {
            window.location.reload();
          }
        },
      })
      .then(() => {
        invalidateQueries?.();
      });
  };

  return (
    <AlertDialog open={!!deleteItem}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete "
            {deleteItem && (deleteItem.name || deleteItem.id)}"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You cannot undo this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteItem(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteData.isPending}
            onClick={handleConfirm}
          >
            {deleteData.isPending && (
              <RotateCw className='mr-2 h-4 w-4 animate-spin' />
            )}
            {deleteData.isPending ? 'Please wait...' : 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
