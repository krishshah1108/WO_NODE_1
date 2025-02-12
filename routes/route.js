import authRoutes from './auth/index.js';
import employeeRoutes from './employee/index.js';
const route = [
  { key: '/auth', route: authRoutes },
  { key: '/employee', route: employeeRoutes }
];

export default route;
