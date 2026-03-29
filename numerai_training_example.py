"""Sample Numerai-style training script for ml-academy.

This is not a real Numerai pipeline. It mirrors the workflow:
1. load tabular data
2. choose a feature set
3. train a simple model
4. produce ranked predictions
5. export a submission file
"""
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "sample_submission.csv"
RNG = np.random.default_rng(42)


def make_dataset(rows: int = 800) -> pd.DataFrame:
    features = pd.DataFrame(
        {
            "feature_quality": RNG.normal(size=rows),
            "feature_value": RNG.normal(size=rows),
            "feature_momentum": RNG.normal(size=rows),
            "feature_sentiment": RNG.normal(size=rows),
            "feature_macro": RNG.normal(size=rows),
        }
    )
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
    submission = pd.DataFrame(
        {
            "row_id": np.arange(len(live_pred)),
            "prediction": pd.Series(live_pred).rank(pct=True),
        }
    )
    submission.to_csv(OUTPUT, index=False)
    print(f"wrote_submission={OUTPUT}")


if __name__ == "__main__":
    main()
