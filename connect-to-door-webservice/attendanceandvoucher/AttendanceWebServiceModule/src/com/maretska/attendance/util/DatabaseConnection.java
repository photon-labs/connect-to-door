package com.maretska.attendance.util;

import java.sql.*;

import com.maretska.attendance.AttendanceException;

public class DatabaseConnection {
	public PreparedStatement getConnection(String selectSqlData) {
		Connection conn = null;
		PreparedStatement preStat = null;

		try{
			String dbURL = "jdbc:mysql://172.17.10.165:3306/Attendance_Maretska";
			String username = "dhika";
			String password = "123456";

			Class.forName("com.mysql.jdbc.Driver");

			conn = DriverManager.getConnection(dbURL, username, password);

			preStat = conn.prepareStatement(selectSqlData);
		}catch(SQLException e){
			throw new AttendanceException(e);
		} catch (ClassNotFoundException e) {
			throw new AttendanceException(e);
		}
		return preStat;
	}
}
