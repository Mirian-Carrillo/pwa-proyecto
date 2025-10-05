import { useState } from 'react'
import './App.css'

function App() {
  const [likes, setLikes] = useState(0)

  return (
    <>
      <header className="app-header">
        <img src="/icons/ponyo.png" alt="MelodyWave Logo" width={48} />
        <h1>MelodyWave</h1>
      </header>


      <main>
        <section className="intro">
          <h2>Géneros populares</h2>
          <ul className="genres">
            <li>Pop</li>
            <li>Rock</li>
            <li>Jazz</li>
            <li>Clásica</li>
            <li>Electrónica</li>
          </ul>
        </section>

        <section className="featured">
          <h2>Canciones Más Escuchadas</h2>
          <div className="grid">
            <article className="card">
              <img src="/assets/zoe.jpg" alt="Zoe" />
              <h3>Labios Rotos-Zoe</h3>
            </article>
            <article className="card">
              <img src="/assets/humbe.jpg" alt="humbe" />
              <h3>Esencia-Humbe</h3>
            </article>
            <article className="card">
              <img src="/assets/only.jpg" alt="only" />
              <h3>ONLY-Lee Hi</h3>
            </article>
            <article className="card">
              <img src="/assets/billie.jpg" alt="billie" />
              <h3>Hit Me Hard and Soft-Billie Eilish</h3>
            </article>
            <article className="card">
              <img src="/assets/SUGA.jpg" alt="SUGA" />
              <h3>agust d-suga(bts)</h3>
            </article>
            <article className="card">
              <img src="/assets/wavetoheart.jpg" alt="wavetoheart" />
              <h3>seasons-Wave to Heart</h3>
            </article>
          <article className="card">
            <img src="/assets/hum.jpg" alt="hum" />
            <h3>Amor De Cine-Humbe</h3>
          </article>
          <article className="card">
            <img src="/assets/kevinkaarl.jpg" alt="Kevin" />
            <h3>Es Que Yo Tequiero A Ti-Kevin kaarl </h3>
          </article>
          <article className="card">
            <img src="/assets/tryagain.jpg" alt="Try Again" />
            <h3>Try Again-Jaehyun</h3>
          </article>
           <article className="card">
            <img src="/assets/BALLADS.jpg" alt="BALLADS" />
            <h3>BALLADS-Joji</h3>
          </article>
           <article className="card">
            <img src="/assets/mitski.jpg" alt="Mitshki" />
            <h3> My Love Mine All Mine-Mitski</h3> 
          </article>
        </div>
      </section>

      <div className="likes">
        <button onClick={() => setLikes(likes + 1)}>
          ❤️ Me gusta ({likes})
        </button>
      </div>
    </main >

      <footer>
        <p>© 2025 MelodyWave — Tu mundo musical</p>
      </footer>
    </>
  )
}



export default App



