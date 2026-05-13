import { NavLink } from "react-router-dom";
import { Brain } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import navigation from "../../config/navigation";
import clsx from "clsx";
import { LogOut } from "lucide-react";
import { authService } from "../../features/auth/services/auth.service";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();

    navigate("/");
  };

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shadow-2xl">
      <div className="p-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary-avatar flex items-center justify-center text-white">
          <Brain />
        </div>
        <div>
          <h1 className="font-bold text-lg">Clinica AI</h1>
          <p className="text-xs text-slate-500">Clinical Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === "/app"}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary-avatar/10 text-primary-avatar font-semibold"
                      : "text-slate-600 hover:bg-slate-100",
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <section
            aria-label="Perfil del doctor"
            className="mt-6 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition"
          >
            <figure className="w-8 h-8 rounded-full bg-slate-300 shrink-0 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0t7u5T8ai7J9XuzKo64-AnD9pv-Remlb8KvQCLW9_Q48e1Bd2A62Dm00zZPW2Q_o_s5ToLWfgo8usEa5D7OwFLmbT9Ic4JLuBMaVC1sP6M_zA088xXkaKMW8WgUZrmiJPXD5Cxxe_yV6D4_N9TCiY8Ve0KeS7JO8ojVyQYtxevlQCeraetRTB52G-vTjfP-hRZuVXkN_-_MM3d66Rjb3awZB9tzX4lr1key7lXIqFsIHW2DUhJ637iaJCSvA1VxcNy1XMyx7Jc4Qn"
                alt="Foto de perfil del doctor"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">Dr. Aris Thorne</p>

              <p className="text-xs text-slate-500">Chief Dermatologist</p>
            </div>
          </section>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-61">
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="size-4 mr-2" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  );
};

export default Sidebar;
