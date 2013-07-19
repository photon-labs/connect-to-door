//
//  ctdResponseDailyAttendanceListModel.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdResponseDailyAttendanceListModel.h"

@implementation ctdResponseDailyAttendanceListModel

@synthesize number = _number;
@synthesize name = _name;
@synthesize checkIn = _checkIn;
@synthesize checkOut = _checkOut;
@synthesize previlage = _previlage;
@synthesize presentId = _presentId;

- (ctdResponseDailyAttendanceListModel *)initWithDefault{
    _number = @"";
    _name = @"";
    _checkIn = @"";
    _checkOut = @"";
    _previlage = @"";
    _presentId = @"";
    
    return self;
}

@end
