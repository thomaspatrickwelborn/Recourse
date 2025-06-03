import assignSources from '../assign-sources/index.js'
export default function assign($target, ...$sources) {
  return assignSources($target, 'assign', ...$sources)
}