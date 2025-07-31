export default function splitPath($path, $pathParseInteger) {
  const subpathDelimiters = /([a-zA-Z_][a-zA-Z0-9_]*)|(\d+)|\["([^"]*)"\]|"([^"]*)"|\./g
  const subpaths = []
  let match
  while((match = subpathDelimiters.exec($path)) !== null) {
    if(match[1]) { subpaths.push(match[1]) }
    else if(match[2]) {
      if($pathParseInteger) { subpaths.push(parseInt(match[2], 10)) }
      else { subpaths.push(match[2]) }
    }
    else if(match[3]) { subpaths.push(match[3]) }
    else if(match[4]) { subpaths.push(match[4]) }
  }
  return subpaths
}