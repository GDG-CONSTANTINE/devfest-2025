export type HackathonEntry = {
    full_name: string,
    email: string,
    phone_number: string,
    university_or_company: string,
    t_shirt_size: 'M' |'S' | 'L' | 'XL',
    role: 'member' | 'leader',
    linkedin_url: string,
    github_url: string,
    portfolio_url: string | null,
    team_name: string | null,
    leader_key: string | null,
    why_participate: string
}