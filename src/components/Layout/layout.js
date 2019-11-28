/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { Container } from "reactstrap";

import Header from "./header";
import s from "./layout.module.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/vendor/nucleo/css/nucleo.css";
import "../../assets/styles/vendor/font-awesome/css/font-awesome.min.css";
import "../../assets/styles/css/argon-design-system-react.min.css";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container className={s.body}>{children}</Container>
      <footer className={s.footer}>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
