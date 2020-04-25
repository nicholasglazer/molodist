import fs from 'fs'
import path from 'path'

const directionsDirectory = path.join(process.cwd(), 'data')
const filenames = fs.readdirSync(directionsDirectory)
const directions = filenames.filter(filename => filename === 'directions.json').map(filename => {
  const filePath = path.join(directionsDirectory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const content = JSON.parse(fileContents)

  return content
})

export function getSortedDirectionsData() {
  return directions[0].sort((a, b) => (`${a.category_name}`).localeCompare(b.category_name))
}

export function getDirectionCategoryIds() {
  return filenames.filter(filename => filename === 'directions.json').map(filename => {
    const filePath = path.join(directionsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return fileContents
  })
}
export function getDirectionData(id) {
  const direction = directions[0].filter(v => {
    return v.category_link === id
  })

  const directionId = direction[0]['category_id']
  return {
    id,
    direction,
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
