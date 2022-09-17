import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/knew.png'
import { Paging } from "../components/paging";
import { useStore } from '../zustand/store'
import Radio from '../components/radio';

const Main = () => {
  
  const navigate = useNavigate()
  const {keyword, setKeyword, check, setCheck} = useStore()
  const [items, setItems] = useState([]) //리스트에 나타낼 아이템
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(5); //페이지당 아이템 개수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);
  
  const keywordHandler = (e) => {
    setKeyword(e.target.value)
  }
  const searchHandler = () => {
    if (check === 'user') {
      navigate('/search/user');
    }
    if (check === 'review') {
      navigate('/search/review');
    }
    
  }
  const accessToken = window.localStorage.getItem('accessToken')
  const requestdata = async () => {
    try {
      if (check === 'user') {
        const listdata = await axios.get(`https://dev.knewnnew.com/search/user/?nickname=${keyword}&limit=100`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return listdata
      }
      
    }
    catch (err) { }
  }
  
  const getdata = requestdata()
  const setPage = (e) => {
    setCurrentpage(e);
  };
  useEffect(() => {
    getdata.then((el) => {
      setItems(el.data.result)
    })

  }, []);

  useEffect(() => {
    setCount(items.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);

  return(
    <Container>
      <Logo src={logo} onClick={() => {navigate('/main')}}/>
      <SearchContainer>
        <Radio/>
        <Search onKeyUp={(e) => {keywordHandler(e)}}/>
        <Searchbtn onClick={() => {searchHandler()}}>?</Searchbtn>
      </SearchContainer>
      <ContentContainer> 
    
      {currentPosts.map((item)=> (
        <div key={item.id}>
          <Content>
            <>
              <Thumbnail src={item.profileImage}></Thumbnail>
              <InfoContainer>
                <Info>{item.id}</Info>
                <Info1>{item.nickname}</Info1>
              </InfoContainer>
            </>
          </Content>          
        </div>
      ))
     
	}
     <Paging page={currentpage} count={count} setPage={setPage} />
      </ContentContainer>
    </Container>
  )
}

export default Main;

const Container = styled.div`
  width: 45vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: auto;
  border: 1px solid;
`

const Logo = styled.img`
  width: 15vw;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`

const ContentContainer = styled.div`
  width: 43vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  border: 1px solid;
  margin: auto;
`

const Content = styled.div`
  width: 41vw;
  height: 5vh;
  display: flex;
  margin: 5px;
  border: 1px solid;
`

const Thumbnail = styled.img`
  width: 5vw;
  height: 5vh;
`

const InfoContainer = styled.div`
  width: 41vw;
  height: 5vh;
  display: flex;
  justify-content: space-between;
`
const Info = styled.div`
  width: 20vw;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Info1 = styled.div`
  width: 10vw;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`


const SearchContainer = styled.div`
  width: 43vw;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  margin: auto;
`

const Search = styled.input`
  width: 40vw;
  height: 5vh;
`

const Searchbtn = styled.button`
  width: 4vw;
  height: 5.5vh;

`