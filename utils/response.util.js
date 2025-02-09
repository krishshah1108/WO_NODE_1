import statusCode from '../constants/statusCodes.js';

const response = {
  success: (message, data, res) => {
    return res.status(statusCode.SUCCESS).json({
      status: statusCode.SUCCESS,
      message: message || 'Your request is successfully executed',
      data,
      isSuccess: true,
    });
  },

  created: (message, data, res) => {
    return res.status(statusCode.CREATED).json({
      status: statusCode.CREATED,
      message: message || 'Your request is successfully executed',
      data,
      isSuccess: true,
    });
  },

  badRequest: (message, res) => {
    return res.status(statusCode.BAD_REQUEST).json({
      status: statusCode.BAD_REQUEST,
      message: message || 'Your request failed!',
      isSuccess: false,
    });
  },
  
  validationErr: (message, res) => {
    return res.status(statusCode.VALIDATION_ERROR).json({
      status: statusCode.VALIDATION_ERROR,
      message: message || 'Validation Error!',
      isSuccess: false,
    });
  },
  unauthorized: (res) => {
    return res.status(statusCode.UNAUTHORIZED).json({
      status: statusCode.UNAUTHORIZED,
      message: 'Unauthorized User ! Access denied!',
      isSuccess: false,
    });
  },

  forbidden: (res) => {
    return res.status(statusCode.FORBIDDEN).json({
      status: statusCode.FORBIDDEN,
      message: 'Forbidden User ! Access denied!',
      isSuccess: false,
    });
  },

  notFound: (res) => {
    return res.status(statusCode.NOT_FOUND).json({
      status: statusCode.NOT_FOUND,
      message: 'Resource not found!',
      isSuccess: false,
    });
  },

  failure: (error, res) => {
    console.log(error);
    return res.status(statusCode.SERVER_ERROR).json({
      status: statusCode.SERVER_ERROR,
      message: error.message || 'Internal Server Error!',
      isSuccess: false,
    });
  },
};

export default response;
