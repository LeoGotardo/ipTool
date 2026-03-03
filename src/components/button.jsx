

export function Button(props) {
  return (
    <div className="button">
      <button onClick={props.callback}>{props.label}</button>
    </div>
  )
}