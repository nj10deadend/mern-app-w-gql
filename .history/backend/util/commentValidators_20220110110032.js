module.exports.commentsValidators = (body) => {
    
    const errors = {}

    if (body.trim() === '') {
        errors.body = "Body cannot be empty/blank"
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}