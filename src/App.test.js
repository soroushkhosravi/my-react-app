import { render, screen } from '@testing-library/react';
import {App} from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const userResponse = rest.get(
	"http://127.0.0.1/api/user",
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

const handlers = [userResponse,]

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(()=> server.resetHandlers());
afterAll(() => server.close());

test('App rendering because of backend not responding.', () => {
  render(<App />);
  const linkElement = screen.getByText(/Application not available because of:/i);
  expect(linkElement).toBeInTheDocument();
});

test('Another test.', async () => {
  render(<App />);
  const secEl = await screen.findByText("The user is soroush with email khosravi");
  expect(secEl).toBeInTheDocument();
});
