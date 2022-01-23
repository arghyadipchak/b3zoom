const cmap = JSON.parse(process.env.REACT_APP_CLASS_MAP)

function TogButton(props) {
  return (
    <label
      htmlFor={props.id}
      className="flex items-center py-2"
    >
      <div className="relative cursor-pointer">
        <input
          id={props.id} type="checkbox" className="sr-only"
          defaultChecked={localStorage.getItem(props.id)!=="false"}
          onChange={event => localStorage.setItem(props.id, event.target.checked)}
        />
        <div className="w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
        <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
      </div>
      <div className="ml-3 text-base text-vanHelsing-50 font-medium">
        {props.label}
      </div>
    </label>
  )
}

export default function Prefs() {
  return (
    <div className="flex items-center justify-center h-screen bg-nosferatu">
      <div className="bg-aro py-6 rounded-md px-10 max-w-lg shadow-md">
        <div className="text-center text-xl text-vanHelsing-300 font-bold">
          Classes
        </div>
        {Object.keys(cmap).map(key => <TogButton key={key} id={key} label={cmap[key]} />)}
      </div>
    </div>
  )
}
