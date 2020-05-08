import fs from 'fs'
import path from 'path'

const collegesDirectory = path.join(process.cwd(), 'data')
const filenames = fs.readdirSync(collegesDirectory)
const colleges = filenames.filter(filename => filename === 'colleges.json').map(filename => {
  const filePath = path.join(collegesDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
})

export function getAllColleges() {
  return colleges
}

export function getCollegeData(id) {
  const college = colleges[0].filter(v => {
    return v.university_edrpou === id
  })
  return {
    id,
    data: college[0]
  }
}

export function getAllCollegeIds() {
  return colleges[0].map(v => {
    //console.log(v.university_edrpou)
    return {
      params: {
        koledzh: `${v.university_edrpou}`
      }
    }
  })
}

