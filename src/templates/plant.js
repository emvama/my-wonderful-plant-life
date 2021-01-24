import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image } from "./templateStyles/plantStyles"


const PlantTemplate = ({
  data: {
    wpcontent: {
      plant: {
        plant,
        roles: { edges: roles },
      },
    },
  },
}) => {
  return (
    <Layout>
      <SEO title="Plant" />
      <Wrapper>
        <div className="plant-container">
          <div className="plant-image">
            <Image
                fluid={plant.plantHeaderPicture.imageFile.childImageSharp.fluid}
                alt={plant.plantHeaderPicture.altText}
            />
            <div className="roles">
              {roles.map(({ node: role }) => (
                <div key={role.name} className="role">
                  {role.name}
                </div>
              ))}
            </div>
          </div>
          <div className="plant-info">
            <h2>{plant.plantName}</h2>
            <h3>Extra info:</h3>
            <p className="description">{plant.plantDescription}</p>
            <p className="info">
              <strong>Type:</strong> {plant.plantType}
            </p>
            <p className="info">
              <strong>Grootte:</strong> {plant.plantHeight} cm
            </p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}
export default PlantTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
        plant(id: $id, idType: ID) {
          roles {
            edges {
              node {
                name
              }
            }
          }
          plant {
            plantName
            plantDescription
            plantHeight
            plantType
            plantHeaderPicture {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
          id
        }
      }
  }
`
