import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { getSortedDirectionsData } from '../lib/directions'

export default function Home({ allDirectionsData }) {
  // console.log('alldir', allDirectionsData)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        {
          allDirectionsData.map(v => {
            return (
              <div key={v.category_id}>
                <Link href="/napryamok/[napryamok]" as={`/napryamok/${v.category_link}`}><a>{v.category_name}</a></Link>
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allDirectionsData = getSortedDirectionsData()
  return {
    props: {
      allDirectionsData
    }
  }
}
