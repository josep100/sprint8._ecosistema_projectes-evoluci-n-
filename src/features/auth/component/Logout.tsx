import { LogOut } from "lucide-react";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import clsx from "clsx";

interface LogoutButtonProps {
  borderColor?: string;
  textColor?: string;
  hoverBg?: string;
  hoverText?: string;
  className?: string;
}

const LogoutButton = ({
  borderColor = "border-gray-300",
  textColor = "text-gray-800",
  hoverBg = "hover:bg-gray-900",
  hoverText = "hover:text-white",
  className,
}: LogoutButtonProps) => {
  const { logout } = useAuthContext();

  return (
    <button
      onClick={logout}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium z-100 cursor-pointer",
        borderColor,
        textColor,
        hoverBg,
        hoverText,
        className
      )}
    >
      <LogOut size={18} />
      <span>Cerrar sesión</span>
    </button>
  );
};

export default LogoutButton;