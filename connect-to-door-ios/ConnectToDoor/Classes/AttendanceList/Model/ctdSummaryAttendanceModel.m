//
//  ctdReponseLoginModel.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import "ctdSummaryAttendanceModel.h"

@implementation ctdSummaryAttendanceModel

@synthesize employeeId = _employeeId;
@synthesize employeeName = _employeeName;
@synthesize projectId = _projectId;
@synthesize totalAttendance = _totalAttendance;
@synthesize averageWorkingHour = _averageWorkingHour;
@synthesize totalWorking = _totalWorking;
@synthesize totalLeave = _totalLeave;

- (ctdSummaryAttendanceModel *)initWithDefault{
    _employeeId = @"";
    _employeeName = @"";
    _projectId = @"";
    _totalAttendance = @"";
    _averageWorkingHour = @"";
    _totalWorking = @"";
    _totalLeave = @"";
    
    return self;
}

@end
