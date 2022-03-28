let initialState =
{
    loginUser: {}
}

function CreateUser(state = initialState, action) {
    switch (action.type) {
        case "STORE_LOGINUSER_DETAILS":
            return Object.assign({}, state, { loginUser: action.payload });
        default:
            return state;
    };
}
export default CreateUser;