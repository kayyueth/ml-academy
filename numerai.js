const featureLibrary = [
  { id: "quality", name: "feature_quality", type: "stable", description: "Slow-moving features with durable medium signal.", baseSignal: 22, volatility: 6, trap: 0, regimeAffinity: ["risk_off", "balanced"] },
  { id: "momentum", name: "feature_momentum", type: "regime", description: "Trend-sensitive features that strengthen in aggressive regimes.", baseSignal: 18, volatility: 14, trap: 0, regimeAffinity: ["momentum", "risk_on"] },
  { id: "value", name: "feature_value", type: "stable", description: "Mean-reversion oriented features that reward patience.", baseSignal: 20, volatility: 8, trap: 0, regimeAffinity: ["balanced", "risk_off"] },
  { id: "alternative", name: "feature_alternative", type: "weak", description: "Messy but sometimes additive signal with moderate uniqueness.", baseSignal: 13, volatility: 12, trap: 0, regimeAffinity: ["risk_on", "balanced"] },
  { id: "macro", name: "feature_macro", type: "regime", description: "Macro-sensitive features that can help or hurt sharply.", baseSignal: 12, volatility: 18, trap: 0, regimeAffinity: ["risk_off"] },
  { id: "sentiment", name: "feature_sentiment", type: "weak", description: "Short-horizon mood features with unstable but sometimes useful edge.", baseSignal: 11, volatility: 16, trap: 0, regimeAffinity: ["momentum"] },
  { id: "leakage", name: "feature_leakage", type: "trap", description: "Looks excellent in sample, then breaks in live eras.", baseSignal: 9, volatility: 24, trap: 24, regimeAffinity: ["balanced"] },
  { id: "noise", name: "feature_noise", type: "decoy", description: "Decorative complexity without reliable signal.", baseSignal: 3, volatility: 22, trap: 8, regimeAffinity: ["risk_on"] }
];

const modelArchetypes = [
  { id: "linear", name: "Linear Blend", summary: "Stable, interpretable, lower peak, lower fragility.", strength: 10, stability: 16, complexityBias: -10, fit: ["stable", "weak"] },
  { id: "tree", name: "Tree Hunter", summary: "Captures interactions quickly but pays for excess complexity.", strength: 16, stability: 3, complexityBias: 10, fit: ["regime", "stable", "trap"] },
  { id: "ensemble", name: "Diversified Ensemble", summary: "Balanced approach that rewards mixed signals and regularization.", strength: 13, stability: 12, complexityBias: 2, fit: ["stable", "weak", "regime"] }
];

const simNavScreens = [
  { id: "dashboard", label: "Dashboard" },
  { id: "data", label: "Data" },
  { id: "strategy", label: "Strategy" },
  { id: "python", label: "Python" },
  { id: "upload", label: "Upload" },
  { id: "stake", label: "Stake" },
  { id: "diagnostics", label: "Diagnostics" },
  { id: "history", label: "History" },
  { id: "leaderboard", label: "Leaderboard" }
];

const tutorialStepsData = [
  { id: "data", title: "1. Download the round package", body: "Open Data, inspect the dataset version, and download the synthetic train, validation, and live files before touching strategy decisions." },
  { id: "strategy", title: "2. Build a model thesis", body: "Choose feature groups, pick a model archetype, and adjust complexity, regularization, and diversity bias the way you would shape a real offline experiment." },
  { id: "python", title: "3. Review the Python workflow", body: "Use the Python tab as a reference for what the offline training loop should look like: load data, fit a model, validate, and export ranked predictions." },
  { id: "upload", title: "4. Generate and upload predictions", body: "Generate the artifact, check the simulated schema validation, and only upload when the preview looks believable rather than merely exciting." },
  { id: "stake", title: "5. Size conviction", body: "Stake NMR based on evidence, not emotion. Strong validation with weak stability should still lead to restrained sizing." },
  { id: "diagnostics", title: "6. Resolve and review", body: "Study corr, MMC, Sharpe, drawdown, exposure, and diagnosis together. The lesson is in the mismatch between preview confidence and live behavior." }
];

const pythonSampleCode = `from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "sample_submission.csv"
RNG = np.random.default_rng(42)

def make_dataset(rows: int = 800) -> pd.DataFrame:
    features = pd.DataFrame({
        "feature_quality": RNG.normal(size=rows),
        "feature_value": RNG.normal(size=rows),
        "feature_momentum": RNG.normal(size=rows),
        "feature_sentiment": RNG.normal(size=rows),
        "feature_macro": RNG.normal(size=rows),
    })
    target = (
        0.35 * features["feature_quality"]
        + 0.25 * features["feature_value"]
        + 0.20 * features["feature_momentum"]
        - 0.10 * features["feature_macro"]
        + RNG.normal(scale=0.35, size=rows)
    )
    features["target"] = target
    return features

def main() -> None:
    df = make_dataset()
    feature_cols = [
        "feature_quality",
        "feature_value",
        "feature_momentum",
        "feature_sentiment",
        "feature_macro",
    ]

    train_df, valid_df = train_test_split(df, test_size=0.2, random_state=7)

    model = RandomForestRegressor(
        n_estimators=200,
        max_depth=5,
        min_samples_leaf=10,
        random_state=7,
    )
    model.fit(train_df[feature_cols], train_df["target"])

    valid_pred = model.predict(valid_df[feature_cols])
    rmse = mean_squared_error(valid_df["target"], valid_pred, squared=False)
    print(f"validation_rmse={rmse:.4f}")

    live_features = make_dataset(rows=120).drop(columns=["target"])
    live_pred = model.predict(live_features[feature_cols])
    submission = pd.DataFrame({
        "row_id": np.arange(len(live_pred)),
        "prediction": pd.Series(live_pred).rank(pct=True),
    })
    submission.to_csv(OUTPUT, index=False)
    print(f"wrote_submission={OUTPUT}")

if __name__ == "__main__":
    main()`;

const storageKey = "ml-academy-numerai-state-v3";
const defaultSimState = { activeScreen: "dashboard", roundNumber: 1, balanceNmr: 12, activeStakeNmr: 0, selectedFeatureIds: ["quality", "value"], selectedModelId: "linear", complexity: 48, regularization: 56, diversityBias: 42, stakeAmount: 24, confidenceLevel: 52, notes: "", currentRound: null, preview: null, artifact: null, submission: null, result: null, history: [], downloadedAt: null, submissionLocked: false };
const state = { sim: loadSimState() };

const simNav = document.getElementById("simNav");
const resolveRoundButton = document.getElementById("resolveRoundButton");
const nextRoundButton = document.getElementById("nextRoundButton");
const platformSummary = document.getElementById("platformSummary");
const roundStatusBadge = document.getElementById("roundStatusBadge");
const roundMeta = document.getElementById("roundMeta");
const walletSummary = document.getElementById("walletSummary");
const strategyNotes = document.getElementById("strategyNotes");
const dashboardCards = document.getElementById("dashboardCards");
const realismCards = document.getElementById("realismCards");
const tutorialSteps = document.getElementById("tutorialSteps");
const submissionStatusCard = document.getElementById("submissionStatusCard");
const dashboardPatternCard = document.getElementById("dashboardPatternCard");
const downloadDatasetButton = document.getElementById("downloadDatasetButton");
const downloadCards = document.getElementById("downloadCards");
const downloadTable = document.getElementById("downloadTable");
const featureGroups = document.getElementById("featureGroups");
const modelOptions = document.getElementById("modelOptions");
const complexity = document.getElementById("complexity");
const regularization = document.getElementById("regularization");
const diversityBias = document.getElementById("diversityBias");
const complexityValue = document.getElementById("complexityValue");
const regularizationValue = document.getElementById("regularizationValue");
const diversityBiasValue = document.getElementById("diversityBiasValue");
const strategyWarnings = document.getElementById("strategyWarnings");
const generatePredictionsButton = document.getElementById("generatePredictionsButton");
const previewMetrics = document.getElementById("previewMetrics");
const previewTable = document.getElementById("previewTable");
const pythonCommandCard = document.getElementById("pythonCommandCard");
const pythonWorkflowCard = document.getElementById("pythonWorkflowCard");
const pythonCodeBlock = document.getElementById("pythonCodeBlock");
const uploadSubmissionButton = document.getElementById("uploadSubmissionButton");
const artifactCard = document.getElementById("artifactCard");
const uploadValidation = document.getElementById("uploadValidation");
const stakeAmount = document.getElementById("stakeAmount");
const confidenceLevel = document.getElementById("confidenceLevel");
const stakeAmountValue = document.getElementById("stakeAmountValue");
const confidenceLevelValue = document.getElementById("confidenceLevelValue");
const confirmStakeButton = document.getElementById("confirmStakeButton");
const stakingCards = document.getElementById("stakingCards");
const stakingWarnings = document.getElementById("stakingWarnings");
const diagnosticCards = document.getElementById("diagnosticCards");
const resultTable = document.getElementById("resultTable");
const diagnosisCard = document.getElementById("diagnosisCard");
const historySummary = document.getElementById("historySummary");
const historyList = document.getElementById("historyList");
const leaderboardCards = document.getElementById("leaderboardCards");
const leaderboardTable = document.getElementById("leaderboardTable");

function loadSimState() { try { const parsed = JSON.parse(localStorage.getItem(storageKey)); return parsed ? { ...defaultSimState, ...parsed } : { ...defaultSimState }; } catch { return { ...defaultSimState }; } }
function saveSimState() { localStorage.setItem(storageKey, JSON.stringify(state.sim)); }
function clamp(value, min = 0, max = 100) { return Math.max(min, Math.min(max, value)); }
function average(values) { return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0; }
function stddev(values) { if (values.length < 2) return 0; const mean = average(values); return Math.sqrt(average(values.map((value) => (value - mean) ** 2))); }
function makeRandom(seed) { let value = seed % 2147483647; if (value <= 0) value += 2147483646; return () => { value = value * 16807 % 2147483647; return (value - 1) / 2147483646; }; }
function sample(list, random) { return list[Math.floor(random() * list.length)]; }
function generateRound(roundNumber) { const seed = 1800 + roundNumber * 73; const random = makeRandom(seed); const regimes = ["balanced", "risk_on", "risk_off", "momentum"]; const regime = sample(regimes, random); const noiseLevel = 12 + Math.floor(random() * 22); const metaCorrelation = 26 + Math.floor(random() * 18); const liveShift = 8 + Math.floor(random() * 14); const visibleFeatures = featureLibrary.map((feature) => { const localRandom = makeRandom(seed + feature.id.length * 97); return { ...feature, apparentStrength: Number(clamp(feature.baseSignal + feature.volatility * 0.4 + localRandom() * 16).toFixed(1)) }; }); return { id: `round-${roundNumber}`, roundNumber, seed, regime, noiseLevel, metaCorrelation, liveShift, datasetVersion: `v${200 + roundNumber}`, rows: 501 + roundNumber * 17, eras: [...Array.from({ length: 4 }, (_, index) => ({ name: `era${index + 1}`, phase: "train" })), ...Array.from({ length: 3 }, (_, index) => ({ name: `era${index + 5}`, phase: "validation" })), ...Array.from({ length: 3 }, (_, index) => ({ name: `era${index + 8}`, phase: "live" }))], visibleFeatures }; }
function getCurrentRound() { if (!state.sim.currentRound) { state.sim.currentRound = generateRound(state.sim.roundNumber); saveSimState(); } return state.sim.currentRound; }
function getSelectedModel() { return modelArchetypes.find((model) => model.id === state.sim.selectedModelId); }
function getSelectedFeatures(round) { return round.visibleFeatures.filter((feature) => state.sim.selectedFeatureIds.includes(feature.id)); }
function evaluateStrategy() { const round = getCurrentRound(); const model = getSelectedModel(); const selectedFeatures = getSelectedFeatures(round); const featureCount = selectedFeatures.length; const baseSignal = selectedFeatures.reduce((sum, feature) => { const regimeBonus = feature.regimeAffinity.includes(round.regime) ? 8 : -3; const fitBonus = model.fit.includes(feature.type) ? 5 : -2; return sum + feature.baseSignal + regimeBonus + fitBonus; }, 0); const trapExposure = selectedFeatures.reduce((sum, feature) => sum + feature.trap, 0); const stableCount = selectedFeatures.filter((feature) => feature.type === "stable").length; const weakCount = selectedFeatures.filter((feature) => feature.type === "weak").length; const regimeCount = selectedFeatures.filter((feature) => feature.type === "regime").length; const decoyCount = selectedFeatures.filter((feature) => feature.type === "decoy").length; const complexityRisk = Math.max(0, state.sim.complexity - state.sim.regularization * 0.7); const trainOptimism = 0.012 + trapExposure * 0.0005 + complexityRisk * 0.0002; const diversityScore = clamp(20 + weakCount * 13 + regimeCount * 10 + state.sim.diversityBias * 0.35 - Math.max(0, featureCount - 4) * 5); const overfitIndicator = clamp(trapExposure * 1.7 + decoyCount * 9 + complexityRisk * 0.55 - state.sim.regularization * 0.3); const trainCorr = clamp((14 + baseSignal * 0.58 + model.strength + state.sim.regularization * 0.07 - round.noiseLevel * 0.1) / 100 + trainOptimism, -0.03, 0.24); const validationCorr = clamp(trainCorr - overfitIndicator * 0.0015 - round.noiseLevel * 0.0009, -0.05, 0.19); const liveCorr = clamp(validationCorr - overfitIndicator * 0.0013 - round.liveShift * 0.0014 + diversityScore * 0.0005 - Math.abs(state.sim.complexity - state.sim.regularization) * 0.0005, -0.08, 0.17); const mmc = clamp(liveCorr * 0.55 + (diversityScore - round.metaCorrelation) * 0.0018 - stableCount * 0.003, -0.05, 0.12); const featureExposure = clamp(0.14 + stableCount * 0.06 + regimeCount * 0.04 + trapExposure * 0.0022 - state.sim.diversityBias * 0.0015, 0.04, 0.62); const stabilityScore = clamp(78 + model.stability - overfitIndicator * 0.48 - round.liveShift * 0.55 + state.sim.regularization * 0.18 - state.sim.complexity * 0.08, 12, 96); const signalNoiseScore = clamp((liveCorr * 400) + stabilityScore * 0.4 - overfitIndicator * 0.5 - round.noiseLevel * 0.8, 1, 100); const eraResults = buildEraResults(round, trainCorr, validationCorr, liveCorr, overfitIndicator, stabilityScore); const eraCorrs = eraResults.filter((era) => era.phase === "live").map((era) => era.corr); const sharpe = clamp(average(eraCorrs) / Math.max(0.01, stddev(eraCorrs)), -2.5, 3.5); const maxDrawdown = computeDrawdown(eraResults); return { round, selectedFeatures, featureCount, baseSignal: Number(baseSignal.toFixed(2)), diversityScore: Number(diversityScore.toFixed(1)), overfitIndicator: Number(overfitIndicator.toFixed(1)), trainCorr: Number(trainCorr.toFixed(4)), validationCorr: Number(validationCorr.toFixed(4)), liveCorr: Number(liveCorr.toFixed(4)), mmc: Number(mmc.toFixed(4)), sharpe: Number(sharpe.toFixed(2)), featureExposure: Number(featureExposure.toFixed(3)), stabilityScore: Number(stabilityScore.toFixed(1)), signalNoiseScore: Number(signalNoiseScore.toFixed(1)), maxDrawdown: Number(maxDrawdown.toFixed(3)), eraResults, benchmarkCorr: Number((liveCorr - 0.012 - round.metaCorrelation * 0.0003).toFixed(4)) }; }
function buildEraResults(round, trainCorr, validationCorr, liveCorr, overfitIndicator, stabilityScore) { const random = makeRandom(round.seed + 1441); let running = 0; return round.eras.map((era) => { const anchor = era.phase === "train" ? trainCorr : era.phase === "validation" ? validationCorr : liveCorr; const noise = (random() - 0.5) * (era.phase === "live" ? round.noiseLevel * 0.0018 : round.noiseLevel * 0.0011); const stabilityPenalty = (100 - stabilityScore) * 0.00035 * Math.abs(random() - 0.5); const corr = Number(clamp(anchor + noise - stabilityPenalty - (era.phase === "live" ? overfitIndicator * 0.00035 : 0), -0.12, 0.22).toFixed(4)); running += corr; return { name: era.name, phase: era.phase, corr, cumulative: Number(running.toFixed(4)), exposure: Number(clamp(0.1 + Math.abs(corr) * 1.9 + random() * 0.08, 0.05, 0.7).toFixed(3)) }; }); }
function computeDrawdown(eras) { let peak = -Infinity; let trough = 0; eras.forEach((era) => { peak = Math.max(peak, era.cumulative); trough = Math.min(trough, era.cumulative - peak); }); return Math.abs(trough); }
function computeWarnings(preview) { const warnings = []; if (!preview.featureCount) warnings.push({ level: "bad", text: "No features selected. You cannot generate a credible submission without a signal source." }); if (preview.overfitIndicator > 58) warnings.push({ level: "bad", text: "Overfitting risk is elevated. This setup is leaning on trap signal or excess complexity." }); if (preview.stabilityScore < 44) warnings.push({ level: "warn", text: "Stability is weak. Expect large era-to-era swings if you submit this." }); if (preview.featureExposure > 0.42) warnings.push({ level: "warn", text: "Feature exposure is high. The model is leaning too hard on a narrow factor family." }); if (preview.signalNoiseScore < 38) warnings.push({ level: "info", text: "Signal-to-noise looks soft. You may be seeing noise dressed up as edge." }); if (!warnings.length) warnings.push({ level: "good", text: "Preview looks disciplined. The next question is whether your stake matches the evidence." }); return warnings; }
function generateArtifact() { const preview = evaluateStrategy(); state.sim.preview = preview; state.sim.artifact = { fileName: `submission_round_${preview.round.roundNumber}.csv`, rows: preview.round.rows, checksum: `sim-${preview.round.roundNumber}-${Math.round(preview.liveCorr * 100000)}`, generatedAt: Date.now(), valid: preview.featureCount > 0 }; saveSimState(); }
function uploadSubmission() { if (!state.sim.artifact || !state.sim.preview) return; state.sim.submission = { roundNumber: state.sim.preview.round.roundNumber, fileName: state.sim.artifact.fileName, uploadedAt: Date.now(), status: "uploaded", previewSnapshot: state.sim.preview }; saveSimState(); }
function confirmStake() { if (!state.sim.submission) return; state.sim.submission.status = "staked"; state.sim.submission.stakeAmount = Number(state.sim.stakeAmount); state.sim.submission.confidenceLevel = Number(state.sim.confidenceLevel); state.sim.activeStakeNmr = Number((state.sim.stakeAmount / 10).toFixed(2)); saveSimState(); }
function computePayout(preview) { const convictionGap = Math.abs(state.sim.confidenceLevel - preview.signalNoiseScore) / 100; const stakeSize = state.sim.stakeAmount / 10; const edge = preview.liveCorr * 120 + preview.mmc * 80 + preview.sharpe * 4 - preview.maxDrawdown * 20; return Number(((edge / 10) * (stakeSize / 5) - convictionGap * 1.4).toFixed(2)); }
function computeDiagnosis(preview) { const selected = preview.selectedFeatures; if (preview.overfitIndicator > 58 || selected.some((feature) => feature.type === "trap")) return { primary: "Overfitting indicator elevated", explanation: "The preview relied on unstable structure that did not deserve full trust heading into live eras.", evidence: [`Overfitting indicator: ${preview.overfitIndicator.toFixed(1)}`, `Validation corr: ${preview.validationCorr.toFixed(4)}`, `Live corr: ${preview.liveCorr.toFixed(4)}`], recommendation: "Reduce complexity, drop trap features, and demand stronger stability before staking this aggressively." }; if (preview.featureExposure > 0.42) return { primary: "Feature exposure too concentrated", explanation: "The strategy depended too heavily on a narrow family of features, increasing fragility.", evidence: [`Feature exposure: ${preview.featureExposure.toFixed(3)}`, `Selected features: ${selected.map((feature) => feature.name).join(", ")}`, `Stability score: ${preview.stabilityScore.toFixed(1)}`], recommendation: "Broaden the signal mix and improve diversity before increasing stake." }; if (state.sim.stakeAmount > preview.signalNoiseScore + 18) return { primary: "Stake too aggressive for evidence", explanation: "Conviction outran the underlying signal quality.", evidence: [`Stake amount: ${state.sim.stakeAmount}`, `Confidence level: ${state.sim.confidenceLevel}`, `Signal-vs-noise score: ${preview.signalNoiseScore.toFixed(1)}`], recommendation: "Use stake as calibration, not excitement. Size up only after repeated stable rounds." }; return { primary: "Disciplined execution", explanation: "This round reflects a relatively balanced strategy and stake decision.", evidence: [`Corr: ${preview.liveCorr.toFixed(4)}`, `MMC: ${preview.mmc.toFixed(4)}`, `Sharpe: ${preview.sharpe.toFixed(2)}`], recommendation: "Keep changing one variable at a time so future review stays interpretable." }; }
function buildLeaderboard(preview) { const random = makeRandom(preview.round.seed + 9981); const entries = []; for (let index = 0; index < 11; index += 1) { const corr = Number(clamp(preview.liveCorr + (random() - 0.5) * 0.08, -0.06, 0.17).toFixed(4)); const mmc = Number(clamp(preview.mmc + (random() - 0.5) * 0.05, -0.03, 0.1).toFixed(4)); const sharpe = Number(clamp(preview.sharpe + (random() - 0.5) * 1.4, -1.4, 3.4).toFixed(2)); entries.push({ name: `sim_user_${index + 1}`, corr, mmc, sharpe, stake: Number((1 + random() * 5).toFixed(2)) }); } entries.push({ name: "you", corr: preview.liveCorr, mmc: preview.mmc, sharpe: preview.sharpe, stake: Number((state.sim.stakeAmount / 10).toFixed(2)) }); return entries.sort((a, b) => (b.corr + b.mmc) - (a.corr + a.mmc)).map((entry, index) => ({ ...entry, rank: index + 1 })); }
function resolveRound() { if (!state.sim.submission || state.sim.result) return; const preview = state.sim.submission.previewSnapshot || evaluateStrategy(); const payout = computePayout(preview); const diagnosis = computeDiagnosis(preview); const leaderboard = buildLeaderboard(preview); state.sim.balanceNmr = Number(Math.max(0, state.sim.balanceNmr + payout).toFixed(2)); state.sim.result = { resolvedAt: Date.now(), payout, diagnosis, leaderboard, metrics: preview }; state.sim.history = [{ roundNumber: preview.round.roundNumber, regime: preview.round.regime, fileName: state.sim.submission.fileName, model: getSelectedModel().name, features: [...state.sim.selectedFeatureIds], stakeAmount: Number(state.sim.stakeAmount), confidenceLevel: Number(state.sim.confidenceLevel), payout, corr: preview.liveCorr, mmc: preview.mmc, sharpe: preview.sharpe, featureExposure: preview.featureExposure, stabilityScore: preview.stabilityScore, diagnosis: diagnosis.primary }, ...state.sim.history].slice(0, 12); state.sim.activeStakeNmr = 0; saveSimState(); }
function nextRound() { state.sim.roundNumber += 1; state.sim.currentRound = generateRound(state.sim.roundNumber); state.sim.preview = null; state.sim.artifact = null; state.sim.submission = null; state.sim.result = null; state.sim.downloadedAt = null; state.sim.activeScreen = "dashboard"; saveSimState(); }
function mostCommon(items) { if (!items.length) return "None yet"; const counts = items.reduce((map, item) => { map[item] = (map[item] || 0) + 1; return map; }, {}); return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]; }
function buildMetricCards(items) { return items.map((item) => `<article class="metric-card"><span>${item.label}</span><strong>${item.value}</strong></article>`).join(""); }
function buildStatusLines(items) { return items.map((item) => `<div class="status-line"><span>${item.label}</span><strong>${item.value}</strong></div>`).join(""); }
function buildEraTable(eras) { return `<table><thead><tr><th>Era</th><th>Phase</th><th>Corr</th><th>Cumulative</th><th>Exposure</th></tr></thead><tbody>${eras.map((era) => `<tr><td>${era.name}</td><td>${era.phase}</td><td>${era.corr.toFixed(4)}</td><td>${era.cumulative.toFixed(4)}</td><td>${era.exposure.toFixed(3)}</td></tr>`).join("")}</tbody></table>`; }
function renderSimNav() { simNav.innerHTML = ""; simNavScreens.forEach((screen) => { const button = document.createElement("button"); button.type = "button"; button.className = "sim-nav-button"; if (state.sim.activeScreen === screen.id) button.classList.add("active"); button.textContent = screen.label; button.addEventListener("click", () => { state.sim.activeScreen = screen.id; saveSimState(); renderSimulator(); }); simNav.appendChild(button); }); simNavScreens.forEach((screen) => { document.getElementById(`screen-${screen.id}`).classList.toggle("active", state.sim.activeScreen === screen.id); }); }
function renderRoundAndWallet(round) { const status = state.sim.result ? "resolved" : state.sim.submission ? "submitted" : "pending"; roundStatusBadge.textContent = status; roundStatusBadge.className = `badge ${status}`; roundMeta.innerHTML = buildStatusLines([{ label: "Round", value: `#${round.roundNumber}` }, { label: "Dataset", value: round.datasetVersion }, { label: "Regime", value: round.regime.replace("_", " ") }, { label: "Rows", value: `${round.rows}` }, { label: "Meta model corr", value: `${round.metaCorrelation}` }, { label: "Noise level", value: `${round.noiseLevel}` }]); walletSummary.innerHTML = buildStatusLines([{ label: "Balance", value: `${state.sim.balanceNmr.toFixed(2)} NMR` }, { label: "Active stake", value: `${state.sim.activeStakeNmr.toFixed(2)} NMR` }, { label: "Confidence", value: `${state.sim.confidenceLevel}` }, { label: "Stake input", value: `${state.sim.stakeAmount}` }]); }
function renderPlatformSummary(round, preview) { const latestDiagnosis = state.sim.result ? state.sim.result.diagnosis.primary : state.sim.history[0]?.diagnosis || "No diagnosis yet"; platformSummary.innerHTML = buildMetricCards([{ label: "Current round", value: `#${round.roundNumber}` }, { label: "Expected live corr", value: preview.liveCorr.toFixed(4) }, { label: "Latest diagnosis", value: latestDiagnosis }]); }
function renderTutorial() { const completed = { data: Boolean(state.sim.downloadedAt), strategy: Boolean(state.sim.preview), python: Boolean(state.sim.artifact), upload: Boolean(state.sim.submission), stake: state.sim.submission?.status === "staked", diagnostics: Boolean(state.sim.result) }; tutorialSteps.innerHTML = tutorialStepsData.map((step) => { const active = state.sim.activeScreen === step.id; const done = completed[step.id]; return `<article class="tutorial-step ${active ? "active" : ""} ${done ? "done" : ""}"><strong>${step.title}</strong><p>${step.body}</p></article>`; }).join(""); }
function renderDashboard(preview) { dashboardCards.innerHTML = buildMetricCards([{ label: "Train corr", value: preview.trainCorr.toFixed(4) }, { label: "Validation corr", value: preview.validationCorr.toFixed(4) }, { label: "MMC", value: preview.mmc.toFixed(4) }]); realismCards.innerHTML = buildMetricCards([{ label: "Live forecast", value: preview.liveCorr.toFixed(4) }, { label: "Benchmark corr", value: preview.benchmarkCorr.toFixed(4) }, { label: "Feature exposure", value: preview.featureExposure.toFixed(3) }, { label: "Signal / noise", value: preview.signalNoiseScore.toFixed(1) }]); submissionStatusCard.innerHTML = `<article class="status-card"><strong>${state.sim.submission ? state.sim.submission.status : "No submission yet"}</strong><p>${state.sim.submission ? `Artifact ${state.sim.submission.fileName} is attached to round #${state.sim.submission.roundNumber}.` : "Generate predictions, upload a submission, and then stake conviction."}</p></article>`; dashboardPatternCard.innerHTML = `<article class="status-card"><strong>${mostCommon(state.sim.history.map((item) => item.diagnosis))}</strong><p>${state.sim.history.length ? "This is the most common issue across your recent rounds." : "No pattern yet. Complete a few rounds to reveal recurring behavior."}</p></article>`; }
function renderDataScreen(round) { downloadCards.innerHTML = buildMetricCards([{ label: "Dataset version", value: round.datasetVersion }, { label: "Feature count", value: `${round.visibleFeatures.length}` }, { label: "Eras", value: `${round.eras.length}` }, { label: "Downloaded", value: state.sim.downloadedAt ? new Date(state.sim.downloadedAt).toLocaleTimeString() : "Not yet" }]); downloadTable.innerHTML = `<table><thead><tr><th>File</th><th>Purpose</th><th>Status</th></tr></thead><tbody><tr><td>train.parquet</td><td>Offline training eras</td><td>${state.sim.downloadedAt ? "downloaded" : "available"}</td></tr><tr><td>validation.parquet</td><td>Validation eras</td><td>${state.sim.downloadedAt ? "downloaded" : "available"}</td></tr><tr><td>live.parquet</td><td>Live features without targets</td><td>${state.sim.downloadedAt ? "downloaded" : "available"}</td></tr></tbody></table>`; featureGroups.innerHTML = ""; round.visibleFeatures.forEach((feature) => { const button = document.createElement("button"); button.type = "button"; button.className = `feature-card ${state.sim.selectedFeatureIds.includes(feature.id) ? "selected" : ""}`; button.innerHTML = `<strong>${feature.name}</strong><span class="feature-type">${feature.type}</span><p>${feature.description}</p><span class="feature-strength">apparent strength ${feature.apparentStrength}</span>`; button.addEventListener("click", () => { state.sim.selectedFeatureIds = state.sim.selectedFeatureIds.includes(feature.id) ? state.sim.selectedFeatureIds.filter((id) => id !== feature.id) : [...state.sim.selectedFeatureIds, feature.id]; state.sim.preview = null; state.sim.artifact = null; state.sim.submission = null; state.sim.result = null; saveSimState(); renderSimulator(); }); featureGroups.appendChild(button); }); }
function renderStrategy(preview) { modelOptions.innerHTML = ""; modelArchetypes.forEach((model) => { const button = document.createElement("button"); button.type = "button"; button.className = `model-card ${state.sim.selectedModelId === model.id ? "selected" : ""}`; button.innerHTML = `<strong>${model.name}</strong><p>${model.summary}</p>`; button.addEventListener("click", () => { state.sim.selectedModelId = model.id; state.sim.preview = null; saveSimState(); renderSimulator(); }); modelOptions.appendChild(button); }); complexity.value = state.sim.complexity; regularization.value = state.sim.regularization; diversityBias.value = state.sim.diversityBias; complexityValue.textContent = state.sim.complexity; regularizationValue.textContent = state.sim.regularization; diversityBiasValue.textContent = state.sim.diversityBias; strategyWarnings.innerHTML = computeWarnings(preview).map((warning) => `<div class="alert ${warning.level}">${warning.text}</div>`).join(""); previewMetrics.innerHTML = buildMetricCards([{ label: "Validation corr", value: preview.validationCorr.toFixed(4) }, { label: "MMC", value: preview.mmc.toFixed(4) }, { label: "Sharpe", value: preview.sharpe.toFixed(2) }, { label: "Stability", value: preview.stabilityScore.toFixed(1) }]); previewTable.innerHTML = buildEraTable(preview.eraResults); }
function renderPythonInterface() { pythonCommandCard.innerHTML = `<strong>python3 numerai_training_example.py</strong><p>Run the sample script to mimic a realistic local workflow: download data, train offline, validate, and export ranked predictions.</p>`; pythonWorkflowCard.innerHTML = `<strong>Workflow mirror</strong><p>Load synthetic features, split train and validation eras, fit a simple model, inspect validation behavior, and export a CSV-like submission for upload.</p>`; pythonCodeBlock.textContent = pythonSampleCode; }
function renderUpload() { artifactCard.innerHTML = state.sim.artifact ? `<article class="artifact-card"><strong>${state.sim.artifact.fileName}</strong><p>Rows: ${state.sim.artifact.rows}</p><p>Checksum: ${state.sim.artifact.checksum}</p><p>Validation corr snapshot: ${state.sim.preview.validationCorr.toFixed(4)}</p></article>` : `<article class="artifact-card"><strong>No artifact yet</strong><p>Generate predictions from the strategy workspace first.</p></article>`; uploadValidation.innerHTML = `<article class="status-card"><strong>${state.sim.artifact?.valid ? "Schema valid" : "Waiting for artifact"}</strong><p>${state.sim.artifact ? "Row count, file name, checksum structure, and ranking format all pass the simulator checks." : "No submission file to validate."}</p></article>`; }
function renderStake(preview) { stakeAmount.value = state.sim.stakeAmount; confidenceLevel.value = state.sim.confidenceLevel; stakeAmountValue.textContent = state.sim.stakeAmount; confidenceLevelValue.textContent = state.sim.confidenceLevel; stakingCards.innerHTML = buildMetricCards([{ label: "Stake size", value: `${(state.sim.stakeAmount / 10).toFixed(2)} NMR` }, { label: "Confidence", value: `${state.sim.confidenceLevel}` }, { label: "Signal/noise", value: preview.signalNoiseScore.toFixed(1) }, { label: "Max drawdown", value: preview.maxDrawdown.toFixed(3) }]); const warnings = []; if (!state.sim.submission) warnings.push({ level: "info", text: "Upload a submission before you size stake. Real Numerai flow is sequential." }); if (state.sim.stakeAmount > 70) warnings.push({ level: "warn", text: "Large stake selected. This will amplify both reward and drawdown." }); if (Math.abs(state.sim.confidenceLevel - preview.signalNoiseScore) > 18) warnings.push({ level: "bad", text: "Confidence is poorly calibrated to the model’s measured quality." }); if (preview.validationCorr - preview.liveCorr > 0.025) warnings.push({ level: "bad", text: "Validation optimism is high. This is not the round to size aggressively." }); if (!warnings.length) warnings.push({ level: "good", text: "Stake sizing is within a plausible range for this preview." }); stakingWarnings.innerHTML = warnings.map((warning) => `<div class="alert ${warning.level}">${warning.text}</div>`).join(""); }
function renderDiagnostics(preview) { const resultMetrics = state.sim.result ? state.sim.result.metrics : preview; const diagnosis = state.sim.result ? state.sim.result.diagnosis : computeDiagnosis(preview); diagnosticCards.innerHTML = buildMetricCards([{ label: "Corr", value: resultMetrics.liveCorr.toFixed(4) }, { label: "MMC", value: resultMetrics.mmc.toFixed(4) }, { label: "Sharpe", value: resultMetrics.sharpe.toFixed(2) }, { label: "Feature exposure", value: resultMetrics.featureExposure.toFixed(3) }, { label: "Max drawdown", value: resultMetrics.maxDrawdown.toFixed(3) }, { label: "Stability", value: resultMetrics.stabilityScore.toFixed(1) }]); resultTable.innerHTML = buildEraTable(resultMetrics.eraResults); diagnosisCard.innerHTML = `<span class="diagnosis-tag">${diagnosis.primary}</span><p>${diagnosis.explanation}</p><ul class="diagnosis-evidence">${diagnosis.evidence.map((item) => `<li>${item}</li>`).join("")}</ul><p><strong>Next move:</strong> ${diagnosis.recommendation}</p>`; }
function renderHistory() { historySummary.innerHTML = buildMetricCards([{ label: "Rounds played", value: `${state.sim.history.length}` }, { label: "Avg corr", value: state.sim.history.length ? average(state.sim.history.map((item) => item.corr)).toFixed(4) : "0.0000" }, { label: "Recurring issue", value: mostCommon(state.sim.history.map((item) => item.diagnosis)) }, { label: "Balance", value: `${state.sim.balanceNmr.toFixed(2)} NMR` }]); historyList.innerHTML = state.sim.history.length ? state.sim.history.map((item) => `<article class="history-item"><div class="history-header"><strong>Round #${item.roundNumber}</strong><span class="badge">${item.regime.replace("_", " ")}</span></div><p>${item.model} | ${item.fileName}</p><p>corr ${item.corr.toFixed(4)} | mmc ${item.mmc.toFixed(4)} | sharpe ${item.sharpe.toFixed(2)}</p><p>stake ${(item.stakeAmount / 10).toFixed(2)} NMR | payout ${item.payout >= 0 ? "+" : ""}${item.payout.toFixed(2)} NMR</p><p class="muted">Diagnosis: ${item.diagnosis}</p></article>`).join("") : "<p class=\"muted\">No archived rounds yet.</p>"; }
function renderLeaderboard(preview) { const entries = state.sim.result ? state.sim.result.leaderboard : buildLeaderboard(preview); const yourEntry = entries.find((entry) => entry.name === "you"); leaderboardCards.innerHTML = buildMetricCards([{ label: "Your rank", value: `${yourEntry.rank}` }, { label: "Field size", value: `${entries.length}` }, { label: "Your corr", value: `${yourEntry.corr.toFixed(4)}` }, { label: "Your stake", value: `${yourEntry.stake.toFixed(2)} NMR` }]); leaderboardTable.innerHTML = `<table><thead><tr><th>Rank</th><th>User</th><th>Corr</th><th>MMC</th><th>Sharpe</th><th>Stake</th></tr></thead><tbody>${entries.map((entry) => `<tr><td>${entry.rank}</td><td>${entry.name}</td><td>${entry.corr.toFixed(4)}</td><td>${entry.mmc.toFixed(4)}</td><td>${entry.sharpe.toFixed(2)}</td><td>${entry.stake.toFixed(2)}</td></tr>`).join("")}</tbody></table>`; }
function renderSimNav() { simNav.innerHTML = ""; simNavScreens.forEach((screen) => { const button = document.createElement("button"); button.type = "button"; button.className = "sim-nav-button"; if (state.sim.activeScreen === screen.id) button.classList.add("active"); button.textContent = screen.label; button.addEventListener("click", () => { state.sim.activeScreen = screen.id; saveSimState(); renderSimulator(); }); simNav.appendChild(button); }); simNavScreens.forEach((screen) => { document.getElementById(`screen-${screen.id}`).classList.toggle("active", state.sim.activeScreen === screen.id); }); }
function renderRoundAndWallet(round) { const status = state.sim.result ? "resolved" : state.sim.submission ? "submitted" : "pending"; roundStatusBadge.textContent = status; roundStatusBadge.className = `badge ${status}`; roundMeta.innerHTML = buildStatusLines([{ label: "Round", value: `#${round.roundNumber}` }, { label: "Dataset", value: round.datasetVersion }, { label: "Regime", value: round.regime.replace("_", " ") }, { label: "Rows", value: `${round.rows}` }, { label: "Meta model corr", value: `${round.metaCorrelation}` }, { label: "Noise level", value: `${round.noiseLevel}` }]); walletSummary.innerHTML = buildStatusLines([{ label: "Balance", value: `${state.sim.balanceNmr.toFixed(2)} NMR` }, { label: "Active stake", value: `${state.sim.activeStakeNmr.toFixed(2)} NMR` }, { label: "Confidence", value: `${state.sim.confidenceLevel}` }, { label: "Stake input", value: `${state.sim.stakeAmount}` }]); }
function renderPlatformSummary(round, preview) { const latestDiagnosis = state.sim.result ? state.sim.result.diagnosis.primary : state.sim.history[0]?.diagnosis || "No diagnosis yet"; platformSummary.innerHTML = buildMetricCards([{ label: "Current round", value: `#${round.roundNumber}` }, { label: "Expected live corr", value: preview.liveCorr.toFixed(4) }, { label: "Latest diagnosis", value: latestDiagnosis }]); }
function renderSimulator() { const round = getCurrentRound(); const preview = state.sim.preview || evaluateStrategy(); strategyNotes.value = state.sim.notes; renderSimNav(); renderRoundAndWallet(round); renderPlatformSummary(round, preview); renderTutorial(); renderDashboard(preview); renderDataScreen(round); renderStrategy(preview); renderPythonInterface(); renderUpload(); renderStake(preview); renderDiagnostics(preview); renderHistory(); renderLeaderboard(preview); resolveRoundButton.disabled = !state.sim.submission || Boolean(state.sim.result); nextRoundButton.disabled = !state.sim.result; uploadSubmissionButton.disabled = !state.sim.artifact || !state.sim.downloadedAt; confirmStakeButton.disabled = !state.sim.submission; generatePredictionsButton.disabled = !state.sim.downloadedAt; }

downloadDatasetButton.addEventListener("click", () => { state.sim.downloadedAt = Date.now(); state.sim.activeScreen = "data"; saveSimState(); renderSimulator(); });
generatePredictionsButton.addEventListener("click", () => { generateArtifact(); state.sim.activeScreen = "python"; saveSimState(); renderSimulator(); });
uploadSubmissionButton.addEventListener("click", () => { uploadSubmission(); state.sim.activeScreen = "stake"; saveSimState(); renderSimulator(); });
confirmStakeButton.addEventListener("click", () => { confirmStake(); state.sim.activeScreen = "dashboard"; saveSimState(); renderSimulator(); });
resolveRoundButton.addEventListener("click", () => { resolveRound(); state.sim.activeScreen = "diagnostics"; saveSimState(); renderSimulator(); });
nextRoundButton.addEventListener("click", () => { nextRound(); renderSimulator(); });
[complexity, regularization, diversityBias].forEach((input) => { input.addEventListener("input", () => { state.sim[input.id] = Number(input.value); state.sim.preview = null; state.sim.artifact = null; state.sim.submission = null; state.sim.result = null; saveSimState(); renderSimulator(); }); });
[stakeAmount, confidenceLevel].forEach((input) => { input.addEventListener("input", () => { state.sim[input.id] = Number(input.value); saveSimState(); renderSimulator(); }); });
strategyNotes.addEventListener("input", () => { state.sim.notes = strategyNotes.value; saveSimState(); });
renderSimulator();
