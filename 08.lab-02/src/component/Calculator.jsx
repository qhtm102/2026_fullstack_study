

import './Calculator.css'

export default function Calculator() {
  return (
    <div className="calculator-container">
      <div className="calculator-body">
        {/* Top Section: Brand Logo & Solar Panel */}
        <div className="calculator-top">
          <div className="brand-name">ANTIGRAVITY</div>
          <div className="solar-panel">
            <span className="solar-strip"></span>
            <span className="solar-strip"></span>
            <span className="solar-strip"></span>
            <span className="solar-strip"></span>
          </div>
        </div>

        {/* Display Screen */}
        <div className="display-container">
          <input type="text" className="display-screen" value="12345" readOnly />
        </div>

        {/* Calculator Buttons Grid */}
        <table className="calculator-grid">
          <tbody>
            <tr>
              <td><button type="button" className="btn-key text-key">7</button></td>
              <td><button type="button" className="btn-key text-key">8</button></td>
              <td><button type="button" className="btn-key text-key">9</button></td>
              <td><button type="button" className="btn-key op-key">X</button></td>
            </tr>
            <tr>
              <td><button type="button" className="btn-key text-key">4</button></td>
              <td><button type="button" className="btn-key text-key">5</button></td>
              <td><button type="button" className="btn-key text-key">6</button></td>
              <td><button type="button" className="btn-key op-key">+</button></td>
            </tr>
            <tr>
              <td><button type="button" className="btn-key text-key">1</button></td>
              <td><button type="button" className="btn-key text-key">2</button></td>
              <td><button type="button" className="btn-key text-key">3</button></td>
              <td><button type="button" className="btn-key op-key">-</button></td>
            </tr>
            <tr>
              <td><button type="button" className="btn-key text-key">0</button></td>
              <td><button type="button" className="btn-key text-key">.</button></td>
              <td><button type="button" className="btn-key text-key">/</button></td>
              <td><button type="button" className="btn-key op-key btn-equal">=</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}


