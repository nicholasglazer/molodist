import Layout, { siteTitle } from '../../components/layout'
import { getAllDirectionIds, getDirectionData } from '../../lib/directions'
import { getAllCollegesData, getSortedCollegesDataByDirections } from '../../lib/colleges'

export default function Napryamok({ directionData: { direction }, colleges, getAllCollegesDirections }) {
  const { category_id, category_description, category_name, categories } = direction[0]
  console.log('collges', getAllCollegesDirections)
  return (
    <Layout>
      <div>{category_name}</div>
      <div>{category_description}</div>
      <ul>
        {
          categories.map(v => <li key={v.name}>{v.name}</li>)
        }
      </ul>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllDirectionIds()
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({ params }) {
  const allCollegesDirections = getSortedCollegesDataByDirections()
  const colleges = getAllCollegesData()
  const directionData = getDirectionData(params.napryamok)
  return {
    props: {
      directionData,
      colleges,
      allCollegesDirections
    }
  }
}
