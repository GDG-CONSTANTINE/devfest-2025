
export default class Speaker {
    full_name: string;
    pfp_path: string;
    linkedin_url: string;
    github_url: string;
    twitter_url: string;
    facebook_url: string;
    tiktok_url: string;
    portfolio: string;
    bio: string;

    constructor(full_name: string,
    pfp_path: string,
    linkedin_url: string,
    github_url: string,
    twitter_url: string,
    facebook_url: string,
    tiktok_url: string,
    portfolio: string,
        bio: string) {
        this.full_name = full_name;
        this.pfp_path = pfp_path;
        this.linkedin_url = linkedin_url;
        this.github_url = github_url;
        this.twitter_url = twitter_url;
        this.facebook_url = facebook_url;
        this.tiktok_url = tiktok_url;
        this.portfolio = portfolio;
        this.bio = bio;
    }
}