import * as Sentry from '@sentry/react';

const sentryInitiator = () =>{
	Sentry.init({
		dsn: process.env.REACT_APP_SENTRY_DSN,
		integrations: [
		new Sentry.BrowserTracing({
		  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
		  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
		}),
		new Sentry.Replay()
		],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,

		// Capture Replay for 10% of all sessions,
		// plus for 100% of sessions with an error
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0,
		environment: process.env.REACT_APP_ENV
	});
}

export { sentryInitiator }