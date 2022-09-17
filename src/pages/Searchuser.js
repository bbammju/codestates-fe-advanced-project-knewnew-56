import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/knew.png'
import { Paging } from "../components/paging";
import { useStore } from '../zustand/store'
import Radio from '../components/radio';
import { Container, Logo, ContentContainer, Content, Thumbnail, InfoContainer, Info, Info1, ModalBackdrop, ModalContainer, ModalImg, ModalClose, SearchContainer, Search, Searchbtn } from "../components/container";

const Main = () => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
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
        <Search onKeyUp={(e) => {keywordHandler(e)}} placeholder='검색어를 입력하세요'/>
        <Searchbtn onClick={() => {searchHandler()}} style={{color : "#FF4848"}}>?</Searchbtn>
      </SearchContainer>
      <ContentContainer> 
    
      {currentPosts.map((item)=> (
        <div key={item.id}>
          <Content>    
            <Thumbnail src={item.profileImage}></Thumbnail>
            <InfoContainer>
              <Info>{item.id}</Info>
              <Info1>{item.nickname}</Info1>
            </InfoContainer>        
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
