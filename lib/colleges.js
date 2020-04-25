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


// func name is talking by itself
export function getSortedCollegesDataByDirections() {
  const json = getDirectionCategoryIds()
  const result = JSON.parse(JSON.stringify(json));
  // That's for categories instead of subcategories:
  const categoryMap = result[0]
    .flatMap(dir => dir.categories.map(cat => ({ dir, cat })))
    .reduce((agg, { dir, cat }) => Object.assign(agg, { [cat.id]: dir }), {});

  /* const categoryMap = result[0]
   *   .flatMap(dir => {
   *     return dir.categories
   *   })
   *   .reduce((agg, cat) => {
   *     return Object.assign(agg, { [cat.id]: cat })}, {});
   */
  const unassigned = [];

  const col = colleges[0]
    .flatMap(({ university_edrpou, speciality_licenses }) => speciality_licenses.map(lic => ({ ...lic, university_edrpou })))
    .forEach(lic => {
      const code = lic.speciality_code;
      const target = code in categoryMap
                   ? categoryMap[code].licenses = (categoryMap[code].licenses || [])
                                                : unassigned;
      target.push(lic);

      console.log('target', target)
    });

  return result;
}







/* console.log('subcategoryMap', categories)
 * const unassigned = [];
 * const f = colleges[0]
 *   .flatMap(uni => [
 *     ...uni.profession_licenses
 *   ].map(lic => ({ ...lic, university_edrpou: uni.university_edrpou })))
 *   .forEach(lic => {
 *     const cat = subcatMap[lic.speciality_code];
 *     const target = !cat
 *                  ? unassigned
 *                  : (cat.specialties = cat.specialties || []);

 *     target.push(lic);
 *   });
 */
  /* console.log(colleges[0]) */

  /* const fil = colleges[0].flatMap(college => [...college.speciality_licenses].map(licenses => ({ ...licenses, university_edrpou: college.university_edrpou })))
   *                        .forEach(license => {
   *                          const cat = subcategoryMap[license.speciality_code];
   *                          const target = !cat
   *                                       ? unassigned
   *                                       : (cat.specialties = cat || []);
   *                          target.push(licenses);
   *                        });
   */
  // get all categories ids to merge colleges into them 'id': []
  /* const categoriesIds = allIds.map(v => {
   *   return v.id
   * }) */
  // get all subcategories ids to filter colleges specialities


  /* console.log(c.categories) */
  /* const subcategoriesIds = allIds.map(v => v.categoriesId) */
  /* 
   *   const diff = Object.assign(...Object.keys(...allIds)) */
  /* console.log('diff', subcategoryMap) */

  /* const filtered = colleges[0].reduce((acc, c) => {
   *   return c.speciality_licensesenses.map(v => {
   *     // run 29 times to filter code with direction ids
   *     return allIds.map(x => {
   *       const filteredWithId = x.categoriesId.filter(k => {
   *         return k === v.speciality_code
   *       })
   *       const f = [...acc, {x.id: filteredWithId}]
   *       // console.log(f)
   *       return f
   *     })
   *   })
   *   return {
   *     'id': [ filtered]
   *   }
   * }, [])
   */
  /* console.log('v.speciality', k, v.speciality_code) */


  /* const subcategoryMap = {};
   * for (const c of categories) {
   *   console.log(c)
   *   for (const sc of c.categories) {
   *     subcategoryMap[c.id] = sc;
   *   }
   * } */
  /* console.log('subcatmap', subcategoryMap) */
  /* const unassigned = [];
   * for (const college of colleges[0]) {
   *   for (const licenses of college.specialty_licensesenses) {
   *     const cat = subcategoryMap[licenses.speciality_code];
   *     const target = !cat
   *                  ? unassigned
   *                  : (cat.specialties = cat.specialties || []);
   *     target.push({ ...licenses,  collegeversity_edrpou: college.collegeversity_edrpou });
   *   }
   *   for (const licenses of college.profession_licensesenses) {
   *     const cat = subcategoryMap[licenses.speciality_code];
   *     const target = !cat
   *                  ? unassigned
   *                  : (cat.specialties = cat.specialties || []);
   *     target.push({ ...licenses,  collegeversity_edrpou: college.collegeversity_edrpou });
   *   }
   * } */

/* return null
   } */
/* console.log(`${speciality.length > 0} - speciality`) */
/* subcategoriesIds.map(v === speciality) */

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

