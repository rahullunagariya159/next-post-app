// __tests__/posts.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PostsPage, { getStaticProps } from '../pages/posts';

const mockPosts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
    { id: 4, title: 'Post 4' },
    { id: 5, title: 'Post 5' },
];

describe('PostsPage', () => {
    it('renders the heading and button', () => {
        render(<PostsPage posts={mockPosts} />);
        expect(screen.getByText('Top 5 Posts')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /toggle posts/i })).toBeInTheDocument();
    });

    it('shows all 5 posts initially', () => {
        render(<PostsPage posts={mockPosts} />);
        mockPosts.forEach(post => {
            expect(screen.getByText(post.title)).toBeInTheDocument();
        });
    });

    it('hides the posts after clicking toggle', async () => {
        render(<PostsPage posts={mockPosts} />);
        fireEvent.click(screen.getByRole('button', { name: /toggle posts/i }));
        await waitFor(() => {
            mockPosts.forEach(post => {
                expect(screen.queryByText(post.title)).not.toBeInTheDocument();
            });
        });
    });

    it('shows the posts again when clicking toggle twice', async () => {
        render(<PostsPage posts={mockPosts} />);
        const button = screen.getByRole('button', { name: /toggle posts/i });
        fireEvent.click(button); // hide
        fireEvent.click(button); // show again
        await waitFor(() => {
            mockPosts.forEach(post => {
                expect(screen.getByText(post.title)).toBeInTheDocument();
            });
        });
    });
});

describe('getStaticProps', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([...mockPosts, { id: 6, title: 'Post 6' }]),
            })
        ) as jest.Mock;
    });

    it('fetches and returns first 5 posts as props', async () => {
        const result = await getStaticProps();
        expect(result).toEqual({
            props: {
                posts: mockPosts,
            },
        });
    });
});
