import { addEvent } from "./event"

export default function EventPage() {
  const clickDiv = () => {
    console.log("click div")
  }
  const clickButton = (e) => {
    console.log("click button")
  }
  const clickInner = (e) => {
    e.stopPropagation()
    console.log("click inner")
  }
  return (
    <div bindClick={clickDiv}>
      <div bindClick={clickInner}>
        <button bindClick={clickButton}>按钮</button>
      </div>
    </div>
  )
}

addEvent(document.getElementById("root"), "click")
