import { FiMail, FiPhone } from 'react-icons/fi';
import { FaUniversity, FaUserTie } from 'react-icons/fa';
import { MdHttp, MdBusiness, MdLocationCity, MdHourglassEmpty } from 'react-icons/md';
import { GiMailbox, GiPathDistance } from 'react-icons/gi';
import { RiGroup2Line } from 'react-icons/ri';
import s from '@emotion/styled';

// REVIEW need modifications, clean trash, simplify, add features
// make excepitons if undefined
const AboutTab = data => {
    // FIXME global variables color management
    const tabBarColor = '#0070f3';

    //TODO education_type_name adopt to data
    const { koatuu_name,
            post_index,
            education_type_name,
            registration_year,
            university_email,
            university_site,
            university_name,
            university_name_en,
            university_short_name,
            university_phone,
            university_address,
            university_director_fio,
            university_financing_type_name,
            university_governance_type_name
          } = data.data;

    const handleMapTransferClick = (e) => {
        // REVIEW
        // DEPRECATED open last tab with map
        //setTabState(tabs.length - 1)
        const url = `https://www.google.com/maps/search/?api=1&query=${koatuu_name}+${post_index}+${university_address}`
        window.open(url, '_blank');
    };

    return (
        <AboutTabWrapper>
          <div>
            <IconWrapper>
              <FaUniversity color="#888" size="22px"/>
            </IconWrapper>
            <AboutItem>{university_name_en}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdHourglassEmpty color="#888" size="22px"/>
            </IconWrapper>
            <AboutItem>{registration_year} рiк</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdLocationCity color="#888" size="23px"/>
            </IconWrapper>
            <AboutItem>{koatuu_name}</AboutItem>
          </div>
          <div onClick={handleMapTransferClick}>
            <IconWrapper>
              <GiPathDistance color="#888" size="22px"/>
            </IconWrapper>
            <AboutItem css={{color: tabBarColor}}>
              {university_address}
            </AboutItem>
          </div>
          <div>
            <IconWrapper>
              <GiMailbox color="#888" size="24px"/>
            </IconWrapper>
            <AboutItem>{post_index}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <FiMail color="#888" size="19px"/>
            </IconWrapper>
            <AboutItem>
              {
                // TODO DRY
                university_email ?
                  university_email.match(',')
                  ? university_email.split(',').map((x, i) => <a key={i} href={`mailto:${x}`}>{x}</a>)
                  : (<a href={`mailto:${university_email}`}>{university_email}</a>)
                : null
              }
            </AboutItem>
          </div>
          <div>
            <IconWrapper>
              <FiPhone color="#888" size="19px"/>
            </IconWrapper>
            <AboutItem>{university_phone}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdHttp color="#888" size="26px"/>
            </IconWrapper>
            <AboutItem>
              <a href={`${university_site}`} target='_blank'>
                {university_site.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}
              </a>
            </AboutItem>
          </div>
          <div>
            <IconWrapper>
              <FaUserTie color="#888" size="18px"/>
            </IconWrapper>
            <AboutItem>{university_director_fio}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <RiGroup2Line color="#888" size="22px"/>
            </IconWrapper>
            <AboutItem>{university_financing_type_name}</AboutItem>
          </div>
          <div>
            <IconWrapper>
              <MdBusiness color="#888" size="21px"/>
            </IconWrapper>
            <AboutItem>{university_governance_type_name}</AboutItem>
          </div>
        </AboutTabWrapper>
    )
}

const AboutTabWrapper = s.div`
padding: 32px 4px 16px 4px;
background: #fff;
display: flex;
flex-direction: column;
> div {
display: flex;
justify-content: flex-end;
align-items: center;
}
`
const AboutItem = s.div`
flex: 1;
`
const IconWrapper = s.div`
margin-right: 4px;
display: flex;
justify-content: center;
align-items: center;
min-width: 40px;
height: 30px;
flex: 0;
svg {
}
`

export default AboutTab;
