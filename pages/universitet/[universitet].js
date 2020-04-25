import Layout, { siteTitle } from '../../components/layout'
import { getAllUniversityIds, getUniversityData } from '../../lib/universities'

export default function Universitet({ universityData: {university} }) {
  console.log('data linecses', university[0])
  return (
    <Layout>
    </Layout>
  )
}

/* <div>{category_name}</div>
 * <div>{category_description}</div>
 * <ul>
 * {
 *   categories.map(v => <li>{v.name}</li>)
 * }
 * </ul>
 *  */

export async function getStaticPaths() {
  const paths = getAllUniversityIds()
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({ params }) {
  const universityData = getUniversityData(params.universitet)
  return {
    props: {
      universityData
    }
  }
}
