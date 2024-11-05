import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Blogs - 24XDEV | Insights on Web Development and Design</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Explore insightful blogs by 24XDEV on topics like web development, design, hosting, deployment, and maintenance." />
        <meta name="keywords" content="24XDEV blogs, web development blogs, design tips, hosting solutions, deployment tutorials, website maintenance, digital solutions" />
        <meta name="author" content="24XDEV" />
        <meta property="og:title" content="Blogs by 24XDEV | Web Development and Design Insights" />
        <meta property="og:description" content="Stay updated with 24XDEV’s latest insights on web development, design, and digital solutions. Elevate your online presence with expert knowledge." />
        <meta property="og:image" content="/img/main-logo.jpg" />
        <meta property="og:url" content="https://24xdev.uk/blogs" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blogs by 24XDEV | Web Development and Design Insights" />
        <meta name="twitter:description" content="Explore 24XDEV’s blogs for the latest on web development and digital solutions." />
        <meta name="twitter:image" content="/img/main-logo.jpg" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
