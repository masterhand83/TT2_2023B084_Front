import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div>
      <h1>PAGINA NO ENCONTRADA - 404</h1>
      <p>contactar al usuario mas cercano</p>
    </div>
  )
}