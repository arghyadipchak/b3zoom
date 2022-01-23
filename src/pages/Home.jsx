import { useEffect, useState } from 'react'

const wdic = {0: "Sun", 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat"}
const sbuf = process.env.REACT_APP_BUFFER_START.split(':')
const ebuf = process.env.REACT_APP_BUFFER_END.split(':')

export default function Home() {
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL).then(resp => resp.json()).then(meets => {
      const today = wdic[new Date().getDay()]
      const meets_now = []
      const now = Date.now()
      const date = new Date()
      var meet, arr, time
      for (const i in meets) {
        meet = meets[i]
        if (localStorage.getItem(meet['id'])==='false' || !meet['days'].includes(today)) continue
        arr = meet['start'].split(':')
        time = date.setHours(arr[0], arr[1]) - (sbuf[0]*3600000 + sbuf[1]*60000)
        if (now < time) continue
        arr = meet['end'].split(':')
        time = date.setHours(arr[0], arr[1]) + (ebuf[0]*3600000 + ebuf[1]*60000)
        if (now < time) meets_now.push(meet)    
      }      
      setLoaded(true)
      setItems(meets_now)
    }, error => console.log(error))
  }, [])

  var inside = (
    <div className="text-center text-lg text-vanHelsing-300 font-bold">
      <span className="loading">Loading Classes</span>
    </div>
  )

  if (loaded) {
    if (items.length===1) window.location.href = items[0]['url']
    else inside = items.length===0 ? (
      <div className="text-center text-lg text-vanHelsing-300 font-bold">
        No Class Found!
      </div>
    ) : items.map((item, i) => (
      <a key={i} href={item['url']} className="relative inline-flex items-center justify-center my-2 p-4 px-6 py-3 overflow-hidden font-medium text-vanHelsing-500 transition duration-300 ease-out border-2 border-vanHelsing-500 rounded-full shadow-md group">
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-vanHelsing-500 group-hover:translate-x-0 ease">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-vanHelsing-500 transition-all duration-300 transform group-hover:translate-x-full ease">{item['name']}</span>
        <span className="relative invisible">{item['name']}</span>
      </a>      
    ))
  } 
 
  return (
    <div className="flex items-center justify-center h-screen bg-nosferatu">
      <div className="flex flex-col items-center bg-aro py-6 rounded-md px-10 max-w-lg shadow-md">
        {inside}
      </div>
    </div>
  )
}
