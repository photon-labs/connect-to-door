//
//  ctdResponseDailyAttendanceListModel.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdResponseDailyAttendanceListModel.h"

@implementation ctdResponseDailyAttendanceListModel

@synthesize checkOut = _checkOut;
@synthesize checkIn = _checkIn;
@synthesize presenceId = _presenceId;
@synthesize previlage = _previlage;
@synthesize employeeName = _employeeName;



- (ctdResponseDailyAttendanceListModel *)initWithDefault{
    _checkOut = @"";
    _checkIn = @"";
    _presenceId = @"";
    _previlage = @"";
    _employeeName = @"";
    
    return self;
}

@end
