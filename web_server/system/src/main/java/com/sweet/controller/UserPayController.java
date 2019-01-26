package com.sweet.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sweet.bean.UserPay;
import com.sweet.hzy.service.UserPayService;

@RestController
@RequestMapping(value="/pay")
public class UserPayController extends BaseController{

	@Resource
	private UserPayService userPayService;
	
	@PostMapping(value="/getUserPayList.do")
	public List<UserPay> getUserPayList() {
		return userPayService.getUserPayList();
	}
	
	
	@PostMapping(value="/addUserPay.do")
	public int addUserPay(@Valid UserPay pay) {
		return userPayService.insertUserPay(pay);
	}
	
	@PostMapping(value="/deleteUserPay.do")
	public int deleteUserPay(@NotNull(message = "参数不能为空")Integer id) {
		return userPayService.deleteUserPay(id);
	}
	
	@PostMapping(value="/updateUserPay.do")
	public int updateUserPay(@Valid UserPay pay) {
		return userPayService.updateUserPay(pay);
	}
	
	@PostMapping(value="/getMoneyListByWeek.do")
	public List<UserPay> getMoneyListByWeek(Date time) {
		return userPayService.getMoneyListByWeek(time);
	}

	@PostMapping(value="/getMoneyListByMonth.do")
	public List<UserPay> getMoneyListByMonth(Date time) {
		return userPayService.getMoneyListByMonth(time);
	}

	@PostMapping(value="/getMoneyListByYear.do")
	public List<UserPay> getMoneyListByYear(Date time) {
		return userPayService.getMoneyListByYear(time);
	}
}