import { toast } from 'sonner';

export const Copy = (data: string) => {
  navigator.clipboard.writeText(data);
  toast.success('Copied to clipboard');
};
