
export const metadata = {
  title: 'Blogs - 24XDEV | Insights on Web Development and Design',
  description:
    'Explore insightful blogs by 24XDEV on topics like web development, design, hosting, deployment, and maintenance.',
  keywords:
    '24XDEV blogs, web development blogs, design tips, hosting solutions, deployment tutorials, website maintenance, digital solutions',
  author: '24XDEV',
  openGraph: {
    title: 'Blogs by 24XDEV | Web Development and Design Insights',
    description:
      'Stay updated with 24XDEV’s latest insights on web development, design, and digital solutions. Elevate your online presence with expert knowledge.',
    images: ['/img/main-logo.jpg'],
    url: 'https://24xdev.uk/blogs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogs by 24XDEV | Web Development and Design Insights',
    description:
      'Explore 24XDEV’s blogs for the latest on web development and digital solutions.',
    images: ['/img/main-logo.jpg'],
  },
};

const Layout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
