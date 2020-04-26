import fs from 'fs'
import path from 'path'
import { getAllColleges } from './colleges'
import { getAllUniversities } from './universities'

const directionsDirectory = path.join(process.cwd(), 'data')
const filenames = fs.readdirSync(directionsDirectory)
const directions = filenames.filter(filename => filename === 'xdirections.json').map(filename => {
  const filePath = path.join(directionsDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
})


// func forn for now return 1 deirection not all
export function getSortedDataByDirections(id) {
  const json = filenames.filter(filename => filename === 'xdirections.json').map(filename => {
    const filePath = path.join(directionsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return fileContents
  })

  console.log('results', json)
  const result = JSON.parse(json);

  // That's for categories instead of subcategories:
  const categoryMap = result
    .flatMap(dir => dir.categories.map(cat => ({ dir, cat })))
    .reduce((agg, { dir, cat }) => Object.assign(agg, { [cat.id]: dir }), {});

  /* const categoryMap = result
   *   .flatMap(dir => dir.categories).reduce((agg, cat) => Object.assign(agg, { [cat.id]: cat }), {})
   */
  const unassigned = [];

  const colleges = getAllColleges()
  const universities = getAllUniversities()
  console.log(colleges)


  const u = universities[0]
         .flatMap(({ university_edrpou, speciality_licenses }) => speciality_licenses.map(lic => ({ ...lic, university_edrpou, type: 'university' })));
  const c = colleges[0]
    .flatMap(({ university_edrpou, speciality_licenses }) => speciality_licenses.map(lic => ({ ...lic, university_edrpou, type: 'college' })));

    [...u, ...c].forEach(lic => {
      const code = lic.speciality_code;
      const target = code in categoryMap
                   ? categoryMap[code].licenses = (categoryMap[code].licenses || [])
                                                : unassigned;
      target.push(lic);
    });

  const f = result.filter(v => v.category_id === id)
  return {
    data: f[0]
  }
}


export function getSortedDirectionsData() {
  return directions[0].sort((a, b) => (`${a.category_name}`).localeCompare(b.category_name))
}

export function getDirectionData(id) {
  const direction = directions[0].filter(v => {
    return v.category_link === id
  })

  const directionId = direction[0]['category_id']
  return {
    id,
    data: direction[0],
    directionId
  }
}

export function getAllDirectionIds() {
  return directions[0].map(v => {
    return {
      params: {
        napryamok: `${v.category_link}`
      }
    }
  })
}


// TODO sort function??
/* const allIds = directions[0].map(v => {
 *   const subids = v.categories.map(c => c.id)
 *   return {
 *     'id': v.category_id,
 *     'categories': subids
 *   }
 * }) */
