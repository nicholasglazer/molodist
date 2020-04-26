import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import { getAllDirectionIds, getDirectionData, getSortedDataByDirections } from '../../lib/directions'
import s from '@emotion/styled'

export default function Napryamok({ sortedDirection, directionData }) {
  const { licenses } = sortedDirection.data
  const { categories } = directionData.data
  console.log(sortedDirection, directionData)
  return (
    <Layout>
      <Link href="/filter"><a>Фільтри</a></Link>
      {
        categories.map(v => <div key={v.name}>{v.name}</div>)
      }
      <LicenseWrapper>
        {
          licenses ? licenses.map((v,i) => {
            return (
              <License key={i}>
                {
                  v.type === 'college'
                  ? (<Link href="/koledzh/[koledzh]" as={`/koledzh/${v.university_edrpou}`}>
                    <a>Universitet</a>
                  </Link>)
                  : (<Link href="/universitet/[universitet]" as={`/universitet/${v.university_edrpou}`}>
                    <a>Universitet</a>
                  </Link>)
                }
                <div>
                  {v.qualification_group_name}
                </div>
                <div>
                  {v.speciality_name}
                </div>
                <div>

                </div>
              </License>
            )
          }) : null
        }
      </LicenseWrapper>
    </Layout>
  )
}

const LicenseWrapper = s.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
word-wrap: wrap;
`

const License = s.div`
flex: 1;
padding: 4px;
min-width: 150px;
min-height: 300px;
margin-right: 4px;
margin-bottom: 4px;
border: 1px solid #ccc;
font-size: 15px;
`

export async function getStaticPaths() {
  const paths = getAllDirectionIds()
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({ params }) {
  const directionData = getDirectionData(params.napryamok)
  const sortedDirection = getSortedDataByDirections(directionData.directionId)
  return {
    props: {
      directionData,
      sortedDirection
    }
  }
}
