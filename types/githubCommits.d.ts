export interface CommitsType {
  sha: string;
  node_id: string;
  commit: Commit;
  url: string;
  html_url: string;
  comments_url: string;
  author?: null;
  committer?: null;
  parents?: ParentsEntity[] | null;
}
export interface Commit {
  author: AuthorOrCommitter;
  committer: AuthorOrCommitter;
  message: string;
  tree: Tree;
  url: string;
  comment_count: number;
  verification: Verification;
}
export interface AuthorOrCommitter {
  name: string;
  email: string;
  date: string;
}
export interface Tree {
  sha: string;
  url: string;
}
export interface Verification {
  verified: boolean;
  reason: string;
  signature?: null;
  payload?: null;
}
export interface ParentsEntity {
  sha: string;
  url: string;
  html_url: string;
}
