var allUsers = [
    {nickname: "admin", password: "1234", groups: ["admin", "manager", "basic"], session: "false"},
    {nickname: "sobakajozhec", password: "ekh228", groups: ["basic", "manager"], session: "false"},
    {nickname: "patriot007", password: "russiaFTW", groups: ["basic"], session: "false"}
];

var allRights = ["manage content", "play games", "delete users", "view site"];

var allGroups = {
    "admin": [allRights[2]],
    "manager": [allRights[0]],
    "basic": [allRights[1], allRights[3]]
};

/*Дебаг функций*/
/*
let user = createUser("batman", "i_wil_beat_superman_one_day");
var group1 = createGroup();
var group2 = createGroup();
addUserToGroup(user, group1);
addUserToGroup(user, group2);
var right1 = createRight();
var right2 = createRight();
var right3 = createRight();
var right4 = createRight();
var right5 = createRight();

addRightToGroup(right1, group1);
addRightToGroup(right2, group1);
addRightToGroup(right3, group2);
addRightToGroup(right4, group2);


isAuthorized(user, right1);
isAuthorized(user, right2);
isAuthorized(user, right3);
isAuthorized(user, right4);
isAuthorized(user, right5);
*/
/*Конец дебага функций*/

function findUser(username){
    if(typeof (username) != "string")
        throw new Error('Переданный параметр не является типом STRING.#1');
    let index = allUsers.findIndex(el => el.nickname === username);
    return index;
};
//The test has been completed.
function createUser(username, pass) {
    if(typeof (username) != "string" || typeof (pass)!="string")
        throw new Error('Один или несколько параметров функций не является(ются) типом STRING.#2');
    let index = findUser(username);
    let groups = [];
    if(index==-1){
        allUsers.push({nickname: username, password: pass, groups: groups, session: "false"});
        return allUsers[allUsers.length-1];
    }else{
        throw new Error('Пользователь с таким параметром уже существует.#3');
    }
};

//The test has been completed.
function deleteUser(user) {
    if(typeof(user)=="string"){
        let index = findUser(user);
        if(index>=0){
            allUsers.splice(index, 1);
            return;
        }
        else
            throw new Error('Пользователь с указанным именем не существует.#4');
    }else{
        if(typeof(user)=="object"){
            let userIndex = allUsers.indexOf(user);
            if(userIndex!=-1){
                allUsers.splice(userIndex,1);
                return;
            }else{
                throw new Error('Пользователя с указанным параметром не существует.#5');
            }
        }
        throw new Error('Передан неверный аргумент.#6');
    }
};

//The test has been completed.
function users() {
    return allUsers;
};

//The test has been completed.
function createGroup() {
    let groupName;
    do{
        groupName = getRandomName();
    }while(Object.keys(allGroups).indexOf(groupName)!=-1);
        allGroups[groupName] = [];
        let index = Object.keys(allGroups).indexOf(groupName);
        return Object.keys(allGroups)[index];
};

function refreshUsers() {
    for (let i = 0; i< allUsers.length;i++){
        for(let j = 0; j<allUsers[i].groups.length;j++){
            if(Object.keys(allGroups).indexOf(allUsers[i].groups[j])==-1){
                let index = allUsers[i].groups.indexOf(allUsers[i].groups[j]);
                allUsers[i].groups.splice(index,1);
            }
        }
    }
}
//The test has been completed.
function deleteGroup(group) {
    if(typeof group == "string" || typeof group =="object"){
        let index = Object.keys(allGroups).indexOf(group);
        if(typeof group =="object")
            for (let i = 0;i< Object.keys(allGroups).length;i++){
                if(Object.keys(allGroups)[i]==group){
                    index = i;
                    break;
                }
            }
        if(index!=-1){
            delete allGroups[group];
            refreshUsers();
            return;
        }else{
            throw new Error('Такой группы не существует.#7');
        }
    }else{
        throw new Error ('Неверный тип параметра.#8');
    }
};
//The test has been completed.
function groups() {
    return Object.keys(allGroups);
};

//The test has been completed.
function userGroups(user) {
    let uGroups;
    if(typeof(user)=="string"){
        let userIndex = findUser(user);
        if(userIndex!=-1){
            if(typeof(allUsers[userIndex].groups)=="object"){
                uGroups = allUsers[userIndex].groups;
                return uGroups;
            }else{
                throw new Error('У объекта нет массива GROUPS.#9');
            }
        }else{
            throw new Error ('Пользователь с данным аргументом не существует.#10');
        }
    }else{
        if(typeof(user)=="object"){
            let userIndex = allUsers.indexOf(user);
            if(userIndex!=-1){
                if(typeof allUsers[userIndex].groups=="object"){
                    uGroups = allUsers[userIndex].groups;
                    return uGroups;
                }else{
                    throw new Error('У объекта нет массива GROUPS.#11');
                }
            }
            throw new Error('Пользователь с указанным параметром не существует.#12');
        }
        throw new Error('Неверный тип передаваемого параметра.#13');
    }

};

function getRandomName()
{
    let r = Math.random().toString(36).substring(7);
    return r;
};

//The test has been completed.
function createRight() {
    let rightName;
    do{
    rightName  = getRandomName();
    }while(allRights.indexOf(rightName)!=-1)
    allRights.push(rightName);
    return allRights[allRights.length-1];

};

//The test has been completed.
function groupRights(group) {
    let groupIndex;
    if(typeof (group)=="string"){
        groupIndex = Object.keys(allGroups).indexOf(group);
        if(groupIndex==-1)
            throw new Error('Указанной группы не существует.#14');
        else{
                return allGroups[group];
        }
    }else{
        if(typeof (group) == "object"){
            if(group.length>0){
                let a = [];
                for(let i = 0; i< group.length; i++){
                    groupIndex = Object.keys(allGroups).indexOf(group[i]);

                    if(groupIndex==-1)
                        throw new Error('Указанной группы не существует.#15');
                    else{
                        let b = allGroups[group[i]];
                        for(let j = 0; j < b.length; j++){
                            a.push(b[j]);
                        }
                    }
                }
                return a;
            }else{
                groupIndex = Object.keys(allGroups).indexOf(group);
                if(groupIndex==-1)
                    throw new Error('Указанной группы не существует.#16');
            }
        }else{
        throw new Error('Неверный тип параметра \"group\"#17');}
    }
    return allGroups[group];

};

//The test has been completed.
function rights() {
    return allRights;
};

function addUserToGroup(user, group) {
    let groupIndex;
    if(typeof (group)=="string"){
        groupIndex = Object.keys(allGroups).indexOf(group);
        if(groupIndex==-1)
            throw new Error('Указанной группы не существует.#18');
    }else{
        if(typeof (group) == "object" && group!=null){
            if(group.length<2) {
                groupIndex = allGroups.indexOf(group);
                if (groupIndex == -1)
                    throw new Error('Указанной группы не существует.#19');
            }
            else{
                //Массив групп,
            }
        }else{
        throw new Error('Неверный тип параметра \"group\"#20');}
    }
    if(typeof user =="string"){
        let userIndex = findUser(user);
        if(userIndex!=-1){
            allUsers[userIndex].groups.push(group);
            return;
        }else{
            throw new Error('Данный пользователь не существует.#21');
        }
    }else{
        if(typeof user =="object" && user!=null){
            if(user.length>1){
                for (let i =0; i< user.length; i++){
                    let userIndex = findUser(user[i]);
                    if (userIndex != -1) {
                        let allowInsert = allUsers[userIndex].groups.indexOf(group);
                        if(allowInsert==-1){
                            allUsers[userIndex].groups.push(group);
                        }else{
                            throw new Error('Пользователь уже состоит в данной группе.#22');
                        }
                    }else{
                        throw new Error('Данный пользователь не существует.#23');
                    }
                }
                return;
            }else {
                let userIndex = allUsers.indexOf(user);

                if (userIndex != -1) {
                    let allowInsert = allUsers[userIndex].groups.indexOf(group);
                    if(allowInsert==-1) {
                        allUsers[userIndex].groups.push(group);
                        return;
                    } else {
                        //throw new Error('Пользователь уже состоит в данной группе.#24');
                    }
                }else{
                    throw new Error('Данный пользователь не существует.#25');
                }
            }
        }else{
            throw new Error('Неверный тип параметра \"user\"#26');
        }
    }

};

function refreshGroups() {
    for (key in allGroups)
    {
        let arr = allGroups[key];
        for(let i = 0; i<allRights.length;i++){
            for(let j = 0; j<arr.length;j++){
                if(allRights.indexOf(arr[j])==-1){
                    allGroups[key].splice(j,1);
                }
            }
        }
    }
}

function deleteRight(right) {
    if(typeof right =="string"){
        let rightIndex = allRights.indexOf(right);
        if(rightIndex!=-1){
            allRights.splice(rightIndex,1);
            refreshGroups();
            return;
        }else{
            throw new Error('Данного права не существует.#27');
        }
    }else{
        if(typeof right == "object" && right != null){
            if(right.length > 1){
                for (let i = 0; i < right.length; i++){
                    let ri = allRights.indexOf(right[i]);
                    if(ri == -1)
                        throw new Error('Данного права не существует.#28');
                    else{
                        allRights.splice(ri, 1);
                        refreshGroups();
                    }
                }
                return;
            }else{
                if(allRights.indexOf(right)!= -1){
                    allRights.splice(allRights.indexOf(right[0]), 1);
                    refreshGroups();
                    return;
                }else{
                    throw new Error('Данного права не существует.#29');
                }
            }
        }
        throw new Error('Неверный тип параметра.#30');
    }
};



function removeUserFromGroup(user, group){
    let groupIndex;
    if(typeof (group)=="string"){
        groupIndex = Object.keys(allGroups).indexOf(group);
        if(groupIndex==-1)
            throw new Error('Указанной группы не существует.#31');
    }else{
        if(typeof (group) == "object" && group!=null){
            if(group.length<2) {
                groupIndex = allGroups.indexOf(group);
                if (groupIndex == -1)
                    throw new Error('Указанной группы не существует.#32');
            }
        }
        throw new Error('Неверный тип параметра \"group\"#33');
    }
    if(typeof user =="string"){
        let userIndex = findUser(user);
        if(userIndex!=-1){
            let allowInsert = allUsers[userIndex].groups.indexOf(group);
            if(allowInsert!=-1){
                allUsers[userIndex].groups.splice(allUsers[userIndex].groups.indexOf(group),1);
                return;
            }else{
                throw new Error('Пользователь не состоит в данной группе.#34');
            }
        }else{
            throw new Error('Данный пользователь не существует.#35');
        }
    }else{
        if(typeof user =="object" && user!=null){
            if(user.length>1){
                for (let i =0; i< user.length; i++){
                    let userIndex = findUser(user[i]);
                    if (userIndex != -1) {
                        let allowInsert = user[i].groups.indexOf(group);
                        if(allowInsert!=-1){
                            allUsers[userIndex].groups.splice(allUsers[userIndex].groups.indexOf(group),1);
                        }else{
                            throw new Error('Пользователь не состоит в данной группе.#36');
                        }
                    }else{
                        throw new Error('Данный пользователь не существует.#37');
                    }
                }
                return;
            }else {
                let userIndex = allUsers.indexOf(user);

                if (userIndex != -1) {
                    let allowInsert = allUsers[userIndex].groups.indexOf(group);
                    if(allowInsert!=-1) {
                        allUsers[userIndex].groups.splice(allUsers[userIndex].groups.indexOf(group),1);
                        return;
                    } else {
                        throw new Error('Пользователь не состоит в данной группе.#38');
                    }
                }else{
                    throw new Error('Данный пользователь не существует.#39');
                }
            }
        }
    }
    throw new Error('Неверный тип параметра \"user\"#40');


};

function addRightToGroup(right, group) {
    let groupIndex;
    if(typeof group =="string"){
        groupIndex = Object.keys(allGroups).indexOf(group);
        if(groupIndex!=-1){
            if(typeof right =="string"){
                let rightIndex = allRights.indexOf(right);
                if(rightIndex!=-1){
                    let allowInsert = allGroups[group].indexOf(right);
                    if(allowInsert==-1){
                        allGroups[group].push(right);
                        return;
                    }else{
                        //throw new Error('Право уже существует в указанной группе.#41');//fail
                    }
                }else{
                    throw new Error('Данного права не существует.#42');
                }
            }else{
                if(typeof right =="object"&&right!=null){
                    for(let i = 0;i<right.length;i++){
                        let rightIndex = allRights.indexOf(right[i]);
                        if(rightIndex!=-1){
                            let allowInsert = allGroups[group].indexOf(right[i]);
                            if(allowInsert==-1){
                                allGroups[group].push(right[0]);
                            }else{
                                throw new Error('Право уже существует в указанной группе.#43');
                            }
                        }else{
                            throw new Error('Данного права не существует.#44');
                        }
                    }
                    return;
                }else{
                    throw new Error('Неверный тип параметра \"user\"#45');
                }
            }
        }else{
            throw new Error('Данной группы не существует.#46');
        }
    }else{
        if(typeof group =="object"&&group!=null){

        }else{
            throw new Error('Неверный тип параметра \"group\"#47');
        }

    }
};

function removeRightFromGroup(right, group) {

    let groupIndex;
    if(typeof (group)=="string"){
        groupIndex = Object.keys(allGroups).indexOf(group);
        if(groupIndex==-1)
            throw new Error('Указанной группы не существует.#48');
    }else{
        if(typeof (group) == "object" && group!=null){
            if(group.length<1) {
                groupIndex = allGroups.indexOf(group);
                if (groupIndex == -1)
                    throw new Error('Указанной группы не существует.#49');
            }else{
                for(let i = 0; i < group.length;i++){
                    groupIndex = allGroups.indexOf(group[i]);
                    if(groupIndex != -1) {
                        if (typeof right == "string") {
                            for (key in allGroups) {
                                let arr = allGroups[key];
                                let r = allGroups[key].indexOf(right);
                                if (r != -1) {
                                    allGroups[key].splice(r, 1);
                                    return;
                                }
                            }
                        } else {
                            if (typeof right == "object" && right != null) {

                            }
                        }
                    }else{
                        throw new Error('Такая группа не существует.#50');
                    }
                }
                //предполагается ли передача массива групп?
            }
        }
        throw new Error('Неверный тип параметра \"group\"#51');
    }
    if(typeof right =="object"&& right!=null){
        if(right.length>1){
            let changed = false;
            for (key in allGroups)
            {
                let arr = allGroups[key];
                for(let i = 0; i<right.length;i++){
                    r = allGroups[key].indexOf(right[i]);
                    if(r!=-1){
                        allGroups[key].splice(r,1);
                        changed=  true;
                    }
                    else{
                        throw new Error('Нет права в указанной группе.#52');
                    }
                }
            }
            if(!changed)    throw new Error('В указанной группе не было прав, переданных в параметре.#53');
            else return;
        }else{
            for (key in allGroups)
            {
                let arr = allGroups[key];
                let r = allGroups[key].indexOf(right[0]);
                if(r!=-1){
                    allGroups[key].splice(r,1);
                    return;
                }else{
                    throw new Error('Права не существует в данной группе.#54');
                }
            }
        }
    }else{
        let changed = false;
        for (key in allGroups)
        {
            let arr = allGroups[key];
            let r = allGroups[key].indexOf(right);
            if(r!=-1){
                allGroups[key].splice(r,1);
                changed = true;
            }else{
                //throw  new  Error ('Права не существует в группе.');
            }
        }
        if(!changed)    throw new Error('В указанной группе не было прав, переданных в параметре.#55');
        else return;
    }
    throw new Error('Неверный тип параметра \"right\"#56');


};




function login(username, password) {
    if(typeof currentUser() == "object"){
        return false;
    }
    if(typeof username == "string" && typeof password == "string"){
       let userIndex = findUser(username);
       if(userIndex!=-1){
           if(allUsers[userIndex].session == "false"){
               if(allUsers[userIndex].password == password){
                   allUsers[userIndex].session = "true";
                   return true;
               }else{
                   return false;
               }
           }else{
               return false;
           }
       }else{
           throw new Error('Пользователь не найден.#57');
       }
    }else{
        throw new Error("Один из параметров не является типом \"STRING\"#58");
    }
};

function currentUser() {
    for(let i = 0; i<allUsers.length;i++){
        if(allUsers[i].session == "true"){
            return allUsers[i];
        }
    }
    return;
    
};

function logout() {
    for(let i = 0; i<allUsers.length;i++){
        if(allUsers[i].session == "true"){
            allUsers[i].session = "false";
            return;
        }
    }
    return;
};

function isAuthorized(user, right) {
    if(typeof user == "string"){
        let userIndex = findUser(user);
        if(userIndex!=-1){
            if(typeof right == "string"){
                let rightIndex = allRights.indexOf(right);
                if(rightIndex!=-1){
                    let groupsOfUser = userGroups(user);
                    let rightsOfUser = groupRights(groupsOfUser);
                    if(rightsOfUser != null ){
                        if(rightsOfUser.indexOf(right)!=-1){
                            return true;
                        }else{
                            return false;
                        }
                    }
                }else{
                    throw new Error('Данного права не существует.#59');
                }
            }else{
                if(typeof right == "object" && right != null){
                    if(right.length > 0){
                        let wasFalse = false;
                        let isA = false;
                        let groupsOfUser = userGroups(user);
                        let rightOfUser = groupRights(groupsOfUser);
                        for( let i = 0; i < right.length; i++){
                            let rightIndex = allRights.indexOf(right[i]);
                            if(rightIndex != -1){

                                if(rightOfUser != null){
                                    if(rightOfUser.indexOf(right[i])!=-1){
                                        isA = true;
                                    }else{
                                        wasFalse = true;
                                    }
                                }
                            }
                        }
                        if(isA && !wasFalse){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        throw  new Error('Передано пустое значение right.#60');
                    }
                }
            }
        }else{
            throw new Error('Пользователя не существует.#61')
        }
    }else{
        if(typeof user == "object" && user != null){
            if(user.length>0){
                let wasFalse = false;
                let isA = false;
                for(let i = 0; i < user.length; i++){
                    let userIndex = findUser(user[i]);
                    if(userIndex!=-1){
                        if(typeof right == "string"){
                            let rightIndex = allRights.indexOf(right);
                            if(rightIndex!=-1){
                                let groupsOfUser = userGroups(user[i]);
                                let rightsOfUser = groupRights(groupsOfUser);
                                if(rightsOfUser != null ){
                                    if(rightsOfUser.indexOf(right)!=-1){
                                        isA = true;
                                    }else{
                                        wasFalse = true;
                                    }
                                }
                            }else{
                                throw new Error('Данного права не существует.#62');
                            }
                        }else{
                            if(typeof right == "object" && right != null){
                                if(right.length > 0){
                                    let wasFalse = false;
                                    let isA = false;
                                    let groupsOfUser = userGroups(user[i]);
                                    let rightOfUser = groupRights(groupsOfUser);
                                    for( let j = 0; j < right.length; j++){
                                        let rightIndex = allRights.indexOf(right[j]);
                                        if(rightIndex != -1){

                                            if(rightOfUser != null){
                                                if(rightOfUser.indexOf(right[j])!=-1){
                                                    isA = true;
                                                }else{
                                                    wasFalse = true;
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    throw  new Error('Передано пустое значение right.#63');
                                }
                            }else{
                                throw  new Error('Неверный тип параметра right.#64');
                            }
                        }
                    }else{
                        throw new Error('Пользователь не существует.#65');
                    }
                }
                if(isA && !wasFalse){
                    return true;
                }else{
                    return false;
                }

            }else{
                let userIndex = allUsers.indexOf(user);
                if(userIndex!=-1){
                    let wasFalse = false;
                    let isA = false;
                    let groupsOfUser = userGroups(user);
                    let rightOfUser = groupRights(groupsOfUser);
                    if(typeof right == "string" && right != null){
                        let rightIndex = allRights.indexOf(right);
                        if(rightIndex != -1){
                            if(rightOfUser != null){
                                if(rightOfUser.indexOf(right)!=-1){
                                    return true;
                                }else{
                                    return false;
                                }
                            }
                        }else{
                            throw new Error('Нет такого права.#66');
                        }

                    }else{
                        throw new Error('Невеный тип.#67');
                    }

                }else{
                    throw new Error('Пользователь не существует.#69');
                }
            }
        }
    }
    throw new Error('Неверный тип параметра \"user\".#70');
};


