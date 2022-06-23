export type UserSearch = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
};

export type UserSearchResult = {
  total_count: number;
  items: UserSearch[];
  incomplete_results: boolean;
};

export type UserRepo = {
  id: number;
  html_url: string;
  name: string;
  forks_count: number;
  stargazers_count: number;
};
