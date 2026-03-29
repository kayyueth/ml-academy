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
      options: ["Store every example exactly so the model can replay it later.", "Learn a rule from labeled data that performs well on unseen examples.", "Remove all randomness from the data before making predictions."],
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
      options: ["It decides how much the model changes on each optimization step.", "It fixes the number of features in the dataset.", "It guarantees the model will never overfit."],
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
      options: ["High training performance but weak validation performance.", "Low training performance and low validation performance.", "The model uses fewer features than expected."],
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
      options: ["Raw data is sent to the server in compressed form.", "Models train locally and share updates instead of centralizing raw data.", "Only one device trains while the rest evaluate."],
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
      options: ["To make the server run faster regardless of accuracy.", "Because clients with more local data may provide more representative updates.", "To eliminate all bias in the final model."],
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
      options: ["Every client has exactly the same data distribution.", "Client data distributions differ, which complicates global training.", "The coordinator trains all client models directly."],
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
      options: ["Because the objective is to do well across changing time slices, not just one easy sample.", "Because it removes the need for validation data.", "Because it guarantees the highest possible raw accuracy."],
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
      "That logic shows up in a Numerai workflow: you are not only chasing score, you are chasing useful, durable signal."
    ],
    points: [
      { heading: "Correlation", body: "Similarity between prediction streams." },
      { heading: "Diversifying signal", body: "Different useful views can improve an ensemble." },
      { heading: "Portfolio mindset", body: "The best contributor is not always the highest single metric model." }
    ],
    quiz: {
      question: "Why might a slightly weaker model still be valuable in an ensemble?",
      options: ["Because weaker models always replace stronger ones.", "Because lower correlation can make the combined signal more robust.", "Because ensembles ignore signal quality."],
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
      options: ["The exact hidden scoring function of a real tournament.", "How signal, diversity, and overfitting trade off in a simplified tournament setting.", "How to bypass validation and rely on intuition."],
      answer: 1,
      explanation: "The simulator is intentionally simplified and educational rather than a replica of a live tournament."
    }
  }
];

const state = {
  selectedModuleId: modules[0].id,
  completed: new Set(),
  quizAnswered: new Map()
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
    button.addEventListener("click", () => { state.selectedModuleId = module.id; renderApp(); });
    button.innerHTML = `<span class="module-header"><span class="module-index">${index + 1}</span><strong>${module.title}</strong></span><span class="module-track">${module.track}</span><span class="module-description">${module.summary}</span>`;
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
    button.addEventListener("click", () => { state.quizAnswered.set(module.id, index); renderQuiz(); });
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
  progressBadge.textContent = `${completedCount} / ${total} complete`;
  progressFill.style.width = `${(completedCount / total) * 100}%`;
  if (completedCount === total) {
    progressText.textContent = "All sections complete. Use the simulator page to pressure-test your judgment loop.";
  } else if (completedCount >= 6) {
    progressText.textContent = "You now have enough theory to connect validation discipline, regime shifts, and staking behavior.";
  } else if (completedCount >= 3) {
    progressText.textContent = "The foundation is set. Keep moving toward distributed learning and tournament decision-making.";
  } else {
    progressText.textContent = "Start with the basics, then move into distributed learning and tournament practice.";
  }
}
function renderApp() { renderModuleNav(); renderLesson(); renderQuiz(); renderProgress(); }
markCompleteButton.addEventListener("click", () => { state.completed.add(state.selectedModuleId); renderApp(); });
renderApp();
