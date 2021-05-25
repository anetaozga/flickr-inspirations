import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";
import Card from "./Card";
import fetchJsonp from 'fetch-jsonp';

const ContentBlock = styled.div`

`;

const Search = styled.input`
  border: 1px solid darkgray;
  color: dimgray;
  border-radius: 5px;
  padding: 16px;
  width: 100%;
  max-width: 360px;
  margin: 0 auto 40px;
  display: block;
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
`;

const ImagesRow = styled.div`
  margin: 0 -8px;
  column-count: 3;
  column-gap: 0;
`;

const Content = () => {
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [page, setPage] = useState(0);

    const loadImages = (query) => {
        const encodedQuery = encodeURIComponent(query)
        fetchJsonp(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=2239552c96fceaa19e99ddc25451e84d&lang=en-us&safe_search=1&per_page=10&extras=description,url_m,path_alias,tags&page=${page}&media=photos&format=json&tags=${encodedQuery}`,
            {jsonpCallback: 'jsoncallback'}
        )
            .then(res => res.json())
            .then(({photos}) => setImages(photos["photo"]))
            .catch(() => alert("Ups.. something went wrong :("))
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => loadImages(searchQuery), 1000);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    console.log(images)

    return (
        <ContentBlock>
            <Container>
                <Row>
                    <Col md={12}>
                        <Search type="text" placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}/>
                    </Col>
                </Row>
                <ImagesRow>
                    {images.map((item, index) => {
                        return(
                            <Card item={item}/>
                        )
                    })}
                </ImagesRow>
            </Container>
        </ContentBlock>
    )
}

export default Content