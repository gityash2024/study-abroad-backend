let mongoose = require('./db');

// grab the things we need
let Schema = mongoose.Schema;

// create a schema
let applicationSchema = new Schema({

    courseId: { type: mongoose.Schema.Types.ObjectId },
    status: {
        type: String,
        default: 'APPLIED_CONDITIONAL_OFFER',
        enum: process.env.APPLICATION_STATUS.split(',')
    },

    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },

}, { minimize: false, timestamps: true }); // Minimize : false --> It stores empty objects.

// we need to create a model using it
let applications = mongoose.model('application', applicationSchema);

module.exports = applications;