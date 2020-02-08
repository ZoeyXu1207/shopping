import Vue from 'vue'
import axios from 'axios'

//http response拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                console.log('错误了，没有登录')
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});