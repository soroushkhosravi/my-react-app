import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {CompleteApp, SetJWT, ProtectedRoute, App, Address, LogOut, AddressButton} from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { BrowserRouter, Routes, Route, MemoryRouter} from "react-router-dom";
import { UnauthorisedUserMessage } from './helpers.js'

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
					message: UnauthorisedUserMessage,
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
  render(<CompleteApp />);
  const originElement = await waitFor (() => screen.findByText("Page loading."));
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
  render(<CompleteApp />);
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
  render(<CompleteApp />);
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

test('Clicking log out button removes jwt token.', async () => {
  render(<CompleteApp />);
  localStorage.setItem("jwt_token", "token");
  const jwt_token_before_log_out = localStorage.getItem("jwt_token");
  expect(jwt_token_before_log_out).toBe("token");
  const LogOutText = await waitFor (() => screen.findByText("Log out"));
  expect(LogOutText).toBeInTheDocument();
  userEvent.click(LogOutText);
  expect(window.location.origin).toBe('http:127.0.0.1');
  const jwt_token_after_log_out = localStorage.getItem("jwt_token");
  expect(jwt_token_after_log_out).toBe("token");
});


test('Going to home shows the message if user logged in.', async () => {
	const homeRoute = '/address'
	render(
		<MemoryRouter initialEntries={[homeRoute]}>
			<Routes>
            <Route path="/" element={< App />} />
            <Route path="/address" element={
                <ProtectedRoute>
                    <Address/>
                </ProtectedRoute>
            } ></Route>
			<Route path="/jwt/:jwt" element={< SetJWT />} />
			<Route path="/logout" element={< LogOut />} />
        </Routes>
		</MemoryRouter>,
	)
	const addressHeading = await screen.findByText("Address investigation.");
	expect(addressHeading).toBeInTheDocument();
});

test('Going to home shows Log in button if user not logged in.', async () => {
	server.use(NotLoggedInUserResponse);
	const homeRoute = '/address'
	render(
		<MemoryRouter initialEntries={[homeRoute]}>
			<Routes>
            <Route path="/" element={< App />} />
            <Route path="/address" element={
                <ProtectedRoute>
                    <Address/>
                </ProtectedRoute>
            } ></Route>
			<Route path="/jwt/:jwt" element={< SetJWT />} />
			<Route path="/logout" element={< LogOut />} />
        </Routes>
		</MemoryRouter>,
	)
	const logInButton = await screen.findByText("Log In");
	expect(logInButton).toBeInTheDocument();
});


test('Address Button element shows proper button.', () => {
	render(
		<BrowserRouter>
			<AddressButton />
		</BrowserRouter>
	)
	const button = screen.getByText("Address investigation");
	expect(button).toBeInTheDocument();
});

