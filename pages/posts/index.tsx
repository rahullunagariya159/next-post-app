// pages/posts.tsx
import { useState } from 'react';
import Head from 'next/head';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface PostsPageProps {
    posts: Post[];
}

export default function PostsPage({ posts }: PostsPageProps) {
    const [visible, setVisible] = useState(true);

    return (
        <>
            <Head>
                <title>Top 5 Posts</title>
            </Head>
            <main className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Top 5 Posts</h1>

                <button
                    onClick={() => setVisible(!visible)}
                    className="mb-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                >
                    Toggle Posts
                </button>

                {visible && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                            >
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {post.title}
                                </h2>
                                <p className="text-gray-700 whitespace-pre-line">{post.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    return {
        props: {
            posts: data.slice(0, 5),
        },
    };
}
