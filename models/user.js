const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    Subscriber = require("./subscriber")
userSchema = new Schema(
    {
        name: {
            first: {
                type: String,
                required: true
            },
            last: {
                type: String,
                required: true
            },
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        zipCode: {
            type: Number,
            min: [10000, "Zip code is too short"],
            max: [99999]
        },
        password: {
            type: String,
            required: true
        },
        courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
        subscribedAccount: { type: Schema.Types.ObjectId, ref: Subscriber }
    },
    {
        timestamps: true
    }
)

userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});

//prehooks - before user is saved run this function
userSchema.pre("save", function (next) {
    let user = this;
    if (user.subscribedAccount == undefined) {
        Subscriber.findOne({
            email: user.email
        })
            .then(subscriber => {
                user.subscribedAccount = subscriber;
                next();
            })
            .catch(error => {
                console.log(`error in associating subscriber: ${error.message}`);
                next(error);
            })
    }
    else {
        next();
    }
})

module.exports = mongoose.model("User", userSchema);