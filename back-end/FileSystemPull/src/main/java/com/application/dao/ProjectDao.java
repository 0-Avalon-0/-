package com.application.dao;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.application.acceptbean.AcceptPid;
import com.application.acceptbean.AcceptProject;
import com.application.bean.CusProject;
import com.application.bean.Member;
import com.application.bean.PSetting;
import com.application.bean.Project;
import com.application.status.Status;

import net.sf.json.JSONObject;

@Repository
public class ProjectDao implements Iproject{
	@Autowired
	JdbcTemplate jdbcTemplate;
	@Autowired
	AuthorityDao authorityDao;
	
	
	public Status createProject(CusProject cusProject,HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		Status status = new Status();
		String sql = "insert into project values(?,?,?,?,?)";
		
		HttpSession httpSession = httpServletRequest.getSession();
		
		//���ж�session����user���ԣ��о�Ĭ���ѵ�¼
		if(httpSession.getAttribute("user")!=null) {
			try {
				String pidsql = "select pid from project";
				List<AcceptPid> acceptPids = jdbcTemplate.query(pidsql, new BeanPropertyRowMapper(AcceptPid.class));
				//�������еĹ��̵����pid����pid
				int begin = 0;
				if(acceptPids!=null && acceptPids.size()>0) {
					Iterator iterator = acceptPids.iterator();
					begin = acceptPids.get(0).getpid();
					while(iterator.hasNext()) {
						int next = ((AcceptPid) iterator.next()).getpid();
						if(next>begin) {
							begin = next;
						}
					}
				}
				
				int id = begin+1;	
				
				String project_establisher = (String) httpSession.getAttribute("user");
				
				int statuscode = jdbcTemplate.update(sql,id,cusProject.getproject_property(),cusProject.getproject_pname(),cusProject.getproject_describe(),project_establisher);
				if(statuscode==0) {
					status.setCode(600);
					//insert����ֵΪ0��ʧ��		
					httpServletResponse.setStatus(600);
					status.setData("��������ʧ��");
				}else {
					//Ĭ�ϴ�����Ϊmember���ڹ���ԱȨ��
					String memsql = "insert into member values(?,?,?)";
					int memresult = jdbcTemplate.update(memsql,id,project_establisher,2);
					if(memresult>0) {
						status.setCode(201);
						httpServletResponse.setStatus(201);
						
						PSetting pSetting = new PSetting();
						pSetting.setpid(id);
						pSetting.setproject_property(cusProject.getproject_property());
						pSetting.setproject_describe(cusProject.getproject_describe());
						pSetting.setproject_establisher(project_establisher);
						pSetting.setproject_pname(cusProject.getproject_pname());
						List<Member> origin = new ArrayList<>();
						Member member = new Member();
						member.setmembername(project_establisher);
						member.setproject_authority(2);
						origin.add(member);
						pSetting.setContent(origin);
						
						JSONObject jsonObject = JSONObject.fromObject(pSetting);
						status.setData(jsonObject.toString());		
					}else {
						httpServletResponse.setStatus(600);
						status.setData("�������ԱȨ��ʧ��");
					}				
				}
			}catch(Exception exception) {
				if(exception instanceof DataAccessResourceFailureException) {
					status.setCode(500);
					httpServletResponse.setStatus(500);
					status.setData("���ݿ�����ʧ��");
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
			status.setData("�û�δ��¼");
		}
		
		return status;
	}
	
	public Status deleteProject(int pid,HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		Status status = new Status();
		HttpSession httpSession = httpServletRequest.getSession();
		//���ж�session����user���ԣ��о�Ĭ���ѵ�¼
		
		if(httpSession.getAttribute("user")!=null) {
			try {
				//���ж���Ŀ�Ƿ����
				String projectQuery = "select * from project where pid = ?";
				List<Project> projectsList = jdbcTemplate.query(projectQuery, new Object[] {pid},new BeanPropertyRowMapper(Project.class));
				if(projectsList!=null&&projectsList.size()>0) {
					int projectproperty = projectsList.get(0).getproject_property();
					
					boolean isAble = false;//�Ƿ���Ȩ��
					
					//���˲鿴�ĵ����ⶼ����Ҫ�ֹ�˽����Ŀ
					Status autStatus = authorityDao.getAuthority(pid, (String)httpSession.getAttribute("user"));
					if(autStatus.getCode()==200) {
						//�ж�Ȩ��						
						int cusAuhthority = Integer.valueOf(autStatus.getData());
						if(cusAuhthority==2) {
							isAble = true;
						}												
					}else {
						//��ȡȨ��ʱ��������
						status = autStatus;
						httpServletResponse.setStatus(status.getCode());
					}
					//�˴���Ҫ�ж��Ƿ�ӵ��Ȩ��
					if(isAble) {
						//ɾ����Ŀ
						String deletesql = "delete from project where pid = ?";
						int result = jdbcTemplate.update(deletesql,pid);
						if(result>0) {
							status.setCode(204);
							httpServletResponse.setStatus(204);
							AcceptPid acceptPid = new AcceptPid();
							acceptPid.setpid(pid);
							JSONObject jsonObject = JSONObject.fromObject(acceptPid);
							status.setData(jsonObject.toString());
						}else {
							status.setCode(404);
							httpServletResponse.setStatus(600);
							status.setData("���̲�����");
						}
					}else {
						status.setCode(403);
						httpServletResponse.setStatus(403);
						status.setData("�û�Ȩ�޲���");
					}					
				}else {
					status.setCode(404);
					httpServletResponse.setStatus(404);
					status.setData("���̲�����");
				}	
			}catch(Exception exception) {
				if(exception instanceof DataAccessResourceFailureException) {
					status.setCode(500);
					httpServletResponse.setStatus(500);
					status.setData("���ݿ�����ʧ��");
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
			status.setData("�û�δ��¼");
		}
		
		return status;
	}
	
	public Status searchProject(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		Status status = new Status();
		String projectsql = "select * from project where project_establisher= ?";
		String membersql = "select * from member where pid = ?";
		HttpSession httpSession = httpServletRequest.getSession();
		//���ж�session����user���ԣ��о�Ĭ���ѵ�¼
		if(httpSession.getAttribute("user")!=null) {
			try {
				AcceptProject acceptProject = new AcceptProject();
				List<PSetting> pSettings = new ArrayList<PSetting>();
				List<Project> projects = jdbcTemplate.query(projectsql, new Object[] {(String)httpSession.getAttribute("user")},new BeanPropertyRowMapper(Project.class));
				//�˴�������404���⣬��Ϊ�����û�û�д�������
				//��������project,����Ӧ��member��ӵ�ÿһ��psetting
				Iterator projectIterator = projects.iterator();
				while(projectIterator.hasNext()) {
					PSetting addPsetting = new PSetting();
					Project currentProject = (Project)projectIterator.next();
					List<Member> members = jdbcTemplate.query(membersql, new Object[] {currentProject.getPid()},new BeanPropertyRowMapper(Member.class));
					addPsetting.setContent(members);
					addPsetting.setpid(currentProject.getPid());
					addPsetting.setproject_describe(currentProject.getproject_describe());
					addPsetting.setproject_establisher(currentProject.getproject_establisher());
					addPsetting.setproject_pname(currentProject.getproject_pname());
					addPsetting.setproject_property(currentProject.getproject_property());
					pSettings.add(addPsetting);
				}
				acceptProject.setprojects(pSettings);
				status.setCode(200);
				httpServletResponse.setStatus(200);
				JSONObject jsonObject = JSONObject.fromObject(acceptProject);
				status.setData(jsonObject.toString());
				
			}catch(Exception exception) {
				if(exception instanceof DataAccessResourceFailureException) {
					status.setCode(500);
					httpServletResponse.setStatus(500);
					status.setData("���ݿ�����ʧ��");
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
			status.setData("�û�δ��¼");
		}	
		return status;
	}
	
	//��ѯMember���Menu�������ؽ��
	//Menu���ص�һ��ڵ��Ŀ¼�������и��ڵ�Ϊroot�Ľڵ�
	public Status getSetting(int pid,HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		Status status = new Status();
		
		PSetting psetting = new PSetting();
		String sql1 = "select membername, project_authority from member where pid = ?";//�ҳ�Ա����
		String sql2 = "select * from project where pid = ?";//����Ŀ����
		
		HttpSession httpSession = httpServletRequest.getSession();
		//���ж�session����user���ԣ��о�Ĭ���ѵ�¼
		
		if(httpSession.getAttribute("user")!=null) {
			try {
				//���ж���Ŀ�Ƿ����
				String projectQuery = "select * from project where pid = ?";
				List<Project> projectsList = jdbcTemplate.query(projectQuery, new Object[] {pid},new BeanPropertyRowMapper(Project.class));
				if(projectsList!=null&&projectsList.size()>0) {
					int projectproperty = projectsList.get(0).getproject_property();
					
					boolean isAble = false;//�Ƿ���Ȩ��
					
					//���˲鿴�ĵ����ⶼ����Ҫ�ֹ�˽����Ŀ
					Status autStatus = authorityDao.getAuthority(pid, (String)httpSession.getAttribute("user"));
					if(autStatus.getCode()==200) {
						//�ж�Ȩ��						
						int cusAuhthority = Integer.valueOf(autStatus.getData());
						if(cusAuhthority>=1) {
							isAble = true;
						}												
					}else {
						//��ȡȨ��ʱ��������
						status = autStatus;
						httpServletResponse.setStatus(status.getCode());
					}
					//�˴���Ҫ�ж��Ƿ�ӵ��Ȩ��
					if(isAble) {
						//�Ȼ�ȡproject����
						List<Project> pList = jdbcTemplate.query(sql2, new Object[] {pid},new BeanPropertyRowMapper(Project.class));
						if(pList!=null&&pList.size()>0) {
							//psetting.setStatus(200);
							psetting.setpid(pid);
							psetting.setproject_describe(pList.get(0).getproject_describe());
							psetting.setproject_establisher(pList.get(0).getproject_establisher());
							psetting.setproject_pname(pList.get(0).getproject_pname());
							psetting.setproject_property(pList.get(0).getproject_property());
						}else {
							//û�ҵ�
							//psetting.setStatus(404);
							status.setCode(404);
							httpServletResponse.setStatus(404);
							status.setData("���̲�����");
						}					
						//��ȡ��Ա��Ϣ
						List<Member> memList = jdbcTemplate.query(sql1, new Object[] {pid},new BeanPropertyRowMapper(Member.class));
						if(memList!=null && memList.size()>0) {
							//������Ա��ɾ������Ա��Ϣ
							//��ֹ����Ա���Լ�Ȩ��
							Iterator memiterator = memList.iterator();
							while(memiterator.hasNext()) {
								Member currenmem = (Member)memiterator.next();
								if(currenmem.getmembername().equals(pList.get(0).getproject_establisher())) {
									memList.remove(currenmem);
									break;
								}	
							}	
							psetting.setContent(memList);
						}else {
							//û�ҵ�
							//psetting.setStatus(404);
							status.setCode(404);
							httpServletResponse.setStatus(404);
							status.setData("���̲�����");
						}
						//psettingת����json����
						JSONObject jsonObject = JSONObject.fromObject(psetting);
						status.setCode(200);
						httpServletResponse.setStatus(200);
						status.setData(jsonObject.toString());	
					}else {
						status.setCode(403);
						httpServletResponse.setStatus(403);
						status.setData("�û�Ȩ�޲���");
					}					
				}else {
					status.setCode(404);
					httpServletResponse.setStatus(404);
					status.setData("���̲�����");
				}	
			}catch(Exception exception) {
				if(exception instanceof DataAccessResourceFailureException) {
					status.setCode(500);
					httpServletResponse.setStatus(500);
					status.setData("���ݿ�����ʧ��");
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
			status.setData("�û�δ��¼");
		}		
		return status;
	}
	
	//����Member�������ؽ��
	public Status updateSetting(int pid,PSetting pSetting,HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
		Status status= new Status();
		HttpSession httpSession = httpServletRequest.getSession();
		
		String projectUpdate = "update project set project_pname = ?,project_establisher = ?, project_property = ?, project_describe = ? where pid = ?";
		String memberUpdate = "update member set project_authority = ? where membername = ? and pid = ?";
		List<Member> membersToChange = pSetting.getContent();//�û�Ҫ�ĵĳ�Ա��Ϣ
		
		if(httpSession.getAttribute("user")!=null) {
			
			try {
				//���ж���Ŀ�Ƿ����
				String projectQuery = "select * from project where pid = ?";
				List<Project> projectsList = jdbcTemplate.query(projectQuery, new Object[] {pid},new BeanPropertyRowMapper(Project.class));
				if(projectsList!=null&&projectsList.size()>0) {
					int projectproperty = projectsList.get(0).getproject_property();
					
					boolean isAble = false;//�Ƿ���Ȩ��
					
					//���˲鿴�ĵ����ⶼ����Ҫ�ֹ�˽����Ŀ
					Status autStatus = authorityDao.getAuthority(pid, (String)httpSession.getAttribute("user"));
					if(autStatus.getCode()==200) {
						//�ж�Ȩ��						
						int cusAuhthority = Integer.valueOf(autStatus.getData());
						if(cusAuhthority>=1) {
							isAble = true;
						}												
					}else {
						//��ȡȨ��ʱ��������
						status = autStatus;
						httpServletResponse.setStatus(status.getCode());
					}
					//�˴���Ҫ�ж��Ƿ�ӵ��Ȩ��
					if(isAble) {
						String originProject = "select * from project where pid = ?";
						String originMember = "select * from member where pid = ?";
						List<Project> projectsinfo = jdbcTemplate.query(originProject,new Object[] {pid}, new BeanPropertyRowMapper(Project.class));
						List<Member> membersinfo = jdbcTemplate.query(originMember, new Object[] {pid}, new BeanPropertyRowMapper(Member.class));
						if(projectsinfo!=null && projectsinfo.size()>0) {
							Project currentProject = projectsinfo.get(0);//Դ����
							//���ȸ��¹�������
							int presult = jdbcTemplate.update(projectUpdate,
									pSetting.getproject_pname(),
									currentProject.getproject_establisher(),
									pSetting.getproject_property(),
									pSetting.getproject_describe(),
									pid);
							if(presult>=0) {
								//project���ָ��ĳɹ�
								int times = membersToChange.size();//��¼���´���
								
								
								Iterator memIterator = membersToChange.iterator();
								boolean membersuccess = true;//��¼�Ƿ�����member��¼�����³ɹ�
								//�����������ȫ����Ҫ���µ�member���ݣ���ȫ���ϴ�
								while(times>0&&memIterator.hasNext()) {
									Member temp = (Member)memIterator.next();//ÿ��Ҫ�ĵ�member
									Member origin = new Member();//ÿ��temp��Ӧ��Դ��Ϣ
									//����ԭmemberinfo��Դ��Ϣ
									Iterator originmemIterator = membersinfo.iterator();
									while(originmemIterator.hasNext()){
										Member oMember = (Member)originmemIterator.next();//ÿһ������Ŀ��member
										if(oMember.getmembername() == temp.getmembername()) {
											origin = oMember;
											break;
										}
									}
									int mresult = jdbcTemplate.update(memberUpdate,	
											temp.getproject_authority(),
											temp.getmembername(),
											pid);
									if(mresult>=0) {
										//member���ָ��ĳɹ�
										
										
									}else {
										membersuccess = false;
										status.setCode(404);
										httpServletResponse.setStatus(404);
										status.setData("���̲�����");
									}
									times--;
								}
								if(membersuccess) {
									//�������� �� ��Ա���ö��ɹ�
									PSetting returnSetting = pSetting;
									//�˴��������ݿ��ѯ����ȡ���³�Ա��Ϣ������
									List<Member> newmembersinfo = jdbcTemplate.query(originMember, new Object[] {pid}, new BeanPropertyRowMapper(Member.class));
									returnSetting.setContent(newmembersinfo);
									returnSetting.setproject_pname(pSetting.getproject_pname());
									returnSetting.setpid(pid);
									returnSetting.setproject_describe(pSetting.getproject_describe());
									returnSetting.setproject_property(pSetting.getproject_property());
									returnSetting.setproject_establisher(currentProject.getproject_establisher());
									JSONObject jsonObject = JSONObject.fromObject(returnSetting);
									status.setCode(201);
									httpServletResponse.setStatus(201);
									status.setData(jsonObject.toString());
								}
							}else {
								status.setCode(404);
								httpServletResponse.setStatus(404);
								status.setData("���̲�����");
							}						
						}else {
							status.setCode(404);
							httpServletResponse.setStatus(404);
							status.setData("���̲�����");
						}
					}else {
						status.setCode(403);
						httpServletResponse.setStatus(403);
						status.setData("�û�Ȩ�޲���");
					}	
				}else {
					status.setCode(404);
					httpServletResponse.setStatus(404);
					status.setData("���̲�����");
				}	
			}catch(Exception exception) {
				if(exception instanceof DataAccessResourceFailureException) {
					status.setCode(500);
					httpServletResponse.setStatus(500);
					status.setData("���ݿ�����ʧ��");
				}else {
					status.setCode(600);
					httpServletResponse.setStatus(600);
					status.setData(exception.getMessage());
				}
			}
		}else {
			status.setCode(401);
			httpServletResponse.setStatus(401);
			status.setData("�û�δ��¼");
		}
		return status;
	}

	
}

