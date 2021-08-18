

export function createDebounce (defaultCallback, defaultDuration = 300) {
  let timeout = null
  let promise = null
  let done = null

  return (cb, duration) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    promise = promise ||
      new Promise((resolve) => {
        done = resolve
      })

    timeout = setTimeout(
      async () => {
        if (typeof cb === 'function') {
          await cb()
        } else if (typeof defaultCallback === 'function') {
          await defaultCallback()
        }

        done?.()

        timeout = promise = done = null
      },
      typeof duration === 'number' ? duration : defaultDuration
    )

    return promise
  }
}