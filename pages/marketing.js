import Layout from '../components/layout'
import s from '@emotion/styled'

const Marketing = () => (
        <Layout>
        <MarketingWrapper>
           Реклама in development...
         </MarketingWrapper>
        </Layout>
)

const MarketingWrapper = s.div`
height: 400px;
display: flex;
justify-content: center;
align-items: center;
`

export default Marketing;
