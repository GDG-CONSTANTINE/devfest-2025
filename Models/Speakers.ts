
export default class Speaker {
    full_name: string;
    pfp_path: string;
    linkedin_url: string | null;
    github_url: string | null;
    twitter_url: string | null;
    facebook_url: string | null;
    tiktok_url: string | null;
    bio: string;

    constructor(full_name: string,
    pfp_path: string,
    linkedin_url: string | null,
    github_url: string | null,
    twitter_url: string | null,
    facebook_url: string | null,
    tiktok_url: string | null,
        bio: string) {
        this.full_name = full_name;
        this.pfp_path = pfp_path;
        this.linkedin_url = linkedin_url;
        this.github_url = github_url;
        this.twitter_url = twitter_url;
        this.facebook_url = facebook_url;
        this.tiktok_url = tiktok_url;
        this.bio = bio;
    }
}