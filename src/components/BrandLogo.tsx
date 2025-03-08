import { Link } from "react-router"

export default function BrandLogo({ fontSize = 'text-sm' }) {
  return (
    <Link to="/">
      <div className={`inline-flex gap-1.5 ${fontSize}`}>
        <span className="font-medium">Weather App</span>

        <span aria-hidden="true" role="img">
          🚀
        </span>
      </div>
    </Link>
  )
}