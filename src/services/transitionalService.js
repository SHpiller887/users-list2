import {User} from '@/classes/userClasses'
class TransitionalService {

    UsersFromServer1 = [User];
    UsersFromServer2 = [User];
    user = new User;
    temp = [User];

    constructor() {
    }

    saveArrayWithUsersFromServer1(users) {
        this.UsersFromServer1 = users;
    }

    saveArrayWithUsersFromServer2(users) {
        this.UsersFromServer2 = users;
    }

    setUser(user) {
        this.user = user;
    }

    setArrayWithUsers(user) {
        this.temp = user;
    }

    getArrayWithUsersFromServer1() {
        return this.UsersFromServer1;
    }

    getArrayWithUsersFromServer2() {
        return this.UsersFromServer2;
    }

    getArrayWithUsers(){
        return this.temp;
    }

    getUser() {
        return this.user;
    }


}

export default new TransitionalService();

