const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: { type: String, required: true, default: 'user' },
    profilePhoto: {
        type: String,
        default: function() {
            return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
        }
    },
    created: { type: Date, default: Date.now }
})

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt, bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next()
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(err);
            }
            resolve(true);
        })
    })
}

mongoose.model('User', userSchema);