import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";

const IntroBlock = styled.div`
  padding: 20px 0 40px;
`;

const TitleLink = styled.a`
  color: black;
  text-decoration: none;
`;

const Title = styled.h1`
  font-size: 20px;
  line-height: 22px;
  letter-spacing: 0.2px;
  font-family: Proxima Nova,helvetica neue,helvetica,arial,sans-serif;
  text-align: center;
  font-weight: 300;
  margin: 0;
  
  @media(min-width: 992px){
    font-size: 32px;
    line-height: 36px;
  }
`;

const Intro = () => {
    return (
        <IntroBlock>
            <Container>
                <Row>
                    <Col md={12}>
                        <TitleLink href="/"><Title>Find your inspiration.</Title></TitleLink>
                    </Col>
                </Row>
            </Container>
        </IntroBlock>
    )
}

export default Intro;