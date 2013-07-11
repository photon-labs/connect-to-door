//
//  ctdLocalStorage.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/9/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ctdLocalStorage : NSObject

-(void)setUserFacebookId:(NSString*)value;
-(NSString*)getUserFacebookId;
-(void)setEmployeeId:(NSString*)value;
-(NSString*)getEmployeeId;
-(void)setNameUserFacebook:(NSString*)value;
-(NSString*)getNameUserFacebook;
-(void)resetLocalStorage;
@end
