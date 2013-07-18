package com.maretska.attendance.util;

import java.sql.*;

import com.maretska.attendance.AttendanceException;

public class ConnectToSql {

	/***
	 * @author suryo_p
	 * to execute update SQL Query using SQL command "INSERT, UPDATE, DELETE"
	 * @param selectSqlData
	 * @return ResultSet
	 */
	public int executeUpdate(String selectSqlData){
		int rs;
		PreparedStatement preStat = null;

		try{
			DatabaseConnection databaseConnection = new DatabaseConnection();

			// get connection from database and insert SQL query
			preStat = databaseConnection.getConnection(selectSqlData);

			// get result from database, resulted in a number, 1 if success and 0 if invalid
			rs = preStat.executeUpdate();
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}
		return rs;
	}

	/***
	 * @author suryo_p
	 * to select SQL Query using SQL command "SELECT"
	 * @param selectSqlData
	 * @return ResultSet
	 */
	public ResultSet executeQuery(String selectSqlData){
		ResultSet rs = null;
		PreparedStatement preStat = null;

		try{
			DatabaseConnection databaseConnection = new DatabaseConnection();

			// get connection from database and insert SQL query
			preStat = databaseConnection.getConnection(selectSqlData);

			// get result from database, result contain object
			rs = preStat.executeQuery();
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}

		return rs;
	}
}