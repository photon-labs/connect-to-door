//
//  ctdProfileModel.m
//  ConnectToDoor
//
//  Created by muhammad amirul on 7/11/13.
//  Copyright (c) 2013 Photon Infotech. All rights reserved.
//

#import "ctdProfileModel.h"

@implementation ctdProfileModel

@synthesize facebookId = _facebookId;
@synthesize employeeId = _employeeId;
@synthesize employeeName = _employeeName;
@synthesize userName = _userName;
@synthesize gender = _gender;
@synthesize employeeEmailPhoton = _employeeEmailPhoton;
@synthesize employeeStartWork = _employeeStartWork;
@synthesize signature = _signature;
@synthesize status = _status;
@synthesize authority = _authority;
@synthesize projectId = _projectId;
@synthesize married = _married;
@synthesize condolences = _condolences;
@synthesize maternity = _maternity;
@synthesize cOff = _cOff;
@synthesize annual = _annual;
@synthesize onsite = _onsite;
@synthesize paternity = _paternity;
@synthesize sick = _sick;

- (ctdProfileModel *)initWithDefault{
    _facebookId = @"";
    _employeeId = @"";
    _employeeName = @"";
    _userName = @"";
    _gender = @"";
    _employeeEmailPhoton = @"";
    _employeeStartWork = @"";
    _signature = @"";
    _status = @"";
    _authority = @"";
    _projectId = @"";
    _married = @"";
    _condolences = @"";
    _maternity = @"";
    _cOff = @"";
    _annual = @"";
    _onsite = @"";
    _paternity = @"";
    _sick = @"";
    
    return self;
}

@end
