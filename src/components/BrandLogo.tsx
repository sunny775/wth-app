import { Link } from "react-router"

export default function BrandLogo({ fontSize = 'text-sm' }) {
  return (
    <Link to="/">
      <div className={`inline-flex gap-1.5 justify-center items-center ${fontSize}`}>
        <span className="font-medium">Weather App</span>

        <span aria-hidden="true" role="img">
          <img src="/favicon.svg" className="w-6 h-6" alt="App Logo" />
        </span>
      </div>
    </Link>
  )
}