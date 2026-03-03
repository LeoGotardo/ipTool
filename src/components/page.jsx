import '../App.css'

import { Response } from './response.jsx'
import { Button } from './button.jsx'
import { Input } from './input.jsx'
import { loockup } from '../utils/loockup.js'

let ipData = {}

export function Page() {
  return (
    <div className="page">
      <h1>IPTool Loockup</h1>
        <div className="input-container"><Input tyle={"text"} placeholder={"IP"} id={"ip"} /></div>
        <div className="button-container"><Button callback={loockup} label={"Lookup"} /></div>
        <div className="response-container"><Response ipData={ipData}/></div>
    </div>
  )
}