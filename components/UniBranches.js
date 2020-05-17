import s from '@emotion/styled'

// TODO link to every university / it requires that every branch has its own university edrpou
// ( now only university id ( which is not that trustable - could change in future, edrpout trully unique)
const BranchesTab = ({ branches }) => (
    branches && branches.length
        ? (<Branches>
             {
                 branches.flatMap((x, i) =>
                     (<div key={i}>
                        <div>
                          {x.koatuu_name}
                        </div>
                        <div>
                          {x.region_name !== 'КИЇВ' ? x.region_name : null}
                        </div>
                        <div>
                          {x.university_name}
                        </div>
                      </div>)
                 )}
           </Branches>)
        : (<div>Нема</div>)
)

const Branches = s.div`
padding: 32px 4px;
min-height: 40vh;
> div {
border-left: 4px solid #fb9621;
padding-left: 16px;
margin-bottom: 16px;
}
`
export default BranchesTab;
