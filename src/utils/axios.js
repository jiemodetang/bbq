import axios from "axios"; // 引入axios
import Qs from "qs"; // 引入qs模块，用来序列化post类型的数据
import MockAdapter from "axios-mock-adapter";
import { dealMock } from "../myMock";
import { apiConfig } from '../service/mmp'
import { getCookie } from '../utils/index'

let inError = false;
const instance = axios.create({

	timeout: 15000, // 请求超时时间
	// `transformRequest` 允许在向服务器发送前，修改请求数据
	transformRequest: [
		function (data) {
			return data;
		},
	],
	transformResponse: [
		function (data) {
			// console.log(JSON.parse(data));
			// 对 data 进行任意转换处理
			return apiConfig.isMock ? data : JSON.parse(data);
		},
	],
	headers: {
		"Cache-Control": "no-cache",
	},
});
if (apiConfig.isMock) {
	var mock = new MockAdapter(instance);
	dealMock(mock);
}
// 实例添加请求拦截器
instance.interceptors.request.use(
	function (config) {
		config.headers = Object.assign(
			config.method === "get"
				? {
					"Access-Control-Allow-Origin": "*",
				}
				: {
					"Content-Type": "application/json; charset=UTF-8",
					"Access-Control-Allow-Origin": "*",
				},
			config.headers
		);
		config.headers.Authorization = apiConfig.token ? getCookie('token') : ''

		if (config.method === "post") {
			const contentType = config.headers["Content-Type"];
			// 根据Content-Type转换data格式
			if (contentType == 'application/json; charset=UTF-8') {
				config.data = JSON.stringify(config.data);
			} else {
				config.data = config.data
			}
		}
		return Promise.resolve(config);
	},
	function (error) {
		// 对请求错误做处理...
		return Promise.reject(error);
	}
);

// 实例添加响应拦截器
instance.interceptors.response.use(
	function (response) {

		const { code } = response.data || {};
		if (code === 109 || code === 108) {

			// error
			if (!inError) {
				inError = true;
				// 跳转改inError
			}
			return Promise.resolve({});
		} else if (response) {
			return Promise.resolve(checkStatus(response));
		}
	},
	function (error) {
		console.log(error);

		// 对响应错误做处理...
		// console.log(error);
		if (error.response) {
			return Promise.reject(checkStatus(error.response));
		} else if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
			return Promise.reject({ msg: "请求超时" });
		} else {
			return Promise.reject({});
		}
	}
);

const request = async function (opt) {
	const options = {
		method: "post",
		ifHandleError: true, // 是否统一处理接口失败(提示)
		...opt,
	};
	const { myUrl, qz } = apiConfig;
	// if (process.env.NODE_ENV === "production") {
	// 	options.baseURL = myUrl.productionUrl + qz;
	// }
	try {
		const res = await instance(options);
		return res;
	} catch (err) {
		if (options.ifHandleError) {
			//可以处理全局统一error提示
		}
		return err;
	}
};

export default request;

export function checkStatus(response) {

	const status = response.status || -1000; // -1000 自己定义，连接错误的status
	if ((status >= 200 && status < 300) || status === 304 || status === '0000') {
		// console.log(response,777);

		// 如果http状态码正常，则直接返回数据
		return response.data;
	} else {
		let errorInfo = "";
		switch (status) {
			case -1:
				errorInfo = "远程服务响应失败,请稍后重试";
				break;
			case 400:
				errorInfo = "400：错误请求";
				break;
			case 401:
				errorInfo = "401：访问令牌无效或已过期";
				break;
			case 403:
				errorInfo = "403：拒绝访问";
				break;
			case 404:
				errorInfo = "404：资源不存在";
				break;
			case 405:
				errorInfo = "405：请求方法未允许";
				break;
			case 408:
				errorInfo = "408：请求超时";
				break;
			case 500:
				errorInfo = "500：访问服务失败";
				break;
			case 501:
				errorInfo = "501：未实现";
				break;
			case 502:
				errorInfo = "502：无效网关";
				break;
			case 503:
				errorInfo = "503：服务不可用";
				break;
			default:
				errorInfo = `连接错误`;
		}
		return {
			status,
			msg: errorInfo,
		};
	}
}
