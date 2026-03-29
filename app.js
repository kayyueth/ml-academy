const modules = [
  {
    id: "ml-1",
    track: "ML Basics",
    title: "What machine learning is really doing",
    summary: "Start with the core idea: using data to learn a mapping from inputs to outputs instead of hand-writing every rule.",
    paragraphs: [
      "Machine learning is a way to approximate patterns. You give an algorithm examples, and it adjusts internal parameters so that its predictions line up with those examples.",
      "In supervised learning, the training data includes labels. A model sees input features and tries to predict the label. The objective is not memorization but generalization: performing well on new samples.",
      "A useful mental model is function fitting. Inputs go in, predictions come out, and training nudges the function toward lower error."
    ],
    points: [
      { heading: "Features", body: "The measurable inputs used by the model." },
      { heading: "Labels", body: "The target values the model tries to predict." },
      { heading: "Generalization", body: "Performance on unseen data matters more than training performance." }
    ],
    quiz: {
      question: "Which statement best captures the goal of supervised learning?",
      options: [
        "Store every example exactly so the model can replay it later.",
        "Learn a rule from labeled data that performs well on unseen examples.",
        "Remove all randomness from the data before making predictions."
      ],
      answer: 1,
      explanation: "Supervised learning aims to learn from labeled examples and generalize beyond them."
    }
  },
  {
    id: "ml-2",
    track: "ML Basics",
    title: "Training, loss, and optimization",
    summary: "A model learns by minimizing a loss function that measures how wrong its predictions are.",
    paragraphs: [
      "The loss function turns prediction quality into a number. Higher loss means worse predictions. Training is the process of adjusting parameters to reduce that number.",
      "Optimization algorithms such as gradient descent estimate which direction reduces loss, then step the parameters that way. Repeating this across many batches moves the model toward a useful solution.",
      "The optimization path matters. Learning rate, initialization, and data ordering all influence whether training is stable or noisy."
    ],
    points: [
      { heading: "Loss", body: "A scalar penalty for bad predictions." },
      { heading: "Gradient", body: "An estimate of how parameters should change." },
      { heading: "Learning rate", body: "How large each optimization step is." }
    ],
    quiz: {
      question: "Why is the learning rate important?",
      options: [
        "It decides how much the model changes on each optimization step.",
        "It fixes the number of features in the dataset.",
        "It guarantees the model will never overfit."
      ],
      answer: 0,
      explanation: "If the learning rate is too large, training can diverge; if too small, progress is slow."
    }
  },
  {
    id: "ml-3",
    track: "ML Basics",
    title: "Overfitting, validation, and model quality",
    summary: "Strong machine learning practice depends on measuring whether the model is learning signal or merely memorizing noise.",
    paragraphs: [
      "Overfitting happens when a model performs well on training data but poorly on new data. This often occurs when the model captures noise, leakage, or accidental quirks.",
      "Validation data acts as a reality check. You hold back a portion of the data during training, then use it to estimate how well the model generalizes.",
      "Metrics should match the task. Classification often uses accuracy, log loss, or AUC. Ranking tasks may care more about correlation or ordering than raw point predictions."
    ],
    points: [
      { heading: "Validation split", body: "Separate data used for model selection." },
      { heading: "Regularization", body: "Methods that discourage fragile complexity." },
      { heading: "Metric alignment", body: "Choose metrics that reflect the real objective." }
    ],
    quiz: {
      question: "What is a common sign of overfitting?",
      options: [
        "High training performance but weak validation performance.",
        "Low training performance and low validation performance.",
        "The model uses fewer features than expected."
      ],
      answer: 0,
      explanation: "The model has likely learned training-specific noise rather than robust structure."
    }
  },
  {
    id: "fed-1",
    track: "Federated Learning",
    title: "Why federated learning exists",
    summary: "Federated learning is useful when data should remain local but models can still improve collectively.",
    paragraphs: [
      "Traditional training centralizes data on one server. Federated learning flips that: devices or institutions keep their data locally, train a local model update, and only share updates or gradients.",
      "This is valuable in settings such as mobile keyboards, hospitals, or banks where raw data is sensitive, regulated, or simply too large to move constantly.",
      "Federated learning is not automatic privacy. It reduces raw data movement, but updates can still leak information unless extra privacy and security techniques are added."
    ],
    points: [
      { heading: "Local training", body: "Each participant trains on its own data." },
      { heading: "Aggregation", body: "A server combines many local updates." },
      { heading: "Privacy limits", body: "No raw data sharing does not mean zero leakage." }
    ],
    quiz: {
      question: "What is the main structural difference in federated learning?",
      options: [
        "Raw data is sent to the server in compressed form.",
        "Models train locally and share updates instead of centralizing raw data.",
        "Only one device trains while the rest evaluate."
      ],
      answer: 1,
      explanation: "The defining idea is keeping data local while coordinating model improvement."
    }
  },
  {
    id: "fed-2",
    track: "Federated Learning",
    title: "Federated averaging and client updates",
    summary: "The standard baseline is Federated Averaging: clients train locally for a few steps, then a coordinator averages the updates.",
    paragraphs: [
      "Each round begins with a shared global model. Selected clients receive it, perform local training, and send updated weights or deltas back to the coordinator.",
      "The coordinator aggregates those updates, often weighting by local dataset size. The result becomes the next global model.",
      "This can reduce communication compared with sending every gradient step, but it introduces sensitivity to client imbalance and system heterogeneity."
    ],
    points: [
      { heading: "Rounds", body: "Training proceeds in repeated coordination cycles." },
      { heading: "Weighted average", body: "Larger local datasets often influence the global model more." },
      { heading: "Communication cost", body: "Rounds are expensive, so efficient update design matters." }
    ],
    quiz: {
      question: "Why might client updates be weighted during aggregation?",
      options: [
        "To make the server run faster regardless of accuracy.",
        "Because clients with more local data may provide more representative updates.",
        "To eliminate all bias in the final model."
      ],
      answer: 1,
      explanation: "Weighting by local data volume is a common approach in Federated Averaging."
    }
  },
  {
    id: "fed-3",
    track: "Federated Learning",
    title: "Challenges: non-IID data, privacy, and robustness",
    summary: "Real federated systems are difficult because client data is uneven, devices differ, and adversarial or unstable updates can damage the model.",
    paragraphs: [
      "Client data is often non-IID, meaning each participant sees a different distribution. One phone might mostly contain sports language, another mostly medical vocabulary. This makes aggregation harder.",
      "Secure aggregation and differential privacy help reduce information leakage, but they usually trade off some utility or complexity.",
      "Robust federated systems also need defenses against poisoned updates, dropped clients, and unreliable network conditions."
    ],
    points: [
      { heading: "Non-IID", body: "Client distributions differ substantially." },
      { heading: "Secure aggregation", body: "The server combines updates without seeing each one plainly." },
      { heading: "Robustness", body: "Systems must tolerate bad, missing, or malicious updates." }
    ],
    quiz: {
      question: "What does non-IID mean in federated learning?",
      options: [
        "Every client has exactly the same data distribution.",
        "Client data distributions differ, which complicates global training.",
        "The coordinator trains all client models directly."
      ],
      answer: 1,
      explanation: "Different data distributions across clients are one of the central challenges in federated learning."
    }
  },
  {
    id: "num-1",
    track: "Tournament Simulation",
    title: "How a prediction tournament differs from standard ML",
    summary: "A tournament setting rewards robust signals evaluated on hidden targets, often emphasizing ranking quality over obvious public benchmarks.",
    paragraphs: [
      "In a competition like Numerai, participants typically receive feature data without obvious target meaning. They submit predictions, and those predictions are evaluated later on hidden labels.",
      "That changes the workflow. You cannot hand-tune to an easily inspected target in the same way; instead you focus on cross-era robustness, signal stability, and low correlation to fragile strategies.",
      "The practical lesson is that a good tournament model is not just accurate on one split. It should remain useful across many eras and avoid overfitting to a narrow slice of history."
    ],
    points: [
      { heading: "Hidden targets", body: "Evaluation happens on labels you do not directly inspect." },
      { heading: "Era stability", body: "Consistency across time slices matters." },
      { heading: "Signal quality", body: "Robust ranking signal is usually more valuable than brittle gains." }
    ],
    quiz: {
      question: "Why is era stability important in a tournament-style setting?",
      options: [
        "Because the objective is to do well across changing time slices, not just one easy sample.",
        "Because it removes the need for validation data.",
        "Because it guarantees the highest possible raw accuracy."
      ],
      answer: 0,
      explanation: "Tournament-style modeling rewards signals that survive across different periods or eras."
    }
  },
  {
    id: "num-2",
    track: "Tournament Simulation",
    title: "Signals, correlation, and ensemble thinking",
    summary: "A useful model can add value even if it is not the single strongest model, provided it contributes differentiated signal.",
    paragraphs: [
      "In ensemble environments, correlation matters. Two models with similar predictions add less combined value than two solid models that see the world differently.",
      "This is why diversity can matter alongside raw performance. A model with moderate standalone quality but low correlation to others can improve the combined portfolio.",
      "That logic appears in the simulator below: stronger signal helps, but diversity and overfitting risk influence final ranking."
    ],
    points: [
      { heading: "Correlation", body: "Similarity between prediction streams." },
      { heading: "Diversifying signal", body: "Different useful views can improve an ensemble." },
      { heading: "Portfolio mindset", body: "The best contributor is not always the highest single metric model." }
    ],
    quiz: {
      question: "Why might a slightly weaker model still be valuable in an ensemble?",
      options: [
        "Because weaker models always replace stronger ones.",
        "Because lower correlation can make the combined signal more robust.",
        "Because ensembles ignore signal quality."
      ],
      answer: 1,
      explanation: "Diverse predictions can improve the ensemble even when standalone strength is not maximal."
    }
  },
  {
    id: "num-3",
    track: "Tournament Simulation",
    title: "From theory to experimentation",
    summary: "The best way to internalize these ideas is to experiment with tradeoffs and observe how they change tournament outcomes.",
    paragraphs: [
      "A useful simulator should let you practice the real loop: inspect the round, choose features, pick a model style, size conviction, and review whether the apparent edge survives hidden eras.",
      "The point is not exact market realism. The point is repeated, disciplined exposure to tradeoffs among signal, diversity, regime sensitivity, and overfitting.",
      "Use the simulator below as a practice arena. The feedback system matters more than the score because the goal is to sharpen judgment."
    ],
    points: [
      { heading: "Tradeoff view", body: "Model quality rarely lives on one axis." },
      { heading: "Practice loop", body: "Inspect, choose, submit, review, and adjust." },
      { heading: "Experimentation", body: "Small repeated rounds build durable intuition." }
    ],
    quiz: {
      question: "What is the simulator meant to teach?",
      options: [
        "The exact hidden scoring function of a real tournament.",
        "How signal, diversity, and overfitting trade off in a simplified tournament setting.",
        "How to bypass validation and rely on intuition."
      ],
      answer: 1,
      explanation: "The simulator is intentionally simplified and educational rather than a replica of a live tournament."
    }
  }
];

const featureLibrary = [
  { id: "quality", name: "Quality", type: "stable", description: "Slow-moving fundamentals with reliable medium-strength signal.", baseSignal: 22, volatility: 6, trap: 0, regimeAffinity: ["risk_off", "balanced"] },
  { id: "momentum", name: "Momentum", type: "regime", description: "Fast-moving trend features that strengthen in aggressive regimes.", baseSignal: 18, volatility: 14, trap: 0, regimeAffinity: ["momentum", "risk_on"] },
  { id: "value", name: "Value", type: "stable", description: "Mean-reversion oriented features that reward patience.", baseSignal: 20, volatility: 8, trap: 0, regimeAffinity: ["balanced", "risk_off"] },
  { id: "alternative", name: "Alternative", type: "weak", description: "Messy but occasionally additive signal with moderate uniqueness.", baseSignal: 13, volatility: 12, trap: 0, regimeAffinity: ["risk_on", "balanced"] },
  { id: "macro", name: "Macro", type: "regime", description: "Contextual macro regime features that can help or hurt sharply.", baseSignal: 12, volatility: 18, trap: 0, regimeAffinity: ["risk_off"] },
  { id: "sentiment", name: "Sentiment", type: "weak", description: "Short-horizon mood features with unstable but sometimes useful edge.", baseSignal: 11, volatility: 16, trap: 0, regimeAffinity: ["momentum"] },
  { id: "leakage", name: "Leakage Trap", type: "trap", description: "Looks amazing in sample, but tends to collapse in live eras.", baseSignal: 8, volatility: 24, trap: 24, regimeAffinity: ["balanced"] },
  { id: "noise", name: "Noise Cluster", type: "decoy", description: "Decorative features that add complexity without signal.", baseSignal: 3, volatility: 20, trap: 8, regimeAffinity: ["risk_on"] }
];

const modelArchetypes = [
  {
    id: "linear",
    name: "Linear Blend",
    summary: "Stable, interpretable, usually under-reacts instead of overfitting.",
    strength: 10,
    stability: 16,
    complexityBias: -10,
    fit: ["stable", "weak"]
  },
  {
    id: "tree",
    name: "Tree Hunter",
    summary: "Finds interactions quickly, but pays for excess complexity.",
    strength: 16,
    stability: 2,
    complexityBias: 10,
    fit: ["regime", "stable", "trap"]
  },
  {
    id: "ensemble",
    name: "Diversified Ensemble",
    summary: "Balanced approach that rewards mixed signals and regularization.",
    strength: 13,
    stability: 12,
    complexityBias: 2,
    fit: ["stable", "weak", "regime"]
  }
];

const storageKey = "ml-academy-simulator-state-v1";

const defaultSimState = {
  bankroll: 100,
  roundNumber: 1,
  selectedFeatureIds: ["quality", "value"],
  selectedModelId: "linear",
  complexity: 48,
  regularization: 56,
  stake: 24,
  history: [],
  currentRound: null,
  preview: null,
  result: null
};

const state = {
  selectedModuleId: modules[0].id,
  completed: new Set(),
  quizAnswered: new Map(),
  sim: loadSimState()
};

const moduleNav = document.getElementById("moduleNav");
const lessonTag = document.getElementById("lessonTag");
const lessonTitle = document.getElementById("lessonTitle");
const lessonSummary = document.getElementById("lessonSummary");
const lessonContent = document.getElementById("lessonContent");
const keyPoints = document.getElementById("keyPoints");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizStatus = document.getElementById("quizStatus");
const progressBadge = document.getElementById("progressBadge");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const markCompleteButton = document.getElementById("markCompleteButton");

const newRoundButton = document.getElementById("newRoundButton");
const roundHub = document.getElementById("roundHub");
const regimeBadge = document.getElementById("regimeBadge");
const roundMeta = document.getElementById("roundMeta");
const featureGroups = document.getElementById("featureGroups");
const modelOptions = document.getElementById("modelOptions");
const complexity = document.getElementById("complexity");
const regularization = document.getElementById("regularization");
const stake = document.getElementById("stake");
const complexityValue = document.getElementById("complexityValue");
const regularizationValue = document.getElementById("regularizationValue");
const stakeValue = document.getElementById("stakeValue");
const strategyWarnings = document.getElementById("strategyWarnings");
const previewButton = document.getElementById("previewButton");
const submitButton = document.getElementById("submitButton");
const previewMetrics = document.getElementById("previewMetrics");
const previewTable = document.getElementById("previewTable");
const previewInsight = document.getElementById("previewInsight");
const resultMetrics = document.getElementById("resultMetrics");
const resultTable = document.getElementById("resultTable");
const diagnosisCard = document.getElementById("diagnosisCard");
const historySummary = document.getElementById("historySummary");
const historyList = document.getElementById("historyList");

function loadSimState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey));
    return parsed ? { ...defaultSimState, ...parsed } : { ...defaultSimState };
  } catch {
    return { ...defaultSimState };
  }
}

function saveSimState() {
  localStorage.setItem(storageKey, JSON.stringify(state.sim));
}

function getModuleById(id) {
  return modules.find((module) => module.id === id);
}

function renderModuleNav() {
  moduleNav.innerHTML = "";

  modules.forEach((module, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "module-button";
    if (module.id === state.selectedModuleId) button.classList.add("active");
    if (state.completed.has(module.id)) button.classList.add("complete");
    button.addEventListener("click", () => {
      state.selectedModuleId = module.id;
      renderApp();
    });

    button.innerHTML = `
      <span class="module-header">
        <span class="module-index">${index + 1}</span>
        <strong>${module.title}</strong>
      </span>
      <span class="module-track">${module.track}</span>
      <span class="module-description">${module.summary}</span>
    `;

    moduleNav.appendChild(button);
  });
}

function renderLesson() {
  const module = getModuleById(state.selectedModuleId);

  lessonTag.textContent = module.track;
  lessonTitle.textContent = module.title;
  lessonSummary.textContent = module.summary;
  lessonContent.innerHTML = "";
  keyPoints.innerHTML = "";

  module.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    lessonContent.appendChild(p);
  });

  module.points.forEach((point) => {
    const card = document.createElement("article");
    card.className = "key-point";
    card.innerHTML = `<strong>${point.heading}</strong><span>${point.body}</span>`;
    keyPoints.appendChild(card);
  });

  const isComplete = state.completed.has(module.id);
  markCompleteButton.textContent = isComplete ? "Completed" : "Mark complete";
  markCompleteButton.disabled = isComplete;
}

function renderQuiz() {
  const module = getModuleById(state.selectedModuleId);
  const answerState = state.quizAnswered.get(module.id);

  quizQuestion.textContent = module.quiz.question;
  quizOptions.innerHTML = "";

  module.quiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;

    if (answerState !== undefined) {
      button.disabled = true;
      if (index === module.quiz.answer) button.classList.add("correct");
      if (index === answerState && index !== module.quiz.answer) button.classList.add("incorrect");
    }

    button.addEventListener("click", () => {
      state.quizAnswered.set(module.id, index);
      renderQuiz();
    });

    quizOptions.appendChild(button);
  });

  if (answerState === undefined) {
    quizStatus.textContent = "Choose an answer";
    quizFeedback.className = "quiz-feedback neutral";
    quizFeedback.textContent = "";
    return;
  }

  const correct = answerState === module.quiz.answer;
  quizStatus.textContent = correct ? "Correct" : "Review the explanation";
  quizFeedback.className = `quiz-feedback ${correct ? "correct" : "incorrect"}`;
  quizFeedback.textContent = module.quiz.explanation;
}

function renderProgress() {
  const total = modules.length;
  const completedCount = state.completed.size;
  const percent = (completedCount / total) * 100;

  progressBadge.textContent = `${completedCount} / ${total} complete`;
  progressFill.style.width = `${percent}%`;

  if (completedCount === total) {
    progressText.textContent = "All sections complete. Use the simulator to pressure-test your judgment loop.";
  } else if (completedCount >= 6) {
    progressText.textContent = "You now have enough theory to connect validation discipline, regime shifts, and staking behavior.";
  } else if (completedCount >= 3) {
    progressText.textContent = "The foundation is set. Keep moving toward distributed learning and tournament decision-making.";
  } else {
    progressText.textContent = "Start with the basics, then move into distributed learning and tournament practice.";
  }
}

function renderApp() {
  renderModuleNav();
  renderLesson();
  renderQuiz();
  renderProgress();
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function sample(list, random) {
  return list[Math.floor(random() * list.length)];
}

function makeRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = value * 16807 % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function generateRound(roundNumber) {
  const seed = 1000 + roundNumber * 37;
  const random = makeRandom(seed);
  const regimes = ["balanced", "risk_on", "risk_off", "momentum"];
  const regime = sample(regimes, random);
  const noiseLevel = 18 + Math.floor(random() * 28);
  const liveShift = 8 + Math.floor(random() * 18);
  const trainEras = 4;
  const validationEras = 3;
  const liveEras = 3;

  const visibleFeatures = featureLibrary.map((feature) => {
    const featureRandom = makeRandom(seed + feature.id.length * 91);
    const apparentStrength = clamp(feature.baseSignal + feature.volatility * 0.45 + featureRandom() * 18);
    return {
      ...feature,
      apparentStrength: Number(apparentStrength.toFixed(1))
    };
  });

  return {
    id: `round-${roundNumber}`,
    roundNumber,
    seed,
    regime,
    noiseLevel,
    liveShift,
    trainEras,
    validationEras,
    liveEras,
    visibleFeatures
  };
}

function getCurrentRound() {
  if (!state.sim.currentRound) {
    state.sim.currentRound = generateRound(state.sim.roundNumber);
    saveSimState();
  }
  return state.sim.currentRound;
}

function evaluateStrategy({ round, selectedFeatureIds, modelId, complexityValue, regularizationValue, stakeValue }) {
  const model = modelArchetypes.find((item) => item.id === modelId);
  const selected = round.visibleFeatures.filter((feature) => selectedFeatureIds.includes(feature.id));
  const featureCount = selected.length;
  const signalScore = selected.reduce((sum, feature) => {
    const regimeBonus = feature.regimeAffinity.includes(round.regime) ? 8 : -3;
    const fitBonus = model.fit.includes(feature.type) ? 6 : -2;
    const stabilityDiscount = feature.type === "stable" ? 3 : 0;
    return sum + feature.baseSignal + regimeBonus + fitBonus + stabilityDiscount;
  }, 0);
  const trapExposure = selected.reduce((sum, feature) => sum + feature.trap, 0);
  const decoyExposure = selected.filter((feature) => feature.type === "decoy").length * 9;
  const diversityScore = clamp(
    selected.reduce((sum, feature) => {
      if (feature.type === "weak") return sum + 15;
      if (feature.type === "regime") return sum + 11;
      if (feature.type === "stable") return sum + 7;
      return sum + 2;
    }, 0) - Math.max(0, featureCount - 3) * 6 + regularizationValue * 0.12
  );
  const complexityPenalty = Math.max(0, complexityValue - regularizationValue * 0.72) * 0.48;
  const modelBias = model.strength + model.complexityBias * (complexityValue / 100) + model.stability * (regularizationValue / 100);
  const overfitRisk = clamp(trapExposure * 1.8 + decoyExposure + complexityPenalty + Math.max(0, featureCount - 4) * 7 - regularizationValue * 0.35);
  const trainScore = clamp(34 + signalScore * 0.7 + modelBias + complexityValue * 0.22 + trapExposure * 0.85 - round.noiseLevel * 0.2);
  const validationScore = clamp(trainScore - overfitRisk * 0.24 - round.noiseLevel * 0.3 + diversityScore * 0.12);
  const liveScore = clamp(validationScore - overfitRisk * 0.18 - round.liveShift * 0.44 + diversityScore * 0.1 - Math.abs(complexityValue - regularizationValue) * 0.1);
  const stabilityScore = clamp(66 + model.stability - overfitRisk * 0.42 - round.liveShift * 0.25 + regularizationValue * 0.2);
  const uniquenessScore = clamp(30 + diversityScore * 0.7 - selected.filter((feature) => feature.type === "stable").length * 4 + selected.filter((feature) => feature.type === "weak").length * 5);
  const confidenceMismatch = Math.abs(stakeValue - clamp((validationScore + stabilityScore) / 2, 0, 100)) / 100;
  const finalScore = clamp(liveScore * 0.5 + stabilityScore * 0.3 + uniquenessScore * 0.2 - confidenceMismatch * 8);

  const eraScores = buildEraScores({
    round,
    validationScore,
    liveScore,
    stabilityScore,
    overfitRisk
  });

  return {
    roundId: round.id,
    featureCount,
    signalScore: Number(signalScore.toFixed(1)),
    diversityScore: Number(diversityScore.toFixed(1)),
    overfitRisk: Number(overfitRisk.toFixed(1)),
    trainScore: Number(trainScore.toFixed(1)),
    validationScore: Number(validationScore.toFixed(1)),
    liveScore: Number(liveScore.toFixed(1)),
    stabilityScore: Number(stabilityScore.toFixed(1)),
    uniquenessScore: Number(uniquenessScore.toFixed(1)),
    finalScore: Number(finalScore.toFixed(1)),
    confidenceMismatch: Number(confidenceMismatch.toFixed(2)),
    eraScores
  };
}

function buildEraScores({ round, validationScore, liveScore, stabilityScore, overfitRisk }) {
  const random = makeRandom(round.seed + 777);
  const total = round.trainEras + round.validationEras + round.liveEras;
  const eras = [];

  for (let index = 0; index < total; index += 1) {
    let phase = "live";
    let anchor = liveScore;
    if (index < round.trainEras) {
      phase = "train";
      anchor = validationScore + 5 + overfitRisk * 0.08;
    } else if (index < round.trainEras + round.validationEras) {
      phase = "validation";
      anchor = validationScore;
    }
    const jitter = (random() - 0.5) * (phase === "live" ? round.noiseLevel * 0.9 : round.noiseLevel * 0.55);
    const stabilityPenalty = (100 - stabilityScore) * 0.05 * Math.abs(random() - 0.5);
    eras.push({
      name: `Era ${index + 1}`,
      phase,
      score: Number(clamp(anchor + jitter - stabilityPenalty).toFixed(1))
    });
  }

  return eras;
}

function getStrategyDraft() {
  return {
    round: getCurrentRound(),
    selectedFeatureIds: state.sim.selectedFeatureIds,
    modelId: state.sim.selectedModelId,
    complexityValue: Number(state.sim.complexity),
    regularizationValue: Number(state.sim.regularization),
    stakeValue: Number(state.sim.stake)
  };
}

function computeWarnings(evaluation) {
  const warnings = [];
  if (evaluation.featureCount === 0) {
    warnings.push({ level: "bad", text: "No feature groups selected. You need at least one signal source." });
  }
  if (evaluation.overfitRisk > 62) {
    warnings.push({ level: "bad", text: "High fragility risk. This setup is likely fitting round-specific noise." });
  }
  if (evaluation.validationScore - evaluation.liveScore > 12) {
    warnings.push({ level: "bad", text: "Large preview-to-live gap risk. Validation strength may not hold across hidden eras." });
  }
  if (evaluation.stabilityScore < 48) {
    warnings.push({ level: "warn", text: "Era stability looks weak. Expect uneven round performance." });
  }
  if (evaluation.diversityScore < 26) {
    warnings.push({ level: "warn", text: "Your signal mix is narrow. You may be too correlated with one style." });
  }
  if (!warnings.length) {
    warnings.push({ level: "good", text: "Balanced draft. The main question is whether your conviction matches the evidence." });
  }
  return warnings;
}

function previewCurrentStrategy() {
  const evaluation = evaluateStrategy(getStrategyDraft());
  state.sim.preview = {
    createdAt: Date.now(),
    evaluation,
    warnings: computeWarnings(evaluation)
  };
  saveSimState();
  renderSimulator();
}

function getDiagnosis({ evaluation, round, stakeValue, previousHistory }) {
  const selectedFeatures = round.visibleFeatures.filter((feature) => state.sim.selectedFeatureIds.includes(feature.id));
  const previous = previousHistory[0];
  let primary = "Balanced execution";
  let explanation = "The round result reflects a reasonably disciplined strategy selection with no dominant failure mode.";
  let recommendation = "Keep the same workflow and compare it against at least three more rounds before making large changes.";
  let evidence = [];

  if (evaluation.overfitRisk > 60 || selectedFeatures.some((feature) => feature.type === "trap")) {
    primary = "Overfitting";
    explanation = "The strategy looked stronger in preview than it held up in live eras, which usually points to fitting unstable or deceptive patterns.";
    recommendation = "Reduce complexity, drop the Leakage Trap group, and demand stable era performance before raising stake.";
    evidence = [
      `Preview-to-live drop: ${(evaluation.validationScore - evaluation.liveScore).toFixed(1)} points.`,
      `Fragility score: ${evaluation.overfitRisk.toFixed(1)}.`,
      selectedFeatures.some((feature) => feature.type === "trap") ? "Leakage Trap was selected." : "Too much complexity relative to regularization."
    ];
  } else if (evaluation.trainScore < 55 && evaluation.liveScore < 50) {
    primary = "Underfitting";
    explanation = "The setup was too conservative to capture the signal available in this round.";
    recommendation = "Add one more relevant feature group or use a model that can exploit interactions without overshooting.";
    evidence = [
      `Train preview was only ${evaluation.trainScore.toFixed(1)}.`,
      `Live score remained weak at ${evaluation.liveScore.toFixed(1)}.`,
      "The model left signal on the table rather than blowing up."
    ];
  } else if (evaluation.diversityScore < 24) {
    primary = "Weak feature choice";
    explanation = "The selected feature mix was too narrow to create a differentiated signal.";
    recommendation = "Blend one stable group with one weak or regime-sensitive group to improve uniqueness without inviting chaos.";
    evidence = [
      `Diversity score: ${evaluation.diversityScore.toFixed(1)}.`,
      `Selected feature groups: ${selectedFeatures.map((feature) => feature.name).join(", ")}.`,
      "The strategy depended on a limited view of the round."
    ];
  } else if (evaluation.stabilityScore < 46) {
    primary = "Unstable strategy";
    explanation = "Performance swung too much across eras to trust the result.";
    recommendation = "Use more regularization or move to a steadier model archetype before increasing conviction.";
    evidence = [
      `Stability score: ${evaluation.stabilityScore.toFixed(1)}.`,
      `Live regime shift: ${round.liveShift}.`,
      "Era outcomes are too uneven for a high-conviction submission."
    ];
  } else if (stakeValue > evaluation.validationScore + 12 || stakeValue > evaluation.stabilityScore + 16) {
    primary = "Overconfidence in staking";
    explanation = "Your conviction level ran ahead of the evidence available at submit time.";
    recommendation = "Treat stake as a calibration problem. Size up only after repeated stable previews, not one attractive score.";
    evidence = [
      `Stake: ${stakeValue}.`,
      `Validation score: ${evaluation.validationScore.toFixed(1)}.`,
      `Stability score: ${evaluation.stabilityScore.toFixed(1)}.`
    ];
  } else if (previous && Math.abs(previous.complexity - state.sim.complexity) > 30 && previous.primaryDiagnosis !== "Balanced execution") {
    primary = "Reacting to noise";
    explanation = "The round-to-round strategy shift was larger than the evidence justified, which can turn a learning process into random thrashing.";
    recommendation = "Change one lever at a time and compare outcomes over several rounds before rewriting your playbook.";
    evidence = [
      `Complexity moved from ${previous.complexity} to ${state.sim.complexity}.`,
      `Last diagnosis: ${previous.primaryDiagnosis}.`,
      "Large swings after one result usually reduce learning clarity."
    ];
  } else if (stakeValue < Math.max(10, evaluation.validationScore - 35) && evaluation.liveScore > 63) {
    primary = "Underconfidence";
    explanation = "You found a robust setup but did not size your conviction to match it.";
    recommendation = "Increase stake gradually when both validation and stability are consistently strong.";
    evidence = [
      `Stake: ${stakeValue}.`,
      `Live score: ${evaluation.liveScore.toFixed(1)}.`,
      `Stability score: ${evaluation.stabilityScore.toFixed(1)}.`
    ];
  } else {
    evidence = [
      `Live score: ${evaluation.liveScore.toFixed(1)}.`,
      `Stability score: ${evaluation.stabilityScore.toFixed(1)}.`,
      `Uniqueness score: ${evaluation.uniquenessScore.toFixed(1)}.`
    ];
  }

  return { primary, explanation, recommendation, evidence };
}

function submitCurrentStrategy() {
  if (!state.sim.selectedFeatureIds.length) {
    state.sim.result = {
      blocked: true,
      message: "Select at least one feature group before submitting a round."
    };
    renderSimulator();
    return;
  }

  const round = getCurrentRound();
  const evaluation = evaluateStrategy(getStrategyDraft());
  const payout = Number((((evaluation.finalScore - 50) / 50) * (state.sim.stake / 10)).toFixed(2));
  state.sim.bankroll = Number(Math.max(0, state.sim.bankroll + payout).toFixed(2));
  const diagnosis = getDiagnosis({
    evaluation,
    round,
    stakeValue: Number(state.sim.stake),
    previousHistory: state.sim.history
  });

  const historyEntry = {
    roundNumber: round.roundNumber,
    regime: round.regime,
    modelId: state.sim.selectedModelId,
    modelName: modelArchetypes.find((item) => item.id === state.sim.selectedModelId).name,
    features: [...state.sim.selectedFeatureIds],
    stake: Number(state.sim.stake),
    complexity: Number(state.sim.complexity),
    regularization: Number(state.sim.regularization),
    payout,
    bankroll: state.sim.bankroll,
    finalScore: evaluation.finalScore,
    liveScore: evaluation.liveScore,
    validationScore: evaluation.validationScore,
    stabilityScore: evaluation.stabilityScore,
    overfitRisk: evaluation.overfitRisk,
    primaryDiagnosis: diagnosis.primary
  };

  state.sim.result = {
    blocked: false,
    round,
    evaluation,
    payout,
    diagnosis
  };
  state.sim.history = [historyEntry, ...state.sim.history].slice(0, 8);
  state.sim.preview = null;
  state.sim.roundNumber += 1;
  state.sim.currentRound = generateRound(state.sim.roundNumber);
  saveSimState();
  renderSimulator();
}

function resetRound() {
  state.sim.preview = null;
  state.sim.result = null;
  state.sim.currentRound = generateRound(state.sim.roundNumber);
  saveSimState();
  renderSimulator();
}

function renderRoundHub(round) {
  const latest = state.sim.history[0];
  const cards = [
    { label: "Current round", value: `#${round.roundNumber}` },
    { label: "Bankroll", value: `${state.sim.bankroll.toFixed(2)} staked units` },
    { label: "Last diagnosis", value: latest ? latest.primaryDiagnosis : "No rounds yet" }
  ];

  roundHub.innerHTML = cards.map((card) => `
    <article class="metric-card">
      <span>${card.label}</span>
      <strong>${card.value}</strong>
    </article>
  `).join("");
}

function renderRoundMeta(round) {
  regimeBadge.textContent = round.regime.replace("_", " ");
  roundMeta.innerHTML = [
    { label: "Noise", value: `${round.noiseLevel}` },
    { label: "Live shift", value: `${round.liveShift}` },
    { label: "Eras", value: `${round.trainEras}/${round.validationEras}/${round.liveEras}` }
  ].map((item) => `
    <div class="meta-card">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join("");
}

function renderFeatureGroups(round) {
  featureGroups.innerHTML = "";
  round.visibleFeatures.forEach((feature) => {
    const selected = state.sim.selectedFeatureIds.includes(feature.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `feature-card ${selected ? "selected" : ""}`;
    button.innerHTML = `
      <strong>${feature.name}</strong>
      <span class="feature-type">${feature.type}</span>
      <p>${feature.description}</p>
      <span class="feature-strength">apparent train strength ${feature.apparentStrength}</span>
    `;
    button.addEventListener("click", () => {
      if (selected) {
        state.sim.selectedFeatureIds = state.sim.selectedFeatureIds.filter((id) => id !== feature.id);
      } else {
        state.sim.selectedFeatureIds = [...state.sim.selectedFeatureIds, feature.id];
      }
      state.sim.preview = null;
      saveSimState();
      renderSimulator();
    });
    featureGroups.appendChild(button);
  });
}

function renderModelOptions() {
  modelOptions.innerHTML = "";
  modelArchetypes.forEach((model) => {
    const selected = state.sim.selectedModelId === model.id;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `model-card ${selected ? "selected" : ""}`;
    button.innerHTML = `
      <strong>${model.name}</strong>
      <p>${model.summary}</p>
    `;
    button.addEventListener("click", () => {
      state.sim.selectedModelId = model.id;
      state.sim.preview = null;
      saveSimState();
      renderSimulator();
    });
    modelOptions.appendChild(button);
  });
}

function renderStrategyControls(round) {
  complexity.value = state.sim.complexity;
  regularization.value = state.sim.regularization;
  stake.value = state.sim.stake;
  complexityValue.textContent = state.sim.complexity;
  regularizationValue.textContent = state.sim.regularization;
  stakeValue.textContent = state.sim.stake;

  const evaluation = evaluateStrategy(getStrategyDraft());
  const warnings = computeWarnings(evaluation);

  strategyWarnings.innerHTML = warnings.map((warning) => `
    <div class="alert ${warning.level}">${warning.text}</div>
  `).join("");

  submitButton.disabled = !state.sim.selectedFeatureIds.length;
  submitButton.textContent = `Submit round #${round.roundNumber}`;
}

function renderPreview() {
  if (!state.sim.preview) {
    previewMetrics.innerHTML = `
      <article class="metric-card">
        <span>Preview status</span>
        <strong>Not run</strong>
      </article>
    `;
    previewTable.innerHTML = "";
    previewInsight.textContent = "Run a preview to inspect train, validation, and hidden-live expectations before submitting.";
    return;
  }

  const { evaluation, warnings } = state.sim.preview;
  previewMetrics.innerHTML = [
    { label: "Train", value: evaluation.trainScore.toFixed(1) },
    { label: "Validation", value: evaluation.validationScore.toFixed(1) },
    { label: "Fragility", value: evaluation.overfitRisk.toFixed(1) }
  ].map((item) => `
    <article class="metric-card">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </article>
  `).join("");

  previewTable.innerHTML = buildEraTable(evaluation.eraScores);
  previewInsight.textContent = warnings[0].text;
}

function buildEraTable(eraScores) {
  return `
    <table>
      <thead>
        <tr>
          <th>Era</th>
          <th>Phase</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        ${eraScores.map((era) => `
          <tr>
            <td>${era.name}</td>
            <td>${era.phase}</td>
            <td>${era.score.toFixed(1)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderResult() {
  if (!state.sim.result) {
    resultMetrics.innerHTML = `
      <article class="metric-card">
        <span>Round status</span>
        <strong>Waiting</strong>
      </article>
    `;
    resultTable.innerHTML = "";
    diagnosisCard.innerHTML = "<p class=\"muted\">Submit a round to get a diagnosis and payout review.</p>";
    return;
  }

  if (state.sim.result.blocked) {
    resultMetrics.innerHTML = `
      <article class="metric-card">
        <span>Submission blocked</span>
        <strong>Action needed</strong>
      </article>
    `;
    resultTable.innerHTML = "";
    diagnosisCard.innerHTML = `<p class="muted">${state.sim.result.message}</p>`;
    return;
  }

  const { evaluation, payout, diagnosis } = state.sim.result;
  resultMetrics.innerHTML = [
    { label: "Final score", value: evaluation.finalScore.toFixed(1) },
    { label: "Payout", value: `${payout >= 0 ? "+" : ""}${payout.toFixed(2)}` },
    { label: "Bankroll", value: state.sim.bankroll.toFixed(2) }
  ].map((item) => `
    <article class="metric-card">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </article>
  `).join("");

  resultTable.innerHTML = buildEraTable(evaluation.eraScores);
  diagnosisCard.innerHTML = `
    <span class="diagnosis-tag">${diagnosis.primary}</span>
    <p>${diagnosis.explanation}</p>
    <ul class="diagnosis-evidence">
      ${diagnosis.evidence.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    <p><strong>Next move:</strong> ${diagnosis.recommendation}</p>
  `;
}

function renderHistory() {
  const history = state.sim.history;
  const averageScore = history.length ? average(history.map((item) => item.finalScore)).toFixed(1) : "0.0";
  const biggestPattern = mostCommon(history.map((item) => item.primaryDiagnosis));
  historySummary.innerHTML = [
    { label: "Rounds played", value: `${history.length}` },
    { label: "Avg score", value: averageScore },
    { label: "Recurring mistake", value: biggestPattern || "None yet" }
  ].map((item) => `
    <article class="metric-card">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </article>
  `).join("");

  if (!history.length) {
    historyList.innerHTML = "<p class=\"muted\">No completed rounds yet. Submit a round to start building your review history.</p>";
    return;
  }

  historyList.innerHTML = history.map((item) => `
    <article class="history-item">
      <div class="history-header">
        <strong>Round #${item.roundNumber}</strong>
        <span class="badge">${item.regime.replace("_", " ")}</span>
      </div>
      <p>${item.modelName} | features: ${item.features.join(", ")}</p>
      <p>Score ${item.finalScore.toFixed(1)} | stake ${item.stake} | payout ${item.payout >= 0 ? "+" : ""}${item.payout.toFixed(2)}</p>
      <p class="muted">Diagnosis: ${item.primaryDiagnosis}</p>
    </article>
  `).join("");
}

function mostCommon(items) {
  if (!items.length) return "";
  const counts = items.reduce((map, item) => {
    map[item] = (map[item] || 0) + 1;
    return map;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function renderSimulator() {
  const round = getCurrentRound();
  renderRoundHub(round);
  renderRoundMeta(round);
  renderFeatureGroups(round);
  renderModelOptions();
  renderStrategyControls(round);
  renderPreview();
  renderResult();
  renderHistory();
}

markCompleteButton.addEventListener("click", () => {
  state.completed.add(state.selectedModuleId);
  renderApp();
});

[complexity, regularization, stake].forEach((input) => {
  input.addEventListener("input", () => {
    state.sim[input.id] = Number(input.value);
    state.sim.preview = null;
    saveSimState();
    renderSimulator();
  });
});

previewButton.addEventListener("click", previewCurrentStrategy);
submitButton.addEventListener("click", submitCurrentStrategy);
newRoundButton.addEventListener("click", resetRound);

renderApp();
renderSimulator();
