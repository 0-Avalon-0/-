package com.application.acceptbean;

public class AcceptAuthority {
	private int pid;
	private String membername;
	private int project_authority;
	public void setpid(int pid) {
		this.pid = pid;
	}
	public void setmembername(String name) {
		this.membername = name;
	}
	public void setproject_authority(int authority) {
		this.project_authority = authority;
	}
	public int getpid() {
		return this.pid;
	}
	public String getmembername() {
		return this.membername;
	}
	public int getproject_authority() {
		return this.project_authority;
	}
}
