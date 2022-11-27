import FUNCTIONS from "./func";

export const MIN_VALUES = {
  start: -100_000,
  end: -100_000,
  precisionCount: 1,
  funcId: 0,
};

export const MAX_VALUES = {
  start: 100_000,
  end: 100_000,
  precisionCount: 5,
  funcId: FUNCTIONS.length - 1,
};

export const DEFAULT_VALUES = {
  start: -2,
  end: 2,
  precisionCount: MIN_VALUES.precisionCount,
  funcId: 0,
};

export const EMPTY_VALUES = {
  start: 0,
  end: 0,
  precisionCount: MAX_VALUES.precisionCount,
  funcId: 0,
};
