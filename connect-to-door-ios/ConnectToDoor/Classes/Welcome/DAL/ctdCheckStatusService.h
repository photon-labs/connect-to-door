//
//  ctdCheckStatusService.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/12/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol CheckStatusServiceDelegate <NSObject>
- (void)didReceivedCheckStatusResponse:(NSString*)response;
- (void)didReceiveCheckStatusErrorResponse:(NSError*)error;
@end

@interface ctdCheckStatusService : NSObject{
     id<CheckStatusServiceDelegate> _delegate;
}

@property (nonatomic,strong) id<CheckStatusServiceDelegate>delegate;

-(void)checkStatusToServer:(NSString*)employeeId;

@end
