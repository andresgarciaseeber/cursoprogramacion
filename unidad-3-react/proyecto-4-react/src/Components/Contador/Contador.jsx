import { useState } from 'react'

const Contador = ({ min = 1, max = 10, initial = 1 }) => {
  const [contador, setContador] = useState(initial)
  const [mensaje, setMensaje] = useState('')

  const incrementar = () => {
    if (contador < max) {
      setContador(contador + 1)
      setMensaje('')
    } else {
      setMensaje('Has llegado al limite')
    }
  }

  const decrementar = () => {
    if (contador > min) {
      setContador(contador - 1)
      setMensaje('')
    } else {
      setMensaje('No puedes tener menos de ' + min)
    }
  }

  return (
    <div>
      <button onClick={decrementar} disabled={contador <= min}>
        Decrementar
      </button>
      <span>{contador}</span>
      <button onClick={incrementar} disabled={contador >= max}>
        Incrementar
      </button>
      {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
    </div>
  )
}

export default Contador
