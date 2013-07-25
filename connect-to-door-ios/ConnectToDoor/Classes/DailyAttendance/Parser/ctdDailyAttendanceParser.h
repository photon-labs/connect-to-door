//
//  ctdDailyAttendanceParser.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/9/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ctdResponseDailyAttendanceModel.h"

@interface ctdDailyAttendanceParser : NSObject

-(ctdResponseDailyAttendanceModel*)parseResponse:(NSString*)response;

@end
