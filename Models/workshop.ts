import Speaker from "./Speakers";

export default class WorkShopItem {
    workshop_title: string;
    workshop_description: string;
    workshop_prerequisites: string;
    workshop_instructor: Speaker;

    constructor(workshop_title: string,
    workshop_description: string,
    workshop_prerequisites: string,
    workshop_instructor: Speaker,
    ) {
    this.workshop_title = workshop_title;
    this.workshop_description = workshop_description;
    this.workshop_prerequisites = workshop_prerequisites;
    this.workshop_instructor = workshop_instructor;
    }
}