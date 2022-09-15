import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/knew.png'
import { Paging } from "../components/paging";
import { Swiper, SwiperSlide } from "swiper/react";
import { useStore } from '../zustand/store'
import 'swiper/css';


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
  const [isopen, setIsopen] = useState(false)
  const openModalHandler = () => {
    setIsopen(!isopen);
  };
  const keywordHandler = (e) => {
    setKeyword(e.target.value)
  }
  const searchHandler = () => {
    navigate('/search')
  }
  const checkHandler = (e) => {
    setCheck(e.target.value)
  }


  const accessToken = window.localStorage.getItem('accessToken')
  const requestdata = async () => {
    try {
      const listdata = await axios.get(`https://dev.knewnnew.com/review/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
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
        <select name="option" onChange={(e) => {checkHandler(e)}}>
          <option value='user'>사용자</option>
          <option value='review'>리뷰</option>
        </select>

        <Search onKeyUp={(e) => {keywordHandler(e)}}/>
        <Searchbtn onClick={() => {searchHandler()}}>?</Searchbtn>
      </SearchContainer>
      <ContentContainer> 
      {currentPosts && items.length > 0 ? (
       currentPosts.map((item)=> (
        <div key={item.created}>
           {isopen === true ? <ModalBackdrop>
            <ModalContainer>
              <button onClick={() => {openModalHandler()}}>sdsdsd</button>
              <Swiper spaceBetween={50}
                slidesPerView={1}
              >            
                {item.images.map((el) => {
                  return(
                    <SwiperSlide>
                      <ModalImg src={el.image}></ModalImg>
                    </SwiperSlide>
                  )
                })}            
              </Swiper>
            </ModalContainer>
          </ModalBackdrop> : null}
          <Content>
            {item.images?.length !== 0 ? (
              <>
                <Thumbnail src={item.images[0].image} onClick={() => {openModalHandler()}}></Thumbnail>
                <InfoContainer>
                  <Info>{item.content}</Info>
                  <Info1>{item.author.nickname}</Info1>
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

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  bottom: 0%;
  right: 0%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 45vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  justify-content: center;
`

const ModalImg = styled.img`
  width: 33vw;
  height: 50vh;
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