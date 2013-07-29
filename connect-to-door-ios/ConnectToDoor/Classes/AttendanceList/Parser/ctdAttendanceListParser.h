//
//  ctdAttendanceListParser.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ctdSummaryAttendanceModel.h"

@interface ctdAttendanceListParser : NSObject

-(ctdSummaryAttendanceModel*)parseResponse:(NSString*)response;
-(NSMutableArray*)parseResponseToArray:(NSString*)response;

@end
