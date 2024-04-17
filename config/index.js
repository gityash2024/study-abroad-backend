// Fetching the environment
const env = process.env.NODE_ENV || 'development'
let environments = ['staging', 'development', 'production']
if (!environments.includes(env?.toLowerCase())) {
    console.log('No Valid Environment Passed :: ', env)
    process.exit(1)
}
console.log('\nℹ️ ℹ️ ℹ️   Server will start with :: ✨', env, '✨ :: Environment \n')

// Common Environment Variables
const commonVariables = {

    STATUS: [200, 500, 400, 401, 403],
    SERVICE_REST_PORT: '8001',
    ROLES: 'ADMIN,USER',
    pageLimit: 10,
    SIGNUP_SOURCES: 'APPLIED_CONDITIONAL_OFFER,UNCONDITIONAL_OFFER,ACCEPTED,DEPOSIT_PAID,CAS_LETTER,VISA_LETTER_ARRIVED',
    APPLICATION_STATUS: 'PHONE_NUMBER,LINKEDIN,FACEBOOK,GOOGLE'
}

//setting the common variables
Object.keys(commonVariables).forEach((key) => {
    process.env[key] = commonVariables[key];
})
