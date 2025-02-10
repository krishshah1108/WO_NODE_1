import { models } from "../../../models/zindex";
import response from "../../../utils/response.util";

const getAllEmployees = async (req, res) => {
  try {
    const userModel = models.User;
    const employeeList = await userModel.find({
      designation: { $ne: "SUPER_ADMIN" },
    });
    return response.success("Employee list", employeeList, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const getDetailsOfEmployee = async (req, res) => {
  try {
    const userModel = models.User;
    const { id } = req.params;
    const employeeDetails = await userModel.findOne({ _id: id });
    return response.success("Employee details", employeeDetails, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const userModel = models.User;
    const { id } = req.params;
    await userModel.findOneAndDelete({ _id: id });
    return response.success("Employee deleted successfully", 1, res);
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
    return response.success("Company set successfully", 1, res);
  } catch (error) {
    return response.failure(error, res);
  }
};
