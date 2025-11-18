import ScheduleItem from "@/Models/schedule_item";
import Speaker from "@/Models/Speakers";

const SCHEDULE_ITEMS = [
        new ScheduleItem(
        "08:00",
        "10:00",
        11,
        Date.now(),
        "Starting off",
        null,
        "the opening day ceremony held in room number 67"
        ),
        new ScheduleItem("08:00", "10:00", 12, Date.now(), "Starting off", null),
        new ScheduleItem("08:00", "10:00", 13, Date.now(), "Starting off", null),
        new ScheduleItem(
        "10:00",
        "11:00",
        12,
        Date.now(),
        "Doing something about some topic in the middle of some time in somewhere",
        new Speaker(
            "John Doe",
            "place_holder_2.jpg",
            "",
            "https://linkedin.com/in/johndoe",
            "http://github/",
            "",
            "",
            "John is a software engineer with 10 years of experience."
        ),
        "The test to check if the full of details cells look well if not fuck"
        ),
        new ScheduleItem(
        "11:00",
        "12:00",
        12,
        Date.now(),
        "Doing something about some topic in the middle of some time in somewhere",
        new Speaker(
            "John Doe",
            "place_holder_4.jpg",
            "",
            "https://linkedin.com/in/johndoe",
            "http://github/",
            "",
            "",
            "John is a software engineer with 10 years of experience."
        )
        ),
        new ScheduleItem(
        "13:00",
        "14:00",
        13,
        Date.now(),
        "Doing something about some topic in the middle of some time in somewhere",
        new Speaker(
            "John Doe",
            "place_holder_4.jpg",
            "",
            "https://linkedin.com/in/johndoe",
            "http://github/",
            "",
            "",
            "John is a software engineer with 10 years of experience."
        )
        ),
    ];
    

export default SCHEDULE_ITEMS
