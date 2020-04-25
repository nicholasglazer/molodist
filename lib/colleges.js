import fs from 'fs'
import path from 'path'
import { getDirectionCategoryIds } from './directions'

const collegesDirectory = path.join(process.cwd(), 'data')
const filenames = fs.readdirSync(collegesDirectory)
const colleges = filenames.filter(filename => filename === 'colleges.json').map(filename => {
  const filePath = path.join(collegesDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const content = JSON.parse(fileContents)

  return [...content]
})


// func forn for now return 1 deirection not all
export function getSortedCollegesDataByDirections(id) {
  const json = getDirectionCategoryIds()
  const result = JSON.parse(json);

  // That's for categories instead of subcategories:
  /* const categoryMap = result
   *   .flatMap(dir => dir.categories.map(cat => ({ dir, cat })))
   *   .reduce((agg, { dir, cat }) => Object.assign(agg, { [cat.id]: dir }), {});
   */
  const categoryMap = result
    .flatMap(dir => dir.categories).reduce((agg, cat) => Object.assign(agg, { [cat.id]: cat }), {})

  const unassigned = [];

  const c = colleges[0]
    .flatMap(({ university_edrpou, speciality_licenses }) => speciality_licenses.map(lic => ({ ...lic, university_edrpou })))
    .forEach(lic => {
      const code = lic.speciality_code;
      const target = code in categoryMap
                   ? categoryMap[code].licenses = (categoryMap[code].licenses || [])
                                                : unassigned;
      target.push(lic);
    });

  const r = result.filter(v => v.category_id === id)
  return r
}


export function getAllCollegesData() {
  return colleges[0]
}

export function getCollegeData(id) {
  const college = colleges[0].filter(v => {
    return v.collegeversity_edrpou === id
  })
  return {
    id,
    college
  }
}

export function getAllCollegeIds() {
  return colleges[0].map(v => {
    return {
      params: {
        koledzh: `${v.collegeversity_edrpou}`
      }
    }
  })
}

