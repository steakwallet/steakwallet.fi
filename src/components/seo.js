/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

 import React from "react"
 import PropTypes from "prop-types"
 import { Helmet } from "react-helmet"
 import { useStaticQuery, graphql } from "gatsby"
 
 function SEO({ description, lang, meta, title, image }) {
   const { site } = useStaticQuery(
     graphql`
       query {
         site {
           siteMetadata {
             title
             description
           }
         }
       }
     `
   )
 
   const metaDescription = description || site.siteMetadata.description
 
   return (
     <Helmet
       htmlAttributes={{
         lang,
       }}
       title={title}
       titleTemplate={`%s | ${site.siteMetadata.title}`}
       meta={[
         {
           name: `description`,
           content: metaDescription,
         },
         {
           property: `og:title`,
           content: 'Steakwallet',
         },
         {
           property: `og:description`,
           content: metaDescription,
         },
         {
           property: `og:type`,
           content: `website`,
         },
         {
           property: `og:url`,
           content: `https://www.steakwallet.xyz`,
         },
         {
           name: `twitter:card`,
           content: `summary_large_image`,
         },
         {
           name: `og:site_name`,
           content: "Steakwallet",
         },
         {
           name: `twitter:title`,
           content: 'Steakwallet',
         },
         {
           name: `twitter:description`,
           content: metaDescription,
         },
         {
           property: `image`,
           content: '/ogimage.png',
         },
         {
           property: `og:image`,
           content: '/ogimage.png',
         },
         {
           property: `og:image:type`,
           content: 'image/png',
         },
         {
           property: `og:image:type`,
           content: 'image/png',
         },
         {
           property: `og:image:width`,
           content: '600',
         },
         {
           property: `og:image:height`,
           content: '335',
         },
       ].concat(meta)}
     />
   )
 }
 
 SEO.defaultProps = {
   lang: `en`,
   meta: [],
   description: ``,
 }
 
 SEO.propTypes = {
   description: PropTypes.string,
   lang: PropTypes.string,
   meta: PropTypes.arrayOf(PropTypes.object),
   title: PropTypes.string.isRequired,
 }
 
 export default SEO
 