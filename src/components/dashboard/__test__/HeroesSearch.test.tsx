import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { server } from '../../../../tests/mock-server';
import { renderWithContexts } from '../../../../tests/render-with-contexts';
import HeroesSearch from '../HeroesSearch/HeroesSearch';

describe('Heroes Search component', () => {
	const url = 'heroes/search';

	test('should display loader after submitting a search term', async () => {
		server.use(
			rest.get('/heroes/search', (_, res, ctx) => {
				return res(
					ctx.status(200),
					ctx.delay(3000),
					ctx.json([
						{ id: 10, name: 'Amanda' },
						{ id: 22, name: 'Kate' },
					]),
				);
			}),
		);

		const user = userEvent.setup();
		renderWithContexts(
			<MemoryRouter initialEntries={['/dashboard']}>
				<HeroesSearch />
			</MemoryRouter>,
		);
		const searchInput = screen.getByRole('textbox');

		await user.type(searchInput, 'a');
		await user.click(screen.getByRole('button'));

		expect(screen.getByRole('loader')).toBeInTheDocument();
	});

	test('should display a list of hero after submitting a search term', async () => {
		const user = userEvent.setup();
		renderWithContexts(
			<MemoryRouter initialEntries={['/dashboard']}>
				<HeroesSearch />
			</MemoryRouter>,
		);
		const searchInput = screen.getByRole('textbox');

		await user.type(searchInput, 'a');
		await user.click(screen.getByRole('button'));

		await waitFor(() => {
			expect(screen.getAllByRole('listitem')).toHaveLength(2);
			expect(screen.getByText(/Amanda/i)).toBeInTheDocument();
			expect(screen.getByText(/Kate/i)).toBeInTheDocument();
		});
	});

	test('should display an error message when the search fails', async () => {
		server.use(
			rest.get(url, (_, res, ctx) => {
				return res(ctx.status(500), ctx.json({ message: 'oops' }));
			}),
		);
		const user = userEvent.setup();
		const { container } = renderWithContexts(
			<MemoryRouter initialEntries={['/dashboard']}>
				<HeroesSearch />
			</MemoryRouter>,
		);
		const searchInput = screen.getByRole('textbox');

		await user.type(searchInput, 'a');
		await user.click(screen.getByRole('button'));

		await waitFor(() => {
			expect(container.querySelector('.error-wrapper')).toBeInTheDocument();
		});
	});
});
