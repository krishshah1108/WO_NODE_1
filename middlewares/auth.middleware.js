import response from '../utils/response.util';
export const isAuthenticated = (...accessRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.unauthorized(res);
    }
    const accessToken = authHeader.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, async (error, payload) => {
      if (error) {
        return response.unauthorized(res);
      }
      if (!accessRoles.includes(payload.designation)) {
        return response.forbidden(res);
      }
      req.designation = payload.designation;
      req.userId = payload.id;
      next();
    });
  };
};
