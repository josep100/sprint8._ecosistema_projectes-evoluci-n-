import clsx from "clsx";
import { formatTime } from "../utils/date.utils";
import type { EventContentArg } from "@fullcalendar/core";

const CalendarEventContent = ({ info }: { info: EventContentArg }) => {
  const time = formatTime(info.event.start);

  const treatmentType = info.event.extendedProps.treatment_type;

  const eventStyles = {
    scheduled: "bg-blue-50 text-blue-700 border border-blue-100",

    completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",

    cancelled: "bg-amber-50 text-amber-700 border border-amber-100",
  };

  return (
    <div
      className={clsx(
        "rounded-lg px-2 py-1 text-xs font-bold truncate shadow-sm w-full",
        eventStyles[treatmentType as keyof typeof eventStyles],
      )}
    >
      <div>{time} - {info.event.title}</div>
      <div>{info.event.extendedProps.notes}</div>
    </div>
  );
};

export default CalendarEventContent;
