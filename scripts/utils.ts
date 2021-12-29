import { spawnSync } from 'child_process'
import kleur from 'kleur'

export function cmd(command: string, args?: string[]) {
  return spawnSync(command, args, {
    stdio: 'inherit',
  })
}

export function log(message: string, type: 'success' | 'info') {
  switch (type) {
    case 'success':
      return console.log(kleur.green(message))
    default:
      return console.log(kleur.yellow(message))
  }
}

export function removeJsonComments(jsonString: string): string {
  return jsonString.replace(
    /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    (m, g) => (g ? '' : m)
  )
}
