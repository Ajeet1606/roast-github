import axios from 'axios';

export interface ProfileSchema {
  name: string;
  bio: string;
  avatarUrl: string;
  public_repos: number;
  repositories: {
    totalCount: number;
  };
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  contributionsCollection: {
    totalCommitContributions: number;
  };
  starredRepositories: {
    totalCount: number;
  };
}


export async function getProfileDetails(userName: string) {
    const GITHUB_GRAPHQL_API = import.meta.env.VITE_GITHUB_GRAPHQL_API;
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 1);
    const fromDateString = fromDate.toISOString();
    const toDateString = toDate.toISOString();
  
    const query = `query userInfo($login: String!, $from: DateTime!, $to: DateTime!, $before: String!) {
      user(login: $login) {
        name
        bio
        avatarUrl
        repositories(privacy: PUBLIC) {
          totalCount
        }
        followers(before: $before){
          totalCount
        }
        following(before: $before){
          totalCount
        }
        starredRepositories(before: $before){
          totalCount
        }
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
        }
      }
    }`;
    const variables = {
      login: userName,
      from: fromDateString,
      to: toDateString,
      before: toDateString,
    };
  
    try {
      const response = await axios.post(
        GITHUB_GRAPHQL_API!,
        { query, variables },
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        }
      );
  
      return response?.data?.data?.user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  