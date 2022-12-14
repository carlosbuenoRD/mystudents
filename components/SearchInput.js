import React from 'react'

function SearchInput({ input, setInput }) {
  return (
    <form className='flex items-center'>
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='relative'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <input
          type='text'
          id='simple-search'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='bg-gray-50 border border-gray-300 block w-full pl-8 p-1.5 lg:p-2.5 lg:pl-8 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-orange-400'
          placeholder='Search'
          required
        />
      </div>
    </form>
  )
}

export default SearchInput
