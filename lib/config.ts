export const SHORT_TERM_CONFIG = {
  name: "Short-Term",
  ema_windows: [9, 20],
  rsi_window: 10,
  atr_window: 14,
  time_frames: ["5m", "15m", "30m", "1h"],
  risk_per_trade: 0.01,
  stop_loss_atr_multiplier: [1.0, 1.5],
  take_profit_atr_multiplier: [1.5, 2.0],
  position_size_factor: 1.0,
  mtf_weights: {
    "5m": 1.0,
    "15m": 1.0,
    "30m": 1.0,
    "1h": 0.8,
    "4h": 0.5,
    "1d": 0.3,
  },
  ml_conf_threshold: 0.6,
}

export const LONG_TERM_CONFIG = {
  name: "Long-Term",
  ema_windows: [50, 200],
  rsi_window: 14,
  atr_window: 14,
  time_frames: ["4h", "1d", "1wk"],
  risk_per_trade: 0.01,
  stop_loss_atr_multiplier: [2.0, 3.0],
  take_profit_atr_multiplier: [3.0, 5.0],
  position_size_factor: 2.0,
  mtf_weights: {
    "5m": 0.3,
    "15m": 0.3,
    "30m": 0.5,
    "1h": 0.8,
    "4h": 1.0,
    "1d": 1.0,
    "1wk": 1.0,
  },
  ml_conf_threshold: 0.6,
}
