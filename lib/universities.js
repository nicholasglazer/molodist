import fs from 'fs'
import path from 'path'

const universitesDirectory = path.join(process.cwd(), 'data')
const filenames = fs.readdirSync(universitesDirectory)
const universites = filenames.filter(filename => filename === 'universities.json').map(filename => {
  const filePath = path.join(universitesDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
})

export function getAllUniversities() {
  return universites
}

export function getUniversityData(id) {
  // get all univ data
  const university = universites[0].filter(v => {
    return v.university_edrpou === id
  });
  // make licenses props different from educators props
  const licenses = university[0].speciality_licenses.map(x => ({
    speciality_code: x.speciality_code,
    speciality_name: x.speciality_name,
    specialization_name: x.specialization_name,
    lic_evening_count: x.evening_count,
    lic_full_time_count: x.full_time_count,
    lic_part_time_count: x.part_time_count,
    qualification_group_name: x.qualification_group_name,
    certificate: x.certificate,
    certificate_expired: x.certificate_expired,
  }));
  const educators = university[0].educators;
    // REVIEW if there are no keys in aggregator, set a new object and later push current obj to specializations
    // if current has specialization_name, then merge with the same object from specalizations arr;
    // items should be equal by qualification_group_name, specalization_name
  const merged = [...educators, ...licenses];
  const sortedSpec = [...merged.reduce((agg, spec) => {
    const { speciality_code, speciality_name, specialization_name } = spec;
    const key = JSON.stringify([spec.speciality_code]);
    if (!agg.has(key)) agg.set(key, { speciality_code, speciality_name, specialization_name, specialities: [], merged: [] });
    agg.get(key).specialities.push(spec)
    // check if the item in array of specialities equals to the current speciality
    agg.get(key).specialities.forEach(x => {
      if (!spec.specialization_name && !x.specialization_name && x !== spec && spec.speciality_name === x.speciality_name && spec.qualification_group_name === x.qualification_group_name) {
        agg.get(key).merged.push({...x, ...spec})
      }
      if (spec.speciality_name === x.speciality_name && x.specialization_name && spec.specialization_name && x !== spec && spec.specialization_name === x.specialization_name && spec.qualification_group_name === x.qualification_group_name) {
        agg.get(key).merged.push({...x, ...spec})
      }
    });
    return agg;
  }, new Map).values()];

  // filter specility array and marged array to get the rest of merged
  // FIXME not all results in merged array
  const specResults = sortedSpec.map(x => ({ ...x, merged:[...x.specialities.filter(({ qualification_group_name: value1 }) => !x.merged.some(({ qualification_group_name: value2 }) => value1 === value2)), ...x.merged] }));

  // TODO sum all hours to avoid client calculations
  // TODO minimize incoming component data
  return {
    id,
    data: university[0],
    sortedSpec,
    specResults
  };
}

export function getAllUniversityIds() {
  return universites[0].map(v => {
    return {
      params: {
        universitet: `${v.university_edrpou}`
      }
    }
  })
}

// TODO sort function??
/* export function getSortedDirectionsData() {
 *   return universites[0].sort((a, b) => (`${a.category_name}`).localeCompare(b.category_name))
 * }
 *  */
