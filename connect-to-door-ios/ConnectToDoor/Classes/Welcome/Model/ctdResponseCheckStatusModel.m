//
//  ctdResponseCheckStatusModel.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/15/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdResponseCheckStatusModel.h"

@implementation ctdResponseCheckStatusModel

@synthesize checkOut = _checkOut;
@synthesize checkIn = _checkIn;
@synthesize presenceId = _presenceId;
@synthesize employeeId = _employeeId;

- (ctdResponseCheckStatusModel *)initWithDefault{
    _checkOut = @"";
    _checkIn = @"";
    _presenceId = @"";
    _employeeId = @"";
    return self;
}

@end
