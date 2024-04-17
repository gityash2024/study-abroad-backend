let mongoose = require('./db');

// grab the things we need
let Schema = mongoose.Schema;

// create a schema
let courseSchema = new Schema({

    courseName: String,
    universityName: String,
    courseLogo: String,
    bannerImage: { type: String },
    level: { type: String },
    overview: { type: String },
    modules: { type: String },
    requirements: { type: String },

    uniqueCourseInfo: {
        fee: String,
        duration: String,
        applicationDeadline: { type: Date },
        applicationFee: String,
        upcomingIntake: String,
        studyMode: String,
    },


    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },

}, { minimize: false, timestamps: true }); // Minimize : false --> It stores empty objects.

// we need to create a model using it
let course = mongoose.model('course', courseSchema);

module.exports = course;