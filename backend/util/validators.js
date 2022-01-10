module.exports.validateInputs = (
    email, password
) => {
    const errors = {}
    if (email.trim() === '') {
        errors.email = "Email cannot be empty/blank"
    }
    if (password.trim() === '') {
        errors.password = "Password cannot be empty/blank"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

// module.exports.validateRegistrationInput = (
//     email, password
// ) => {
//     const errors = {}
//     if (email.trim() === '') {
//         errors.email = "Email cannot be empty/blank"
//     }
//     if (password.trim() === '') {
//         errors.password = "Password cannot be empty/blank"
//     }

//     return {
//         errors,
//         valid: Object.keys(errors).length < 1
//     }
// }

