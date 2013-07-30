//
//  ctdRequestDetailReimbursementModel.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/29/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdRequestDetailReimbursementModel.h"

@implementation ctdRequestDetailReimbursementModel

@synthesize description = _description;
@synthesize quantity = _quantity;
@synthesize cost = _cost;
@synthesize date = _date;
@synthesize employeeName = _employeeName;

- (ctdRequestDetailReimbursementModel *)initWithDefault{
    _description = @"";
    _quantity = @"";
    _cost = @"";
    _employeeName = @"";
    
    return self;
}
@end
