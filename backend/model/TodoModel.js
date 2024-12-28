const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);
