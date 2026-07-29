export interface GitHubBlog {
  slug: string;
  title: string;
  summary: string;
  publishedDate: string;
  readingTime: string;
  tags: string[];
  author: string;
  repoUrl: string;
  rawUrl: string;
  content: string;
}

export interface GitHubDoc {
  project: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  repoUrl: string;
  rawUrl: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: 'Distributed Systems' | 'AI & ML' | 'Developer Tools' | 'Enterprise Systems';
  techStack: string[];
  architectureTags: string[];
  status: 'Production' | 'Open Source' | 'In Development';
  githubUrl: string;
  demoUrl?: string;
  docsSlug?: string;
  blogSlug?: string;
  featured: boolean;
  outcome?: string;
}

export interface GitHubContribution {
  id: number;
  title: string;
  repo: string;
  repoUrl: string;
  prUrl: string;
  state: 'merged' | 'open' | 'closed';
  createdAt: string;
  isUpstream: boolean;
  tags: string[];
}
