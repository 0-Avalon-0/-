package com.application.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.application.acceptbean.RequestAuthority;
import com.application.service.IAuthorityService;
import com.application.status.Status;

@RestController
@RequestMapping(value = "/projectsettings")
@CrossOrigin(origins = "*",maxAge = 3600)
public class AuthorityController {
	@Autowired
	IAuthorityService authorityService;
	
	@RequestMapping(value = "/{pid}/user/{name}",method = RequestMethod.GET)
	public Status getAuthority(@PathVariable("pid")int pid,@PathVariable("name")String name) {
		return authorityService.getAuthority(pid, name);
	}
	
	@RequestMapping(value = "/{pid}/user/{name}",method = RequestMethod.POST)
	public Status addAuthority(@PathVariable("pid")int pid,@PathVariable("name")String name,@RequestBody RequestAuthority requestAuthority,HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		return authorityService.addAuthority(pid, name, requestAuthority,httpServletRequest, httpServletResponse);
	}
	

}
