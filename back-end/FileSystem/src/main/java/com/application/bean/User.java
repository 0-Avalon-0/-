package com.application.bean;

public class User {
	private String user_name;
	private String user_password;
	private int user_gender;
	private String user_email;
	private String user_signature;
	private String user_company;
	private String user_location;
	
	
	public void setuser_name(String name) {
		this.user_name = name;
	}
	public void setuser_password(String password) {
		this.user_password = password;
	}
	public void setuser_gender(int gender) {
		this.user_gender = gender;
	}
	public void setuser_email(String email) {
		this.user_email = email;
	}
	public void setuser_signature(String signature) {
		this.user_signature = signature;
	}
	public void setuser_company(String company) {
		this.user_company = company;
	}
	public void setuser_location(String location) {
		this.user_location = location;
	}
	
	
	public String getuser_name() {
		return this.user_name;
	}
	public String getuser_password() {
		return this.user_password;
	}
	public int getuser_gender() {
		return this.user_gender;
	}
	public String getuser_email() {
		return this.user_email;
	}
	public String getuser_signature() {
		return this.user_signature;
	}
	public String getuser_company() {
		return this.user_company;
	}
	public String getuser_location() {
		return this.user_location;
	}
}
