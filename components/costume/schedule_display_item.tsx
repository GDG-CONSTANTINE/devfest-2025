import ScheduleItem from "@/Models/schedule_item";

interface ScheduleDisplayItemInterface {
  time_slot: string;
  start_time: string;
  end_time: string;
  day11_item?: ScheduleItem;
  day12_item?: ScheduleItem;
  day13_item?: ScheduleItem;
  current_date: number;
  isSingleDay?: boolean;
  singleDay?: number;
}

export default function ScheduleDisplayItem({
  start_time,
  end_time,
  day11_item,
  day12_item,
  day13_item,
  current_date,
  isSingleDay = false,
  singleDay,
}: ScheduleDisplayItemInterface) {
  const isCurrentItem = (item?: ScheduleItem) => {
    if (!item) return false;

    const now = new Date(current_date);
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const currentDay = now.getDay()

    const [startHour, startMin] = item.start_time.split(":").map(Number);
    const [endHour, endMin] = item.end_time.split(":").map(Number);

    const startTimeMinutes = startHour * 60 + startMin;
    const endTimeMinutes = endHour * 60 + endMin;

    return currentTime >= startTimeMinutes && currentTime <= endTimeMinutes && item.day_number == currentDay;
  };

  const renderCell = (item?: ScheduleItem) => {
    const cellClasses = `p-4 bg-gray-200/10 dark:bg-gray-500/40 max-w-0 overflow-hidden ${
      isCurrentItem(item)
        ? "border-2 border-dashed border-gray-800/50 dark:border-gray-300/50"
        : ""
    }`;

    if (!item) {
      return <td className={cellClasses}></td>;
    }

    return (
      <td className={cellClasses}>
        <h1 className="text-md font-semibold lg:text-lg mb-2 wrap-break-words">
          {item.title}
        </h1>
        {item.description && (
          <p className="text-xs text-gray-600 dark:text-gray-200 mb-2">
            {item.description}
          </p>
        )}
        {item.speaker && (
          <div className="text-sm text-gray-600 dark:text-gray-300 flex gap-2">
            <div
              className="rounded-full w-8 h-8 shrink-0"
              style={{
                backgroundImage: `url('/images/pfp/${item.speaker.pfp_path}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />
            <div className="flex flex-col min-w-0">
              <span className="wrap-break-words">{item.speaker.full_name}</span>
              <span className="wrap-break-words text-xs">
                {item.speaker.bio}
              </span>
            </div>
          </div>
        )}
      </td>
    );
  };

  if (isSingleDay && singleDay) {
    const item =
      singleDay === 11
        ? day11_item
        : singleDay === 12
        ? day12_item
        : day13_item;
    return (
      <tr className="w-full">
        {/* Time column */}
        <td className="w-6 lg:w-24 text-base align-top py-4 px-2 whitespace-nowrap">
          <div className="flex flex-col items-center">
            <span className="font-semibold">{start_time}</span>
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              {end_time}
            </span>
          </div>
        </td>
        {renderCell(item)}
      </tr>
    );
  }

  return (
    <tr className="w-full">
      {/* Time column */}
      <td className="w-24 text-base align-top py-4 px-2 whitespace-nowrap">
        <div className="flex flex-col items-center">
          <span className="font-semibold">{start_time}</span>
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            {end_time}
          </span>
        </div>
      </td>

      {renderCell(day11_item)}
      {renderCell(day12_item)}
      {renderCell(day13_item)}
    </tr>
  );
}
