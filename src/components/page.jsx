import '../App.css'

import { Response } from './response.jsx'
import { Button } from './button.jsx'
import { Input } from './input.jsx'
import { lookup } from '../utils/lookup.js'

window.ipData = null
window.dispatchEvent(new Event("ipDataReady"));

export function Page() {
  return (
    <div className="page">
      <h1>IPTool lookup</h1>
        <link rel="icon" href="/favicon.ico" />
        <div className="input-container"><Input tyle={"text"} placeholder={"IP"} id={"ip"} /></div>
        <div className="button-container"><Button callback={lookup} label={"Lookup"} /></div>
        <div className="response-container"><Response /></div>
    </div>
  )
}
