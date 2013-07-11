//
//  ctdLocalStorage.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/9/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdLocalStorage.h"
#import "ctdConstants.h"

@implementation ctdLocalStorage

/*
 *aldi_p
 *this method for save
 */
-(void)setUserFacebookId:(NSString*)value{
    [[NSUserDefaults standardUserDefaults] setObject:value forKey:kUserFaceBookId];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

-(NSString*)getUserFacebookId{
    NSString *userFacebookId = ([[NSUserDefaults standardUserDefaults] stringForKey:kUserFaceBookId])?[[NSUserDefaults standardUserDefaults] stringForKey:kUserFaceBookId]:@"";
    return userFacebookId;
}

-(void)setEmployeeId:(NSString*)value{
    [[NSUserDefaults standardUserDefaults] setObject:value forKey:kEmployeeId];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

-(NSString*)getEmployeeId{
    NSString *employeeId = ([[NSUserDefaults standardUserDefaults] stringForKey:kEmployeeId])?[[NSUserDefaults standardUserDefaults] stringForKey:kEmployeeId]:@"";
    return employeeId;
}

-(void)setNameUserFacebook:(NSString*)value{
    [[NSUserDefaults standardUserDefaults] setObject:value forKey:kNameUserFaceBook];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

-(NSString*)getNameUserFacebook{
    NSString *nameUserFacebook = ([[NSUserDefaults standardUserDefaults] stringForKey:kNameUserFaceBook])?[[NSUserDefaults standardUserDefaults] stringForKey:kNameUserFaceBook]:@"";
    return nameUserFacebook;
}

-(void)resetLocalStorage{
    NSUserDefaults * defs = [NSUserDefaults standardUserDefaults];
    NSDictionary * dict = [defs dictionaryRepresentation];
    for (id key in dict) {
        [defs removeObjectForKey:key];
    }
    [defs synchronize];
}

@end
