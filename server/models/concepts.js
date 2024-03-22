const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conceptSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        inputImages: [{
            path: String,
            desc: String,
        }],
        keywords: {
            type: [String]
        },
        resultImages: [
            {
                urls: {
                    type: [String]
                },
                prompt: String,
                imageId: {
                    type: String,
                },
                status: {
                    type: String,
                }
            }
        ],
    },
    {
        timestamps: true,
    },
);

const ConceptModel = mongoose.model('concepts', conceptSchema);

module.exports = ConceptModel;
