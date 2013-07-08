//
//  ctdReponseLoginModel.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdReponseLoginModel.h"

@implementation ctdReponseLoginModel

@synthesize username = _username;
@synthesize previlage = _previlage;
@synthesize message = _message;
@synthesize status = _status;

- (ctdReponseLoginModel *)initWithDefault{
    _username = @"";
    _previlage = @"";
    _message = @"";
    _status = @"";
    return self;
}

@end
