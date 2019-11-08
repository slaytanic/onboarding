const TIME_TO_WAIT = 500

const HTTP_TOO_MANY_REQUESTS = 429
/*
 * From fetch standard (https://fetch.spec.whatwg.org/#statuses)
 * codes with null bodies
 */
const SUCCESS_RESPONSE_CODES_NO_DATA = new Set([101, 204, 205, 303])

export const getDomain = () => {
  const { REACT_APP_API_DOMAIN } = process.env
  if (REACT_APP_API_DOMAIN) {
    return REACT_APP_API_DOMAIN
  }

  switch (process.env.NODE_ENV) {
    case 'production':
    case 'development':
    case 'test':
      // return 'https://stage.travelperk.com'
      return ''
    default:
      throw Error('No API domain specified for this environment')
  }
}

const getJSONHeaders = (isForm = false) => {
  const contentType = isForm
    ? { 'content-Type': 'application/x-www-form-urlencoded' }
    : { 'Content-Type': 'application/json' }
  const headers = Object.assign({}, contentType)
  return new Headers(headers)
}

export const getBaseURL = (prefix /*: string */ = '/api/v1') => {
  const domain = getDomain()
  return `${domain}${prefix}`
}

export const getUrl = (path /*: string */, prefix /*: string */) =>
  `${getBaseURL(prefix)}${path}`

const getCustomURL = (baseURL, path, prefix) =>
  prefix ? `${baseURL}${prefix}${path}` : `${baseURL}${path}`

export const getEndpointWithParams = (
  baseEndpoint /*: string */,
  params /*: ?Object */,
  noEncoding /*: boolean */
) /*: string */ => {
  if (!params) {
    return baseEndpoint
  }
  const identityFn = val => val
  const encodeFn = noEncoding ? identityFn : encodeURIComponent

  return Object.keys(params)
    .filter(k => (params ? params[k] != null : false))
    .reduce((currentEndpoint, curParam, i) => {
      const delimiter = i === 0 ? '?' : '&'

      // $FlowFixMe flow thinks params[curParam] could not exist
      const paramValue = Array.isArray(params[curParam])
        ? params[curParam].map(encodeFn).join(',')
        : encodeFn(params[curParam])

      return `${currentEndpoint}${delimiter}${curParam}=${paramValue}`
    }, baseEndpoint)
}

// const NUMBER_OF_RETRIES_AFTER_WHICH_NOTIFY = 3

export const request = (
  path /*: string */,
  options /*: {
    [string]: string | boolean | URLSearchParams,
    prefix?: string,
  } */ = {},
  baseURL /*: ?string */ = '',
  numberOfRetries /*: ?number */ = undefined,
  retryAttempt /*: number */ = 0
) /*: Promise<any> */ => {
  const { isForm } = options
  const url = baseURL
    ? getCustomURL(baseURL, path, options.prefix)
    : getUrl(path, options.prefix)
  const headers = getJSONHeaders(isForm)
  const finalOptions = Object.assign({}, { headers }, options)

  return fetch(url, finalOptions)
    .then(response => {
      const { status } = response
      const isValid = status >= 200 && status <= 299
      const notFound = status === 404
      const forbidden = status === 403
      const shouldFail =
        !isValid && numberOfRetries && numberOfRetries <= retryAttempt + 1
      if (shouldFail || notFound || forbidden) {
        return Promise.reject({ response })
      }
      const shouldRetry =
        status === HTTP_TOO_MANY_REQUESTS || (!isValid && numberOfRetries)
      if (shouldRetry) {
        // if (retryAttempt > NUMBER_OF_RETRIES_AFTER_WHICH_NOTIFY) {
        //   sendErrorToNewRelic(
        //     `[SEVERE] Retrying ${finalOptions.method} at ${url}`
        //   )
        // }
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            return request(
              path,
              options,
              baseURL,
              numberOfRetries || 10,
              retryAttempt + 1
            )
              .then(res => resolve(res))
              .catch(res => reject(res))
          }, TIME_TO_WAIT * retryAttempt)
        })
      }

      // $FlowFixMe Adding options to closed Request object..
      response.options = options
      return isValid
        ? response
        : response.json
        ? response
            .json()
            .then(data => Promise.reject({ response: data, status }))
        : response
    })
    .then(response => {
      if (SUCCESS_RESPONSE_CODES_NO_DATA.has(response.status)) {
        return Promise.resolve()
      }
      const contentType =
        response.headers && response.headers.get('Content-Type')
      switch (contentType ? contentType.split(';')[0] : contentType) {
        case 'application/json':
          return response.json()
        case 'application/x-www-form-urlencoded':
          return response.formData()
        case 'text/csv':
          return response.text()
        case 'image/jpeg':
          return response.blob()
        default:
          /*
           * By default our DJANGO is configured with DEFAULT_CONTENT_TYPE = 'text/html'
           * so we need to fallback to text when response do not have data
           * Tornado by default tries to parse a dict and fallback to application/json, if it fails
           * content-type will be '', so this should work
           */
          return response.text ? response.text() : response
      }
    })
    .catch(({ response, status }) => {
      // if (status === 401) {
      //   removeCookie('sessionid')
      // }
      return Promise.reject(
        response ? response : new Error('Response not available')
      )
    })
}
