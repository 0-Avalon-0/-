package com.application.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.acceptbean.RequestAuthority;
import com.application.dao.AuthorityDao;
import com.application.status.Status;

@Service
public class AuthorityService implements IAuthorityService{
	@Autowired
	private AuthorityDao authoritydao;
	
	@Override
	public Status getAuthority(int pid,String membername) {
		return authoritydao.getAuthority(pid, membername);
	}
	
	@Override
	public Status addAuthority(int pid, String membername, RequestAuthority requestAuthority, HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		return authoritydao.addAuthority(pid, membername, requestAuthority, httpServletRequest,httpServletResponse);
	}


}
