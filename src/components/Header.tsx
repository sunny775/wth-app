import BrandLogo from './BrandLogo'
import Container from './Container'
import SearchBar from './SearchBar'

export default function Header() {


  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-gray-200 bg-white">
      <Container classNames="relative flex h-16 items-center justify-between gap-4 sm:gap-8">
        <div className="flex items-center gap-4">
          <BrandLogo />
        </div>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <SearchBar />

        </div>
      </Container>
    </header>
  )
}