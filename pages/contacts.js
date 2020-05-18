import Layout from '../components/layout'
import s from '@emotion/styled'

const Contacts = () => (
        <Layout>
        <ContactsWrapper>
           Контакти in development...
         </ContactsWrapper>
        </Layout>
)

const ContactsWrapper = s.div`
height: 400px;
display: flex;
justify-content: center;
align-items: center;
`

export default Contacts;
