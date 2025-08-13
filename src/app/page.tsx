import Link from 'next/link';

export default function Home() {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-br from-gray-50 to-gray-200'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white shadow-xl rounded-2xl p-10 animate-fadeIn transform transition-all duration-700 hover:shadow-2xl hover:-translate-y-1'>
        <Link
          href='/main'
          className='px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-out'
        >
          Головна сторінка
        </Link>
      </main>
    </div>
  );
}
