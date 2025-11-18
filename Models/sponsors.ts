export default class Sponsor {
  logo_path: string;
  relation_type: "partner" | "gold" | "silver" | "bronze";
  website_link: string;
  facebook_link: string;
  linkedin_link: string;

  constructor(
    logo_path: string,
    relation_type: "partner" | "gold" | "silver" | "bronze",
    website_link: string,
    facebook_link: string,
    linkedin_link: string
  ) {
    (this.logo_path = logo_path),
      (this.relation_type = relation_type),
      (this.website_link = website_link),
      (this.facebook_link = facebook_link),
      (this.linkedin_link = linkedin_link);
  }
}
