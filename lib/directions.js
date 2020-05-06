// TODO лучшая раскладка клавиатуры ИИ можно сделать в форме игры
// создать проекцию рук с реальными характеристиками, чтобы тестировать лучшую раскладку, а потом сделать свою
// посмотреть работы профессора Дворака, на чем он делал свои вычисления!

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
  const f = result.filter(v => v.category_id === id);

  // create new array and find unique universities and add all licenses according to subcategory
  const z = new Array(...f[0].categories);
  const ar = z.flatMap(({ licenses, name }) => licenses.map(({ university_edrpou, university_name, qualification_group_name }) => ({ university_edrpou, university_name, qualification_group_name, name})));

  const uniqueEdu = [...ar.reduce( (mp, o) => {
    const key = JSON.stringify([o.university_edrpou]);
    if (!mp.has(key)) mp.set(key, { edrpou: o.university_edrpou,
                                    university_name: o.university_name,
                                    licenses: [],
                                    directions: {},
                                    count: 0 });
    const dir = mp.get(key).directions[o.name] || [];
    mp.get(key).count++;
    mp.get(key).licenses.push(o)
    if (mp.has(key)) mp.get(key).directions[o.name] = [dir, o.qualification_group_name].flatMap(x => x);

    return mp;
  }, new Map).values()];

  //console.log('length', uniqueEd

  // return all sorted data
  return {
    data: f[0],
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
