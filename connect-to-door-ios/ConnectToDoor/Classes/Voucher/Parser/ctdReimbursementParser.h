//
//  ctdReimbursementParser.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/29/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ctdResponseReimbursementModel.h"

@interface ctdReimbursementParser : NSObject

-(NSString*)parseRequest:(NSString*)response;
-(ctdResponseReimbursementModel*)parseResponse:(NSString*)response;

@end
