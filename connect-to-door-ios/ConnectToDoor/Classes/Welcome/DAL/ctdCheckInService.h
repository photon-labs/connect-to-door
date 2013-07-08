//
//  ctdCheckInService.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol CheckInServiceDelegate <NSObject>
- (void)didReceivedCheckInResponse:(NSString*)response;
- (void)didReceiveCheckInErrorResponse:(NSError*)error;
@end

@interface ctdCheckInService : NSObject{
    id<CheckInServiceDelegate> _delegate;
}

@property (nonatomic,strong) id<CheckInServiceDelegate>delegate;

@end
