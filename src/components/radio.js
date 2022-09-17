import React from "react"
import { useStore } from '../zustand/store'

const Radio = () => {
  const {check, setCheck} = useStore()
  const test = (e) => {
    setCheck(e.target.value)
  }
return(
  <>
  <label>
    <input type='radio' value='user' checked={check === 'user'} onChange={(e) => {test(e)}}></input>
    유저
  </label>
  <label>
    <input type='radio' value='review' checked={check === 'review'} onChange={(e) => {test(e)}}></input>
    리뷰
  </label>
  </>
)

}

export default Radio
