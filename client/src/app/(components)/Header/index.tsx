
type HeaderProps = {
    name: string;
}

const Header = ({ name }: HeaderProps) => {
  return (
    <h1 className='text-2xl font-semibold text-blue-500 mt-4 mb-4'>{name}</h1>
  )
}

export default Header;