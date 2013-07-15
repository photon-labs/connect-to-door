//
//  ctdCheckStatusParser.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/15/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ctdResponseCheckStatusModel.h"

@interface ctdCheckStatusParser : NSObject

-(ctdResponseCheckStatusModel*)parseResponse:(NSString*)response;

@end
