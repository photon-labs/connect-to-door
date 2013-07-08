package com.photon.connecttodoor.controller;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import android.util.Log;

public class HttpAdapter {
	private static final int STATUS_CODE_ERROR = 400;
	private static final String APIHOST = "172.17.10.165";
	private static final String PORT = "8080";
	public String sendPostRequest(String data, String module){
		String response = "";
		final String urlService = "http://" + APIHOST + ":" + PORT + "/AttendanceWebService/api";
		String url = urlService+module;
		try {
			// Send data
			URL urls = new URL(url);
			URLConnection conn = urls.openConnection();
			// Construct the header
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("Accept", "application/json");
			conn.setRequestProperty("Content-Length", "" + Integer.toString(data.getBytes().length));

			conn.setDoOutput(true);
			OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
			wr.write(data);
			wr.flush();

			HttpURLConnection httpConn = (HttpURLConnection)conn;
			InputStream is;
			Log.i("JavaHTTPAdapter", " <><><><><> url = "+url+" <><><><><><> status code = "+httpConn.getResponseCode());
			if (httpConn.getResponseCode() >= STATUS_CODE_ERROR) {
				is = httpConn.getErrorStream();
			} else {
				is = httpConn.getInputStream();
			}

			// Get the response
			BufferedReader rd = new BufferedReader( new InputStreamReader(is));
			String line;
			StringBuilder sb = new StringBuilder();
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
			response = sb.toString();
			wr.close();
			rd.close();
		} catch (Exception e) {
			Log.i("JavaHTTPAdapter", "====== "+url+" ==== error "+e);
		}

		return response;
	}

}
