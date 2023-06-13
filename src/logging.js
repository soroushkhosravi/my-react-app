import * as Sentry from '@sentry/react';

const log = function (
  featureName,
  errorMessage,
  contextName,
  properties,
  level = "error",
) {
  Sentry.setContext(contextName, properties)

  Sentry.withScope((scope) => {
    scope.setTag('feature', featureName)
    scope.setLevel(level)
    Sentry.captureException(new Error(errorMessage))
  })
}

export { log }