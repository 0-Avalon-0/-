package com.application.acceptbean;

public class SimpleFile {
	private int pid = 0;
	private String file_text = "";
	private String path = "";
	private String file_fname;
	private int file_property;
	public void setfile_fname(String name) {
		this.file_fname = name;
	}
	public void setfile_property(int property) {
		this.file_property = property;
	}
	public void setpid(int pid) {
		this.pid = pid;
	}
	public void setpath(String path) {
		this.path = path;
	}
	public void setfile_text(String text) {
		this.file_text  = text;
	}
	
	
	public int getpid() {
		return this.pid;
	}
	public String getpath() {
		return this.path;
	}
	public String getfile_text() {
		return this.file_text;
	}
	public String getfile_fname() {
		return this.file_fname;
	}
	public int getfile_property() {
		return this.file_property;
	}
}
