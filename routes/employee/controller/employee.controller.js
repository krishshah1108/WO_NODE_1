import { models } from '../../../models/zindex';
import response from '../../../utils/response.util';

const getAllEmployees = async (req, res) => {
  try {
    const userModel = models.User;
    const employeeList = await userModel.find({
      designation: { $ne: 'SUPER_ADMIN' },
    });
    return response.success('Employee list', employeeList, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const getDetailsOfEmployee = async (req, res) => {
  try {
    const userModel = models.User;
    const { id } = req.params;
    const employeeDetails = await userModel.findOne({ _id: id });
    return response.success('Employee details', employeeDetails, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const userModel = models.User;
    const { id } = req.params;
    await userModel.findOneAndDelete({ _id: id });
    return response.success('Employee deleted successfully', 1, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const updateEmployeeDetails = async (req, res) => {
  try {
    const userModel = models.User;
    const { id } = req.params;
    let updateDetails = {};
    if (req.body.name) {
      updateDetails.name = req.body.name;
    }
    if (req.body.password) {
      const hashedPassword = encryptor(req.body.password);
      updateDetails.password = hashedPassword;
    }
  } catch (error) {
    return response.failure(error, res);
  }
};

const setCompanyOfEmployee = async (req, res) => {
  try {
    const userModel = models.User;
    const { id } = req.params;
    const { companyId } = req.body;
    await userModel.findOneAndUpdate({ _id: id }, { companyId });
    return response.success('Company set successfully', 1, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const getListOfEmployee = async (req, res) => {
  try {
    const userModel = models.User;
    const matchData = {};
    if (req.body.designation) {
      matchData.designation = req.body.designation;
    }
    if (req.body.email) {
      matchData.email = { $regex: new RegExp(req.body.email, 'i') };
    }
    if (req.body.name) {
      matchData.$or = [
        { 'name.firstName': { $regex: new RegExp(req.body.name, 'i') } },
        { 'name.lastName': { $regex: new RegExp(req.body.name, 'i') } },
      ];
    }
    if (req.body.search) {
      const companyModel = models.Company;
      const companyList = await companyModel
        .find({
          name: { $regex: new RegExp(req.body.search, 'i') },
        })
        .select('_id');
      const companyIds = companyList.map((company) => company._id);
      matchData.$or = [
        { 'name.firstName': { $regex: new RegExp(req.body.search, 'i') } },
        { 'name.lastName': { $regex: new RegExp(req.body.search, 'i') } },
        { email: { $regex: new RegExp(req.body.search, 'i') } },
        { designation: { $regex: new RegExp(req.body.search, 'i') } },
        { companyId: { $in: companyIds } },
      ];
    }
    const employeeList = await userModel.find(matchData);
    return response.success('Employee list', employeeList, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

export const employeeController = {
  getAllEmployees,
  getDetailsOfEmployee,
  deleteEmployee,
  updateEmployeeDetails,
  setCompanyOfEmployee,
  getListOfEmployee,
};
