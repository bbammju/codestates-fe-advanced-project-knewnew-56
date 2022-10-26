import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/knew.png'
import { Paging } from "../components/paging";
import { useStore } from '../zustand/store'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Radio from '../components/radio'
import { Container, Logo, ContentContainer, Content, Thumbnail, InfoContainer, Info, Info1,SearchContainer, Search, Searchbtn } from "../components/container";


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

  const requestdata = async () => {
    try {
      const listdata = await axios.get(`http://localhost:3500/reviewdata`)
      return listdata
    }
    catch (err) { }
  }
  
  const getdata = requestdata()
  const setPage = (e) => {
    setCurrentpage(e);
  };
  useEffect(() => {
    getdata.then((el) => {
      setItems(el.data)
      console.log(el.data)
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

      <Logo src={logo}/>
      <SearchContainer>
        <Radio/>
        <Search onKeyUp={(e) => {keywordHandler(e)}} placeholder='검색어를 입력하세요'/>
        <Searchbtn onClick={() => {searchHandler()}} style={{color : "#FF4848"}}>?</Searchbtn>
      </SearchContainer>
      <ContentContainer> 
      {currentPosts && items.length > 0 ? (
       currentPosts.map((item) => (
        <div key={item.createdAt}>
          <Content>
            {item.images?.length !== 0 ? (
              <>
                <Thumbnail src={item.image}></Thumbnail>
                <InfoContainer>
                  <Info>{item.content}</Info>
                  <Info1>{item.nickname}</Info1>
                </InfoContainer>
              </>
            ) : ( 
              <>
              <Thumbnail src={logo}></Thumbnail>
              <InfoContainer>
                <Info>{item.content}</Info>
                <Info1>{item.author.nickname}</Info1>
              </InfoContainer>
              </>
            )}
          
          </Content>
           
        </div>
      ))
     ) 
     : <div>게시물이 없습니다.</div>
	}
     <Paging page={currentpage} count={count} setPage={setPage} />
      </ContentContainer>
    </Container>
  )
}

export default Main;


