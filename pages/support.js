import Layout from '../components/layout'
import s from '@emotion/styled'

const Support = () => (
        <Layout>
        <SupportWrapper>
           Підтримка in development...
         </SupportWrapper>
        </Layout>
)

const SupportWrapper = s.div`
height: 400px;
display: flex;
justify-content: center;
align-items: center;
`

export default Support;
