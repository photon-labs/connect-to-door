//
//  ctdResponseCheckOutModel.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdResponseCheckOutModel.h"

@implementation ctdResponseCheckOutModel
@synthesize message = _message;
@synthesize status = _status;
@synthesize checkOut = _checkOut;

- (ctdResponseCheckOutModel *)initWithDefault{
    _message = @"";
    _status = @"";
    _checkOut = @"";
    
    return self;
}

@end
