import { formatTime } from "../utils/date.utils";
import type { EventContentArg } from "@fullcalendar/core";

const CalendarEventContent = ({info}: { info: EventContentArg }) => {
  const time = formatTime(info.event.start);
  return (
    <div>
      <div className="font-medium">{info.event.title}</div>
      <div className="text-xs text-gray-500">
        {time} - {info.event.extendedProps.notes}
      </div>
    </div>
  );
};

export default CalendarEventContent;
