//
//  ctdDailyAttendanceParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/9/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdDailyAttendanceParser.h"
#import "JSONKit.h"
#import "ctdConstants.h"
#import "ctdResponseDailyAttendanceModel.h"
#import "ctdResponseDailyAttendanceListModel.h"

@implementation ctdDailyAttendanceParser


/* @author: aldi_p
 * this fucntion for paser string to object class
 * @param String
 */
-(ctdResponseDailyAttendanceModel*)parseResponse:(NSString*)response{
    ctdResponseDailyAttendanceModel *dailyAttendanceModel = [[ctdResponseDailyAttendanceModel alloc] init];
    
    NSDictionary *objResponse = [response objectFromJSONString];
    if([objResponse objectForKey:EMPLOYEE_DATA_KEY]){
        NSArray *employeeDataArray = [objResponse objectForKey:EMPLOYEE_DATA_KEY];
        if([employeeDataArray isKindOfClass:[NSArray class]]){
            NSMutableArray *attendanceArray = [[NSMutableArray alloc] init];
            for(NSDictionary* attendanceItem in employeeDataArray ){
                ctdResponseDailyAttendanceListModel *dailyAttendanceItem = [[ctdResponseDailyAttendanceListModel alloc] initWithDefault];
                if([attendanceItem objectForKey:ADMIN_KEY]){
                    dailyAttendanceItem.previlage = [attendanceItem objectForKey:ADMIN_KEY]?[attendanceItem objectForKey:ADMIN_KEY]:@"";
                }
                if([attendanceItem objectForKey:CHECK_OUT_STATUS_KEY]){
                    dailyAttendanceItem.checkOut = [attendanceItem objectForKey:CHECK_OUT_STATUS_KEY]?[attendanceItem objectForKey:CHECK_OUT_STATUS_KEY]:@"";
                }
                if([attendanceItem objectForKey:CHECK_IN_STATUS_KEY]){
                    dailyAttendanceItem.checkIn = [attendanceItem objectForKey:CHECK_IN_STATUS_KEY]?[attendanceItem objectForKey:CHECK_IN_STATUS_KEY]:@"";
                }
                if([attendanceItem objectForKey:PRESENCE_ID_KEY]){
                    dailyAttendanceItem.presenceId = [attendanceItem objectForKey:PRESENCE_ID_KEY]?[attendanceItem objectForKey:PRESENCE_ID_KEY]:@"";
                }
                if([attendanceItem objectForKey:EMPLOYEE_NAME_KEY]){
                    dailyAttendanceItem.employeeName = [attendanceItem objectForKey:EMPLOYEE_NAME_KEY]?[attendanceItem objectForKey:EMPLOYEE_NAME_KEY]:@"";
                }
                
                [attendanceArray addObject:dailyAttendanceItem];
            }
            [dailyAttendanceModel setArrayDailyAttendance:attendanceArray];
        }
    
    }
    return dailyAttendanceModel;
}


@end
