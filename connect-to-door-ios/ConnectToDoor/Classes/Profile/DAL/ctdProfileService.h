//
//  ctdLoginService.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/8/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ctdProfileModel.h"

@protocol ProfileServiceDelegate <NSObject>
- (void)didReceiveProfileResponse:(ctdProfileModel*)profileModel;
- (void)didReceiveProfileErrorResponse:(NSError*)error;
@end

@interface ctdProfileService : NSObject{
    id<ProfileServiceDelegate> _delegate;
}

@property (nonatomic,strong) id<ProfileServiceDelegate>delegate;

-(void) handleProfileRequest:(NSString*)searchParameter :(NSString*)value;
@end
