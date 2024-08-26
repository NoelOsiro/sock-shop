import Link from 'next/link'

export function NavLinks() {
  return (
    <>
      <Link 
        href="/men" 
        className="block px-3 py-2 font-medium text-lg rounded-md transition-colors duration-200 ease-in-out
                   hover:bg-primary hover:text-primary-foreground
                   focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                   dark:focus:ring-offset-gray-900"
      >
        Men
      </Link>
      <Link 
        href="/women" 
        className="block px-3 py-2 font-medium text-lg rounded-md transition-colors duration-200 ease-in-out
                   hover:bg-primary hover:text-primary-foreground
                   focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                   dark:focus:ring-offset-gray-900"
      >
        Women
      </Link>
      <Link 
        href="/children" 
        className="block px-3 py-2 font-medium text-lg rounded-md transition-colors duration-200 ease-in-out
                   hover:bg-primary hover:text-primary-foreground
                   focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                   dark:focus:ring-offset-gray-900"
      >
        Children
      </Link>
    </>
  )
}