import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper, Image, Plant, BottomEdgeDown, BottomEdgeUp} from "./pageStyles/pageStyles"
import { COLORS } from "../constants"


const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homePageTitle,
          homePageSmallDescription,
          homePageFeaturedPlants,
          homePageHeaderPicture,
        },
      },
    },
  } = useStaticQuery(graphql`
  query {
    wpcontent {
      page(id: "home", idType: URI) {
        homeMeta {
          homePageTitle
          homePageSmallDescription
          homePageFeaturedPlants {
            ... on WPGraphql_Plant {
              id
              plant {
                plantDescription
                plantHeight
                plantName
                plantType
                plantHeaderPicture {
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid (quality: 100, grayscale: true){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
            }
          }
          homePageHeaderPicture {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 100){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    } 
  }
`)
  return(
    <Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid} alt={homePageHeaderPicture.altText} />
        <div className="inner-div">
          <p className="header-title">{homePageTitle}</p>
          <p className="header-description">{homePageSmallDescription}</p>
        </div>
        <BottomEdgeDown color={COLORS.BLACK} />
      </div>
      <div className="description">
          <p>{homePageSmallDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>




        <div className="plants">
          <h2>Featured Plants</h2>
          <div className="plant-items">
            {homePageFeaturedPlants.map(({ plant, slug }) => (
              <Plant key={slug} to={`/${slug}`}>
                <Image
                  fluid={plant.plantHeaderPicture.imageFile.childImageSharp.fluid}
                  alt={plant.plantHeaderPicture.altText}
                />
                <div className="plant-info">
                  <p>
                    {plant.plantName}
                  </p>
                  <p>{plant.plantHeight} cm</p>
                </div>
              </Plant>
            ))}
          </div>
        </div>




    </Wrapper>
  </Layout>
  )
}

export default IndexPage
