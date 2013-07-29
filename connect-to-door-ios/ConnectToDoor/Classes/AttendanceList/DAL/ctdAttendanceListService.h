//
//  ctdAttendanceListService.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/16/13.
//  Copyright (c) 2013 muhammad amirul. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol AttendanceListServiceDelegate <NSObject>
- (void)didReceiveAttendanceListResponse:(NSMutableArray *)attendanceListArray;
- (void)didReceiveAttendanceListErrorResponse:(NSError*)error;
@end

@interface ctdAttendanceListService : NSObject{
    id<AttendanceListServiceDelegate> _delegate;
}

@property (nonatomic,strong) id<AttendanceListServiceDelegate>delegate;

-(void) handleAttendanceListRequest :(NSString*)searchParameter :(NSString*)value :(NSString*)dateStart :(NSString*)dateEnd;
@end
