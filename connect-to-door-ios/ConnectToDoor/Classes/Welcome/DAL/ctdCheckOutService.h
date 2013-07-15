//
//  ctdCheckOutService.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol CheckOutServiceDelegate <NSObject>
- (void)didReceivedCheckOutResponse:(NSString*)response;
- (void)didReceiveCheckOutErrorResponse:(NSError*)error;
@end

@interface ctdCheckOutService : NSObject{
    id<CheckOutServiceDelegate> _delegate;
}

@property (nonatomic,strong) id<CheckOutServiceDelegate>delegate;

-(void)checkOutToServer:(NSString*)employeeId;

@end
