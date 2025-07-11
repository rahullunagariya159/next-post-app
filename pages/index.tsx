import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome</h1>

        <Link href="/posts" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
          Go to Posts
        </Link>

      </main>
    </>
  );
}
