type ToGithubIssues = {
  owner: string;
  name: string;
  index: number;
};
export const toGithubIssues = ({ owner, name, index }: ToGithubIssues) => {
  return `https://github.com/${owner}/${name}/issues/${index}`;
};
