//
//  ctdAttendanceListParser.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import "ctdAttendanceListParser.h"
#import "ctdConstants.h"
#import "JSONKit.h"


@implementation ctdAttendanceListParser

/* muhammad_a
 * this function for parser string response to object class
 * param String 
 */
-(ctdSummaryAttendanceModel*)parseResponse:(NSString*)response{
    
    NSDictionary *objResponse = [response objectFromJSONString];
    return [self parseResponseFromDictionary:objResponse];
}

/* muhammad_a
 * this function for parser string response to object list
 * param String
 */
-(NSMutableArray*)parseResponseToArray:(NSString*)response{
    
    NSDictionary *objResponse = [response objectFromJSONString];
    NSMutableArray *attendanceList = [[NSMutableArray alloc] init];
    NSMutableArray *dataResponse = [objResponse objectForKey:DATA_KEY];
    
    for (int i = 0; i < [dataResponse count]; i++) {
        NSDictionary *objModel = [dataResponse objectAtIndex: i];
        ctdSummaryAttendanceModel *dataModel = [self parseResponseFromDictionary:objModel];
        [attendanceList addObject:dataModel];
    }
    return attendanceList;
}

/* muhammad_a
 * default function for parser dictionary response to object model
 * param dictionary
 */
-(ctdSummaryAttendanceModel*)parseResponseFromDictionary:(NSDictionary*)objResponse{
    ctdSummaryAttendanceModel *model = [[ctdSummaryAttendanceModel alloc]initWithDefault];
    if([objResponse objectForKey:EMPLOYEE_ID_PARAMETER]){
        model.employeeId =  [objResponse objectForKey:EMPLOYEE_ID_PARAMETER];
    }
    
    if([objResponse objectForKey:EMPLOYEE_NAME_KEY]){
        model.employeeName =  [objResponse objectForKey:EMPLOYEE_NAME_KEY];
    }
    
    if([objResponse objectForKey:PROJECT_ID_KEY]){
        model.projectId =  [objResponse objectForKey:PROJECT_ID_KEY];
    }
    
    if([objResponse objectForKey:TOTAL_ATTENDANCE_KEY]){
        model.totalAttendance =  [objResponse objectForKey:TOTAL_ATTENDANCE_KEY];
    }
    
    if([objResponse objectForKey:AVERAGE_WORKING_HOUR_KEY]){
        model.averageWorkingHour =  [objResponse objectForKey:AVERAGE_WORKING_HOUR_KEY];
    }
    
    if([objResponse objectForKey:TOTAL_WORKING]){
        model.totalWorking =  [objResponse objectForKey:TOTAL_WORKING];
    }
    
    if([objResponse objectForKey:TOTAL_LEAVE]){
        model.totalLeave =  [objResponse objectForKey:TOTAL_LEAVE];
    }
    
    return model;
}

@end
