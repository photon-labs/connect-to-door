//
//  ctdResponseCheckInModel.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdResponseCheckInModel.h"

@implementation ctdResponseCheckInModel
@synthesize message = _message;
@synthesize status = _status;
@synthesize checkIn = _checkIn;

- (ctdResponseCheckInModel *)initWithDefault{
    _message = @"";
    _status = @"";
    _checkIn = @"";
    return self;
}

@end
