import React from "react";
import styled from "styled-components";

const Block = styled.div`
  border: 1px solid darkgray;
  border-radius: 5px;
  margin: 8px;
  padding: 16px;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
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

    const formatDescription = (description) => {
        const splitDescription = description.split("<p>")
        const lastElement = splitDescription[splitDescription.length - 1]

        const filtered = lastElement.replace(/(<([^>]+)>)/gi, "").replace("&", " &").replace("&quotx", '"')

        return filtered
    }

    const tags = item.tags.split(" ").filter((e) => e !== "null");

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
            {/*<Description>*/}
            {/*    {formatDescription(item.description)}*/}
            {/*</Description>*/}
            {/*{tags.length > 0 &&*/}
            {/*    <Tags>*/}
            {/*        <span>Tags:</span>{tags.map((tag, tagIndex) => {*/}
            {/*        const isLast = tags.length-1;*/}

            {/*        return(*/}
            {/*            <SingleTag><a href={tag} key={tagIndex}>{tag}</a>{tagIndex !== isLast && <span>, </span>}</SingleTag>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</Tags>*/}
            {/*}*/}
        </Block>
    )
}

export default Card