import { EOL } from './deps.ts'

/** EOL of the current OS, `CRLF` for Windows and `LF` for others */
export const osEOL: EOL = Deno.build.os === 'windows' ? EOL.CRLF : EOL.LF
