enum AppErrors {
  /**
   * The user does not have the necessary permissions to access the requested resource.
   */
  ACCESS_DENIED = 'ACCESS_DENIED',

  /**
   * An email matching the one provided for registration already exists.
   */
  EMAIL_EXISTS = 'EMAIL_EXISTS',

  /**
   * The user lacks the required scope (permissions) to perform the requested action.
   */
  INSUFFICIENT_SCOPE = 'INSUFFICIENT_SCOPE',

  /**
   * The server encountered an unexpected error and was unable to fulfill the request.
   */
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',

  /**
   * The provided credentials (email and password) are invalid or do not match a registered user.
   */
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',

  /**
   * The provided resource identifier (ID) is invalid or does not correspond to a valid resource.
   */
  INVALID_ID = 'INVALID_ID',

  /**
   * The provided password is invalid or does not meet the password requirements.
   */
  INVALID_PASSWORD = 'INVALID_PASSWORD',

  /**
   * The provided authentication token is invalid, expired, or does not match a valid user session.
   */
  INVALID_TOKEN = 'INVALID_TOKEN',

  /**
   * The HTTP method used in the request is not allowed for the requested resource.
   */
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',

  /**
   * The requested resource could not be found on the server.
   */
  NOT_FOUND = 'NOT_FOUND',

  /**
   * The maximum number of allowed login attempts has been reached.
   */
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',

  /**
   * The maximum number of allowed operations has been reached.
   */
  TOO_MANY_OPERATIONS = 'TOO_MANY_OPERATIONS',

  /**
   * The maximum number of allowed requests has been reached.
   */
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',

  /**
   * The user is not authorized to access the requested resource without proper authentication.
   */
  UNAUTHORIZED = 'UNAUTHORIZED',

  /**
   * The request payload contains data in a format that is not supported by the server.
   */
  UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE',

  /**
   * The HTTP method used in the request is not supported by the server for the requested resource.
   */
  UNSUPPORTED_METHOD = 'UNSUPPORTED_METHOD',

  /**
   * The user's account has not been verified yet and requires further action to be activated.
   */
  UNVERIFIED_ACCOUNT = 'UNVERIFIED_ACCOUNT',

  /**
   * The request data did not pass validation checks due to missing or invalid fields.
   */
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

export default AppErrors;
