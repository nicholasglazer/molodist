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
  })
  return {
    id,
    data: university[0]
  }
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
