import Speaker from './Speakers';

export default class ScheduleItem {
  start_time: string;
  end_time: string;
  day_number: number;
  date: number;
  title: string;
  speaker: Speaker | null;
  description: string | null;
  type: 'talk' | 'workshop' | 'ceremony' | null;
  track: number; // For parallel sessions (1, 2, etc.)

  constructor(
    start_time: string,
    end_time: string,
    day_number: number,
    date: number,
    title: string,
    speaker: Speaker | null,
    description: string | null = null,
    type: 'talk' | 'workshop' | 'ceremony' | null = null,
    track: number = 1
  ) {
    this.start_time = start_time;
    this.end_time = end_time;
    this.day_number = day_number;
    this.date = date;
    this.title = title;
    this.speaker = speaker;
    this.description = description;
    this.type = type;
    this.track = track;
  }
}
