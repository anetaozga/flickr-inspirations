import React from "react";
import styled from "styled-components";

const Block = styled.div`
  border: 1px solid darkgray;
  border-radius: 5px;
  margin: 0 0 16px 0;
  padding: 16px;
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

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  display: block;
`;

const TitleRow = styled.div`
  margin: 12px 0;
  font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  a {
    color: #000;
    font-size: 16px;
    line-height: 18px;
    font-weight: 400;
    width: max-content;
    display: block;
  }
  
  span {
    margin: 0 4px;
    font-weight: 400;
    display: block;
  }
`;

const Description = styled.div`
  font-family: Proxima Nova, helvetica neue, helvetica, arial, sans-serif;
  font-size: 16px;
  line-height: 18px;
  font-weight: 300;
  word-break: break-all;
`;

const Tags = styled.div`
  margin-top: 8px;
  
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

    const formatDescription = (description) => {
        if (description !== ""){

            let filteredDescription = description.replace(/(<([^>]+)>)/gi, "")
                .replace("&", " &")
                .replace("&quotx", '"')
                .replace("&amp;", "")

            if (filteredDescription.length > 200){

                filteredDescription = filteredDescription.substring(0,200) + " (...)"

                return filteredDescription;
            }

            return filteredDescription;
        }
    }

    const tags = item.tags.split(" ").filter((e) => e !== "");

    const imageLink = `https://www.flickr.com/photos/${item.owner}/${item.id}`;

    return (
        <Block>
            <a href={imageLink}>
                <Image src={item.url_m} alt={item.description._content}/>
            </a>
            <TitleRow>
                <a href={imageLink}>{item.title}</a>
                <span>by</span>
                <a href={`https://www.flickr.com/people/${item.owner}`}>{item.pathalias !== null ? item.pathalias : item.owner}</a>
            </TitleRow>
            {item.description._content &&
                <Description>
                    {formatDescription(item.description._content)}
                </Description>
            }
            {tags.length > 0 &&
            <Tags>
                <span>Tags:</span>{tags.map((tag, tagIndex) => {

                const isLast = tags.length - 1;

                return (
                    <SingleTag key={tagIndex}><a href={tag} key={tagIndex}>{tag}</a>{tagIndex !== isLast &&
                    <span>, </span>}</SingleTag>
                )
            })}
            </Tags>
            }
        </Block>
    )
}

export default Card