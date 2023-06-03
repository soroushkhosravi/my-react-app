import { render, screen } from '@testing-library/react';
import {App} from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const LoggedInUserResponse = rest.get(
	"http://backend/api/user",
	(req, res, ctx) => {
		return res(
			ctx.json(
				{
					message: "current user is found.",
					user: JSON.stringify({"username": "soroush", "email": "khosravi"})
				}
			)
		)
	}
)

const NotLoggedInUserResponse = rest.get(
	"http://backend/api/user",
	(req, res, ctx) => {
		return res(
			ctx.json(
				{
					message: "user not logged in.",
					user: JSON.stringify({"username": "soroush", "email": "khosravi"})
				}
			)
		)
	}
)

const handlers = [LoggedInUserResponse,]

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(()=> server.resetHandlers());
afterAll(() => server.close());

test('App rendering for a logged in user.', async () => {
  render(<App />);
  const originElement = await screen.findByText("Application not available because of:")
  expect(originElement).toBeInTheDocument();
  const firstEl = await screen.findByText("This is home page.");
  const secEl = await screen.findByText("test environment.");
  const thirdEl = await screen.findByText("The user is soroush with email khosravi")
  const LogOutButton = await screen.findByText("Log out")
  expect(firstEl).toBeInTheDocument();
  expect(secEl).toBeInTheDocument();
  expect(thirdEl).toBeInTheDocument();
  expect(LogOutButton).toBeInTheDocument();
});

test('Not logged in user response shows Login button.', async () => {
  server.use(NotLoggedInUserResponse);
  render(<App />);
  const secEl = await screen.findByText("Log In");
  expect(secEl).toBeInTheDocument();
});
