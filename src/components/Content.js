import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";
import Card from "./Card";
import fetchJsonp from 'fetch-jsonp';
import SafeIcon from "../../src/images/lock.svg";
import LoadingIcon from "../../src/images/loading.svg";
import { Fade } from 'react-reveal';
import BadWords from "badwords";

const Search = styled.input`
  border: 1px solid darkgray;
  color: dimgray;
  border-radius: 5px;
  padding: 16px;
  width: 100%;
  max-width: 360px;
  display: inline-block;
  font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
  box-sizing: border-box;

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    outline: none;
    box-shadow: none;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
    color: dimgray;
    font-size: 13px;
    line-height: 18px;
  }

  ::-moz-placeholder { /* Firefox 19+ */
    font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
    color: dimgray;
    font-size: 13px;
    line-height: 18px;
  }

  :-ms-input-placeholder { /* IE 10+ */
    font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
    color: darkgray;
    font-size: 13px;
    line-height: 18px;
  }

  :-moz-placeholder { /* Firefox 18- */
    font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
    font-size: 13px;
    line-height: 18px;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 22px white inset !important;
  }

  :-webkit-autofill {
    -webkit-text-fill-color: dimgray !important;
    font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
    font-size: 13px;
    line-height: 18px;
  }

  :focus {
    box-shadow: 0 0 0 0.25rem rgb(181 180 175 / 20%);
    transition: .2s;
  }
`;

const ImagesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SafeSearchButton = styled.button`
  display: block;
  margin-left: 12px;
  height: 50px;
  width: 100%;
  max-width: 70px;
  background: ${props => props.safe ? "#8bc34a" : "#ffc107"};
  border: ${props => props.safe ? "#8bc34a" : "#ffc107"};
  border-radius: 5px;
  cursor: pointer;
  
  img {
    height: 24px;
    margin-bottom: -2px;
  }
  
  :focus {
    box-shadow: ${props => props.safe ? "0 0 0 0.25rem rgb(140 194 74 / 50%)" : "0 0 0 0.25rem rgb(217 164 6 / 50%)"};
    transition: .2s;
  }
`;

const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const rotating = keyframes`
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
`;

const Loading = styled.img`
  height: 30px;
  width: 30px;
  display: block;
  margin: 40px auto;
  animation: ${rotating} 2s linear infinite;
`;

const CardBlock = styled.div`
  max-width: 100%;
  width: 100%;
  display: block;
  box-sizing: border-box;

  @media(min-width: 576px){
    max-width: calc(50% - 16px);
    margin: 0 8px 16px 8px;
  }
  
  @media(min-width: 992px){
    max-width: calc(33.33% - 16px);
  }
`;

const NoResultsBlock = styled.h2`
  text-align: center;
  width: 100%;
  font-family: Proxima Nova,helvetica neue,helvetica,arial,sans-serif;
  font-weight: 200;
  font-size: 24px;
  margin-bottom: 0;
`;

const Content = () => {
    let initSearch = ""
    if (window && window.location.pathname !== "/"){
        initSearch = window.location.pathname.substring(1)
    }

    const badWords = [...BadWords, ...[
        'sexy',
        'nude',
        'sexi'
    ]]

    const [page, setPage] = useState(1);
    const [change, setChange] = useState(Date.now())
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initSearch);
    const [isSearchSafe, setSearchSafe] = useState(true);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const loadImages = () => {
        const encodedQuery = encodeURIComponent(searchQuery)

        fetchJsonp(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=2239552c96fceaa19e99ddc25451e84d&lang=en-us&safe_search=${isSearchSafe ? 1 : 3}&per_page=30&extras=description,url_m,path_alias,tags&page=${page}&media=photos&format=json&tags=${encodedQuery}`,
            {jsonpCallback: 'jsoncallback'}
        )
            .then(res => res.json())
            .then(({photos}) => photos["photo"].filter((photo) => photo.tags !== ""))
            .then(photos => photos.filter(photo => !isSearchSafe || photo.tags.split(" ").filter(tag => badWords.includes(tag)).length === 0))
            .then((photos) => setImages([...images, ...photos]))
            .then(() => setIsLoading(false))
            .catch(() => alert("Ups.. something went wrong :("))
    }

    const toggleSafeSearch = () => {
        setSearchSafe(!isSearchSafe)
        setChange(Date.now())
        setImages([])
        setPage(1)
    }

    const updateQuery = (value) => {
        setSearchQuery(value)

        if (isLoading) {
            return
        }

        if (typingTimeout) {
            clearTimeout(typingTimeout)
        }

        setTypingTimeout(setTimeout(() => {
            setIsLoading(true);
            setImages([]);
            setPage(1);
            setChange(Date.now())
        }, 1000));
    }

    const loadMore = (e) => {
        if (!isLoading && (window.scrollY + window.innerHeight > e.target.body.scrollHeight - 50)){
            setIsLoading(true);
            setPage(page+1);
            setChange(Date.now());
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', loadMore)

        return function cleanup() {
            window.removeEventListener('scroll', loadMore)
        };
    }, [loadMore])

    useEffect(() => {
        loadImages();
    }, [change])


    return (
        <Container>
            <Row>
                <Col md={12}>
                    <ButtonsBlock>
                        <Search type="text" placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => updateQuery(e.target.value)}/>
                        <SafeSearchButton aria-label="Safe Search"
                                          onClick={toggleSafeSearch}
                                          safe={isSearchSafe ? 1 : 0}>
                            <img src={SafeIcon} alt="Lock icon"/>
                        </SafeSearchButton>
                    </ButtonsBlock>
                </Col>
            </Row>
            <ImagesRow>
                {images.length > 0 ?
                    <React.Fragment>
                        {images.map((item, index) => {
                            const position = index % 3;

                            return (
                                <CardBlock key={index}>
                                    <Fade duration={400} delay={position * 400}>
                                        <Card item={item} key={index}/>
                                    </Fade>
                                </CardBlock>
                            )
                        })}
                    </React.Fragment>
                    :
                    <NoResultsBlock>
                        Sorry, no results found :(
                    </NoResultsBlock>
                }
            </ImagesRow>

            {isLoading &&
                <Loading src={LoadingIcon} alt="Loading"/>
            }
        </Container>
    )
}

export default Content