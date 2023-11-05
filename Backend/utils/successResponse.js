export const successMiddleware = (data, req, res) => {
  const statusCode = data.statusCode || 200;
  const message = data.message || "Success";

  const response = {
    success: true,
    message: message,
    data: data.data || null,
  };

  // Return the success response
  res.status(statusCode).json(response);
};

export const loginSuccessMiddleware = (data, req, res) => {
  const statusCode = data.statusCode || 200;
  const message = data.message || "Success";
  const token = data.token;

  const response = {
    success: true,
    message: message,
    token: token,
  };
  res.status(statusCode).json(response);
};
