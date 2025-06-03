import assignSources from '../assign-sources/index.js'
export default function assignConcat($target, ...$sources) {
  return assignSources($target, 'assignConcat', ...$sources)
}