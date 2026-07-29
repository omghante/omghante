import { GitHubBlog, GitHubDoc, GitHubContribution } from '@/types';

const GITHUB_USERNAME = 'omghante';

/**
 * Dynamically fetches raw markdown file content directly from GitHub repository with safe build fallbacks.
 */
export async function fetchGitHubMarkdown(
  repo: string,
  filePath: string,
  owner: string = GITHUB_USERNAME,
  branch: string = 'main'
): Promise<string> {
  try {
    const encodedFilePath = filePath.split('/').map(encodeURIComponent).join('/');
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${encodedFilePath}`;
    const res = await fetch(rawUrl, {
      next: { revalidate: 3600 },
      headers: process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {},
    });

    if (!res.ok) {
      return `# ${repo}\n\nTechnical article for [${owner}/${repo}](https://github.com/${owner}/${repo}/blob/${branch}/${filePath}).\n\nLive repository synced content from GitHub.`;
    }

    const text = await res.text();
    return text || `# ${repo}\n\nTechnical article for [${owner}/${repo}](https://github.com/${owner}/${repo}).`;
  } catch (error) {
    return `# ${repo}\n\nTechnical article for repository [${owner}/${repo}](https://github.com/${owner}/${repo}).`;
  }
}

/**
 * Dynamically fetches list of blogs linked exclusively to the 3 specified .md files from omghante/easy-blogs.
 */
export async function getGitHubBlogs(): Promise<GitHubBlog[]> {
  const blogSources = [
    {
      slug: 'whatsapp-template-creation-approval-automation',
      title: 'WhatsApp Template Creation & Approval Automation System',
      summary: 'Automating Meta Resumable Media Uploads, handle generation, and Carousel message template submission for WhatsApp Business Platform via Meta Graph API.',
      publishedDate: '2026-03-20',
      readingTime: '6 min read',
      tags: ['MetaGraphAPI', 'WhatsApp', 'NodeJS', 'Automation'],
      author: 'Om Ghante',
      repo: 'easy-blogs',
      owner: 'omghante',
      file: 'whatsapp Graph Api/reviewing_template_via_graph_api.md',
    },
    {
      slug: 'sending-whatsapp-templates-meta-graph-api',
      title: 'Sending WhatsApp Message Templates via Meta Graph API',
      summary: 'Building high-throughput payload dispatchers in Node.js for WhatsApp template messages, dynamic parameters, media headers, and webhooks.',
      publishedDate: '2026-03-15',
      readingTime: '5 min read',
      tags: ['WhatsAppAPI', 'Backend', 'NodeJS', 'SystemDesign'],
      author: 'Om Ghante',
      repo: 'easy-blogs',
      owner: 'omghante',
      file: 'whatsapp Graph Api/sending_templates_via_graph_api.md',
    },
    {
      slug: 'whatsapp-ai-chatbot-integration',
      title: 'WhatsApp AI Chatbot Integration: LLM & Webhooks Architecture',
      summary: 'Integrating Gemini AI models with WhatsApp Cloud Webhooks, conversational context state, and automated response routing for enterprise customer support.',
      publishedDate: '2026-03-01',
      readingTime: '7 min read',
      tags: ['AIChatbot', 'LLM', 'Webhooks', 'GeminiAI'],
      author: 'Om Ghante',
      repo: 'easy-blogs',
      owner: 'omghante',
      file: 'whatsapp Graph Api/whatsapp_ai_chatbot_integration.md',
    },
  ];

  const blogs = await Promise.all(
    blogSources.map(async (src) => {
      const content = await fetchGitHubMarkdown(src.repo, src.file, src.owner);
      return {
        slug: src.slug,
        title: src.title,
        summary: src.summary,
        publishedDate: src.publishedDate,
        readingTime: src.readingTime,
        tags: src.tags,
        author: src.author,
        repoUrl: `https://github.com/${src.owner}/${src.repo}/blob/main/${encodeURIComponent(src.file)}`,
        rawUrl: `https://raw.githubusercontent.com/${src.owner}/${src.repo}/main/${encodeURIComponent(src.file)}`,
        content,
      };
    })
  );

  return blogs;
}

export async function getGitHubBlogBySlug(slug: string): Promise<GitHubBlog | null> {
  const blogs = await getGitHubBlogs();
  return blogs.find((b) => b.slug === slug) || null;
}

/**
 * Returns exact user pull requests for nodejs/node (#62507, #62683) and electron/electron (#50920, #51236).
 */
export async function getGitHubPullRequests(): Promise<GitHubContribution[]> {
  return [
    {
      id: 51236,
      title: 'fix: use bundled devtools frontend URL for remote debugging',
      repo: 'electron/electron',
      repoUrl: 'https://github.com/electron/electron',
      prUrl: 'https://github.com/electron/electron/pull/51236',
      state: 'merged',
      createdAt: '2026-04-30',
      isUpstream: true,
      tags: ['Electron Core', 'DevTools', 'semver/patch', 'Approved'],
    },
    {
      id: 50920,
      title: 'fix: prevent crash when calling contentTracing APIs before app is ready',
      repo: 'electron/electron',
      repoUrl: 'https://github.com/electron/electron',
      prUrl: 'https://github.com/electron/electron/pull/50920',
      state: 'merged',
      createdAt: '2026-04-28',
      isUpstream: true,
      tags: ['Electron Core', 'ContentTracing', 'semver/patch', 'Approved'],
    },
    {
      id: 62507,
      title: 'src: constrain MaybeStackBuffer::ToString and ToStringView to standard char types',
      repo: 'nodejs/node',
      repoUrl: 'https://github.com/nodejs/node',
      prUrl: 'https://github.com/nodejs/node/pull/62507',
      state: 'merged',
      createdAt: '2026-04-20',
      isUpstream: true,
      tags: ['Node.js Core', 'C++', 'V8 Engine', 'Approved'],
    },
    {
      id: 62683,
      title: 'build: fix stray debug string in LIEF defines',
      repo: 'nodejs/node',
      repoUrl: 'https://github.com/nodejs/node',
      prUrl: 'https://github.com/nodejs/node/pull/62683',
      state: 'merged',
      createdAt: '2026-04-14',
      isUpstream: true,
      tags: ['Node.js Core', 'Build', 'LIEF Defines', 'Approved'],
    },
  ];
}

/**
 * Dynamically fetches project documentation directly from GitHub repositories.
 */
export async function getGitHubDocs(projectName: string): Promise<GitHubDoc[]> {
  const docMapping: Record<string, { owner: string; repo: string; docs: Array<{ slug: string; title: string; file: string; order: number }> }> = {
    'cartera': {
      owner: 'omghante',
      repo: 'cartera',
      docs: [
        { slug: 'getting-started', title: 'System Specs & Wallet Infrastructure', file: 'README.md', order: 1 },
      ],
    },
    'metapilot': {
      owner: 'omghante',
      repo: 'metapilot',
      docs: [
        { slug: 'getting-started', title: 'Getting Started & Architecture', file: 'README.md', order: 1 },
      ],
    },
    'paper': {
      owner: 'artificialpaper',
      repo: 'paper-core',
      docs: [
        { slug: 'getting-started', title: 'Paper Core & Agent Trajectories', file: 'README.md', order: 1 },
      ],
    },
    'reecall-ai': {
      owner: 'omghante',
      repo: 'reecall.ai',
      docs: [
        { slug: 'getting-started', title: 'Voice AI & Semantic RAG Specs', file: 'README.md', order: 1 },
      ],
    },
    'tide-os': {
      owner: 'omghante',
      repo: 'tide-os',
      docs: [
        { slug: 'getting-started', title: 'Cloud Sandboxing Architecture', file: 'README.md', order: 1 },
      ],
    },
    'git-context': {
      owner: 'omghante',
      repo: 'git-context',
      docs: [
        { slug: 'getting-started', title: 'CLI Usage & Setup', file: 'README.md', order: 1 },
      ],
    },
  };

  const projectConfig = docMapping[projectName] || {
    owner: 'omghante',
    repo: projectName,
    docs: [{ slug: 'getting-started', title: 'Documentation & Architecture', file: 'README.md', order: 1 }],
  };

  const docs = await Promise.all(
    projectConfig.docs.map(async (doc) => {
      const content = await fetchGitHubMarkdown(projectConfig.repo, doc.file, projectConfig.owner);
      return {
        project: projectName,
        slug: doc.slug,
        title: doc.title,
        description: `Live technical documentation fetched from GitHub repository ${projectConfig.owner}/${projectConfig.repo}`,
        order: doc.order,
        repoUrl: `https://github.com/${projectConfig.owner}/${projectConfig.repo}`,
        rawUrl: `https://raw.githubusercontent.com/${projectConfig.owner}/${projectConfig.repo}/main/${doc.file}`,
        content,
      };
    })
  );

  return docs;
}

export async function getGitHubDocBySlug(projectName: string, docSlug: string): Promise<GitHubDoc | null> {
  const docs = await getGitHubDocs(projectName);
  return docs.find((d) => d.slug === docSlug) || null;
}
