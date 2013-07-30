//
//  ctdResponseSignatureLinkModel.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/29/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdResponseSignatureLinkModel.h"

@implementation ctdResponseSignatureLinkModel

@synthesize status = _status;
@synthesize signature = _signature;

- (ctdResponseSignatureLinkModel *)initWithDefault{
    _status = @"";
    _signature = @"";
    
    return self;
}
@end
