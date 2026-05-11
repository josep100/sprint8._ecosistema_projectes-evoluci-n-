import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";


type CalendarToolbarProps = {
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  currentView: string;
  onChangeView: (view: string) => void;
};

const CalendarToolbar = ({
  title,
  onPrev,
  onNext,
  onToday,
  currentView,
  onChangeView,
}: CalendarToolbarProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
          {title}
        </h2>
        <div className="flex bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <button
            aria-label="prev month"
            onClick={onPrev}
            className="p-2 hover:bg-slate-50 border-r border-slate-100 transition-colors"
          >
            <ChevronLeft className="size-4 text-slate-700" />
          </button>
          <button
            aria-label="next month"
            onClick={onNext}
            className="p-2 hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="size-4 text-slate-700" />
          </button>
        </div>
        <button
          onClick={onToday}
          className="px-4 py-2 bg-white text-slate-700 font-bold text-sm rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50"
        >
          Hoy
        </button>
      </div>
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => onChangeView("timeGridDay")}
          className={clsx(
            "px-4 py-1.5 text-xs font-bold uppercase tracking-widest",
            currentView === "timeGridDay"
              ? "bg-white text-blue-700 rounded-lg shadow-sm"
              : "text-slate-500 hover:text-slate-900 transition-colors",
          )}
        >
          Día
        </button>
        <button
          onClick={() => onChangeView("timeGridWeek")}
          className={clsx(
            "px-4 py-1.5 text-xs font-bold uppercase tracking-widest",
            currentView === "timeGridWeek"
              ? "bg-white text-blue-700 rounded-lg shadow-sm"
              : "text-slate-500 hover:text-slate-900 transition-colors",
          )}
        >
          Semana
        </button>
        <button
          onClick={() => onChangeView("dayGridMonth")}
          className={clsx(
            "px-4 py-1.5 text-xs font-bold uppercase tracking-widest",
            currentView === "dayGridMonth"
              ? "bg-white text-blue-700 rounded-lg shadow-sm"
              : "text-slate-500 hover:text-slate-900 transition-colors",
          )}
        >
          Mes
        </button>
      </div>
    </div>
  );
};

export default CalendarToolbar;
