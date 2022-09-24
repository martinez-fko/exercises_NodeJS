const express = require('express');

//* Routes
const { usersRoutes } = require('./routes/users.routes');
const { restaurantsRoutes } = require('./routes/restaurants.routes');
const { mealsRoutes } = require('./routes/meals.routes');
const { ordersRoutes } = require('./routes/orders.routes');

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

//* Define endpoints
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/restaurants', restaurantsRoutes);
app.use('/api/v1/meals', mealsRoutes);
app.use('/api/v1/orders', ordersRoutes);

// Global error handler
app.use((error, req, res, next) => {
	const statusCode = error.statusCode || 500;
	const status = error.status || 'fail';

	res.status(statusCode).json({
		status,
		message: error.message,
		error,
		stack: error.stack,
	});
});

// Catch non-existing endpoints
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

module.exports = { app };
