package com.maretska.attendance.corsfilter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class CorsFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		
		if (request.getHeader("Access-Control-Request-Method") != null && "OPTIONS".equals(request.getMethod())){
			// CORS "pre-flight" request
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
			response.addHeader("Access-Control-Allow-Headers", "content-type");        
			response.addHeader("Access-Control-Max-Age", "1728000");
			response.addHeader("Access-Control-Allow-Credentials", "false");
		}
		filterChain.doFilter(request, response);
	}

}
