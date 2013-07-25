//
//  ctdDailyAttendanceService.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/24/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol DailyAttendanceServiceDelegate <NSObject>
- (void)didReceivedDailyAttendanceResponse:(NSString*)response;
- (void)didReceiveDailyAttendanceErrorResponse:(NSError*)error;
@end

@interface ctdDailyAttendanceService : NSObject{
    id<DailyAttendanceServiceDelegate> _delegate;
}
@property (nonatomic,strong) id<DailyAttendanceServiceDelegate>delegate;

-(void) requestDailyAttendanceToServer:(NSString*)employeeId date:(NSString*)date;
@end
