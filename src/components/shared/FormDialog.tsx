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
      <DialogContent className="bg-[#ffffff] sm:max-w-lg p-0">
        <DialogHeader className="px-8 py-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-black tracking-tight text-on-surface">
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
