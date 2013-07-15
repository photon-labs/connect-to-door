//
//  ctdCheckOutParser.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ctdResponseCheckOutModel.h"

@interface ctdCheckOutParser : NSObject

-(ctdResponseCheckOutModel*)parseResponse:(NSString*)response;

@end
