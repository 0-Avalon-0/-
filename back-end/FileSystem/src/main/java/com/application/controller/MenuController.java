package com.application.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.acceptbean.AcceptFileName;
import com.application.service.IMenuService;
import com.application.status.Status;

@RestController
@RequestMapping(value = "menus")
@CrossOrigin(origins = "*",maxAge = 3600)
public class MenuController {
	@Autowired
	IMenuService menuService;
	
	@RequestMapping(value = "/project/{pid}/path",method = RequestMethod.GET)
	public Status getFiles(@RequestParam("path") String path, @PathVariable("pid")int pid, HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse) {
		return menuService.getFiles(path, pid, httpServletRequest, httpServletResponse);
	}
	
	@RequestMapping(value = "/{fname}/project/{pid}/filepaths",method = RequestMethod.PATCH)
	public Status renameFile(@PathVariable("fname")String fname,@PathVariable("pid")int pid, @RequestParam("path") String path,@RequestBody AcceptFileName acceptFileName,HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse) {
		return menuService.renameFile(fname, path, pid, acceptFileName, httpServletRequest, httpServletResponse);
	}
}
