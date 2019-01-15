const perf_hooks = require('perf_hooks')

export default perf_hooks
export const {
  'PerformanceObserver': PerformanceObserver,
  'constants': constants,
  'performance': performance,
} = perf_hooks