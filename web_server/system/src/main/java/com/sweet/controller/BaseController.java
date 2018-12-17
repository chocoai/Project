package com.sweet.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.sweet.bean.ResponseResult;

public abstract class BaseController {
	protected String getSessionVal(HttpSession session,String param) {
		return String.valueOf(session.getAttribute(param).toString());
	}
	/**
	 * 全局捕获异常
	 */
	@ExceptionHandler
	public ResponseResult<Void> handlerException(Exception e,HttpServletRequest request) {
		ResponseResult<Void> rr = new ResponseResult<Void>();
		e.printStackTrace();
		if(e instanceof NullPointerException) {
			rr.setMessage("未知错误，请联系管理员");
		}else if(e instanceof BindException) {
			BindingResult bindingResult = ((BindException) e).getBindingResult();
	        StringBuffer errorMesssage = new StringBuffer();
	        for (FieldError fieldError : bindingResult.getFieldErrors()) {
	            errorMesssage .append(fieldError.getDefaultMessage() + ",");
	        }
			rr.setMessage(errorMesssage.substring(0, errorMesssage.lastIndexOf(",")).toString());
		}else {
			rr.setMessage(e.getMessage());
		}
		rr.setState(ResponseResult.STATE_ERROR);
		return rr;
	}
}
