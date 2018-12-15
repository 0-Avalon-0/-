package com.application.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.application.acceptbean.RequestAuthority;
import com.application.status.Status;

public interface IAuthorityService {
	Status getAuthority(int pid,String membername);
	Status addAuthority(int pid,String membername,RequestAuthority requestAuthority,HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse);
}
