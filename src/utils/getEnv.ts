// export function getEnvVar(key: string): string | undefined {
//   // @ts-ignore: Safe fallback for environments that don't support import.meta
//   if (typeof import.meta !== "undefined" && typeof import.meta.env !== "undefined") {
//     return import.meta.env[key as any];
//   }

//   return process.env[key];
// }

export function getEnvVar(key: string): string | undefined {
  if (
    typeof import.meta !== 'undefined' &&
    typeof import.meta.env !== 'undefined'
  ) {
    // Cast env to a generic record for dynamic access
    return (import.meta.env as unknown as Record<string, string>)[key];
  }

  return process.env[key];
}
