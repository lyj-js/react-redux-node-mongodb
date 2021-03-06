import axios from 'axios';
import { getRedirectPath } from '../common/js/util'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA= 'LOAD_DATA';
const ERROR_MSG = 'ERROR_MSG';

const AUTH_SUCCESS='AUTH_SUCCESS';
const LOGIN_OUT = 'LOGIN_OUT';


const initState = {
    redirectTo:'',
    isAuth:false,
    msg:'',
    user:'',
    type:'',
    avatar:''

};
export function user(state=initState,action) {
    switch(action.type){
        case AUTH_SUCCESS:
            return { ...state, msg:'', isAuth:true,redirectTo:getRedirectPath(action.payload), ...action.payload };
        case  ERROR_MSG:
            return { ...state, msg:action.payload, isAuth:true,};

        case  LOAD_DATA:
            return { ...state, msg:'', isAuth:true, redirectTo:getRedirectPath(action.payload),...action.payload  };
        case LOGIN_OUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state
    }

};
function authSucess(userinfo) {
    return {type:AUTH_SUCCESS,payload:userinfo}
}
export function loadData(data){
    return{type:LOAD_DATA,payload:data}
}
function errorMsg(msg) {
    return { type:ERROR_MSG,payload:msg }
};

export  function LoginOut() {
    return {type:LOGIN_OUT}
}
// function RegisterSuccess(data) {
//     return { type:AUTH_SUCCESS,payload:data }
//
// };
//
// function LoginSuccess(data) {
//     return { type:AUTH_SUCCESS,payload:data }
//
// }

export function update(data) {
    return dispatch=>{
        axios.post('/user/update',data).then(result=>{
            if( result.status=== 200&& result.data.code === 0) {
                dispatch(authSucess(result.data.data));
            } else {
                return dispatch(errorMsg(result.data.msg))
            }
        })
    }

}

export  function login({user,pwd}) {
    if(!user||!pwd){
        return errorMsg('用户名和密码必须输入')
    };
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(result=>{
            if( result.status=== 200&& result.data.code === 0) {
                dispatch(authSucess(result.data.data));
            } else {
                return dispatch(errorMsg(result.data.msg))
            }
        })
    }

}

export  function  register({user,pwd,repeatpwd,type}) {
    if(!user||!pwd||!type){
        return errorMsg('用户名和密码必须输入')
    };
    if(pwd!==repeatpwd){
        return errorMsg('密码和确认密码不同')
    };

    return dispatch=>{
        axios.post('/user/register',{ user, pwd, type }).then((result)=>{

            if( result.status=== 200&& result.data.code === 0) {
                dispatch(authSucess(result.data.data))

            } else {
                return dispatch(errorMsg(result.data.msg))
            }

        })
    }

}



