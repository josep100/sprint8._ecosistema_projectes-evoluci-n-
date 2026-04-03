import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

const PatientsHead = () => {
  return (
    <>
      <h1>Gestión de pacientes</h1>
      <p>
        Gestionar y realizar el seguimiento de los historiales clínicos de todos
        los pacientes sometidos a restauración capilar.
      </p>
      <Dialog>
        <DialogTrigger>Agregar nuevo paciente</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientsHead;
