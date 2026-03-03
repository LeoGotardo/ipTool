

export function Button(callback, label) {
  return (
    <div className="button">
      <button onClick={callback}>{label}</button>
    </div>
  )
}