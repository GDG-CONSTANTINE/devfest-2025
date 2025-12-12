import ScheduleItem from "@/Models/schedule_item";
import { DAYS } from "@/app/data/settings";

interface ScheduleDisplayItemInterface {
  time_slot: string;
  start_time: string;
  end_time: string;
  day11_items: ScheduleItem[];
  day12_items: ScheduleItem[];
  day13_items: ScheduleItem[];
  current_date: number;
  isSingleDay?: boolean;
  singleDay?: number;
}

export default function ScheduleDisplayItem({
  start_time,
  end_time,
  day11_items,
  day12_items,
  day13_items,
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

  const renderSingleItem = (item: ScheduleItem) => {
    return (
      <div className="flex-1">
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
      </div>
    );
  };

  const renderCell = (items: ScheduleItem[]) => {
    const hasCurrentItem = items.some(item => isCurrentItem(item));
    const cellClasses = `p-4 bg-gray-200/10 dark:bg-gray-500/40 max-w-0 overflow-hidden ${hasCurrentItem
        ? "border-2 border-dashed border-gray-800/50 dark:border-gray-300/50"
        : ""
      }`;

    if (items.length === 0) {
      return <td className={cellClasses}></td>;
    }

    // Single item - render normally
    if (items.length === 1) {
      return (
        <td className={cellClasses}>
          {renderSingleItem(items[0])}
        </td>
      );
    }

    // Multiple items (parallel workshops) - render side by side
    return (
      <td className={cellClasses}>
        <div className="flex gap-4">
          {items
            .sort((a, b) => Number(a.track || 0) - Number(b.track || 0))
            .map((item, idx) => (
              <div key={idx} className={`flex-1 ${idx > 0 ? 'border-l border-gray-300 dark:border-gray-600 pl-4' : ''}`}>
                  {item.track && item?.track !== 0 && (
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 block">
                    {item.track === 1 ? 'Workshop A' : 'Workshop B'}
                  </span>
                )}
                {renderSingleItem(item)}
              </div>
            ))}
        </div>
      </td>
    );
  };

  if (isSingleDay && singleDay) {
    const items =
      singleDay === DAYS[0]
        ? day11_items
        : singleDay === DAYS[1]
          ? day12_items
          : day13_items;
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
        {renderCell(items)}
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

      {renderCell(day11_items)}
      {renderCell(day12_items)}
      {renderCell(day13_items)}
    </tr>
  );
}
