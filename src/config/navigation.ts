import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Activity,
  Stethoscope,
  BarChart3,
} from "lucide-react";

const navigation = [
  {
    label: "Panel",
    href: "/app",
    icon: LayoutDashboard,
  },
  {
    label: "Pacientes",
    href: "patients",
    icon: Users,
  },
  {
    label: "Calendario",
    href: "Appointments",
    icon: CalendarClock,
  },
  {
    label: "Tratamiento",
    href: "treatments",
    icon: Activity,
  },
  {
    label: "Analítica",
    href: "analytics",
    icon: BarChart3,
  },
];

export default navigation;
