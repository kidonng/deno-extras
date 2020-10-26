import { ServerRequest, Response } from './deps.ts'

export interface ExtendedResponse
  extends Pick<Response, 'status' | 'body' | 'trailers'> {
  headers?: HeadersInit
  json?: unknown
}

/** Helpers for dealing with ordinary `ServerRequest` */
export class ExtendedRequest {
  #request: ServerRequest
  headers: Record<string, string>
  search: Record<string, string>

  constructor(request: ServerRequest) {
    this.#request = request

    this.headers = Object.fromEntries(request.headers.entries())

    const searchIndex = request.url.indexOf('?')
    const searchParams = new URLSearchParams(
      searchIndex === -1 ? '' : request.url.substring(searchIndex)
    )
    this.search = Object.fromEntries(searchParams.entries())
  }

  respond = (response: ExtendedResponse): Promise<void> => {
    const { status, headers: _headers, body, json, trailers } = response

    const headers = new Headers(_headers)
    if (json) headers.set('content-type', 'application/json; charset=utf-8')

    return this.#request.respond({
      status,
      headers,
      body: json ? JSON.stringify(json) : body,
      trailers,
    })
  }

  redirect = (location: string, status: number = 308): Promise<void> => {
    if (status < 300 || status > 399)
      throw RangeError('Status code must be between 300 and 399')

    return this.#request.respond({
      status,
      headers: new Headers({ location }),
    })
  }
}
