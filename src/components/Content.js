import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";
import Card from "./Card";

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

const RowStyled = styled(Row)`
  margin: 0 -8px;
`;

const Content = () => {

    const data = [
        {
            title: "Photo title 1",
            author: "Author 1",
            authorLink: "Link",
            imageLink: "",
            image: "https://cf.bstatic.com/images/hotel/max1024x768/116/116281457.jpg",
            description: "Lorem ipsum dolor",
            tags: ["tag1", "tag2", "tag3"]
        },
        {
            title: "Photo title 2",
            author: "Author 2",
            authorLink: "Link",
            imageLink: "",
            image: "https://cf.bstatic.com/images/hotel/max1024x768/116/116281457.jpg",
            description: "Lorem ipsum dolor",
            tags: ["tag1", "tag2", "tag3"]
        },
        {
            title: "Photo title 3",
            author: "Author 3",
            authorLink: "Link",
            imageLink: "",
            image: "https://cf.bstatic.com/images/hotel/max1024x768/116/116281457.jpg",
            description: "Lorem ipsum dolor",
            tags: ["tag1", "tag2", "tag3"]
        },
        {
            title: "Photo title 4",
            author: "Author 4",
            authorLink: "Link",
            imageLink: "",
            image: "https://cf.bstatic.com/images/hotel/max1024x768/116/116281457.jpg",
            description: "Lorem ipsum dolor",
            tags: ["tag1", "tag2", "tag3"]
        },
        {
            title: "Photo title 5",
            author: "Author 5",
            authorLink: "Link",
            imageLink: "",
            image: "https://cf.bstatic.com/images/hotel/max1024x768/116/116281457.jpg",
            description: "Lorem ipsum dolor",
            tags: ["tag1", "tag2", "tag3"]
        },
    ]
    return (
        <ContentBlock>
            <Container>
                <Row>
                    <Col md={12}>
                        <Search type="text" placeholder="Search..."/>
                    </Col>
                </Row>
                <RowStyled>
                    {data.map((item, index) => {
                        return(
                            <Col sm={6} md={3} key={index}>
                                <Card item={item}/>
                            </Col>
                        )
                    })}
                </RowStyled>
            </Container>
        </ContentBlock>
    )
}

export default Content