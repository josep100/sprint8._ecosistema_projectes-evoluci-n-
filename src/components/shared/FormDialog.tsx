import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "../../components/ui/dialog";
import type { formDialogProps } from "../../types/shared";

const FormDialog = ({
  title,
  description,
  children,
  open,
  onOpenChange,
}: formDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-xl! w-full rounded-2xl overflow-hidden flex flex-col max-h-[90vh]!">
        <DialogHeader className="px-8 py-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-slate-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 mt-1">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
