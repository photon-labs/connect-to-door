//
//  ctdReimbursementService.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/29/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol ReimbursementServiceDelegate <NSObject>
- (void)didReceivedReimbursementServiceResponse:(NSString*)response;
- (void)didReceiveReimbursementServiceErrorResponse:(NSError*)error;
@end

@interface ctdReimbursementService : NSObject{
    id<ReimbursementServiceDelegate> _delegate;
}
@property (nonatomic,strong) id<ReimbursementServiceDelegate>delegate;

-(void) requestReimbursementToServer:(NSString*)employeeId;

@end
