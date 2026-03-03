export function Input(props) {
  return (
    <div className="input">
      <input type={props.type} placeholder={props.placeholder} id={props.id} />
    </div>
  )
}