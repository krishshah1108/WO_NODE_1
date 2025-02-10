import express from 'express';
import { employeeController } from './controller/employee.controller.js';
import { companyController } from './controller/company.controller.js';

export const router = express.Router();

router.get('/employees', employeeController.getAllEmployees);
router.get('/employee/:id', employeeController.getDetailsOfEmployee);
router.delete('/employee/:id', employeeController.deleteEmployee);
router.put('/employee/:id', employeeController.updateEmployeeDetails);
router.put('/employee/:id/set-company', employeeController.setCompanyOfEmployee);
router.get('/employees/list', employeeController.getListOfEmployee);

router.post('/create-company', companyController.createCompany);
router.get('/companies', companyController.getAllCompanies);
router.get('/company/:id', companyController.getCompanyDetails);
router.put('/company/:id', companyController.updateCompanyPut);
router.patch('/company/:id', companyController.updateCompanyPatch);
router.delete('/company/:id', companyController.deleteCompany);
router.get('/companies/list', companyController.getCompaniesWithFilter);
