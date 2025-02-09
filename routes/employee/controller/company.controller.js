import { models } from '../../../models/zindex';
import response from '../../../utils/response.util';
import companyValidator from '../validator/company.validator.js';

const createCompany = async (req, res) => {
  try {
    const { error } = companyValidator.createCompanySchema.validate(req.body);
    if (error) {
      return response.validationErr(error.details[0].message, res);
    }
    const { name, email, address, contact, status } = req.body;
    const companyModel = models.Company;
    const isExist = await companyModel.findOne({ email: email.toLowerCase() });
    if (isExist) {
      return response.badRequest('Already registered ! Please login.', res);
    }
    const newCompany = new companyModel({ name, email, address, contact, status });
    await newCompany.save();
    return response.success('Company registered successfully', 1, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const getCompanyList = async (req, res) => {
  try {
    const companyModel = models.Company;
    const companyList = await companyModel.find({});
    return response.success('Company list', companyList, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const getCompanyDetails = async (req, res) => {
  try {
    const companyModel = models.Company;
    const { id } = req.params;
    const companyDetails = await companyModel.findOne({ _id: id });
    return response.success('Company details', companyDetails, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const deleteCompany = async (req, res) => {
  try {
    const companyModel = models.Company;
    const { id } = req.params;
    await companyModel.findOneAndDelete({ _id: id });
    return response.success('Company deleted successfully', 1, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

export const companyController = { createCompany };
