import Layout, { siteTitle } from '../../components/layout'
import { getAllCollegeIds, getCollegeData } from '../../lib/colleges'

import s from '@emotion/styled'

export default function Koledzh({ collegeData: {college} }) {
  console.log(college)
  const { koatuu_name,
          education_type_name,
          profession_educators,
          profession_licenses,
          speciality_licenses,
          university_name,
          university_name_en,
          university_short_name,
          university_phone,
          university_director_fio
  } = college[0]

  return (
    <Layout>
      <Title isTrue={true}>
        {university_name}
      </Title>
      <div>{university_phone}</div>
      <div>{university_name_en}</div>
      <div>{university_short_name}</div>
      <div>{university_director_fio}</div>
    </Layout>
  )
}

const Title = s.div`
font-size: ${props => props.isTrue ? '30px' : '5px'};
`
/* ${props} */

/* <div>{category_name}</div>
 * <div>{category_description}</div>
 * <ul>
 * {
 *   categories.map(v => <li>{v.name}</li>)
 * }
 * </ul>
 *  */
export async function getStaticPaths() {
  const paths = getAllCollegeIds()
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({ params }) {
  const collegeData = getCollegeData(params.koledzh)
  return {
    props: {
      collegeData
    }
  }
}
