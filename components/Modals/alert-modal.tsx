'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useMounted } from '@/hooks/useMounted';

interface ALertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<ALertModalProps> = ({ isOpen, onClose, onConfirm, loading }: ALertModalProps) => {
  const isMounted = useMounted();
  if (!isMounted) return null;

  return (
    <Modal
      title="Are you absolutely sure? "
      description="Just making sure that you are not drunk, This Action can not be undone, so are you sober? * sure?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant={'outline'} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={'destructive'} onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
