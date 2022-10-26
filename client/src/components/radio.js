import React from "react"
import { useStore } from '../zustand/store'
import styled from "styled-components"

const Radio = () => {
  const {check, setCheck} = useStore()
  const test = (e) => {
    setCheck(e.target.value)
  }
return(
  <RadioContainer>
  <label>
    <input type='radio' value='user' checked={check === 'user'} onChange={(e) => {test(e)}}></input>
    유저
  </label>
  <label>
    <input type='radio' value='review' checked={check === 'review'} onChange={(e) => {test(e)}}></input>
    리뷰
  </label>
  </RadioContainer>
)

}

export default Radio;

const RadioContainer = styled.div`
  width: 5vw;
  height: 6vh;
  display: flex;
  flex-direction: column;
  margin: 5px;
`
