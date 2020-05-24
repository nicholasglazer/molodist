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


export function getSortedDataByDirections(id) {
  // TODO REVIEW

  const json = filenames.filter(filename => filename === 'xdirections.json').map(filename => {
    const filePath = path.join(directionsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return fileContents
  });

  const result = JSON.parse(json);

  // That's for categories instead of subcategories:
  // const categoryMap = result
  //.flatMap(dir => dir.categories.map(cat => ({ dir, cat })))
  //.reduce((agg, { dir, cat }) => Object.assign(agg, { [cat.id]: dir }), {});

  const categoryMap = result
        .flatMap(dir => dir.categories).reduce((agg, cat) => Object.assign(agg, { [cat.id]: cat }), {});

  const unassigned = [];

  const colleges = getAllColleges();
  const universities = getAllUniversities();
  const u = universities[0]
        .flatMap((
          { university_edrpou,
            university_financing_type_name,
            region_name,
            university_short_name,
            university_name,
            speciality_licenses }
        ) => speciality_licenses.map(lic => ({ ...lic,
                                               university_edrpou,
                                               university_financing_type_name,
                                               region_name,
                                               university_short_name,
                                               university_name,
                                               type: 'university'
                                             })));
  const c = colleges[0]
        .flatMap((
          { university_edrpou,
            university_financing_type_name,
            region_name,
            university_short_name,
            university_name,
            speciality_licenses }
        ) => speciality_licenses.map(lic => ({ ...lic,
                                               university_edrpou,
                                               university_financing_type_name,
                                               region_name, university_short_name,
                                               university_name, type: 'college'
                                             })));
  [...u, ...c].forEach(lic => {
    const code = lic.speciality_code;
    const target = code in categoryMap
          ? categoryMap[code].licenses = (categoryMap[code].licenses || [])
          : unassigned;
    // TODO unassigned
    target.push(lic);
  });

  // returns all licenses by subcategory
    const f = result.filter(v => v.category_id === id) || [];
    const j = result.flatMap(v => v.categories.filter(x => x.id === id)) || [];
    //console.log('f', result)
    console.log('id', f, j)

  // create new array and find unique universities and add all licenses according to subcategory
    //const z = id.length <= 2 ? new Array(...f[0].categories) : new Array(...j);

    const ar = [...f, ...j].flatMap(({ licenses, name }) => licenses.map(({ university_edrpou,
                                                               university_name,
                                                               university_financing_type_name,
                                                               region_name,
                                                               qualification_group_name,
                                                               certificate,
                                                               certificate_expired,
                                                               full_time_count,
                                                               part_time_count,
                                                               evening_count,
                                                               type
                                                             }) => ({
                                                               university_edrpou,
                                                               university_name,
                                                               region_name,
                                                               university_financing_type_name,
                                                               qualification_group_name,
                                                               certificate,
                                                               certificate_expired,
                                                               full_time_count,
                                                               part_time_count,
                                                               evening_count,
                                                               type,
                                                               name
                                                             })));

  const uniqueEdu = [...ar.reduce( (mp, o) => {
    const {
      university_edrpou,
      university_name,
      region_name,
      university_financing_type_name,
      qualification_group_name,
      certificate,
      certificate_expired,
      full_time_count,
      part_time_count,
      evening_count,
      type,
      name
    } = o;
    const key = JSON.stringify([o.university_edrpou]);
    if (!mp.has(key)) mp.set(key, {
      financingType: university_financing_type_name,
      name: university_name,
      edrpou: university_edrpou,
      region: region_name,
      type: type,
      licenses: [],
      directions: {},
      countLicenses: 0 });
    const dir = mp.get(key).directions[name] || [];
    mp.get(key).countLicenses++;
    mp.get(key).licenses.push({ certificate, certificate_expired, full_time_count, part_time_count, evening_count, name, qualification_group_name });
    if (mp.has(key)) mp.get(key).directions[name] = [dir, qualification_group_name].flatMap(x => x);
    return mp;
  }, new Map).values()];

    //console.log('ede', uniqueEdu.licenses)

  // return all sorted data
  return {
    data: f[0],
    subData: j,
    length: {
      uni: u.length,
      coll: c.length
    },
    uniqueEdu

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
export function getSubDirectionData(id) {
    //console.log('dada', directions[0])
  const subDirection = directions[0].map(v => v.categories.filter(x => x.link === id))
  return {
    id,
    subData: subDirection
  }
}

export function getAllDirectionIds() {
  return directions[0].map(v => {
      return {
          params: {
              napryamkyId: `${v.category_id}`,
              napryamok: `${v.category_link}`
          }
    }
  })
}

export function getAllSubDirectionIds() {
    const d = directions[0].flatMap(v =>
        v.categories.map(x => ({params: {
            pidnapryamkyId: `${x.id}`,
            pidnapryamok: `${x.link}`
        }}))
    )
    //console.log('directions', d)
    return d
}

// TODO sort function??
/* const allIds = directions[0].map(v => {
 *   const subids = v.categories.map(c => c.id)
 *   return {
 *     'id': v.category_id,
 *     'categories': subids
 *   }
 * }) */
