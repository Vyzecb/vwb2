import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const DeleteConfirmDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Verwijderen',
  description = 'Weet je zeker dat je dit wilt verwijderen?',
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
      style={{ WebkitTransform: 'translateZ(0)' }} // iOS Safari fix
    >
      <div className="bg-[#111] border border-gray-800 rounded-xl w-[90%] max-w-sm p-5">
        <h2 className="text-white font-bold text-lg mb-2">{title}</h2>
        <p className="text-gray-400 text-sm mb-6">{description}</p>

        <div className="flex gap-3">
          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verwijderen...
              </>
            ) : (
              'Verwijderen'
            )}
          </Button>

          <Button
            onClick={onCancel}
            disabled={isDeleting}
            variant="outline"
            className="flex-1"
          >
            Annuleren
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteConfirmDialog;