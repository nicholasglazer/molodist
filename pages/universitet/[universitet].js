import Layout, { siteTitle } from '../../components/layout'
import { getAllUniversityIds, getUniversityData } from '../../lib/universities'
import s from '@emotion/styled'

export default function Universitet({ universityData: {data} }) {
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
  } = data

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
