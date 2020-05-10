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
  const university = universites[0].filter(v => {
    return v.university_edrpou === id
  });
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

  const merged = [...educators, ...licenses].flatMap(x => x);

  const sortedSpec = [...merged.reduce((agg, spec) => {
    const {
      qualification_group_name,
      certificate,
      certificate_expired,
      lic_full_time_count,
      lic_part_time_count,
      lic_evening_count,
      full_time_count,
      part_time_count,
      evening_count,
      distance_count,
      external_count,
      speciality_code,
      speciality_name,
      specialization_name
    } = spec;
    const key = JSON.stringify([spec.speciality_code]);
    //console.log('each', key)
    // TODO sum all hours to avoid client calculations
    if (!agg.has(key)) agg.set(key, {
      speciality_code,
      speciality_name,
      specializations: [],
      specialities: []
    } );
    agg.get(key).specialities.push({...spec})
    //console.log('what is 899087', specialization_name)
     // ? agg.set(key).specializations.specialization_name : null

    return agg
    }, new Map).values()];

  //result[0].specialities.map(x => console.log('spec', x))
  console.log(merged.length)
  console.log(sortedSpec.length)
  return {
    id,
    data: university[0],
    sortedSpec
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
