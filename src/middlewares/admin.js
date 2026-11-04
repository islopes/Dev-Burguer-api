const adminMiddleware = (request, response, next) => {
  const isUserAdmin = request.headers.authorization;

  if (!isUserAdmin) {
    return response.status(401).json();
  }

  return next();
};

export default adminMiddleware;
