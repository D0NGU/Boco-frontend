import http from "../http-common";

class UserSettingService {
    delete(){
        return http.delete('/delete');
    }
}
export default new UserSettingService();