package com.application.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.application.acceptbean.AcceptAuthority;
import com.application.acceptbean.NoPidAuthority;
import com.application.acceptbean.RequestAuthority;
import com.application.bean.project_authority;
import com.application.status.Status;

import net.sf.json.JSONObject;

@Repository
public class AuthorityDao implements Iauthority{
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public Status getAuthority(int pid,String membername) {
		Status status = new Status();
		
		String sql = "select project_authority from member where pid = ? and membername = ?";
		try {
			List<project_authority> list= jdbcTemplate.query(sql, new Object[] {pid,membername},new BeanPropertyRowMapper(project_authority.class));
			if(list!=null && list.size()>0) {
				status.setCode(200);
				status.setData(String.valueOf(list.get(0).getproject_authority()));
			}else {
				status.setCode(403);
				status.setData("用户权限不足");
			}
		}catch(Exception e){
			if(e instanceof DataAccessResourceFailureException) {
				status.setCode(500);
				status.setData("数据库连接失败");
			}else {
				status.setCode(600);
				status.setData("Authority"+e.getMessage());
			}
		}
		
		return status;
	}

	@Override
	public Status addAuthority(int pid, String membername, RequestAuthority requestAuthority,HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		Status status = new Status();
		String sql = "select project_authority from member where pid = ? and membername = ?";
		String addsql = "insert into member values(?,?,?)";
		String curretnuser = (String)httpServletRequest.getSession().getAttribute("user");
		try {
			List<project_authority> authority = jdbcTemplate.query(sql, new Object[] {pid,curretnuser},new BeanPropertyRowMapper(project_authority.class));
			boolean isAble = false;
			if(authority!=null&&authority.size()>0) {
				int canManage = authority.get(0).getproject_authority();
				if(canManage==2) {
					isAble = true;
				}else {
					status.setCode(403);
					httpServletResponse.setStatus(403);
					status.setData("用户权限不足");
				}
			}else {
				status.setCode(403);
				httpServletResponse.setStatus(403);
				status.setData("用户权限不足");
			}
			if(isAble) {
				int result = jdbcTemplate.update(addsql,pid,membername,requestAuthority.getproject_authority());
				if(result>=0) {
					status.setCode(201);
					httpServletResponse.setStatus(201);
//					AcceptAuthority acceptAuthority = new AcceptAuthority();
//					acceptAuthority.setpid(pid);
//					acceptAuthority.setmembername(membername);
//					acceptAuthority.setproject_authority(requestAuthority.getauthority());
					NoPidAuthority noPidAuthority = new NoPidAuthority();
					noPidAuthority.setmembername(membername);
					noPidAuthority.setproject_authority(requestAuthority.getproject_authority());
					JSONObject jsonObject = JSONObject.fromObject(noPidAuthority);
					
					status.setData(jsonObject.toString());
				}else {
					status.setCode(600);
					httpServletResponse.setStatus(600);
					status.setData("更新成员权限失败");
				}
			}
		}catch(Exception exception) {
			if(exception instanceof DataAccessResourceFailureException) {
				status.setCode(500);
				httpServletResponse.setStatus(500);
				status.setData("数据库连接失败");
			}else {
				if(exception.getMessage().contains("a foreign key constraint fails")) {
					status.setCode(404);
					httpServletResponse.setStatus(404);
					status.setData("成员用户不存在");
				}else if(exception.getMessage().contains("Duplicate entry")) {
					status.setCode(422);
					httpServletResponse.setStatus(422);
					status.setData("添加成员重复");
				}else {
					exception.printStackTrace();
					status.setCode(600);
					httpServletResponse.setStatus(600);
					status.setData(exception.getMessage());
				}	
			}
		}
		
		return status;
	}

	@Override
	public Status deleteAuthority(int pid, String membername, HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse) {
		Status status = new Status();
		String sql = "select project_authority from member where pid = ? and membername = ?";
		String delsql = "delete from member where pid = ? and membername = ?";
		String curretnuser = (String)httpServletRequest.getSession().getAttribute("user");
		try {
			List<project_authority> authority = jdbcTemplate.query(sql, new Object[] {pid,curretnuser},new BeanPropertyRowMapper(project_authority.class));
			boolean isAble = false;
			if(authority!=null&&authority.size()>0) {
				int canManage = authority.get(0).getproject_authority();
				if(canManage==2) {
					isAble = true;
				}else {
					status.setCode(403);
					httpServletResponse.setStatus(403);
					status.setData("用户权限不足");
				}
			}else {
				status.setCode(403);
				httpServletResponse.setStatus(403);
				status.setData("用户权限不足");
			}
			if(isAble) {
				int result = jdbcTemplate.update(delsql,pid,membername);
				if(result>0) {
					status.setCode(201);
					httpServletResponse.setStatus(201);
					AcceptAuthority acceptAuthority = new AcceptAuthority();
					acceptAuthority.setpid(pid);
					acceptAuthority.setmembername(membername);
					JSONObject jsonObject = JSONObject.fromObject(acceptAuthority);			
					status.setData(jsonObject.toString());
				}else {
					status.setCode(404);
					httpServletResponse.setStatus(600);
					status.setData("成员列表无该成员");
				}
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
		return status;
	}
}

