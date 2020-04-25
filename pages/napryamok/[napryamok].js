import Layout, { siteTitle } from '../../components/layout'
import { getAllDirectionIds, getDirectionData } from '../../lib/directions'
import { getAllCollegesData, getSortedCollegesDataByDirections } from '../../lib/colleges'

export default function Napryamok(props) {
  /* const { category_id, category_description, category_name, categories } = direction[0] */
  console.log('collges', props)
  return (
    <Layout>
      <div>ui a</div>
    </Layout>
  )
}
/* <div>{category_name}</div>
 * <div>{category_description}</div> */
/* <ul>
 * {
 *   categories.map(v => <li key={v.name}>{v.name}</li>)
 * }
 * </ul>
 *  */
export async function getStaticPaths() {
  const paths = getAllDirectionIds()
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({ params }) {
  const directionData = getDirectionData(params.napryamok)
  const allCollegesDirections = getSortedCollegesDataByDirections(directionData.directionId)
  const colleges = getAllCollegesData()
  return {
    props: {
      directionData,
      colleges,
      allCollegesDirections
    }
  }
}
