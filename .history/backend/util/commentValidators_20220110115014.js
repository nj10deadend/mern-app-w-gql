module.exports.commentValidators = (body, issueId) => {

    const errors = {}

    if (body.trim() === '') {
        errors.body = "Body cannot be empty/blank"
    }
    if (issueId.trim() === '') {
        errors.issueId = "IssueId cannot be empty/blank"
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}