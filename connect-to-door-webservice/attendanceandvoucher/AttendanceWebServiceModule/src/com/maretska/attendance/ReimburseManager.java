package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;
import com.maretska.attendance.util.CurrentDate;

public class ReimburseManager {

	SQLCommand sqlCommand = new SQLCommand();
	ConnectToSql connectToSql = new ConnectToSql();
	CurrentDate currentDate = new CurrentDate();

	/**
	 * @author suryo_p
	 * validate the request contain the employee_id or not
	 * @param employeeData
	 * @return jsonObject contain response success or error
	 */
	public JSONObject inputDataReimburse(String employeeId, String cashAdvance, String reimburseType, String statusReimburse, String assignTo, JSONArray contentReimbursement){
		JSONObject jsonObject = new JSONObject();
		ResultSet rs;
		rs = connectToSql.executeQuery(sqlCommand.insertReimbursementMaster(employeeId, reimburseType, currentDate.getDateAsc(), cashAdvance, statusReimburse, assignTo));

		try {
			while(rs.next()){
				String reimbursementId = rs.getString("reimbursement_id");
				if(reimbursementId != null){
					jsonObject = loopToSaveEachContent(reimbursementId, assignTo, contentReimbursement);
					jsonObject.put("status", "success");
					jsonObject.put("reimburse_id", reimbursementId);
				}else{
					jsonObject.put("status", "error");
					jsonObject.put("message", "reimbursement's id undefined, please contact your database administrator");
				}
			}

		} catch (JSONException e) {
			throw new AttendanceException(e);
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}
		return jsonObject;
	}

	/**
	 * @author suryo_p
	 * looping data of reimbursement to save into database
	 * @param reimbursementId
	 * @param contentReimbursement
	 * @return jsonObject contain the response
	 */
	public JSONObject loopToSaveEachContent(String reimbursementId, String assignTo, JSONArray contentReimbursement){
		JSONObject jsObject = new JSONObject();
		JSONObject jsonObject = new JSONObject();
		int count = 0;

		jsonObject = getEmployeeData(assignTo);

		try {
			String employeeNameReceiver = jsonObject.getString("employee_name");
			String employeeEmailReceiver = jsonObject.getString("employee_email_photon");
			String[] bcc = null;

			String messageBody = "Hi "+employeeNameReceiver+", "+
					"\n\nThis message was sent from MKT - Leave Control and Voucher System. " +
					"\nThe following request has been sent to you for your approval. To view this request, please click on this link: " +
					"\nhttp://172.17.10.165/Attendance-UI.git/assets/www/html/Attendance.html#attendanceReimbursement?reimbursement-id="+reimbursementId+"";

			sendEmailNotification(reimbursementId ,messageBody, employeeEmailReceiver, bcc);
			for(int i = 0; i < contentReimbursement.length(); i++){
				jsObject = saveDataToDatabase(reimbursementId, contentReimbursement.getJSONObject(i), i);
				count = count + 1;
				if(jsObject.getString("status") == "error"){
					break;
				}
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return jsObject;
	}

	/**
	 * @author suryo_p
	 * send email notification to APM/GM contain the url to approve or decline the reimbursement
	 */
	public void sendEmailNotification(String reimbursementId, String messageBody, String employeeEmailReceiver, String[] employeeBccRecipients){

		SendEmailManager emailer = new SendEmailManager();
		String[] recipients = new String[]{employeeEmailReceiver};
		String subject = "Approval Reimbursement "+reimbursementId;
		String[] bccRecipients = new String[]{};

		if(employeeBccRecipients != null){
			bccRecipients = employeeBccRecipients;
		}

		emailer.sendMail(recipients, bccRecipients, subject, messageBody);
	}

	/**
	 * @author suryo_p
	 * save data reimbursed into database
	 * @param employeeData
	 * @return jsonObject contain response success or error
	 */
	public JSONObject saveDataToDatabase(String reimbursementId, JSONObject contentReimbursement, int countOfReimbursement){
		int rs;
		JSONObject jsonObject = new JSONObject();

		try {
			// get result from database, resulted in a number, 1 if success and 0 if invalid
			rs = connectToSql.executeUpdate(sqlCommand.insertReimbursementDetail(reimbursementId, contentReimbursement));
			if(rs == 1 || rs == -1){
				jsonObject.put("status", "success");
				jsonObject.put("message", countOfReimbursement+1 + " reimbursement has been processed");
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "reimbursement number "+countOfReimbursement+" failed to process");
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return jsonObject;
	}

	/**
	 * @author suryo_p
	 * get data employee of reimbursement from database
	 * @param reimbursementId
	 * @return jsonObject contain response success or error
	 */
	public JSONObject getReimbursementDataEmployee(String reimbursementId){
		ResultSet rs;
		JSONObject jsonObject = new JSONObject();

		try {
			if(reimbursementId != null){
				rs = connectToSql.executeQuery(sqlCommand.getReimbursementEmployeeData(reimbursementId));

				while(rs.next()){
					jsonObject = getReimbursementContent(reimbursementId);
					jsonObject.put("status", "success");
					jsonObject.put("reimbursement_status", rs.getString("status"));
					jsonObject.put("employee_name", rs.getString("employee_name"));
					jsonObject.put("employee_id", rs.getString("employee_id"));
					jsonObject.put("project_id", rs.getString("project_id"));
					jsonObject.put("reimbursement_type", rs.getString("reimbursement_type"));
					jsonObject.put("assign_to", rs.getString("assign_to"));
				}
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "data undefined");
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}
		return jsonObject;
	}

	/**
	 * @author suryo_p
	 * get reimbursement content from database
	 * @param reimbursementId
	 * @return jsonObject contain response success or error
	 */
	public JSONObject getReimbursementContent(String reimbursementId){
		ResultSet rs;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		JSONArray jsArray = new JSONArray();

		jsArray = getReimbursementHistory(reimbursementId);

		try {
			rs = connectToSql.executeQuery(sqlCommand.getReimbursementContent(reimbursementId));

			while(rs.next()){
				JSONObject jsObject = new JSONObject();
				jsObject.put("detail_id", rs.getString("detail_id"));
				jsObject.put("reimbursement_id", rs.getString("reimbursement_id"));
				jsObject.put("description", rs.getString("description"));
				jsObject.put("quantity", rs.getString("quantity"));
				jsObject.put("cost", rs.getString("cost"));
				jsObject.put("date", rs.getString("date"));
				jsonArray.put(jsObject);
			}
			jsonObject.put("status", "success");
			jsonObject.put("data", jsonArray);
			jsonObject.put("history", jsArray);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}
		return jsonObject;
	}

	/**
	 * @author suryo_p
	 * get history of reimbursement status
	 * @param reimbursementId
	 * @return JSONArray contain the response
	 */
	public JSONArray getReimbursementHistory(String reimbursementId){
		ResultSet rs;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();

		rs = connectToSql.executeQuery(sqlCommand.getReimbursementHistory(reimbursementId));

		try {
			while(rs.next()){
				jsonObject = new JSONObject();
				jsonObject.put("employee_id", rs.getString("employee_id"));
				jsonObject.put("date", rs.getString("date"));
				jsonObject.put("status", rs.getString("status"));
				jsonObject.put("signature", rs.getString("signature"));
				jsonArray.put(jsonObject);
			}
		} catch (SQLException e) {
			throw new AttendanceException(e);
		} catch (JSONException e){
			throw new AttendanceException(e);
		}

		return jsonArray;
	}

	/**
	 * @author suryo_p
	 * update status reimbursement
	 * @param reimburseId
	 * @param statusReimburse
	 * @param employeeId
	 * @return JSONObject contain the response
	 */
	public JSONObject updateReimbursementStatus(String reimburseId, String statusReimburse, String employeeId, String assignTo){
		int rs;
		JSONObject jsonObject = new JSONObject();
		JSONObject jsObject = new JSONObject();

		jsObject = getEmployeeData(assignTo);

		rs = connectToSql.executeUpdate(sqlCommand.updateReimbursementStatus(reimburseId, employeeId, currentDate.getDateAsc(), statusReimburse, assignTo));

		try {
			String employeeNameReceiver = jsObject.getString("employee_name");
			String employeeEmailReceiver = jsObject.getString("employee_email_photon");
			String[] bcc = null;
			if(rs == 1 || rs == -1){
				if(statusReimburse.equalsIgnoreCase("decline")){
					String messageBody = "Hi "+employeeNameReceiver+", "+
							"\n\nThis message was sent from MKT - Leave Control and Voucher System. " +
							"\nYour reimbursement has been decline. ";

					sendEmailNotification(reimburseId, messageBody, employeeEmailReceiver, bcc);
				}else if(statusReimburse.equalsIgnoreCase("complete") || statusReimburse.equalsIgnoreCase("complete-apm")){
					String messageBody = "Hi "+employeeNameReceiver+", "+
							"\n\nThis message was sent from MKT - Leave Control and Voucher System. " +
							"\nThe following reimbursement has been sent to you for your approval. To view this request, please click on this link: " +
							"\nhttp://172.17.10.165/Attendance-UI.git/assets/www/html/Attendance.html#attendanceReimbursement?reimbursement-id="+reimburseId+"";

//					bcc = new String[]{"fitri.wardani@photoninfotech.net", "iryani.muammar@photoninfotech.net", "yana.rosidianti@photoninfotech.net"};
					bcc = new String[]{"suryo.prabowo@photoninfotech.net", "dhika.prathama@photoninfotech.net", "andhika.purwanto@photoninfotech.net"};
					sendEmailNotification(reimburseId, messageBody, employeeEmailReceiver, bcc);
				}else{
					String messageBody = "Hi "+employeeNameReceiver+", "+
							"\n\nThis message was sent from MKT - Leave Control and Voucher System. " +
							"\nThe following reimbursement has been sent to you for your approval. To view this request, please click on this link: " +
							"\nhttp://172.17.10.165/Attendance-UI.git/assets/www/html/Attendance.html#attendanceReimbursement?reimbursement-id="+reimburseId+"";

					sendEmailNotification(reimburseId, messageBody, employeeEmailReceiver, bcc);
				}

				jsonObject.put("status", "success");
				jsonObject.put("message", "reimbursement has been proceed");
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "cant connect into database");
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return jsonObject;
	}

	public JSONObject getEmployeeData(String employeeId){
		ResultSet rs;
		JSONObject jsonObject = new JSONObject();

		rs = connectToSql.executeQuery(sqlCommand.getProfileDataSearchByEmployeeId(employeeId));

		try {
			while(rs.next()){
				jsonObject.put("employee_name", rs.getString("employee_name"));
				jsonObject.put("employee_email_photon", rs.getString("employee_email_photon"));
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}
		return jsonObject;
	}
}