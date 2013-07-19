package com.maretska.attendance;


/***
 * Class for handle exception
 * @author Photon Jakarta
 *
 */
public class AttendanceException extends RuntimeException {
	/**
	 * Handle exception
	 */
	private static final long serialVersionUID = 1671822177545634249L;

	public AttendanceException(Throwable t) {
		super(t);
	}
}
