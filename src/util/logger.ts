export const createLogger = (namespace: string) => {
  const log = (...args: any[]) => {
    console.log(`[${namespace}]`, ...args)
  }
  return { log }
}
