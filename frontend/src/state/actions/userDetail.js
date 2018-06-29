import UserService from "../../services/UserService";

export function getUserData(id) {
    return {
        type: 'USER_DETAIL_FETCH_DATA',
        payload: UserService.getUserDetails(id)

    }
}
