import { models } from "../../../models/zindex";
import response from "../../../utils/response.util";
import companyValidator from "../validator/company.validator";
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
      return response.badRequest("Already registered ! Please login.", res);
    }
    const newCompany = new companyModel({
      name,
      email,
      address,
      contact,
      status,
    });
    await newCompany.save();
    return response.success("Company registered successfully", 1, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companyModel = models.Company;
    const companyList = await companyModel.find({});
    return response.success("Company list", companyList, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const getCompanyDetails = async (req, res) => {
  try {
    const companyModel = models.Company;
    const { id } = req.params;
    const companyDetails = await companyModel.findOne({ _id: id });
    return response.success("Company details", companyDetails, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const updateCompanyPut = async (req, res) => {
  try {
    const companyModel = models.Company;
    const { id } = req.params;
    const { name, address, contact, status } = req.body;
    await companyModel.findOneAndUpdate(
      { _id: id },
      { name, address, contact, status }
    );
    return response.success("Company updated successfully", 1, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const updateCompanyPatch = async (req, res) => {
  try {
    const companyModel = models.Company;
    const { id } = req.params;
    let updateData = {};
    if (req.body.name) {
      updateData.name = req.body.name;
    }
    if (req.body.address) {
      updateData.address = req.body.address;
    }
    if (req.body.contact) {
      updateData.contact = req.body.contact;
    }
    if (req.body.status) {
      updateData.status = req.body.status;
    }
    await companyModel.findOneAndUpdate({ _id: id }, updateData);
    return response.success("Company updated successfully", 1, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const deleteCompany = async (req, res) => {
  try {
    const companyModel = models.Company;
    const { id } = req.params;
    await companyModel.findOneAndDelete({ _id: id });
    return response.success("Company deleted successfully", 1, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

const getCompaniesWithFilter = async (req, res) => {
  try {
    const companyModel = models.Company;
    let matchData = {};
    if (req.body.status) {
      matchData.status = req.body.status;
    }
    if (req.body.email) {
      matchData.email = { $regex: new RegExp(req.body.email, "i") };
    }
    if (req.body.name) {
      matchData.name = { $regex: new RegExp(req.body.name, "i") };
    }
    if (req.body.search) {
      matchData.$or = [
        { name: { $regex: new RegExp(req.body.search, "i") } },
        { email: { $regex: new RegExp(req.body.search, "i") } },
        { "address.line1": { $regex: new RegExp(req.body.search, "i") } },
        { "address.line2": { $regex: new RegExp(req.body.search, "i") } },
        { "address.city": { $regex: new RegExp(req.body.search, "i") } },
        { "address.state": { $regex: new RegExp(req.body.search, "i") } },
        { "address.country": { $regex: new RegExp(req.body.search, "i") } },
        { "address.zip": { $regex: new RegExp(req.body.search, "i") } },
      ];
    }
    const companyList = await companyModel.aggregate([
      { $match: matchData },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          address: 1,
          contact: 1,
          status: 1,
        },
      },
    ]);
    return response.success("Company list", companyList, res);
  } catch (error) {
    return response.failure(error, res);
  }
};

export const companyController = {
  createCompany,
  getAllCompanies,
  getCompanyDetails,
  updateCompanyPut,
  updateCompanyPatch,
  deleteCompany,
  getCompaniesWithFilter,
};
