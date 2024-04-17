let mongoose = require('./db');

// grab the things we need
let Schema = mongoose.Schema;


const addressSchema = new Schema(
    {
        addressLine1: String,
        addressLine2: String,
        country: String,
        state: String,
        pinCode: String
    },
    { _id: false }
);

const academicSchema = new Schema(
    {
        instituteName: String,
        board: String,
        score: String,
        completionYear: String,
        specialization: String
    },
    { _id: false }
);
const passportSchema = new Schema(
    {
        passportNumber: String,
        issueCountry: String,
        issueDate: Date,
        expiryDate: Date,
        birthState: String,
        birthCountry: String,
    },
    { _id: false }
);
const experienceSchema = new Schema(
    {
        jobTitle: String,
        company: String,
        location: String,
        jobSummary: String,
        joiningDate: Date,
        workedTill: Date,
    },
    { _id: false }
);
const testSchema = new Schema(
    {
        score: String,
        exaDate: String,
        quantitative: String,
        verbal: String,
        analyticWriting: Date,
        yetToTakeTest: Boolean,
        waiverLooking: Boolean,
    },
    { _id: false }
);


// create a schema
let studentSchema = new Schema({

    fullName: String,
    gender: String,
    contactNumber: String,
    email: String,
    dob: Date,
    maritalStatus: String,
    mailingAddress: addressSchema,
    permanentAddress: addressSchema,
    passportInformation: passportSchema,
    academicProfile: {
        secondary: academicSchema,
        seniorSecondary: academicSchema,
        UG: academicSchema,
        PG: academicSchema,
    },
    workExperience: [{ type: experienceSchema }],
    tests: [{ type: testSchema }],
    documents: {
        document1: String,
        document2: String,
        document3: String,
        document4: String,
    },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },

}, { minimize: false, timestamps: true }); // Minimize : false --> It stores empty objects.

// we need to create a model using it
let students = mongoose.model('student', studentSchema);

module.exports = students;