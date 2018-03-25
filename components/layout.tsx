import Link from 'next/link'

export default ({children}) => (
  <div>
    <h1>
      <Link href='/'>
        <a>Theo</a>
      </Link>
    </h1>
    
    {children}
  </div>
)