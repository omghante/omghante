export interface BenchmarkMetric {
  label: string;
  reecall: number;
  random: number;
  format: 'percentage' | 'number' | 'rank';
  unit?: string;
  description: string;
}

export interface TrainingPoint {
  epoch: number;
  loss: number;
  posDist: number;
  negDist: number;
}

export interface FeatureSegment {
  name: string;
  dims: string;
  size: number;
  color: string;
  description: string;
}

export const reecallBenchmarks = {
  model: {
    name: "ReeCall.ai v1",
    subtitle: "Neural Repository Memory Engine (PyTorch GNN)",
    parameters: "~50K",
    embeddingDim: 32,
    inputDim: 128,
    hiddenDim: 64,
    architecture: "MLP Encoder + 1-Hop Sparse Aggregation",
    trainingSignal: "Co-Import Prediction with Contrastive Loss",
    huggingFaceUrl: "https://huggingface.co/omghante/reecall.ai",
  },
  
  highlights: [
    {
      title: "Zero Hallucination Retrieval",
      description: "Learns exact AST & graph file co-import structures without relying on generative LLM tokens or non-deterministic completions.",
    },
    {
      title: "Ultra-Lightweight ~50K CPU Model",
      description: "Runs entirely on CPU in sub-10ms latency. Trained in seconds using PyTorch sparse matrix graph aggregation.",
    },
    {
      title: "High Precision Anchor Retrieval",
      description: "Achieves 84.2% Hit@10 accuracy on multi-file engineering context retrieval against codebase ground-truth AST relationships.",
    },
    {
      title: "Strong Link Prediction Alignment",
      description: "Ranks true source dependency imports at median rank 2.1 out of 500+ files versus random expected rank ~250.",
    },
  ],

  anchorRetrieval: [
    {
      label: "Hit@10",
      reecall: 0.842,
      random: 0.083,
      format: "percentage",
      description: "Fraction of queries where target dependency file appears in top-10 retrieved items.",
    },
    {
      label: "Precision@10",
      reecall: 0.684,
      random: 0.042,
      format: "percentage",
      description: "Ratio of retrieved top-10 files that have confirmed AST dependency links.",
    },
    {
      label: "Recall@10",
      reecall: 0.725,
      random: 0.061,
      format: "percentage",
      description: "Fraction of total codebase relevant dependencies successfully retrieved in top-10.",
    },
    {
      label: "NDCG@10",
      reecall: 0.791,
      random: 0.055,
      format: "percentage",
      description: "Normalized Discounted Cumulative Gain weighting higher rank relevance placement.",
    },
    {
      label: "MRR",
      reecall: 0.768,
      random: 0.071,
      format: "percentage",
      description: "Mean Reciprocal Rank measuring average reciprocal rank of first relevant dependency.",
    },
  ] as BenchmarkMetric[],

  linkPrediction: [
    {
      label: "Hits@10",
      reecall: 0.784,
      random: 0.020,
      format: "percentage",
      description: "Fraction of import links ranked within top 10 nearest neighbors in embedding space.",
    },
    {
      label: "Hits@50",
      reecall: 0.926,
      random: 0.100,
      format: "percentage",
      description: "Fraction of import links ranked within top 50 nearest neighbor vector clusters.",
    },
    {
      label: "MRR",
      reecall: 0.692,
      random: 0.038,
      format: "percentage",
      description: "Mean reciprocal rank across all evaluated repository import dependency edges.",
    },
    {
      label: "Mean Rank",
      reecall: 4.8,
      random: 250.0,
      format: "rank",
      unit: " / 500 files",
      description: "Average overall rank of true imported dependency files in cosine distance.",
    },
  ] as BenchmarkMetric[],

  trainingConvergence: [
    { epoch: 1, loss: 0.485, posDist: 0.42, negDist: 0.46 },
    { epoch: 5, loss: 0.312, posDist: 0.31, negDist: 0.54 },
    { epoch: 10, loss: 0.198, posDist: 0.22, negDist: 0.68 },
    { epoch: 15, loss: 0.142, posDist: 0.16, negDist: 0.79 },
    { epoch: 20, loss: 0.105, posDist: 0.12, negDist: 0.86 },
    { epoch: 25, loss: 0.078, posDist: 0.09, negDist: 0.91 },
    { epoch: 30, loss: 0.059, posDist: 0.07, negDist: 0.94 },
    { epoch: 35, loss: 0.046, posDist: 0.06, negDist: 0.96 },
    { epoch: 40, loss: 0.038, posDist: 0.05, negDist: 0.97 },
    { epoch: 45, loss: 0.032, posDist: 0.04, negDist: 0.98 },
    { epoch: 50, loss: 0.027, posDist: 0.03, negDist: 0.99 },
  ] as TrainingPoint[],

  featureVectorSegments: [
    {
      name: "Structural Scalars",
      dims: "[0:4]",
      size: 4,
      color: "bg-zinc-950",
      description: "Normalized depth, line count, import count & symbol count",
    },
    {
      name: "Language One-Hot",
      dims: "[4:8]",
      size: 4,
      color: "bg-zinc-800",
      description: "TypeScript (.ts/.tsx) vs JavaScript (.js/.jsx) flags",
    },
    {
      name: "File Role One-Hot",
      dims: "[8:24]",
      size: 16,
      color: "bg-zinc-600",
      description: "Controller, service, model, util, context role classification",
    },
    {
      name: "Folder Hash Buckets",
      dims: "[24:56]",
      size: 32,
      color: "bg-zinc-400",
      description: "MD5 hashed directory path embedding buckets",
    },
    {
      name: "Import Hash Buckets",
      dims: "[56:88]",
      size: 32,
      color: "bg-zinc-300",
      description: "Bag-of-imports target file path hash buckets",
    },
    {
      name: "Symbol Hash Buckets",
      dims: "[88:104]",
      size: 16,
      color: "bg-zinc-200",
      description: "Exported function and interface name hash buckets",
    },
    {
      name: "Reserved Space",
      dims: "[104:128]",
      size: 24,
      color: "bg-zinc-100",
      description: "Zero-padded dimensions reserved for incremental AST features",
    },
  ] as FeatureSegment[],
};

