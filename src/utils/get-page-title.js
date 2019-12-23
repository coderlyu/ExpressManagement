
const title = 'Exp'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${title} - ${pageTitle}`
  }
  return `${title}`
}
