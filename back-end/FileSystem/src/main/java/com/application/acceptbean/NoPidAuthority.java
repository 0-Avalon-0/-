package com.application.acceptbean;

public class NoPidAuthority {
	private String membername;
	private int project_authority;

	public void setmembername(String name) {
		this.membername = name;
	}
	public void setproject_authority(int authority) {
		this.project_authority = authority;
	}

	public String getmembername() {
		return this.membername;
	}
	public int getproject_authority() {
		return this.project_authority;
	}
}
