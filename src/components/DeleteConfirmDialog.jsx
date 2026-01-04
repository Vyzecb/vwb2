
import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const DeleteConfirmDialog = ({ isOpen, onConfirm, onCancel, title, description, isDeleting }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => {
      // Prevent closing via backdrop click or escape key if currently deleting
      if (isDeleting) return;
      if (!open) onCancel();
    }}>
      <AlertDialogContent className="bg-[#1a1a1a] border-gray-800 w-[95vw] sm:w-full max-w-md rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-white">
            {title || "Ben je zeker?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 text-base">
            {description || "Deze actie kan niet ongedaan worden gemaakt."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 gap-3">
          <AlertDialogCancel 
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 sm:flex-none h-12 sm:h-10 bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white disabled:opacity-50 mt-0"
          >
            Annuleren
          </AlertDialogCancel>
          
          {/* 
            Replaced AlertDialogAction with a standard Button to completely avoid 
            Radix UI's auto-close behavior which causes issues on mobile during async operations.
            This ensures the dialog stays open while deleting and doesn't freeze the UI.
          */}
          <Button 
            onClick={(e) => {
              // Stop propagation to ensure clean event handling
              e.stopPropagation();
              console.log("DeleteConfirmDialog: Delete button clicked");
              if (!isDeleting && onConfirm) {
                onConfirm();
              }
            }}
            disabled={isDeleting}
            className="flex-1 sm:flex-none h-12 sm:h-10 bg-red-600 text-white hover:bg-red-700 border-0 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verwijderen...</span>
              </>
            ) : (
              "Verwijderen"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmDialog;
