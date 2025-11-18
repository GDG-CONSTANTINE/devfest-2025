import Speaker from "./Speakers";

export default class ScheduleItem {
  start_time: string;
  end_time: string;
  day_number: number;
  date: number;
  title: string;
  speaker: Speaker | null;
  description: string | null;

  constructor(
    start_time: string,
    end_time: string,
    day_number: number,
    date: number,
    title: string,
    speaker: Speaker | null,
    description: string | null = null
  ) {
    this.start_time = start_time;
    this.end_time = end_time;
    this.day_number = day_number
    this.date = date;
    this.title = title;
    this.speaker = speaker;
    this.description = description;
  }
}
