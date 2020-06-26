import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
//import { getSortedPostsData } from '../lib/posts'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
//import { GetStaticProps } from 'next'
//import Button from 'antd-mobile/lib/button';  // for js
//import 'antd-mobile/lib/button/style/css';        // for css
//import 'antd-mobile/lib/date-picker/style';         // that will import less
//import { Button } from 'antd-mobile'
      //<Button>DTAE</Button>

        //<p>[Your Self Introduction]</p>
export default function Home({ file }) {
  const data = file.data[0]
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{data.title}</p>
      </section>
    </Layout>
  )
}


// <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
//   <h2 className={utilStyles.headingLg}>Blog</h2>
//   <ul className={utilStyles.list}>
//     {allPostsData.map(({ id, date, title }) => (
//       <li className={utilStyles.listItem} key={id}>
//         {title}
//         <br />
//         {id}
//         <br />
//         {date}
//       </li>
//     ))}
//   </ul>
// </section>
// export async function getStaticProps() {
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }
export const getStaticProps = async function({preview, previewData}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/home.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'data/home.json',
        data: (await import('../data/home.json')).default,
      },
    },
  }
}
