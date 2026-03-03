export function Input(type, placeholder, id) {
  return (
    <div className="input">
      <input type={type} placeholder={placeholder} id={id} />
    </div>
  )
}