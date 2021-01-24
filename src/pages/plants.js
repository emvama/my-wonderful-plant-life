import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Plant } from "../components/pageStyles/pageStyles"
import { COLORS } from "../constants"

const PlantsPage = () => {
  const {
    wpcontent: {
      page: {
        plantsMeta: { plantsPageDescription, plantsPageHeaderPicture },
      },
      plants: { edges: plants },
    },
  } = useStaticQuery(graphql`
    query {
        wpcontent {
            page(idType: URI, id: "plants") {
                plantsMeta {
                    plantsPageDescription
                    plantsPageHeaderPicture {
                        sourceUrl
                        imageFile {
                            childImageSharp {
                                fluid(quality: 100) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                        altText
                    }
                }
            } 
            plants {
                edges {
                    node {
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
                                        fluid(quality: 50) {
                                            ...GatsbyImageSharpFluid_withWebp
                                        }
                                    }
                                }
                            }
                        }
                        slug
                    }
                }
            }
        } 
    }
  `)
  return (
    <Layout>
      <SEO title="Plants" />
      <Wrapper plantsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={plantsPageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={plantsPageHeaderPicture.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>My wonderful plant life 🌱</h2>
          <p>{plantsPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="plants">
          <h2>Our plants</h2>
          <div className="plant-items">
            {plants.map(({ node: { plant, slug } }) => (
              <Plant to={`/${slug}`} key={slug}>
                <Image
                  fluid={plant.plantHeaderPicture.imageFile.childImageSharp.fluid}
                  alt={plant.plantHeaderPicture.altText}
                />
                <div className="plant-info">
                  <p>{plant.plantName}</p>{plant.plantHeight && <p>{plant.plantHeight} cm</p>}
                </div>
              </Plant>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default PlantsPage
