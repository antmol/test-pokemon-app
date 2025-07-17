import { useEffect, useState } from 'react'
import './App.css'

type PokemonListItem = {
  name: string
  url: string
  weight?: number
  height?: number
  frontImg?: string
  backImg?: string
  types?: string[]
}

type PokemonDetail = {
  name: string
  sprites: { front_default: string, back_default: string }
  weight: number
  height: number
  abilities: { ability: { name: string } }[]
  types: { type: { name: string } }[]
  moves: { move: { name: string } }[]
}

function App() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<PokemonDetail | null>(null)
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=100')
        if (!response.ok) throw new Error('Error al obtener datos')
        const data = await response.json()
        const detalles = await Promise.all(
          data.results.map(async (p: PokemonListItem) => {
            const res = await fetch(p.url)
            const detalle = await res.json()
            return {
              name: p.name,
              url: p.url,
              weight: detalle.weight,
              height: detalle.height,
              frontImg: detalle.sprites.front_default,
              backImg: detalle.sprites.back_default,
              types: detalle.types.map((t: any) => t.type.name),
            }
          })
        )
        setPokemons(detalles)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [])

  const handleCardClick = async (url: string, name: string) => {
    setDetailLoading(true)
    setModalOpen(true)
    setSelectedName(name)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setSelected(data)
    } catch {
      setSelected(null)
    } finally {
      setDetailLoading(false)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelected(null)
    setSelectedName(null)
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container">
      <h1>App Pokemon</h1>
      <input
        type="text"
        placeholder="Filtrar por nombre..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ marginBottom: '16px', padding: '8px', width: '100%', maxWidth: 300 }}
      />
      <table
        className="pokemon-table"
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          margin: '0 auto'
        }}
      >
        <tbody>
          <tr>
            <th colSpan={4} style={{ border: '1px solid #ccc' }}>Datos del Pokémon</th>
            <th colSpan={2} style={{ border: '1px solid #ccc' }}>Imágenes</th>
            <th style={{ border: '1px solid #ccc' }}>Eliminar</th>
          </tr>
          <tr>
            <th style={{ border: '1px solid #ccc' }}>ID</th>
            <th style={{ border: '1px solid #ccc' }}>Nombre</th>
            <th style={{ border: '1px solid #ccc' }}>Peso</th>
            <th style={{ border: '1px solid #ccc' }}>Altura</th>
            <th style={{ border: '1px solid #ccc' }}>Frontal</th>
            <th style={{ border: '1px solid #ccc' }}>Trasera</th>
            <th style={{ border: '1px solid #ccc' }}>X</th>
          </tr>
          {pokemons
            .filter(pokemon => pokemon.name.toLowerCase().includes(filter.toLowerCase()))
            .map((pokemon, idx) => (
              <tr key={pokemon.name}>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>{idx + 1}</td>
                <td
                  style={{ border: '1px solid #ccc', cursor: 'pointer', textTransform: 'capitalize' }}
                  onClick={() => handleCardClick(pokemon.url, pokemon.name)}
                >
                  {pokemon.name}
                </td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>
                  {pokemon.weight ? `${pokemon.weight}` : '-'}
                </td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>
                  {pokemon.height ? `${pokemon.height}` : '-'}
                </td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>
                  <img
                    src={pokemon.frontImg}
                    alt={pokemon.name}
                    style={{ width: '48px', height: '48px' }}
                  />
                </td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>
                  <img
                    src={pokemon.backImg}
                    alt={pokemon.name}
                    style={{ width: '48px', height: '48px' }}
                  />
                </td>
                <td style={{ border: '1px solid #ccc', textAlign: 'center' }}>
                  <button
                    style={{ color: 'red' }}
                    onClick={() => setPokemons(prev => prev.filter(p => p.name !== pokemon.name))}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {detailLoading || !selected ? (
              <div>Cargando detalle...</div>
            ) : (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    alignItems: 'center',
                    gap: 24,
                    marginBottom: 20,
                    width: '100%',
                    maxWidth: 400,
                    margin: '0 auto'
                  }}
                >
                  <img
                    src={selected.sprites.front_default}
                    alt={selected.name}
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: 'contain',
                      justifySelf: 'center'
                    }}
                  />
                  <div>
                    <h2 style={{ margin: 0, textTransform: 'capitalize', fontSize: '2em' }}>{selected.name}</h2>
                    <p style={{ margin: '8px 0', fontSize: '1.1em' }}><strong>Peso:</strong> {selected.weight / 10} kg</p>
                    <p style={{ margin: '8px 0', fontSize: '1.1em' }}><strong>Altura:</strong> {selected.height / 10} m</p>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    alignItems: 'center',
                    gap: 24,
                    marginBottom: 20,
                    width: '100%',
                    maxWidth: 400,
                    margin: '0 auto'
                  }}
                >
                  <img
                    src={selected.sprites.back_default}
                    alt={selected.name + ' reverso'}
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: 'contain',
                      justifySelf: 'center'
                    }}
                  />
                  <div>
                    <p style={{ margin: '8px 0', fontSize: '1.1em' }}>
                      <strong>Movimientos:</strong> {selected.moves.slice(0, 5).map(m => m.move.name).join(', ')}
                    </p>
                  </div>
                </div>
                <p><strong>Tipo:</strong> {selected.types.map(t => t.type.name).join(', ')}</p>
                <p>
                  <strong>Habilidades:</strong> {selected.abilities.map(a => a.ability.name).join(', ')}
                </p>
                <button onClick={closeModal}>Cerrar</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
