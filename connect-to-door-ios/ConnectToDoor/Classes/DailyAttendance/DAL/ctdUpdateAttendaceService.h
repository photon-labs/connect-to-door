//
//  ctdUpdateAttendaceService.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/30/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol UpdateAttendanceServiceDelegate <NSObject>
- (void)didReceivedUpdateAttendanceResponse:(NSString*)response;
- (void)didReceiveUpdateAttendanceErrorResponse:(NSError*)error;
@end

@interface ctdUpdateAttendaceService : NSObject{
    id<UpdateAttendanceServiceDelegate> _delegate;
}
@property (nonatomic,strong) id<UpdateAttendanceServiceDelegate>delegate;

-(void) requestUpdateAttendanceToServer:(NSString*)employeeId date:(NSString*)date checkInTime:(NSString*)checkInTime checkOutTime:(NSString*)checkOutTime;

@end
