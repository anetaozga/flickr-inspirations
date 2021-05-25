import React from "react";
import styled from "styled-components";

const Block = styled.div`
  border: 1px solid darkgray;
  border-radius: 5px;
  margin: 8px;
  padding: 16px;
`;

const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  display: block;
`;

const TitleRow = styled.div`
  margin: 12px 0;
  font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
  
  a {
    color: #000;
    font-size: 16px;
    line-height: 18px;
    font-weight: 400;
  }
  
  span {
    margin: 0 4px;
    font-weight: 400;
  }
`;

const Description = styled.p`
  font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
  font-size: 16px;
  line-height: 18px;
  font-weight: 300;
`;

const Tags = styled.div`
  span {
    font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    margin-right: 4px;
  }
`;

const SingleTag = styled.div`
  display: inline-block;
  
  a {
    font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    color: #000;
  }
`;

const Card = ({ item }) => {
    return (
        <Block>
            <a href={item.imageLink}>
                <Image src={item.image} alt={item.description}/>
            </a>

            <TitleRow>
                <a href={item.imageLink}>{item.title}</a>
                <span>by</span>
                <a href={item.authorLink}>{item.author}</a>
            </TitleRow>
            <Description>{item.description}</Description>
            <Tags>
                <span>Tags:</span>{item.tags.map((tag, tagIndex) => {
                    const isLast = item.tags.length-1;

                    return(
                        <SingleTag><a href={tag} key={tagIndex}>{tag}</a>{tagIndex !== isLast && <span>, </span>}</SingleTag>
                    )
                })}
            </Tags>
        </Block>
    )
}

export default Card