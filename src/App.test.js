import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {App, SetJWT} from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { BrowserRouter, Routes, Route} from "react-router-dom";

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
					auth_url: "http://backend/auth"
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

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ jwt: 'token' }),
  useNavigate: () => mockedUsedNavigate,
}));

test('App rendering for a logged in user.', async () => {
  render(<App />);
  const originElement = await waitFor (() => screen.findByText("Application not available because of:"));
  expect(originElement).toBeInTheDocument();
  const firstEl = await waitFor (() => screen.findByText("This is home page."));
  const secEl = await waitFor (() => screen.findByText("test environment."));
  const thirdEl = await waitFor (() => screen.findByText("The user is soroush with email khosravi"));
  const LogOutButton = await waitFor (() => screen.findByText("Log out"));
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

test('Clicking on log in link redirects you to proper url', async () => {
  let assignLocation = jest.fn();
  delete window.location;
  window.location = {
	assign: assignLocation,
	origin: "http:127.0.0.1"
  };
  let testHistory, testLocation;
  server.use(NotLoggedInUserResponse);
  render(<App />);
  const secEl = await screen.findByText("Log In");
  userEvent.click(secEl);
  expect(assignLocation).toHaveBeenCalledTimes(1);
  expect(assignLocation).toHaveBeenCalledWith("http://backend/auth?next_url=http:127.0.0.1/jwt");
  assignLocation.mockClear();
});

test('Setting JWT adds token to local storage', () => {
  const jwt_token = localStorage.getItem("jwt_token");
  expect(jwt_token).toBe(null);
  render(<SetJWT />);
  const jwt_token_after_setting = localStorage.getItem("jwt_token");
  expect(jwt_token_after_setting).toBe("token");
});
