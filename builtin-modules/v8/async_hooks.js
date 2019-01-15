const async_hooks = require('async_hooks')

export default async_hooks
export const {
  'AsyncResource': AsyncResource,
  'createHook': createHook,
  'executionAsyncId': executionAsyncId,
  'triggerAsyncId': triggerAsyncId,
} = async_hooks