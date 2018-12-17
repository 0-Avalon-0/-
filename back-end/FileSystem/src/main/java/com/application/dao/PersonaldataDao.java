package com.application.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.application.bean.User;
import com.application.status.Status;

import net.sf.json.JSONObject;

@Repository
public class PersonaldataDao implements Ipersonaldata{
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public Status getData(String name,HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		Status status = new Status();
		String sql = "select * from user where user_name = ?";
			
		HttpSession httpSession = httpServletRequest.getSession();
		
		//检查是否登录
		if(httpSession.getAttribute("user")!=null && ((String)httpSession.getAttribute("user")).equals(name)) {
			try {
				List<User> list = jdbcTemplate.query(sql,new Object[]{name},new BeanPropertyRowMapper(User.class));
				if(list!=null && list.size()>0) {
					User userinfo = list.get(0);
					JSONObject jsonObject = JSONObject.fromObject(userinfo);
					status.setCode(200);
					httpServletResponse.setStatus(200);
					status.setData(jsonObject.toString());
				}else {
					status.setCode(404);
					httpServletResponse.setStatus(404);
					status.setData("用户信息不存在");
				}			
			}catch(Exception exception) {
				if(exception instanceof DataAccessResourceFailureException) {
					status.setCode(500);
					httpServletResponse.setStatus(500);
					status.setData("数据库连接失败");
				}else {
					exception.printStackTrace();
					
					status.setCode(600);
					httpServletResponse.setStatus(600);
					status.setData(exception.getMessage());
				}
			}		
		}else {
			status.setCode(401);
			httpServletResponse.setStatus(401);
			status.setData("用户未登录");
		}	
		return status;
	}

	public Status changeData(String name, User user,HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		Status status = new Status();
		String sql = "update user set user_name = ?, user_password = ?, user_gender = ?, user_email = ? ,user_signature = ?,user_company = ?,user_location = ? where user_name = ?";
			
		HttpSession httpSession = httpServletRequest.getSession();
		
		//检查是否登录 
		
		if(httpSession.getAttribute("user")!=null && ((String)httpSession.getAttribute("user")).equals(name)) {
			try {
				//发啥改啥
				int result= jdbcTemplate.update(sql,
						user.getuser_name(),
						user.getuser_password(),
						user.getuser_gender(),
						user.getuser_email(),
						user.getuser_signature(),
						user.getuser_company(),
						user.getuser_location(),
						name);
				if(result>=0) {
					User newuser = user;
					newuser.setuser_email(user.getuser_email());
					newuser.setuser_gender(user.getuser_gender());
					newuser.setuser_name(user.getuser_name());
					newuser.setuser_password(user.getuser_password());
					newuser.setuser_company(user.getuser_company());
					newuser.setuser_signature(user.getuser_signature());
					newuser.setuser_location(user.getuser_location());
					
					httpSession.setAttribute("user", user.getuser_name());
					JSONObject jsonObject = JSONObject.fromObject(newuser);
					status.setCode(201);
					httpServletResponse.setStatus(201);
					status.setData(jsonObject.toString());
				}else {
					status.setCode(404);
					httpServletResponse.setStatus(404);
					status.setData("用户不存在");
				}			
			}catch(Exception exception) {
				if(exception instanceof DataAccessResourceFailureException) {
					status.setCode(500);
					httpServletResponse.setStatus(500);
					status.setData("数据库连接失败");
				}else if(exception instanceof DuplicateKeyException){
					//exception.printStackTrace();
					status.setCode(422);
					httpServletResponse.setStatus(422);
					status.setData("用户名重复");
				}else {
					exception.printStackTrace();	
					status.setCode(600);
					httpServletResponse.setStatus(600);
					status.setData(exception.getMessage());
				}
			}		
		}else {
			status.setCode(401);
			httpServletResponse.setStatus(401);
			status.setData("用户未登录");
		}	
		return status;
	}
	
}

