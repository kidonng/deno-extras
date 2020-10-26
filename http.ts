import { ServerRequest, Response } from './deps.ts'

export interface ExtendedResponse
  extends Pick<Response, 'status' | 'body' | 'trailers'> {
  headers?: Headers | Record<string, string>
  json?: Record<string, string>
}

export interface RequestHelper {
  headers: Record<string, string>
  search: Record<string, string>
  respond: (response: ExtendedResponse) => Promise<void>
  redirect: (location: string, status?: number) => Promise<void>
}

/** Helpers for dealing with ordinary `ServerRequest` */
export function requestHelper(request: ServerRequest): RequestHelper {
  const headers = Object.fromEntries(request.headers.entries())

  const searchIndex = request.url.indexOf('?')
  const searchParams = new URLSearchParams(
    searchIndex === -1 ? '' : request.url.substring(searchIndex)
  )
  const search = Object.fromEntries(searchParams.entries())

  const respond = (response: ExtendedResponse): Promise<void> => {
    const { status, headers: _headers, body, json, trailers } = response

    const headers =
      _headers instanceof Headers ? _headers : new Headers(_headers)
    if (json) headers.set('content-type', 'application/json; charset=utf-8')

    return request.respond({
      status,
      headers,
      body: json ? JSON.stringify(json) : body,
      trailers,
    })
  }

  const redirect = (location: string, status: number = 308): Promise<void> => {
    if (status < 300 || status > 399)
      throw RangeError('Status code must be between 300 and 399')

    return request.respond({
      status,
      headers: new Headers({ location }),
    })
  }

  return { headers, search, respond, redirect }
}
