//
//  ctdAttendanceAccountService.h
//  ConnectToDoor
//
//  Created by muhammad amirul on 7/26/13.
//  Copyright (c) 2013 Photon Infotech. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ctdProfileModel.h"

@protocol AttendanceAccountServiceDelegate <NSObject>
- (void)didReceiveAttendanceAccountResponse:(ctdProfileModel*)accountProfileModel;
- (void)didReceiveAttendanceAccountErrorResponse:(NSError*)error;
@end

@interface ctdAttendanceAccountService : NSObject{
    id<AttendanceAccountServiceDelegate> _delegate;
}

@property (nonatomic,strong) id<AttendanceAccountServiceDelegate>delegate;

-(void) handleAttendanceAccountCUDRequest:(NSDictionary*) requestBody;
@end
