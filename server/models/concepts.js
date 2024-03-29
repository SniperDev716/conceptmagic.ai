const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conceptSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        name: {
            type: String,
            default: 'Untitled'
        },
        inputImages: [{
            path: String,
            desc: String,
        }],
        resultImages: [
            {
                urls: {
                    type: [String]
                },
                prompt: String,
                parent: String,
                imageId: String,
                status: String,
                addition: String,
            }
        ],
    },
    {
        timestamps: true,
    },
);

const ConceptModel = mongoose.model('concepts', conceptSchema);

module.exports = ConceptModel;
