import { spawnSync } from 'child_process'

export function cmd(command: string, args?: string[], stdio?: boolean) {
  return spawnSync(command, args, {
    stdio: stdio ? 'inherit' : undefined,
  })
}

export function log(message: string, _: 'success' | 'info') {
  console.log(message)
}

export function removeJsonComments(jsonString: string): string {
  return jsonString.replace(
    /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    (m, g) => (g ? '' : m)
  )
}
