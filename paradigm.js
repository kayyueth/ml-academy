const PARADIGMS = [
  {
    n: '自监督预训练', en: 'Self-supervised Pretraining', dot: '#7F77DD', open: true,
    items: [
      {
        n: '自回归语言模型', en: 'Causal LM (CLM)',
        d: '预测下一个token，单向注意力掩码，天然适合生成任务。GPT系列的核心范式，现代LLM的主流选择。',
        en_d: 'Predicts the next token using a unidirectional (left-to-right) attention mask. Each position can only attend to previous tokens, making it naturally suited for text generation.',
        bestFor: 'Text generation, chat assistants, code completion, and any autoregressive task.',
        tradeoff: 'Cannot attend to future tokens during training — less effective than MLM for classification and embedding tasks that benefit from bidirectional context.',
        reps: ['GPT-4o', 'Llama 3', 'Qwen 2.5', 'Mistral', 'Gemma 2'],
      },
      {
        n: '掩码语言模型', en: 'Masked LM (MLM)',
        d: '随机遮盖15%的token后预测，双向上下文理解，适合分类/理解/嵌入任务。',
        en_d: 'Randomly masks ~15% of input tokens and predicts them using full bidirectional context. Produces rich contextual embeddings for every token simultaneously.',
        bestFor: 'Text classification, named entity recognition, semantic search, and dense retrieval embeddings.',
        tradeoff: 'Cannot generate text autoregressively — MLM models are encoders, not decoders. Masked token objective does not transfer naturally to generation.',
        reps: ['BERT', 'RoBERTa', 'DeBERTa', 'ELECTRA', 'ModernBERT'],
      },
      {
        n: '对比学习', en: 'Contrastive Learning',
        d: '拉近相似样本嵌入、推远不相关样本，是跨模态对齐（图文/语音）的核心范式。',
        en_d: 'Trains a model to pull embeddings of positive pairs (similar samples) closer together and push negative pairs apart in the representation space.',
        bestFor: 'Cross-modal alignment (image-text, audio-text), zero-shot classification, and dense retrieval.',
        tradeoff: 'Highly sensitive to negative mining strategy — easy negatives don\'t drive learning, while false negatives harm it. Requires large batch sizes for quality.',
        reps: ['CLIP', 'SigLIP', 'ALIGN', 'CoCa', 'ImageBind'],
      },
      {
        n: '扩散模型训练', en: 'Diffusion Pretraining',
        d: '学习逐步去噪的反向扩散过程，建模数据生成分布，是图像/视频/音频生成的主流范式。',
        en_d: 'Learns to reverse a gradual Gaussian noising process over many timesteps, modeling the full data distribution by predicting the noise at each step.',
        bestFor: 'High-fidelity image, video, and audio generation with fine-grained controllability.',
        tradeoff: 'Iterative sampling (many denoising steps) makes inference much slower than autoregressive models. Distillation methods like DDIM and LCM partially address this.',
        reps: ['Stable Diffusion', 'DALL·E 3', 'Sora', 'Flux', 'Mochi'],
      },
    ],
  },
  {
    n: '对齐训练', en: 'Alignment Training', dot: '#534AB7', open: true,
    items: [
      {
        n: '有监督微调', en: 'SFT',
        d: '用高质量 instruction→response 对做监督训练，教会模型"怎么格式化回答"。所有对齐方法的必要前置步骤。',
        en_d: 'Supervised training on curated instruction→response pairs. Teaches the model desired output format, style, and behavior. The mandatory first step before RLHF or DPO.',
        bestFor: 'Any instruction-following task. Required baseline before applying preference optimization.',
        tradeoff: 'Quality ceiling is set by the dataset — expensive to collect high-quality demonstrations, and models can overfit to surface patterns without true understanding.',
        reps: ['Alpaca', 'Vicuna', 'Open-Hermes', 'Dolphin', 'Capybara'],
      },
      {
        n: '人类反馈强化学习', en: 'RLHF',
        d: '人工标注偏好→训练奖励模型→PPO优化策略。效果强但需三个独立模型，计算成本极高。',
        en_d: 'Human annotators rank model outputs → a reward model is trained on those preferences → PPO optimizes the policy to maximize the reward signal while staying near the SFT baseline.',
        bestFor: 'High-stakes helpfulness and safety alignment where human judgment is the ground truth.',
        tradeoff: 'Requires three separate model training runs (SFT, RM, policy) and is vulnerable to reward hacking — the policy can exploit the reward model\'s weaknesses.',
        reps: ['InstructGPT', 'Llama 2-Chat', 'Claude 1/2', 'Sparrow'],
      },
      {
        n: 'AI反馈强化学习', en: 'RLAIF / CAI',
        d: '以更强AI替代人工打分；Anthropic的Constitutional AI用原则让模型自我批评修订，大幅降低标注成本。',
        en_d: 'Replaces human annotators with a stronger AI judge. Anthropic\'s Constitutional AI (CAI) adds a written set of principles and has the model self-critique and revise its outputs.',
        bestFor: 'Scalable alignment pipelines that cannot afford large-scale human annotation.',
        tradeoff: 'The AI judge propagates its own biases and blind spots. Critique quality depends heavily on the quality of the constitution or the judge model itself.',
        reps: ['Constitutional AI', 'Claude 3+', 'Gemini', 'Starling'],
      },
      {
        n: '直接偏好优化', en: 'DPO / ORPO',
        d: '绕过奖励模型，直接从偏好对(chosen/rejected)优化策略。只需一个模型，比RLHF更稳定、成本更低。',
        en_d: 'Eliminates the reward model entirely. Derives an implicit reward from the policy itself and optimizes directly on (chosen, rejected) response pairs with a single model.',
        bestFor: 'Practical alignment with limited compute — same effect as RLHF for many tasks at a fraction of the cost.',
        tradeoff: 'Less flexible than RLHF: cannot incorporate dynamic online feedback or custom reward shaping. Can be sensitive to the quality of preference pairs.',
        reps: ['Zephyr', 'Tulu 2', 'Mistral-Instruct', 'Phi-3', 'Llama 3-Instruct'],
      },
      {
        n: '群组相对策略优化', en: 'GRPO',
        d: '对同一问题生成多组回答相互比较，省去价值函数网络，专为推理型任务设计，效果显著。',
        en_d: 'Generates a group of responses per prompt and uses their relative quality as the reward signal, eliminating the need for a separate value/critic network.',
        bestFor: 'Math reasoning, code generation, and structured output tasks where correctness can be verified programmatically.',
        tradeoff: 'Requires many parallel generations per prompt, increasing compute cost. Quality degrades with very small group sizes or when scoring is ambiguous.',
        reps: ['DeepSeek-R1', 'Qwen-QwQ', 'Sky-T1', 'Kimi k1.5'],
      },
    ],
  },
  {
    n: '参数高效微调', en: 'PEFT — Parameter-Efficient Fine-Tuning', dot: '#1D9E75', open: false,
    items: [
      {
        n: 'LoRA / QLoRA', en: 'Low-Rank Adaptation',
        d: '在权重旁注入低秩矩阵 ΔW=AB，只训练A和B，可训练参数减少90%以上。QLoRA用4-bit量化进一步压缩显存。',
        en_d: 'Injects trainable low-rank matrices A and B alongside each frozen weight matrix W, so the effective update is ΔW = AB. QLoRA adds 4-bit NF4 quantization of the base model.',
        bestFor: 'Fine-tuning 7B–70B models on a single GPU or small multi-GPU setup with minimal accuracy loss.',
        tradeoff: 'Low-rank constraint limits update capacity — very complex task distributions may require higher rank or full fine-tuning to reach the performance ceiling.',
        reps: ['LoRA', 'QLoRA', 'DoRA', 'LLaMA-Factory', 'Unsloth'],
      },
      {
        n: '提示/前缀微调', en: 'Prompt / Prefix Tuning',
        d: '在输入前拼接可学习的软提示向量，模型权重完全冻结，适合超低资源场景或多任务切换。',
        en_d: 'Prepends a sequence of trainable soft-prompt vectors to the input (or to each layer\'s key/value in prefix tuning). All original model weights remain completely frozen.',
        bestFor: 'Extremely low-resource settings or multi-task serving where many adapters must be hot-swapped without reloading the base model.',
        tradeoff: 'Soft prompts are hard to interpret and sensitive to initialization. Generally underperforms LoRA on complex tasks by a meaningful margin.',
        reps: ['Prefix-Tuning', 'P-Tuning v2', 'Prompt Tuning', 'PowerInfer'],
      },
      {
        n: '适配器层', en: 'Adapter Layers',
        d: '在每个Transformer层中插入小型瓶颈MLP，只训练这些适配器，权重冻结，支持任务热插拔。',
        en_d: 'Inserts small bottleneck MLP modules (down-project → nonlinearity → up-project) inside each Transformer layer. Only adapter parameters are trained; the base remains frozen.',
        bestFor: 'Multi-task learning where different task adapters need to be swapped at inference time without reloading the base model.',
        tradeoff: 'Adds a small inference latency overhead per layer. Fewer trainable parameters than LoRA, so may underperform on tasks requiring larger representational shifts.',
        reps: ['Adapter-BERT', 'AdapterHub', 'MAD-X', 'Compacter'],
      },
      {
        n: '全参数微调', en: 'Full Fine-Tuning',
        d: '更新所有权重，效果上限最高但需大显存，通常配合梯度检查点、混合精度训练和ZeRO内存优化。',
        en_d: 'Updates every parameter in the model. Provides the highest performance ceiling but demands significant GPU memory — typically requires gradient checkpointing, BF16, and ZeRO optimizer sharding.',
        bestFor: 'Maximum accuracy when VRAM and compute are not constraints, or when the task distribution is very far from pretraining.',
        tradeoff: 'Risk of catastrophic forgetting of general capabilities. At large scale, requires distributed training infrastructure (FSDP, Megatron) and careful hyperparameter tuning.',
        reps: ['DeepSpeed ZeRO', 'Megatron-LM', 'FSDP', 'Axolotl'],
      },
    ],
  },
  {
    n: '联邦与隐私训练', en: 'Federated & Privacy-Preserving', dot: '#D4537E', open: false,
    items: [
      {
        n: '横向联邦学习', en: 'Horizontal FL',
        d: '各方数据特征相同但样本不同（如各医院的患者记录），FedAvg聚合各端梯度后全局平均，数据不出本地。',
        en_d: 'All participants share the same feature schema but hold different samples (e.g., hospitals each have patient records). FedAvg aggregates local gradients into a global average without raw data leaving each node.',
        bestFor: 'Healthcare, mobile devices, and any scenario with privacy-sensitive, same-schema data siloed across institutions.',
        tradeoff: 'Non-IID data distributions cause client drift — local optima diverge from the global optimum. FedAvg degrades significantly without careful tuning or variance-reduction techniques.',
        reps: ['FedAvg', 'FedProx', 'FedNova', 'FATE', 'PySyft'],
      },
      {
        n: '纵向联邦学习', en: 'Vertical FL',
        d: '各方持有相同用户的不同特征（如银行+电商），通过加密ID对齐后联合训练，各持部分网络。',
        en_d: 'Participants hold different feature sets for the same user population (e.g., a bank and an e-commerce platform). Encrypted entity alignment enables joint training where each party owns part of the network.',
        bestFor: 'Cross-institutional collaboration where combining complementary features would improve models but data cannot be shared.',
        tradeoff: 'Encrypted ID alignment infrastructure is complex and slow. Communication overhead is high because intermediate activations must be exchanged every forward pass.',
        reps: ['FedBCD', 'FATE-VFL', 'SplitNN', 'SecureBoost'],
      },
      {
        n: '差分隐私训练', en: 'DP-SGD',
        d: '向梯度添加校准Gaussian噪声，使攻击者无法从模型参数逆向还原训练样本，以隐私预算ε量化保护强度。',
        en_d: 'Clips per-sample gradients to bound sensitivity, then adds calibrated Gaussian noise before aggregation. The privacy budget ε quantifies how much information leaks: smaller ε = stronger privacy.',
        bestFor: 'Any training scenario with strict legal privacy requirements (GDPR, HIPAA) where membership inference attacks are a real concern.',
        tradeoff: 'Noise injection hurts accuracy — especially on small datasets or complex tasks. There is a fundamental privacy-utility trade-off that worsens as ε decreases.',
        reps: ['DP-SGD', 'Opacus', 'TF Privacy', 'PATE', 'Google DP Library'],
      },
      {
        n: '安全聚合', en: 'Secure Aggregation',
        d: '用密码学掩码协议使服务器只能看到所有客户端梯度的总和，无法看到任何单个客户端的更新内容。',
        en_d: 'Each client masks its gradient update with cryptographic secrets shared with peers. The server can compute only the unmasked sum — no individual client\'s gradient is ever revealed.',
        bestFor: 'Federated settings where even the aggregating server must not see individual model updates.',
        tradeoff: 'High communication and cryptographic overhead. The protocol breaks if too many clients drop out mid-round, requiring expensive recovery mechanisms.',
        reps: ['SecAgg', 'Flamingo', 'PPML', 'CrypTen'],
      },
    ],
  },
  {
    n: '持续与增量学习', en: 'Continual & Lifelong Learning', dot: '#BA7517', open: false,
    items: [
      {
        n: '弹性权重巩固', en: 'EWC',
        d: '用Fisher信息矩阵标记对旧任务重要的权重，新任务训练时对这些权重施加弹性惩罚，防止灾难性遗忘。',
        en_d: 'Uses the Fisher information matrix to identify which weights are most important for previously learned tasks, then adds a quadratic penalty on those weights during new task training.',
        bestFor: 'Continual learning in low-memory environments where storing replay buffers is impractical.',
        tradeoff: 'Fisher matrix computation is expensive and approximate. The quadratic penalty may be insufficient when new tasks are very different, leading to residual forgetting.',
        reps: ['EWC', 'SI', 'Online EWC', 'MAS', 'RWalk'],
      },
      {
        n: '经验回放', en: 'Experience Replay',
        d: '维护旧任务的小型样本缓冲区，与新数据混合训练，是抗遗忘最简单有效的方案。',
        en_d: 'Maintains a small memory buffer of past task examples and mixes them into every training batch alongside new data. Simple but often the strongest baseline in practice.',
        bestFor: 'Any continual learning scenario where a small fixed-size memory buffer is feasible.',
        tradeoff: 'Buffer size limits what the model can remember. Selecting truly representative samples to retain is non-trivial; naive random selection often works surprisingly well.',
        reps: ['DER', 'Co²L', 'GDumb', 'AGEM', 'Rainbow Memory'],
      },
      {
        n: '渐进式神经网络', en: 'Progressive NN',
        d: '每个新任务扩展新子网络列，通过横向连接利用旧知识，彻底杜绝遗忘但模型持续增大。',
        en_d: 'Allocates a new network column for each task, connected to all previous columns via lateral adapters. Old column weights are frozen, so forgetting is structurally impossible.',
        bestFor: 'Settings with a strict no-forgetting requirement and a fixed, known number of tasks.',
        tradeoff: 'Model size grows linearly with the number of tasks. Not scalable to many tasks, and lateral connections add inference overhead as the model grows.',
        reps: ['PNN', 'PackNet', 'DEN', 'HAT', 'Piggyback'],
      },
      {
        n: '检索增强学习', en: 'RAG Fine-Tuning',
        d: '让模型学会"检索而非记忆"，知识存在外部向量库，可随时更新而无需重新训练整个模型。',
        en_d: 'Fine-tunes the model to retrieve relevant documents from an external vector store and condition its generation on them, externalizing factual knowledge from model weights.',
        bestFor: 'Knowledge-intensive tasks where facts change frequently — the knowledge base can be updated without any retraining.',
        tradeoff: 'Generation quality is bounded by retrieval quality. Noisy or irrelevant retrieved documents actively harm outputs, and retrieval adds latency.',
        reps: ['REALM', 'RETRO', 'Atlas', 'Self-RAG', 'FiD'],
      },
    ],
  },
  {
    n: '模型压缩与知识迁移', en: 'Compression & Knowledge Transfer', dot: '#888780', open: false,
    items: [
      {
        n: '知识蒸馏', en: 'Knowledge Distillation',
        d: '用Teacher大模型的软标签（logits分布）指导Student小模型，软标签携带类间关系信息，优于one-hot训练。',
        en_d: 'A large Teacher model\'s full output distribution (soft labels / logits) is used to train a smaller Student. Soft labels encode inter-class relationships that hard one-hot labels lose.',
        bestFor: 'Compressing a high-quality large model into a smaller one for edge, mobile, or latency-constrained deployment.',
        tradeoff: 'Student quality is fundamentally bounded by the teacher — and the teacher must be available during Student training, adding infrastructure cost.',
        reps: ['DistilBERT', 'TinyBERT', 'MiniLLM', 'DistiLlama', 'Gemma 2'],
      },
      {
        n: '量化感知训练', en: 'QAT',
        d: '训练时模拟INT4/INT8量化误差，让模型学会对低精度友好，推理时精度损失比训练后量化更小。',
        en_d: 'Simulates INT4/INT8 quantization error during the forward pass using fake-quantize operations, so gradients flow through and the model learns to be robust to low-precision arithmetic.',
        bestFor: 'Deploying on INT4/INT8 accelerators (mobile NPUs, edge hardware) with minimal accuracy degradation compared to FP16.',
        tradeoff: 'Requires a full training run with quantization simulation — significantly more expensive than post-training quantization (PTQ), which just calibrates a already-trained model.',
        reps: ['GPTQ', 'AWQ', 'LLM.int8()', 'bitsandbytes', 'GGUF'],
      },
      {
        n: '结构化剪枝', en: 'Structured Pruning',
        d: '删除整个注意力头、FFN神经元或Transformer层，输出仍为标准架构，可直接在通用硬件加速。',
        en_d: 'Removes entire structural units — attention heads, FFN hidden dimensions, or full Transformer layers — producing a smaller but architecturally standard model that runs efficiently on any hardware.',
        bestFor: 'Hardware-efficient deployment without requiring custom sparse kernels or special hardware support.',
        tradeoff: 'Aggressive pruning significantly hurts accuracy on complex tasks. Requires careful importance scoring and fine-tuning after pruning to recover performance.',
        reps: ['LLM-Pruner', 'SparseGPT', 'Wanda', 'ShortGPT', 'SliceGPT'],
      },
      {
        n: '神经架构搜索', en: 'NAS',
        d: '在参数量/延迟/功耗约束下自动搜索最优网络结构，产出精度-效率帕累托最优模型族。',
        en_d: 'Automatically searches a predefined architecture space for the optimal network design under hardware constraints (latency, FLOPs, parameter count), producing Pareto-optimal model families.',
        bestFor: 'Finding the accuracy-efficiency frontier for a specific deployment target when manually designed architectures may be suboptimal.',
        tradeoff: 'Traditional NAS search costs can be enormous. One-shot and proxy-free methods have reduced this significantly, but the search space design still requires expert knowledge.',
        reps: ['EfficientNet', 'Once-for-All', 'MNASNet', 'NASNet', 'AutoML Zero'],
      },
    ],
  },
];

// ── State ────────────────────────────────────────────────────
const viewed = new Set(JSON.parse(localStorage.getItem('ml-para-viewed') || '[]'));
let selCat = -1;
let selItem = -1;
const cardReg = []; // { catIndex, itemIndex, cardEl, secEl }

// Pipeline SVG node index → category index
const SVG_TO_CAT = [0, 1, 2, 5];
const CAT_TO_SVG = { 0: 0, 1: 1, 2: 2, 5: 3 };

// ── Persistence ──────────────────────────────────────────────
function saveViewed() {
  localStorage.setItem('ml-para-viewed', JSON.stringify([...viewed]));
}

function viewedKey(ci, ii) { return `${ci}-${ii}`; }

// ── Flat navigation ──────────────────────────────────────────
function flatItems() {
  const all = [];
  PARADIGMS.forEach((cat, ci) => cat.items.forEach((_, ii) => all.push({ ci, ii })));
  return all;
}

function currentFlatIndex() {
  return flatItems().findIndex(x => x.ci === selCat && x.ii === selItem);
}

function navigateDelta(delta) {
  const all = flatItems();
  const next = currentFlatIndex() + delta;
  if (next < 0 || next >= all.length) return;
  const { ci, ii } = all[next];
  const entry = cardReg.find(r => r.catIndex === ci && r.itemIndex === ii);
  if (entry) selectParadigm(ci, ii, entry.cardEl, false);
}

// ── SVG active state ─────────────────────────────────────────
function updateSVGActive(catIndex) {
  const nodes = document.querySelectorAll('.pnode');
  nodes.forEach((node, i) => {
    node.classList.toggle('pnode-active', SVG_TO_CAT[i] === catIndex);
  });
}

// ── Hero progress ────────────────────────────────────────────
function updateProgress() {
  const total = flatItems().length;
  document.getElementById('paraViewedCount').textContent = viewed.size;
  document.getElementById('paraViewedTotal').textContent = total;
  const pct = total > 0 ? (viewed.size / total) * 100 : 0;
  const fill = document.getElementById('paraProgressFill');
  if (fill) fill.style.width = pct + '%';
}

// ── Detail panel ─────────────────────────────────────────────
function renderDetail(ci, ii) {
  const cat = PARADIGMS[ci];
  const item = cat.items[ii];
  const key = viewedKey(ci, ii);
  const all = flatItems();
  const flatIdx = all.findIndex(x => x.ci === ci && x.ii === ii);
  const hasPrev = flatIdx > 0;
  const hasNext = flatIdx < all.length - 1;

  const content = document.getElementById('detailContent');
  content.classList.add('para-detail-exit');

  setTimeout(() => {
    content.innerHTML = `
      <div class="para-detail-top">
        <div class="para-detail-breadcrumb">
          <span class="para-dot-sm" style="background:${cat.dot}"></span>
          <span>${cat.en.split('—')[0].trim()}</span>
          <span class="para-breadcrumb-sep">›</span>
          <span>${item.en}</span>
        </div>
        ${viewed.has(key) ? '<span class="para-reviewed-badge">Reviewed ✓</span>' : ''}
      </div>

      <h2 class="para-detail-title">${item.n}</h2>
      <p class="para-detail-subtitle">${item.en}</p>

      <p class="para-detail-desc">${item.en_d}</p>

      <div class="para-highlights">
        <div class="para-highlight para-highlight-good">
          <span class="para-highlight-label">Best for</span>
          <span class="para-highlight-body">${item.bestFor}</span>
        </div>
        <div class="para-highlight para-highlight-warn">
          <span class="para-highlight-label">Key trade-off</span>
          <span class="para-highlight-body">${item.tradeoff}</span>
        </div>
      </div>

      <details class="para-chinese-details">
        <summary>Chinese original</summary>
        <p>${item.d}</p>
      </details>

      <div class="para-detail-models">
        <p class="eyebrow" style="margin:0 0 8px">Representative models &amp; tools</p>
        <div class="para-detail-reps">
          ${item.reps.map(r => `<span class="para-rep-tag">${r}</span>`).join('')}
        </div>
      </div>

      <div class="para-detail-nav">
        <button class="para-nav-btn" onclick="navigateDelta(-1)" ${!hasPrev ? 'disabled' : ''}>← Prev</button>
        <span class="para-nav-pos">${flatIdx + 1} / ${all.length}</span>
        <button class="para-nav-btn" onclick="navigateDelta(1)" ${!hasNext ? 'disabled' : ''}>Next →</button>
      </div>
    `;
    content.classList.remove('para-detail-exit');
    content.classList.add('para-detail-enter');
    setTimeout(() => content.classList.remove('para-detail-enter'), 300);
  }, 110);
}

// ── Select paradigm ──────────────────────────────────────────
function selectParadigm(ci, ii, cardEl, scrollToDetail = true) {
  // Deselect previous card
  if (selCat !== -1) {
    const prev = cardReg.find(r => r.catIndex === selCat && r.itemIndex === selItem);
    if (prev) prev.cardEl.classList.remove('selected');
  }

  selCat = ci;
  selItem = ii;
  cardEl.classList.add('selected');

  // Mark viewed
  const key = viewedKey(ci, ii);
  if (!viewed.has(key)) {
    viewed.add(key);
    saveViewed();
    const dot = cardEl.querySelector('.para-viewed-dot');
    if (dot) dot.classList.add('visible');
  }
  updateProgress();

  // Ensure section is open
  const entry = cardReg.find(r => r.catIndex === ci && r.itemIndex === ii);
  if (entry) {
    const h = entry.secEl.querySelector('.para-sech');
    const b = entry.secEl.querySelector('.para-secb');
    if (!h.classList.contains('open')) { h.classList.add('open'); b.classList.add('open'); }
  }

  updateSVGActive(ci);
  renderDetail(ci, ii);

  if (scrollToDetail && window.innerWidth <= 1120) {
    document.getElementById('detailPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ── Jump from SVG pipeline ───────────────────────────────────
function jumpToCategory(catIndex) {
  const secs = document.querySelectorAll('.para-sec');
  if (!secs[catIndex]) return;
  const h = secs[catIndex].querySelector('.para-sech');
  const b = secs[catIndex].querySelector('.para-secb');
  if (!h.classList.contains('open')) { h.classList.add('open'); b.classList.add('open'); }
  secs[catIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
  updateSVGActive(catIndex);
}

// ── Search / filter ──────────────────────────────────────────
function filterCards(q) {
  const query = q.toLowerCase().trim();
  const secs = document.querySelectorAll('.para-sec');

  cardReg.forEach(({ catIndex, itemIndex, cardEl }) => {
    const item = PARADIGMS[catIndex].items[itemIndex];
    const hit = !query
      || item.n.toLowerCase().includes(query)
      || item.en.toLowerCase().includes(query)
      || item.en_d.toLowerCase().includes(query)
      || item.bestFor.toLowerCase().includes(query)
      || item.reps.some(r => r.toLowerCase().includes(query));
    cardEl.style.display = hit ? '' : 'none';
  });

  PARADIGMS.forEach((_, ci) => {
    const secEl = secs[ci];
    const anyVisible = cardReg.some(r => r.catIndex === ci && r.cardEl.style.display !== 'none');
    secEl.style.display = anyVisible ? '' : 'none';
    if (query && anyVisible) {
      const h = secEl.querySelector('.para-sech');
      const b = secEl.querySelector('.para-secb');
      h.classList.add('open');
      b.classList.add('open');
    }
  });
}

// ── Render accordion ─────────────────────────────────────────
function renderAccordion() {
  const container = document.getElementById('paradigmList');

  PARADIGMS.forEach((cat, ci) => {
    const sec = document.createElement('div');
    sec.className = 'para-sec';

    const header = document.createElement('div');
    header.className = 'para-sech' + (cat.open ? ' open' : '');
    header.innerHTML = `
      <span class="para-dot" style="background:${cat.dot}"></span>
      <span class="para-name">${cat.en.split('—')[0].trim()}</span>
      <span class="para-count">${cat.items.length}</span>
      <svg class="para-chv" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <path d="M4 2l4 4-4 4"/>
      </svg>
    `;

    const body = document.createElement('div');
    body.className = 'para-secb' + (cat.open ? ' open' : '');

    const grid = document.createElement('div');
    grid.className = 'para-grid';

    cat.items.forEach((item, ii) => {
      const key = viewedKey(ci, ii);
      const isViewed = viewed.has(key);
      const card = document.createElement('div');
      card.className = 'para-card';
      card.innerHTML = `
        <div class="para-card-top">
          <p class="para-cn">${item.n}</p>
          <span class="para-viewed-dot${isViewed ? ' visible' : ''}">✓</span>
        </div>
        <p class="para-en">${item.en}</p>
        <div class="para-reps">
          ${item.reps.slice(0, 3).map(r => `<span class="para-rep">${r}</span>`).join('')}
          ${item.reps.length > 3 ? `<span class="para-rep">+${item.reps.length - 3}</span>` : ''}
        </div>
      `;
      card.onclick = () => selectParadigm(ci, ii, card);
      grid.appendChild(card);
      cardReg.push({ catIndex: ci, itemIndex: ii, cardEl: card, secEl: sec });
    });

    body.appendChild(grid);
    header.onclick = () => { header.classList.toggle('open'); body.classList.toggle('open'); };
    sec.appendChild(header);
    sec.appendChild(body);
    container.appendChild(sec);
  });

  updateProgress();
  document.getElementById('paraSearch').addEventListener('input', e => filterCards(e.target.value));
}

renderAccordion();
