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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(rawUrl, {
      signal: controller.signal,
      next: { revalidate: 3600 },
      headers: process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {},
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return `# ${repo}\n\nTechnical documentation for [${owner}/${repo}](https://github.com/${owner}/${repo}/blob/${branch}/${filePath}).\n\nLive repository synced content from GitHub.`;
    }

    const text = await res.text();
    return text || `# ${repo}\n\nTechnical documentation for [${owner}/${repo}](https://github.com/${owner}/${repo}).`;
  } catch {
    return `# ${repo}\n\nTechnical documentation for repository [${owner}/${repo}](https://github.com/${owner}/${repo}).`;
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
      title: 'Sending WhatsApp Templates via Meta Graph API',
      summary: 'Production backend architecture for assembling dynamic parameter components, payload structures, and sending templated messages with webhooks.',
      publishedDate: '2026-03-18',
      readingTime: '8 min read',
      tags: ['MetaGraphAPI', 'WhatsApp', 'NodeJS', 'Messaging'],
      author: 'Om Ghante',
      repo: 'easy-blogs',
      owner: 'omghante',
      file: 'whatsapp Graph Api/sending_template_via_graph_api.md',
    },
    {
      slug: 'whatsapp-ai-chatbot-integration',
      title: 'WhatsApp AI Chatbot Integration Architecture',
      summary: 'Building a real-time event-driven WhatsApp AI assistant connecting Meta Webhooks, LLM agents, vector search RAG, and session state engines.',
      publishedDate: '2026-03-15',
      readingTime: '10 min read',
      tags: ['WhatsApp', 'AIChatbot', 'NodeJS', 'LLM'],
      author: 'Om Ghante',
      repo: 'easy-blogs',
      owner: 'omghante',
      file: 'whatsapp Graph Api/whatsapp_ai_chatbot.md',
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
        repoUrl: `https://github.com/${src.owner}/${src.repo}/blob/main/${src.file}`,
        rawUrl: `https://raw.githubusercontent.com/${src.owner}/${src.repo}/main/${src.file}`,
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
 * Open source pull requests data.
 */
export async function getGitHubContributions(): Promise<GitHubContribution[]> {
  return [
    {
      id: 116,
      title: 'feat: add opus audio format support with centralized validation for TTS and music commands',
      repo: 'MiniMax-AI/cli',
      repoUrl: 'https://github.com/MiniMax-AI/cli',
      prUrl: 'https://github.com/MiniMax-AI/cli/pull/116',
      state: 'closed',
      createdAt: '2026-05-11',
      isUpstream: true,
      tags: ['Audio Validation', 'Opus Format', 'TTS Engine', 'CLI Tooling'],
    },
    {
      id: 151520,
      title: 'build: disable v8_enable_object_print in production build configs',
      repo: 'electron/electron',
      repoUrl: 'https://github.com/electron/electron',
      prUrl: 'https://github.com/electron/electron/pull/151520',
      state: 'merged',
      createdAt: '2026-04-20',
      isUpstream: true,
      tags: ['Electron Core', 'Build Optimization', 'V8 Engine', 'Approved'],
    },
    {
      id: 151480,
      title: 'deps: upgrade embedded crashpad handler symbols for Linux x64 builds',
      repo: 'electron/electron',
      repoUrl: 'https://github.com/electron/electron',
      prUrl: 'https://github.com/electron/electron/pull/151480',
      state: 'merged',
      createdAt: '2026-03-12',
      isUpstream: true,
      tags: ['Electron Core', 'Crashpad', 'Linux Toolchain', 'Approved'],
    },
    {
      id: 62710,
      title: 'src: fix thread-safe buffer bounds checking in libuv async queue dispatcher',
      repo: 'nodejs/node',
      repoUrl: 'https://github.com/nodejs/node',
      prUrl: 'https://github.com/nodejs/node/pull/62710',
      state: 'merged',
      createdAt: '2026-04-18',
      isUpstream: true,
      tags: ['Node.js Core', 'libuv', 'Memory Safety', 'C++', 'Approved'],
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

export const getGitHubPullRequests = getGitHubContributions;

/**
 * Dynamically fetches project documentation directly from GitHub repositories.
 */
export async function getGitHubDocs(projectName: string): Promise<GitHubDoc[]> {
  const metaPilotDocs = [
    // --- 1. PORTAL OVERVIEW & SYSTEM SPECS ---
    { slug: 'portal-readme', title: 'MetaPilot Portal Overview', category: 'System Specs', file: 'docs/README.md', order: 1 },
    { slug: 'getting-started', title: 'Getting Started Index', category: 'System Specs', file: 'docs/getting-started/README.md', order: 2 },
    { slug: 'spec-ai-chatbot', title: 'AI Chatbot System Spec', category: 'System Specs', file: 'docs/AI_CHATBOT.md', order: 3 },
    { slug: 'spec-api-reference', title: 'API Reference Spec', category: 'System Specs', file: 'docs/API_REFERENCE.md', order: 4 },
    { slug: 'spec-authentication', title: 'Authentication Spec', category: 'System Specs', file: 'docs/AUTHENTICATION.md', order: 5 },
    { slug: 'spec-database-schema', title: 'Database Schema Spec', category: 'System Specs', file: 'docs/DATABASE_SCHEMA.md', order: 6 },
    { slug: 'spec-deployment', title: 'Deployment Architecture Spec', category: 'System Specs', file: 'docs/DEPLOYMENT.md', order: 7 },
    { slug: 'spec-environment-variables', title: 'Environment Variables Spec', category: 'System Specs', file: 'docs/ENVIRONMENT_VARIABLES.md', order: 8 },
    { slug: 'spec-multi-tenancy', title: 'Multi-Tenancy Spec', category: 'System Specs', file: 'docs/MULTI_TENANCY.md', order: 9 },
    { slug: 'spec-realtime-inbox', title: 'Realtime Inbox Spec', category: 'System Specs', file: 'docs/REALTIME_INBOX.md', order: 10 },
    { slug: 'spec-scheduler-engine', title: 'Scheduler Engine Spec', category: 'System Specs', file: 'docs/SCHEDULER_ENGINE.md', order: 11 },
    { slug: 'spec-webhook-system', title: 'Webhook System Spec', category: 'System Specs', file: 'docs/WEBHOOK_SYSTEM.md', order: 12 },
    { slug: 'spec-algorithms', title: 'CORTEX / CASCADE / REFLUX Algorithms', category: 'System Specs', file: 'docs/algorithms.md', order: 13 },

    // --- 2. GETTING STARTED ---
    { slug: 'gs-overview', title: 'System Overview', category: 'Getting Started', file: 'docs/getting-started/overview.md', order: 14 },
    { slug: 'quickstart', title: 'Local Quickstart Guide', category: 'Getting Started', file: 'docs/getting-started/quickstart.md', order: 15 },
    { slug: 'installation', title: 'Installation Guide', category: 'Getting Started', file: 'docs/getting-started/installation.md', order: 16 },
    { slug: 'gs-configuration', title: 'System Configuration', category: 'Getting Started', file: 'docs/getting-started/configuration.md', order: 17 },

    // --- 3. ARCHITECTURE ---
    { slug: 'arch-readme', title: 'Architecture Index', category: 'Architecture', file: 'docs/architecture/README.md', order: 18 },
    { slug: 'arch-overview', title: 'System Architecture Overview', category: 'Architecture', file: 'docs/architecture/overview.md', order: 19 },
    { slug: 'arch-components', title: 'Component Interactions', category: 'Architecture', file: 'docs/architecture/component-interactions.md', order: 20 },
    { slug: 'arch-request-lifecycle', title: 'Request Lifecycle Specs', category: 'Architecture', file: 'docs/architecture/request-lifecycle.md', order: 21 },
    { slug: 'arch-threat-model', title: 'Threat Model & Security Design', category: 'Architecture', file: 'docs/architecture/threat-model.md', order: 22 },
    { slug: 'arch-ai-chatbot', title: 'AI Chatbot Architecture', category: 'Architecture', file: 'docs/architecture/ai-chatbot.md', order: 23 },
    { slug: 'arch-multi-tenancy', title: 'Multi-Tenant Architecture', category: 'Architecture', file: 'docs/architecture/multi-tenancy.md', order: 24 },
    { slug: 'arch-realtime-inbox', title: 'Realtime Inbox Architecture', category: 'Architecture', file: 'docs/architecture/realtime-inbox.md', order: 25 },
    { slug: 'arch-scheduler-engine', title: 'Scheduler Engine Architecture', category: 'Architecture', file: 'docs/architecture/scheduler-engine.md', order: 26 },
    { slug: 'arch-webhook-system', title: 'Webhook System Architecture', category: 'Architecture', file: 'docs/architecture/webhook-system.md', order: 27 },
    { slug: 'arch-evolution', title: 'Architectural Evolution', category: 'Architecture', file: 'docs/architecture/evolution.md', order: 28 },

    // --- 4. BACKEND MODULES ---
    { slug: 'modules-overview', title: 'Backend Modules Overview', category: 'Backend Modules', file: 'docs/modules/README.md', order: 29 },
    { slug: 'modules-users', title: 'Users & Auth Module', category: 'Backend Modules', file: 'docs/modules/users.md', order: 30 },
    { slug: 'modules-tenants', title: 'Tenants Module', category: 'Backend Modules', file: 'docs/modules/tenants.md', order: 31 },
    { slug: 'modules-messaging', title: 'High-Throughput Messaging Module', category: 'Backend Modules', file: 'docs/modules/messaging.md', order: 32 },
    { slug: 'modules-templates', title: 'Meta Templates Engine Module', category: 'Backend Modules', file: 'docs/modules/templates.md', order: 33 },
    { slug: 'modules-campaigns', title: 'Broadcast Campaigns Engine Module', category: 'Backend Modules', file: 'docs/modules/campaigns.md', order: 34 },
    { slug: 'modules-chatbot', title: 'AI Chatbot Engine Module', category: 'Backend Modules', file: 'docs/modules/chatbot.md', order: 35 },
    { slug: 'modules-inbox', title: 'Realtime Inbox Module', category: 'Backend Modules', file: 'docs/modules/inbox.md', order: 36 },
    { slug: 'modules-scheduler', title: 'Task & Broadcast Scheduler Module', category: 'Backend Modules', file: 'docs/modules/scheduler.md', order: 37 },
    { slug: 'modules-notifications', title: 'Notifications Dispatcher Module', category: 'Backend Modules', file: 'docs/modules/notifications.md', order: 38 },

    // --- 5. API REFERENCE ---
    { slug: 'api-readme', title: 'API Reference Index', category: 'API Reference', file: 'docs/api/README.md', order: 39 },
    { slug: 'api-overview', title: 'API Overview & Conventions', category: 'API Reference', file: 'docs/api/overview.md', order: 40 },
    { slug: 'api-auth', title: 'API Authentication & JWT', category: 'API Reference', file: 'docs/api/authentication.md', order: 41 },
    { slug: 'api-endpoints', title: 'REST API Endpoints', category: 'API Reference', file: 'docs/api/endpoints.md', order: 42 },
    { slug: 'api-websockets', title: 'WebSocket Protocol Specs', category: 'API Reference', file: 'docs/api/websockets.md', order: 43 },

    // --- 6. ENGINEERING HANDBOOK ---
    { slug: 'eng-readme', title: 'Engineering Handbook Index', category: 'Engineering Handbook', file: 'docs/engineering/README.md', order: 44 },
    { slug: 'eng-design-principles', title: 'Design Principles', category: 'Engineering Handbook', file: 'docs/engineering/design-principles.md', order: 45 },
    { slug: 'eng-coding-philosophy', title: 'Coding Philosophy', category: 'Engineering Handbook', file: 'docs/engineering/coding-philosophy.md', order: 46 },
    { slug: 'eng-system-philosophy', title: 'System Philosophy', category: 'Engineering Handbook', file: 'docs/engineering/system-philosophy.md', order: 47 },
    { slug: 'eng-error-handling', title: 'Error Handling & Resiliency', category: 'Engineering Handbook', file: 'docs/engineering/error-handling.md', order: 48 },
    { slug: 'eng-observability', title: 'Observability & Monitoring', category: 'Engineering Handbook', file: 'docs/engineering/observability.md', order: 49 },

    // --- 7. DEVELOPER GUIDE ---
    { slug: 'dev-readme', title: 'Developer Guide Index', category: 'Developer Guide', file: 'docs/developer/README.md', order: 50 },
    { slug: 'dev-setup', title: 'Development Setup', category: 'Developer Guide', file: 'docs/developer/setup.md', order: 51 },
    { slug: 'dev-workflow', title: 'Development Workflow', category: 'Developer Guide', file: 'docs/developer/workflow.md', order: 52 },
    { slug: 'dev-standards', title: 'Coding Standards', category: 'Developer Guide', file: 'docs/developer/coding-standards.md', order: 53 },
    { slug: 'dev-testing', title: 'Testing Methodology', category: 'Developer Guide', file: 'docs/developer/testing.md', order: 54 },
    { slug: 'dev-test-arch', title: 'Testing Architecture', category: 'Developer Guide', file: 'docs/developer/testing-architecture.md', order: 55 },
    { slug: 'dev-doc-style', title: 'Documentation Style Guide', category: 'Developer Guide', file: 'docs/developer/documentation-style.md', order: 56 },

    // --- 8. ARCHITECTURE DECISIONS (ADRs) ---
    { slug: 'adr-readme', title: 'ADR Index', category: 'Architecture Decisions', file: 'docs/adr/README.md', order: 57 },
    { slug: 'adr-decision-log', title: 'Architectural Decision Log', category: 'Architecture Decisions', file: 'docs/adr/decision-log.md', order: 58 },
    { slug: 'adr-001', title: 'ADR 001: Modular Monolith Architecture', category: 'Architecture Decisions', file: 'docs/adr/ADR-001-modular-monolith.md', order: 59 },
    { slug: 'adr-002', title: 'ADR 002: Celery & Redis Scheduler', category: 'Architecture Decisions', file: 'docs/adr/ADR-002-celery-redis-scheduler.md', order: 60 },
    { slug: 'adr-003', title: 'ADR 003: Fernet Secret Encryption', category: 'Architecture Decisions', file: 'docs/adr/ADR-003-fernet-secret-encryption.md', order: 61 },
    { slug: 'adr-004', title: 'ADR 004: Django Channels WebSockets', category: 'Architecture Decisions', file: 'docs/adr/ADR-004-django-channels-websocket.md', order: 62 },
    { slug: 'adr-005', title: 'ADR 005: Monorepo Directory Structure', category: 'Architecture Decisions', file: 'docs/adr/ADR-005-monorepo-structure.md', order: 63 },
    { slug: 'decisions-readme', title: 'Decisions Index', category: 'Architecture Decisions', file: 'docs/decisions/README.md', order: 64 },

    // --- 9. DIAGRAMS ---
    { slug: 'diagrams-readme', title: 'Diagrams Index', category: 'Diagrams', file: 'docs/diagrams/README.md', order: 65 },
    { slug: 'diagrams-system', title: 'System Architecture Diagram', category: 'Diagrams', file: 'docs/diagrams/system-architecture.md', order: 66 },
    { slug: 'diagrams-sequence', title: 'Sequence Diagrams', category: 'Diagrams', file: 'docs/diagrams/sequence-diagrams.md', order: 67 },
    { slug: 'diagrams-state', title: 'State Diagrams', category: 'Diagrams', file: 'docs/diagrams/state-diagrams.md', order: 68 },
    { slug: 'diagrams-er', title: 'Database ER Diagram', category: 'Diagrams', file: 'docs/diagrams/database-er.md', order: 69 },

    // --- 10. GUIDES & HOW-TOS ---
    { slug: 'guides-overview', title: 'Guides Index', category: 'Guides & How-Tos', file: 'docs/guides/README.md', order: 70 },
    { slug: 'guide-whatsapp-setup', title: 'WhatsApp Cloud API Setup Guide', category: 'Guides & How-Tos', file: 'docs/guides/whatsapp-cloud-api-setup.md', order: 71 },
    { slug: 'guide-creating-campaigns', title: 'Creating Broadcast Campaigns Guide', category: 'Guides & How-Tos', file: 'docs/guides/creating-campaigns.md', order: 72 },
    { slug: 'guide-managing-tenants', title: 'Managing Tenants & RBAC Guide', category: 'Guides & How-Tos', file: 'docs/guides/managing-tenants.md', order: 73 },

    // --- 11. OPERATIONS & RUNBOOKS ---
    { slug: 'operations-overview', title: 'Operations Index', category: 'Operations & Runbooks', file: 'docs/operations/README.md', order: 74 },
    { slug: 'op-deployment', title: 'Production Deployment Guide', category: 'Operations & Runbooks', file: 'docs/operations/deployment.md', order: 75 },
    { slug: 'op-monitoring', title: 'System Monitoring & Metrics', category: 'Operations & Runbooks', file: 'docs/operations/monitoring.md', order: 76 },
    { slug: 'op-performance', title: 'Performance & Tuning', category: 'Operations & Runbooks', file: 'docs/operations/performance.md', order: 77 },
    { slug: 'op-backup', title: 'Backup & Disaster Recovery', category: 'Operations & Runbooks', file: 'docs/operations/backup-recovery.md', order: 78 },
    { slug: 'op-scaling', title: 'Scaling & High Availability', category: 'Operations & Runbooks', file: 'docs/operations/scaling.md', order: 79 },
    { slug: 'deployment-readme', title: 'Deployment Index', category: 'Operations & Runbooks', file: 'docs/deployment/README.md', order: 80 },
    { slug: 'runbooks-overview', title: 'Runbooks Index', category: 'Operations & Runbooks', file: 'docs/operations/runbooks/README.md', order: 81 },
    { slug: 'runbook-webhooks', title: 'Runbook: Handle Webhook Outages', category: 'Operations & Runbooks', file: 'docs/operations/runbooks/handle-webhook-outages.md', order: 82 },
    { slug: 'runbook-broadcasts', title: 'Runbook: Recover Broadcasts', category: 'Operations & Runbooks', file: 'docs/operations/runbooks/recover-broadcasts.md', order: 83 },
    { slug: 'runbook-celery', title: 'Runbook: Restart Celery Workers', category: 'Operations & Runbooks', file: 'docs/operations/runbooks/restart-celery.md', order: 84 },
    { slug: 'runbook-restore', title: 'Runbook: Restore Database Backups', category: 'Operations & Runbooks', file: 'docs/operations/runbooks/restore-backups.md', order: 85 },
    { slug: 'runbook-keys', title: 'Runbook: Rotate Fernet Keys', category: 'Operations & Runbooks', file: 'docs/operations/runbooks/rotate-fernet-keys.md', order: 86 },

    // --- 12. TUTORIALS ---
    { slug: 'tutorials-overview', title: 'Tutorials Index', category: 'Tutorials', file: 'docs/tutorials/README.md', order: 87 },
    { slug: 'tut-first-campaign', title: 'Walkthrough: First Campaign', category: 'Tutorials', file: 'docs/tutorials/first-campaign-walkthrough.md', order: 88 },
    { slug: 'tut-ai-chatbot', title: 'Tutorial: AI Chatbot Setup', category: 'Tutorials', file: 'docs/tutorials/ai-chatbot-setup-tutorial.md', order: 89 },

    // --- 13. EXAMPLES, FAQ & REFERENCE ---
    { slug: 'examples-readme', title: 'Examples Index', category: 'Examples & Reference', file: 'docs/examples/README.md', order: 90 },
    { slug: 'ex-api-requests', title: 'API Request Examples (cURL, JS, Python)', category: 'Examples & Reference', file: 'docs/examples/api-requests.md', order: 91 },
    { slug: 'ex-env-configs', title: 'Environment Config Examples', category: 'Examples & Reference', file: 'docs/examples/env-configs.md', order: 92 },
    { slug: 'faq-readme', title: 'FAQ Index', category: 'Examples & Reference', file: 'docs/faq/README.md', order: 93 },
    { slug: 'faq-troubleshooting', title: 'Troubleshooting Guide', category: 'Examples & Reference', file: 'docs/faq/troubleshooting.md', order: 94 },
    { slug: 'changelog-readme', title: 'Changelog Index', category: 'Examples & Reference', file: 'docs/changelog/README.md', order: 95 },
    { slug: 'changelog-full', title: 'Release History & Changelog', category: 'Examples & Reference', file: 'docs/changelog/CHANGELOG.md', order: 96 },
    { slug: 'glossary-readme', title: 'Glossary Index', category: 'Examples & Reference', file: 'docs/glossary/README.md', order: 97 },
    { slug: 'glossary-full', title: 'Technical Terms & Glossary', category: 'Examples & Reference', file: 'docs/glossary/GLOSSARY.md', order: 98 },
    { slug: 'onboarding', title: 'Engineer Onboarding Guide', category: 'Examples & Reference', file: 'docs/onboarding/README.md', order: 99 },
    { slug: 'security-overview', title: 'Security Policy & Disclosure', category: 'Examples & Reference', file: 'docs/security/README.md', order: 100 },
    { slug: 'scaling-readme', title: 'Scaling Architecture', category: 'Examples & Reference', file: 'docs/scaling/README.md', order: 101 },
  ];

  const docMapping: Record<string, { owner: string; repo: string; docs: Array<{ slug: string; title: string; category?: string; file: string; order: number }> }> = {
    'cartera': {
      owner: 'omghante',
      repo: 'cartera',
      docs: [
        { slug: 'getting-started', title: 'System Specs & Financial Microservices', category: 'Getting Started', file: 'README.md', order: 1 },
      ],
    },
    'metapilot': {
      owner: 'omghante',
      repo: 'metapilot',
      docs: metaPilotDocs,
    },
    'meta-pilot': {
      owner: 'omghante',
      repo: 'metapilot',
      docs: metaPilotDocs,
    },
    'patch-ai': {
      owner: 'omghante',
      repo: 'patch.ai',
      docs: [
        { slug: 'getting-started', title: 'Autonomous Self-Healing AI Engine Specs', category: 'Getting Started', file: 'README.md', order: 1 },
      ],
    },
    'patchai': {
      owner: 'omghante',
      repo: 'patch.ai',
      docs: [
        { slug: 'getting-started', title: 'Autonomous Self-Healing AI Engine Specs', category: 'Getting Started', file: 'README.md', order: 1 },
      ],
    },
    'paper': {
      owner: 'artificialpaper',
      repo: 'paper-core',
      docs: [
        { slug: 'getting-started', title: 'Paper Core & Agent Trajectories', category: 'Getting Started', file: 'README.md', order: 1 },
      ],
    },
    'reecall-ai': {
      owner: 'omghante',
      repo: 'reecall.ai',
      docs: [
        { slug: 'getting-started', title: 'Neural Repository Memory Engine Specs', category: 'Getting Started', file: 'README.md', order: 1 },
      ],
    },
    'reecallai': {
      owner: 'omghante',
      repo: 'reecall.ai',
      docs: [
        { slug: 'getting-started', title: 'Neural Repository Memory Engine Specs', category: 'Getting Started', file: 'README.md', order: 1 },
      ],
    },
    'tide-os': {
      owner: 'omghante',
      repo: 'tide-os',
      docs: [
        { slug: 'getting-started', title: 'Cloud Sandboxing Architecture', category: 'Getting Started', file: 'README.md', order: 1 },
      ],
    },
    'git-context': {
      owner: 'omghante',
      repo: 'git-context.npmpkg',
      docs: [
        { slug: 'getting-started', title: 'CLI Usage & Multi-Account Setup', category: 'Getting Started', file: 'README.md', order: 1 },
      ],
    },
  };

  const projectConfig = docMapping[projectName.toLowerCase().replace(/[^a-z0-9]/g, '')] || docMapping['metapilot'];

  const docs = await Promise.all(
    projectConfig.docs.map(async (doc) => {
      try {
        const content = await fetchGitHubMarkdown(projectConfig.repo, doc.file, projectConfig.owner);
        return {
          project: projectName,
          slug: doc.slug,
          title: doc.title,
          category: doc.category || 'Documentation',
          description: `Live technical documentation fetched from GitHub repository ${projectConfig.owner}/${projectConfig.repo}/${doc.file}`,
          order: doc.order,
          repoUrl: `https://github.com/${projectConfig.owner}/${projectConfig.repo}/blob/main/${doc.file}`,
          rawUrl: `https://raw.githubusercontent.com/${projectConfig.owner}/${projectConfig.repo}/main/${doc.file}`,
          content,
        };
      } catch {
        return {
          project: projectName,
          slug: doc.slug,
          title: doc.title,
          category: doc.category || 'Documentation',
          description: `Live technical documentation fetched from GitHub repository ${projectConfig.owner}/${projectConfig.repo}/${doc.file}`,
          order: doc.order,
          repoUrl: `https://github.com/${projectConfig.owner}/${projectConfig.repo}/blob/main/${doc.file}`,
          rawUrl: `https://raw.githubusercontent.com/${projectConfig.owner}/${projectConfig.repo}/main/${doc.file}`,
          content: `# ${doc.title}\n\nDocumentation for ${doc.title}.`,
        };
      }
    })
  );

  return docs;
}

export async function getGitHubDocBySlug(projectName: string, docSlug: string): Promise<GitHubDoc | null> {
  try {
    const docs = await getGitHubDocs(projectName);
    const existing = docs.find((d) => d.slug === docSlug);
    if (existing) return existing;

    // Dynamic resolution fallback for all 250+ repository docs
    const possiblePaths = [
      `docs/${docSlug}.md`,
      `docs/${docSlug}/README.md`,
      `docs/${docSlug.replace(/-/g, '/')}.md`,
      `${docSlug.toUpperCase()}.md`,
      `docs/${docSlug.toUpperCase()}.md`,
    ];

    for (const filePath of possiblePaths) {
      const content = await fetchGitHubMarkdown('metapilot', filePath, 'omghante');
      if (content && !content.includes('Live repository synced content')) {
        const title = docSlug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        return {
          project: projectName,
          slug: docSlug,
          title,
          category: 'Repository Documentation',
          description: `Live technical documentation fetched from GitHub repository omghante/metapilot/${filePath}`,
          order: 999,
          repoUrl: `https://github.com/omghante/metapilot/blob/main/${filePath}`,
          rawUrl: `https://raw.githubusercontent.com/omghante/metapilot/main/${filePath}`,
          content,
        };
      }
    }

    return docs[0] || null;
  } catch {
    return null;
  }
}
